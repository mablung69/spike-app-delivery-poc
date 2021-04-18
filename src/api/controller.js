const bent = require('bent');
const model = require('./model');

degreeToRadians = (degree) => {
  return (degree * Math.PI) / 180.0;
};

haversineFormula = (lat1, lon1, lat2, lon2) => {
  //Calculate Haversine formula (https://en.wikipedia.org/wiki/Haversine_formula)
  var hav = Math.sin((lat2 - lat1)/2)**2 + Math.cos(lat1)*Math.cos(lat1)*Math.sin((lon2 - lon1)/2)**2;
  //Distance in km
  var distance =  2*6373.0*Math.asin(Math.sqrt(hav))
  return distance;
};

const historicalData = async (request, response) => {
    result = await model.getHistoricalData();
    if (result==="error"){
      return response.status(200).json({
        msg: 'error',
        data: [],
      });
    }
    return response.status(200).json({
        msg: 'server ok',
        data: result
    });
};

const originDestinationDistanceService = async (request, response) => {

    const header = {
      "authority": "nominatim.openstreetmap.org", 
      "user-agent": "Chrome/88.0.4324.146",
      "accept": "application/json"
    };    
    const getJSON = bent('https://nominatim.openstreetmap.org/search?format=geojson','GET')
    var search_ok = {
      origin: false,
      destination: false
    };
    var distance = 0;
    var olat = 0;
    var olon = 0;
    var dlat = 0;
    var dlon = 0;
    var res_status = "OK";
    const data = request.body;

    try {
      let origin = await getJSON('&q='+data["origin"], {}, header)
      if (origin.status==200){        
        rjson = await origin.json();
        if (rjson["features"].length>0){
          olon = rjson["features"][0]["geometry"]["coordinates"][0];
          olat = rjson["features"][0]["geometry"]["coordinates"][1];
          search_ok["origin"] = true;
        }
      }
      let destination = await getJSON('&q='+data["destination"], {}, header)
      if (destination.status==200){
        rjson = await destination.json();
        console.log(rjson);
        if (rjson["features"].length>0){
          dlon = rjson["features"][0]["geometry"]["coordinates"][0];
          dlat = rjson["features"][0]["geometry"]["coordinates"][1];
          search_ok["destination"] = true;
        }
      }

      var query = {
        "origin_query": data["origin"],
        "destination_query": data["destination"],
        "distance": distance,
        "origin_latitude": olat,
        "origin_longitude": olon,
        "destination_latitude": dlat,
        "destination_longitude": dlon,
        "error": false
      }
      if (search_ok["origin"] && search_ok["destination"]) {
        //To radians      
        var lat1 = degreeToRadians(olat);
        var lon1 = degreeToRadians(olon);
        var lat2 = degreeToRadians(dlat);
        var lon2 = degreeToRadians(dlon);
        distance =  haversineFormula(lat1, lon1, lat2, lon2);  
        query["distance"] = distance;
        status = await model.saveDistanceQuery(query);
        if (status == "error"){
          res_status = "DON'T SAVED";
        }
      } else {
        query["error"] = true;
        status = await model.saveDistanceQuery(query);
        if (status == "error"){
          res_status = "DON'T SAVED";
        }
      }
      
    } catch (error) {
      console.log(error)
      console.log(error.text())
      return response.status(500).json({
        status: 'ERROR',
        distance: distance,
        search_ok: search_ok
      });
    }
    
    return response.status(200).json({
        status: res_status,
        distance: distance,
        search_ok: search_ok
    });
};  
  
module.exports = { historicalData, originDestinationDistanceService };