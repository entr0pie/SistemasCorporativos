
/**
 * Creates a Middleware for Authentication using Bearer tokens.
 * @param tokenProvider class for providing tokens.
 * @returns {(function(Request, Response, NextFunction): Promise<any>)} express middleware.
 *
 * @see {JwtService}
 *
 * @author Thundera
 */
function BearerTokenMiddlewareFactory(tokenProvider) {
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

module.exports = BearerTokenMiddlewareFactory;
