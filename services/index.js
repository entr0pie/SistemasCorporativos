
const AuthMiddlewareFactory = require('./security/jwt/AuthMiddlewareFactory');
const JwtTokenProvider = require('./security/jwt/JwtService');
const env = require('../env');

const tokenProvider = new JwtTokenProvider(env.JWT_SECRET);
const authMiddleware = AuthMiddlewareFactory(tokenProvider);

const services = {
    tokenProvider: tokenProvider,
    authMiddleware: authMiddleware
}