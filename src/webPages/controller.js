
const home = async (request, response) => {
    response.render('index',{
        layout:'home',
        bold: {home: true}
    });
};

const history = async (request, response) => {
    response.render('history',{
        layout:'home',
        bold: {history: true}
    });
};

  
module.exports = { home, history };