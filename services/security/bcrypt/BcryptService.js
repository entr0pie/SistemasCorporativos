
const { hash, compare } = require('bcrypt');

/**
 * Hash and verify passwords.
 *
 * @author Thundera
 */
class BcryptService {

    /**
     * Builds a BcryptService instance.
     *
     * @param {number} saltRounds hash salt rounds.
     */
    constructor(saltRounds) {
        this._saltRounds = saltRounds;
    }

    /**
     * Hashes a password.
     *
     * @param {string} password clear text password.
     * @returns {Promise<string>} hashed password.
     */
    async hash(password) {
        return await hash(password, this._saltRounds);
    }

    /**
     * Verify if a password matches a hash.
     *
     * @param {string} password clear text password.
     * @param {string} encryptedPassword hashed password.
     * @returns {Promise<boolean>} match status.
     */
    async validate(password, encryptedPassword) {
        return await compare(password, encryptedPassword);
    }
}

module.exports = BcryptService;