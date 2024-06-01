const jwt = require("jsonwebtoken");
const Authentication = require("./Authentication");

/**
 * Sign and Validate JSON Web Tokens.
 *
 * @author Thundera
 */
class JwtService {

    /**
     * Creates a JWT Service, using a secret-based
     * signature.
     *
     * @param {string} secret
     */
    constructor(secret) {
        this._secret = secret;
    }

    /**
     * Creates a JWT for a subject.
     * @param {string} subject subject of the token.
     * @returns {Promise<string>} the encoded jwt.
     */
    async create(subject) {
        const payload = {
            sub: subject,
        };

        return jwt.sign(payload, this._secret);
    }

    /**
     * Validate if the token is signed and, therefore,
     * authentic.
     *
     * @param {string} token raw token for processing.
     * @returns {Promise<Authentication>} Authentication object, representing
     * the subject.
     */
    async validate(token) {
        const validateToken = jwt.verify(token, this._secret);
        return new Authentication(validateToken.sub);
    }

}

module.exports = JwtService;