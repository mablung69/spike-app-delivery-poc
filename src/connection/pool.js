const { Pool } = require('pg')

const connectionString = process.env.DATABASE_URL;//'postgresql://user:qwerty@webapp-db:5432/spike-app-delivery-db'
console.log("connectionString " + connectionString);
let pool = new Pool({
  connectionString,
})
console.log(pool);

module.exports = () => {
    return {  
        getPool: () => { return pool;},
    }
};
