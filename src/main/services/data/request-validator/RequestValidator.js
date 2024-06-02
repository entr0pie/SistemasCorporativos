const { validationResult, ValidationChain } = require("express-validator");

/**
 * Validate the content of the request before reaching the controller.
 *
 * @param {ValidationChain} chain validators to apply in request.
 * @return express middleware.
 * @constructor
 *
 * @author Thundera
 *
 * @link https://express-validator.github.io/docs/
 */
function RequestValidator(...chain) {
    return async (req, res, next) => {
        await Promise.all(chain.map(validator => validator.run(req)));

        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }

        next();
    }
}

module.exports = RequestValidator;