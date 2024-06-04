/**
 * Base class for creating and validating tokens.
 *
 * @author Caio Porcel.
 */
class TokenProvider {

    /**
     * Creates a new token for a subject.
     *
     * @param {string} subject
     * @returns {Promise<string>} token.
     */
    async create(subject) {
        throw new Error("Not implemented.");
    }
    /**
     * Validates a token.
     *
     * @param {string} token
     * @returns {Promise<Authentication>} user authentication.
     */
    async validate(token) {
        throw new Error("Not implemented.");
    }
}

module.exports = TokenProvider;