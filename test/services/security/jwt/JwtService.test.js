const JwtService = require('../../../../src/main/services/security/jwt/JwtService');
const {JsonWebTokenError} = require("jsonwebtoken");

describe("JwtService", () => {
    afterEach(() => jest.resetAllMocks());

    it("Should create and validate a JWT with same key.", async () => {
        const tokenProvider = new JwtService('secret');

        const subject = 'leonardo';
        const token = await tokenProvider.create(subject);
        const authentication = await tokenProvider.validate(token);

        expect(authentication.getSubject()).toBe(subject);
    });

    it("Should reject a JWT signed by another key.", async () => {
       const realTokenProvider = new JwtService('realTokenProvider');
       const forgedTokenProvider = new JwtService('forgedTokenProvider');

       const forgedToken = await forgedTokenProvider.create("hacker");
       await expect(realTokenProvider.validate(forgedToken)).rejects.toThrow(JsonWebTokenError);
    });
});