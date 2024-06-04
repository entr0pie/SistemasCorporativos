/**
 * Encrypt and verify passwords.
 *
 * @author Caio Porcel
 */
class PasswordManager {

    /**
     * Encrypt a password.
     *
     * @param {string} password
     * @return {Promise<string>} encrypted password.
     */
    async encrypt(password) {
        throw new Error();
    }

    /**
     * Verify if a password is equal to the encrypted version.
     *
     * @param {string} password
     * @param {string} encryptedPassword
     * @return {Promise<boolean>} if password matches or not.
     */
    async verify(password, encryptedPassword) {
        throw new Error();
    }
}

module.exports = PasswordManager;