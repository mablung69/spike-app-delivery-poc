const connection = require('../connection/pool')();

let columnsNames = ["origin_query", "destination_query", "distance", 
    "origin_latitude", "origin_longitude", "destination_latitude", "destination_longitude",
    "error"];

const getHistoricalData = async () => {
    try {
        let pool = connection.getPool();
        var selectQuery = "SELECT * FROM distance_query";
        const res = await pool.query(selectQuery);
        return res.rows;
    } catch (error) {        
        console.log(error)
        console.log(error.text())
        return "error";
    }
};

const saveDistanceQuery = async (query) => {
    var query_list = [];
    //Iterate to sort array with insert values (objects json is unordered)
    for (var i = 0; i < columnsNames.length; i++)
    {
        query_list.push(query[columnsNames[i]]);
    }

    try {
        let pool = connection.getPool();
        var insertQuery = `
            INSERT into distance_query 
            (origin_query, destination_query, distance, 
                origin_latitude, origin_longitude, destination_latitude, destination_longitude,
                error) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)`;
        //Allow automatically sanitize data
        const res = await pool.query(insertQuery, query_list);
        if (res.rowCount==1){
            return "ok";
        } else {
            return "error";
        }
    } catch (error) {        
        console.log(error)
        console.log(error.text())
        return "error";
    }
    
};

module.exports = { getHistoricalData, saveDistanceQuery };