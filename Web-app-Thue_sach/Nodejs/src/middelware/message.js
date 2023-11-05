const ismessage = async (req, res, next) => {
    try {
        if (req.locals.message) {
            res.locals.message = res.locals.message;

            console.log('ddđ' + res.locals.message)
        }
        next();
    } catch (error) {
        console.log(error)

    }
}
module.exports = {
    ismessage
}