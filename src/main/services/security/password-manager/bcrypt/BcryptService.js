
const { hash, compare } = require('bcrypt');
const PasswordManager = require("../PasswordManager");

/**
 * Hash and verify passwords.
 *
 * @author Caio Porcel
 */
class BcryptService extends PasswordManager {

    /**
     * Builds a BcryptService instance.
     *
     * @param {number} saltRounds hash salt rounds.
     */
    constructor(saltRounds) {
        super();
        this._saltRounds = saltRounds;
    }

    async encrypt(password) {
        return await hash(password, this._saltRounds);
    }

    async verify(password, encryptedPassword) {
        return await compare(password, encryptedPassword);
    }
}

module.exports = BcryptService;