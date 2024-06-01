
function AuthMiddlewareFactory(tokenProvider) {
    return async (req, res, next) => {

        if (req.headers["authorization"] == null) {
            return res.status(403).send();
        }

        const token = req.headers["authorization"].split(' ')[1];

        if (!token) {
            return res.status(403).send();
        }

        try {
            req.auth = await tokenProvider.validate(token);
            return next();
        } catch (e) {
            return res.status(403).send();
        }
    };
}

module.exports = AuthMiddlewareFactory;
