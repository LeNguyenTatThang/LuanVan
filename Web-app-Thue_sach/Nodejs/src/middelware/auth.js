import admin from '../models/admin.model'
const isLogin = async (req, res, next) => {
    try {
        if (req.session.adminData1) {
            res.locals.adminData = await admin.detailAcount(req.session.adminData1.email)
            next();
        } else {
            res.redirect('/');
        }
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
                return res.redirect('/');
            });
        }
    } catch (error) {
        console.log(error)

    }
}
module.exports = {
    isLogin, isLogout
}