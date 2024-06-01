describe("Environment Variables Parsing.", () => {

    beforeEach(() => {
        jest.resetModules();
        delete process.env.DATABASE_NAME;
        delete process.env.DATABASE_USERNAME;
        delete process.env.DATABASE_PASSWORD;
        delete process.env.DATABASE_HOST;
        delete process.env.JWT_SECRET;
    });

    test("Should throw if database host is missing.", () => {
        process.env = {
            DATABASE_HOST: undefined,
            DATABASE_NAME: "login_example",
            DATABASE_PASSWORD: "password",
            JWT_SECRET: "secret"
        };

        expect(() => require('../../env')).toThrow();

        process.env.DATABASE_HOST = "";

        expect(() => require('../../env')).toThrow();
    });

    test("Should throw if database name is missing.", () => {
        process.env = {
            DATABASE_HOST: "127.0.0.1",
            DATABASE_NAME: undefined,
            DATABASE_PASSWORD: "password",
            JWT_SECRET: "secret"
        };

        expect(() => require('../../env')).toThrow();

        process.env.DATABASE_NAME = "";

        expect(() => require('../../env')).toThrow();
    });

    test("Should throw if database password is missing.", () => {
        process.env = {
            DATABASE_HOST: "127.0.0.1",
            DATABASE_NAME: "login_example",
            DATABASE_PASSWORD: undefined,
            JWT_SECRET: "secret"
        };

        expect(() => require('../../env')).toThrow();

        process.env.DATABASE_PASSWORD = "";

        expect(() => require('../../env')).toThrow();
    });

    test("Should throw if jwt secret is missing.", () => {
        process.env = {
            DATABASE_HOST: "127.0.0.1",
            DATABASE_NAME: "login_example",
            DATABASE_PASSWORD: "password",
            JWT_SECRET: undefined,
        };

        expect(() => require('../../env')).toThrow();

        process.env.JWT_SECRET = "";

        expect(() => require('../../env')).toThrow();
    });
});