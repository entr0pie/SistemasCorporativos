const env = require('../env');
const JwtTokenProvider = require('./security/jwt/JwtService');
const AuthMiddlewareFactory = require('./security/jwt/AuthMiddlewareFactory');
const BcryptService = require('./security/bcrypt/BcryptService');
const UserService = require('./user/UserService');
const db = require('../models');

const tokenProvider = new JwtTokenProvider(env.JWT_SECRET);
const authMiddleware = AuthMiddlewareFactory(tokenProvider);
const bcryptService = new BcryptService(env.BCRYPT_SALT_ROUNDS);
const userService = new UserService(db.User, bcryptService, tokenProvider);

const services = {
    tokenProvider: tokenProvider,
    authMiddleware: authMiddleware,
    userService,
}