const { Pool } = require('pg')

const connectionString = process.env.DATABASE_URL;
let pool = new Pool({
    connectionString: connectionString
})

module.exports = () => {
    return {  
        getPool: () => { return pool;},
    }
};
