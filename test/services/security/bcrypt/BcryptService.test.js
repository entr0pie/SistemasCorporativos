const BcryptService = require('../../../../services/security/bcrypt/BcryptService');

describe("BcryptService", () => {
    test("Should hash and verify passwords.", async () => {
        const bcryptService = new BcryptService(10);
        const password = "super-secret-password";

        const hash = await bcryptService.hash(password);

        expect(hash).not.toBeUndefined();
        expect(hash).not.toBeNull();
        expect((await bcryptService.validate(password, hash))).toBeTruthy();
    });
})