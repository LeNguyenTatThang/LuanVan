
let getHomePage = (req, res) => {
    return res.render('home/homePage.ejs', {
        msgLogin: req.flash('msgLogin'),
    });

}




module.exports = {
    getHomePage
}