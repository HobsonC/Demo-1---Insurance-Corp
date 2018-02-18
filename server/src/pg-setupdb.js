import pg from 'pg'
import Sequelize from 'sequelize'
import fs from 'fs'
import * as d3 from 'd3'
import path from 'path'
import csv from 'csv'

// Regex Classifiers:
const regexVector = /^\[.*\]$/
const regexArray = /^\{.*\}$/
const regexInteger = /^-?\d+$/
const regexFloat = /^-?\d*\.\d+$/
const regexCSV = /(\.csv)$/

const makeDB = () => setupDB('dbuser01','pwd01','demo_insurancedb')

const setupDB = (user,password,dbname) => {
    const config = {
        user: user,
        database: 'postgres',
        password: password,
        port: 5432,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000
    }
    const configNew = {
        user: user,
        database: dbname,
        password: password,
        port: 5432,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000
    }
    const pool = new pg.Pool(config)
    const createDBPromise = createDB(pool,user,dbname)

    createDBPromise.then(success => {
        pool.end()
        success ? console.log('Database created.') : console.log('X Database NOT created.')
        return success
    })
    .then(() => {
        console.log("Getting csv file names...")
        return getCSVFileNames()
    })
    .then(csvFileList => {
        console.log('csvFileList: ',csvFileList)
        let csvFileListPromises = []
        csvFileList.forEach(f => {
            csvFileListPromises.push(getTableQueries(f))
        })
        return Promise.all(csvFileListPromises)
    })
    .then(tableQueries => {
        createTables(configNew,tableQueries)
        return true
    })
    .catch(err => {
        console.log(err)
        return false
    })
}

const createDB = (pool,user,dbname) => {
    const q = `CREATE DATABASE ${dbname}
    WITH OWNER = ${user}
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    LC_COLLATE = 'English_Canada.1252'
    LC_CTYPE = 'English_Canada.1252'
    CONNECTION LIMIT = -1;`

    return new Promise((resolve,reject) => {
        pool.connect((err,pool,release) => {
            pool.query(q, (err,result) => {
                if (err) reject(false)
                else resolve(true)
            })
        })
    })
}

const getCSVFileNames = () => new Promise((resolve,reject) => {
    const filepath = path.join(__dirname,'../data')
    const files = fs.readdirSync(filepath)
    let csvList = []
    files.forEach(f => regexCSV.test(f) ? csvList.push(f) : false)
    if (csvList.length > 0) resolve(csvList)
    else reject("No csv files found.")
})

const createTables = (config,tableQueries) => new Promise((resolve,reject) => {
    const pool = new pg.Pool(config)
    pool.connect((err,pool,release) => {
        tableQueries.forEach(tableQuery => {
        pool.query(tableQuery.createTableQuery, (err,result) => {
            if (err) {
                console.log('ERROR creating table.')
                console.log(err)
            } else {
                console.log('Table created.')
                tableQuery.fillTableQuery.forEach(q => {
                    pool.query(q, (err,result) => {
                        if (err) {
                            console.log('ERROR filling table.')
                            console.log('q: ',q)
                            console.log(err)
                        } else {
                        }
                    })
                })
            }
        })
    })
    })
})

const createTable = (csvName,cols,colTypes,pool) => new Promise((resolve,reject) => {
    let name = csvName.replace('.csv','')
    console.log(`Creating table "${name}"...`)
    if (cols.length !== colTypes.length) reject("# columns =/= # column types")    

    let queryString = `CREATE TABLE `
    queryString += name
    queryString += ` (`
    for (let i=0; i<cols.length; i++) {
        queryString += i > 0 ? `,` : ``
        queryString += cols[i]
        queryString += ` `
        queryString += colTypes[i]
    }
    queryString += `)`

    pool.query(queryString, (err,res) => {
            if (err) {
                console.log('ERROR with queryString: ',queryString)
                console.log('TABLE: ',name)
                console.log('csvName: ',csvName)
                console.log('res: ',res)
                console.error(err)
            } else {
                resolve('Table created: ',name)
            }
        })
})

const getTableQueries = (csvFile) => new Promise((resolve,reject) => {
    const tableName = csvFile.replace('.csv','')
    let tableColumns = []
    let tableColumnTypes = []
    let insertList = []

    d3.csv('file:\\\\'+__dirname+'\\..\\data\\'+csvFile)
        .row(d => d)
        .get((err,rows) => {
            if (err) reject('Error reading this file: ',csvFile)
            tableColumns = rows.columns
            let currentType = ""
            for(let i=0; i<rows.length; i++) {
                let insert = `INSERT INTO ${tableName} VALUES (`
                for(let j=0; j<tableColumns.length; j++) {
                    if (i === 0) {
                        let value = rows[1][tableColumns[j]]
                        if (regexInteger.test(value)) tableColumnTypes.push("integer")
                        else if (regexFloat.test(value)) tableColumnTypes.push("real")
                        else if (regexArray.test(value) || regexVector.test(value)) {
                            value = value[1]
                            if (regexInteger.test(value)) {
                                tableColumnTypes.push("integer[]")
                                currentType = "integer array"
                            }
                            else if (regexFloat.test(value)) tableColumnTypes.push("real[]")
                            else tableColumnTypes.push("text[]")
                        }
                        else {
                            if (value.length == 1) {
                                tableColumnTypes.push("boolean")
                            }
                            else {
                                tableColumnTypes.push("text")
                                currentType = "text" 
                            }
                        }
                    }
                    if (currentType === "text" || currentType === "integer array") insert += `'`+rows[i][tableColumns[j]]+`'`
                    else insert += rows[i][tableColumns[j]]
                    insert += j===tableColumns.length-1 ? `` : `,`
                }
                insert += `)`
                insertList.push(insert)
            }

            let createTableQuery = `CREATE TABLE `
            createTableQuery += tableName
            createTableQuery += ` (`
            // loop tableColumns
            for (let i=0; i<tableColumns.length; i++) {
                createTableQuery += i > 0 ? `,` : ``
                createTableQuery += tableColumns[i]
                createTableQuery += ` `
                createTableQuery += tableColumnTypes[i]
            }
            createTableQuery += `)`
            console.log('createTableQuery: ',createTableQuery)
            // end loop

            if (insertList.length > 0) resolve({
                createTableQuery: createTableQuery, // create table
                fillTableQuery: insertList // populate table
            })
            else reject("No data found.")
        })
})

export { makeDB }