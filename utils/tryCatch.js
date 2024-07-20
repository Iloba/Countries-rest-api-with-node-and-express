const tryCatch = function (controller) {
    return async function (req, res, next) {
        try {
            await controller(req, res);
        } catch (error) {
            return next(error);
        }
    }
}



module.exports = tryCatch;