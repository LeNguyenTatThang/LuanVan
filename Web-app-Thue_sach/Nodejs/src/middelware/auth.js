
const isLogin = async (req, res, next) => {
    try {
        if (req.session.adminData1) {
            res.locals.adminData = req.session.adminData1;

        } else {

            res.redirect('/');
        }
        next();
    } catch (error) {
        console.log(error)

    }
}




const isLogout = async (req, res, next) => {
    try {
        if (req.session.adminData1) {
            req.session.destroy(err => {
                if (err) {
                    res.redirect('/home');
                }
                res.clearCookie();
                res.redirect('/');
            });

        }
        next();
    } catch (error) {
        console.log(error)

    }
}
module.exports = {
    isLogin, isLogout
}