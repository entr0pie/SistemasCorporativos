const BcryptService = require('../../../../../main/services/security/password-manager/bcrypt/BcryptService');

describe("BcryptService", () => {
    test("Should hash and verify passwords.", async () => {
        const bcryptService = new BcryptService(10);
        const password = "super-secret-password-manager";

        const hash = await bcryptService.encrypt(password);

        expect(hash).not.toBeUndefined();
        expect(hash).not.toBeNull();
        expect((await bcryptService.verify(password, hash))).toBeTruthy();
    });
})