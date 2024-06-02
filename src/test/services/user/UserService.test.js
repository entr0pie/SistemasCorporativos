const UserService = require('../../../main/services/user/UserService');
const BcryptService = require('../../../main/services/security/password-manager/bcrypt/BcryptService');
const JwtService = require('../../../main/services/security/auth/token-provider/jwt/JwtService');

describe("UserService", () => {

    describe("login", () => {
        it("Should login user with valid credentials.", async () => {
            const userModel = {
                findOne: jest.fn().mockResolvedValue({ id: 1, email: 'email@email.com', password: '12345' }),
            };

            const bcryptService = new BcryptService(10);
            jest.spyOn(bcryptService, 'verify').mockResolvedValue(true);

            const jwtService = new JwtService('secret');
            jest.spyOn(jwtService, 'create').mockResolvedValue("mocked-token");

            const userService = new UserService(userModel, bcryptService, jwtService);

            await expect(userService.login('email@email.com', '12345')).resolves.not.toThrow();
            await expect(userService.login('email@email.com', '12345')).resolves.toBe("mocked-token");
        });


        it("Should deny non-existent user.", async () => {
            const userModel = {
                findOne: jest.fn().mockResolvedValue(null),
            };

            const userService = new UserService(userModel, null, null);
            await expect(userService.login('email@email.com', '12345')).rejects.toThrow('User not found.');
        });

        it("Should deny user with bad credentials.", async () => {
            const userModel = {
                findOne: jest.fn().mockResolvedValue({ id: 1, email: 'email@email.com', password: '12345' }),
            };

            const bcryptService = new BcryptService(10);
            jest.spyOn(bcryptService, 'verify').mockResolvedValue(false);

            const userService = new UserService(userModel, bcryptService, null);
            await expect(userService.login('email@email.com', '12345')).rejects.toThrow('Invalid password-manager.');
        });
    });

    describe("register", () => {
       it("Should register an unregistered user.", async () => {
           const bcryptService = new BcryptService(10);
           jest.spyOn(bcryptService, 'encrypt').mockResolvedValue('hashed_password');

           const userModel = {
               findOne: jest.fn().mockResolvedValue(null),
               create: jest.fn().mockReturnValue({ id: 1, email: 'email@email.com', password: 'hashed_password' })
           };

           const userService = new UserService(userModel, bcryptService, null);
           const userCreated = await userService.register('email@email.com', 'password');

           expect(userCreated.id).toBe(1);
           expect(userCreated.email).toBe("email@email.com");
           expect(userCreated.password).toBe("hashed_password");
       });

       it("Should not register a already registered user.", async () => {
           const userModel = {
               findOne: jest.fn().mockResolvedValue({ id: 1, email: 'email@email.com', password: 'hashed_password' }),
           };

           const userService = new UserService(userModel, null, null);
           await expect(userService.register('email@email.com', 'password')).rejects.toThrow('User already registered.');
       });
    });
});