
let getHomePage = (req, res) => {
    return res.render('home/homePage.ejs');

}

let getProduct = (req, res) => {
    return res.render('product/listProduct.ejs');
}



module.exports = {
    getHomePage, getProduct
}