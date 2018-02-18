import Sequelize from 'sequelize'

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
        policynumber:   { type: Sequelize.INTEGER, primaryKey: true },
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
        eeID:       { type: Sequelize.INTEGER, primaryKey: true },
        password:   { type: Sequelize.STRING },
        name:       { type: Sequelize.STRING }
    },
    {
        tableName: 'employees',
        timestamps: false
    }
)

const getPolicy = pn => Policy.findById(pn).then(p => p)
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

export {    getPolicy, 
            getAgent, 
            getEmployee,
            getAgentLogin
        }























