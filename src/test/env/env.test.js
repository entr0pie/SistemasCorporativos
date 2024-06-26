describe("Environment Variables Parsing.", () => {

    beforeEach(() => {
        jest.resetModules();
        process.env = {
            DATABASE_HOST: "127.0.0.1",
            DATABASE_NAME: "login_example",
            DATABASE_PASSWORD: "password",
            JWT_SECRET: "secret",
            BCRYPT_SALT_ROUNDS: 10
        };
    });

    test("Should return environment.", () => {
        const env = require('../../main/env');
        expect(env.DATABASE_HOST).toBe(process.env.DATABASE_HOST);
        expect(env.DATABASE_NAME).toBe(process.env.DATABASE_NAME);
        expect(env.DATABASE_PASSWORD).toBe(process.env.DATABASE_PASSWORD);
        expect(env.JWT_SECRET).toBe(process.env.JWT_SECRET);
        expect(env.BCRYPT_SALT_ROUNDS).toBe(process.env.BCRYPT_SALT_ROUNDS);
    });

    test("Should throw if database host is missing.", () => {
        process.env.DATABASE_HOST = undefined
        expect(() => require('../../main/env')).toThrow();

        process.env.DATABASE_HOST = "";
        expect(() => require('../../main/env')).toThrow();
    });

    test("Should throw if database name is missing.", () => {
        process.env.DATABASE_NAME = undefined;
        expect(() => require('../../main/env')).toThrow();

        process.env.DATABASE_NAME = "";
        expect(() => require('../../main/env')).toThrow();
    });

    test("Should throw if database password-manager is missing.", () => {
        process.env.DATABASE_PASSWORD = undefined;
        expect(() => require('../../main/env')).toThrow();

        process.env.DATABASE_PASSWORD = "";
        expect(() => require('../../main/env')).toThrow();
    });

    test("Should throw if jwt secret is missing.", () => {
        process.env.JWT_SECRET = undefined;
        expect(() => require('../../main/env')).toThrow();

        process.env.JWT_SECRET = "";
        expect(() => require('../../main/env')).toThrow();
    });

    test("Should throw if bcrypt salt rounds in missing or not a number", () => {
        process.env.BCRYPT_SALT_ROUNDS = null;
        expect(() => require('../../main/env')).toThrow();

        process.env.BCRYPT_SALT_ROUNDS = "Text";
        expect(() => require('../../main/env')).toThrow();
    })
});