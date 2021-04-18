
const home = async (request, response) => {
    response.render('index',{
        layout:'home'
    });
};

const history = async (request, response) => {
    response.render('history',{
        layout:'home'
    });
};

  
module.exports = { home, history };