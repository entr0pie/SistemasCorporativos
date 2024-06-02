/**
 * Represents a user authentication.
 *
 * @author Thundera.
 */
class Authentication {

    /**
     * Build up a Authentication for a subject.
     *
     * @param {string} subject
     */
    constructor(subject) {
        this._subject = subject;
    }

    /**
     * Get the authentication subject.
     *
     * @returns {string} subject
     */
    getSubject() {
        return this._subject;
    }

}

module.exports = Authentication;