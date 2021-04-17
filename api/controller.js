
const historicalData = async (request, response) => {
    return response.status(200).json({
        msg: 'server ok',
        data: {
          data: "vacio"
        },
    });
};

const originDestinationDistanceService = async (request, response) => {
    return response.status(200).json({
        msg: 'server ok',
        data: {
          data: "vacio"
        },
    });
};  
  
module.exports = { historicalData, originDestinationDistanceService };