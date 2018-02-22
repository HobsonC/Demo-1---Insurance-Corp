import Sequelize from 'sequelize'
import { getCurrentAge } from './datelib'

const Op = Sequelize.Op;
const operatorsAliases = {
  eq: Op.eq,
  ne: Op.ne,
  gte: Op.gte,
  gt: Op.gt,
  lte: Op.lte,
  lt: Op.lt,
  not: Op.not,
  in: Op.in,
  notIn: Op.notIn,
  is: Op.is,
  like: Op.like,
  notLike: Op.notLike,
  iLike: Op.iLike,
  notILike: Op.notILike,
  regexp: Op.regexp,
  notRegexp: Op.notRegexp,
  iRegexp: Op.iRegexp,
  notIRegexp: Op.notIRegexp,
  between: Op.between,
  notBetween: Op.notBetween,
  overlap: Op.overlap,
  contains: Op.contains,
  contained: Op.contained,
  adjacent: Op.adjacent,
  strictLeft: Op.strictLeft,
  strictRight: Op.strictRight,
  noExtendRight: Op.noExtendRight,
  noExtendLeft: Op.noExtendLeft,
  and: Op.and,
  or: Op.or,
  any: Op.any,
  all: Op.all,
  values: Op.values,
  col: Op.col
}

const db = new Sequelize('postgres://dbuser01@localhost:5432/demo_insurancedb', { operatorsAliases })

db.authenticate().then(console.log('db authenticated...'))
                 .catch(err => console.log(err))

const Policy = db.define('policy',
    {
        policynumber:   { type: Sequelize.INTEGER, primaryKey: true }, // shouldn't do, should add index col for pk
        name:           { type: Sequelize.STRING },
        dob:            { type: Sequelize.STRING },
        gender:         { type: Sequelize.STRING },
        smokingstatus:  { type: Sequelize.STRING },
        faceamount:     { type: Sequelize.INTEGER }
    },
    {
        tableName: 'policies',
        timestamps: false
    }
)

const Agent = db.define('agent',
    {
        agentid:        { type: Sequelize.INTEGER, primaryKey: true },
        password:       { type: Sequelize.STRING },
        name:           { type: Sequelize.STRING },
        policies:       { type: Sequelize.ARRAY(Sequelize.INTEGER) }
    },
    {
        tableName: 'agents',
        timestamps: false
    }
)

const Employee = db.define('employee',
    {
        eeid:       { type: Sequelize.INTEGER, primaryKey: true },
        password:   { type: Sequelize.STRING },
        name:       { type: Sequelize.STRING }
    },
    {
        tableName: 'employees',
        timestamps: false
    }
)

const MonthlyPremium = db.define('premium',
    {
        age:                        { type: Sequelize.INTEGER, primaryKey: true },
        gender:                     { type: Sequelize.STRING },
        smoker:                     { type: Sequelize.BOOLEAN },
        prem_pmonth_pthousandfa:    { type: Sequelize.FLOAT }
    },
    {
        tableName: 'prem_rates',
        timestamps: false
    }
)

const getMonthlyPremiumPerThousand = (age,gender,smk) => MonthlyPremium.findOne({
    where: {
        age: age,
        gender: gender,
        smoker: smk === "Smoker"
        }
    })
    .then(prem =>  {
        return prem.prem_pmonth_pthousandfa
    })
    .catch(err => 0.00)

const getPolicy = pn => {
    let pol = {}
    return Policy.findById(pn)
    .then(p => {
        pol = p.dataValues
        const age = getCurrentAge(p.dob)
        pol.currentage = age
        return getMonthlyPremiumPerThousand(age,pol.gender,pol.smokingstatus)
    })
    .then(prem => {
        pol.monthlypremium = Math.round(prem * pol.faceamount / 10) / 100
        return pol
    })
}

const getAgent = id => Agent.findById(id).then(a => a)
const getEmployee = id => Employee.findById(id).then(ee => ee)

const getAgentLogin = (id,pwd) => Agent.findById(id)
        .then(a => {
            if (a.password === pwd) {
                return {
                    idExists: true,
                    passwordCorrect: true
                }
            } else {
                return {
                    idExists: true,
                    passwordCorrect: false
                }
            }
        })
        .catch(err => {
            return {
                idExists: false,
                passwordCorrect: false
            }
        })

const getEmployeeLogin = (id,pwd) => Employee.findById(id)
        .then(ee => {
            if (ee.password === pwd) {
                return {
                    idExists: true,
                    passwordCorrect: true
                }
            }
            return {
                idExists: true,
                passwordCorrect: false
            }
        })
        .catch(err => {
            return {
                idExists: false,
                passwordCorrect: false
            }
        })

export {    getPolicy, 
            getAgent, 
            getEmployee,
            getAgentLogin,
            getEmployeeLogin,
            getMonthlyPremiumPerThousand
        }























