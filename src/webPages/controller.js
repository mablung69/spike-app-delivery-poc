
const home = async (request, response) => {
    response.render('index',{
        layout:'home'
    });
};

  
module.exports = { home };