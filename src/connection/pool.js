const { Pool } = require('pg')

const connectionString = process.env.DATABASE_URL;//'postgresql://user:qwerty@webapp-db:5432/spike-app-delivery-db'
let pool = new Pool({
  connectionString,
})

module.exports = () => {
    return {  
        getPool: () => { return pool;},
    }
};
