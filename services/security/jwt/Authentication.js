class Authentication {

    constructor(subject) {
        this._subject = subject;
    }

    getSubject() {
        return this._subject;
    }

}

module.exports = Authentication;