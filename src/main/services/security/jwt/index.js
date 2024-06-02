const JwtTokenProvider = require("./JwtService");
const env = require("../../../env");

module.exports = new JwtTokenProvider(env.JWT_SECRET);