const { Pool } = require('pg')

const connectionString = 'postgresql://user:qwerty@172.24.0.2:5432/spike-app-delivery-db'
let pool = new Pool({
  connectionString,
})

console.log(pool)

module.exports = () => {
    return {  
        getPool: () => { return pool;},
    }
};
