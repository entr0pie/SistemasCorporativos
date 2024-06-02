const BcryptService = require("./BcryptService");
const env = require("../../../env");

module.exports = new BcryptService(env.BCRYPT_SALT_ROUNDS);