
const AuthMiddlewareFactory = require('./security/AuthMiddlewareFactory');
const JwtTokenProvider = require('./security/JwtService');
const env = require('../env');

const tokenProvider = new JwtTokenProvider(env.JWT_SECRET);
const authMiddleware = AuthMiddlewareFactory(tokenProvider);

const services = {
    tokenProvider: tokenProvider,
    authMiddleware: authMiddleware
}