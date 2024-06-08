const UserService = require('../../../main/services/user/UserService');
const BcryptService = require('../../../main/services/security/password-manager/bcrypt/BcryptService');
const JwtService = require('../../../main/services/security/auth/token-provider/jwt/JwtService');
const {PaginatedResource} = require("../../../main/services/data/paginated");

describe("UserService", () => {
    it("Should login user with valid credentials.", async () => {
        const userModel = {
            findOne: jest.fn().mockResolvedValue({id: 1, email: 'email@email.com', password: '12345'}),
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
            findOne: jest.fn().mockResolvedValue({id: 1, email: 'email@email.com', password: '12345'}),
        };

        const bcryptService = new BcryptService(10);
        jest.spyOn(bcryptService, 'verify').mockResolvedValue(false);

        const userService = new UserService(userModel, bcryptService, null);
        await expect(userService.login('email@email.com', '12345')).rejects.toThrow('Invalid password.');
    });

    it("Should register an unregistered user.", async () => {
        const bcryptService = new BcryptService(10);
        jest.spyOn(bcryptService, 'encrypt').mockResolvedValue('hashed_password');

        const userModel = {
            findOne: jest.fn().mockResolvedValue(null),
            create: jest.fn().mockReturnValue({
                id: 1,
                email: 'email@email.com',
                password: 'hashed_password',
                departmentId: 1
            }),
        };

        const userService = new UserService(userModel, bcryptService, null);
        const userCreated = await userService.register('email@email.com', 'password', 1);

        expect(userCreated.id).toBe(1);
        expect(userCreated.email).toBe("email@email.com");
        expect(userCreated.password).toBe("hashed_password");
    });

    it("Should not register a already registered user.", async () => {
        const userModel = {
            findOne: jest.fn().mockResolvedValue({id: 1, email: 'email@email.com', password: 'hashed_password'}),
        };

        const userService = new UserService(userModel, null, null);
        await expect(userService.register('email@email.com', 'password', 1)).rejects.toThrow('User already registered.');
    });

    it("Should paginate users correctly and removing the password.", async () => {

        const mockedData = [
            {id: 1, email: 'email1', password: 'password1'},
            {id: 2, email: 'email2', password: 'password2'},
            {id: 3, email: 'email3', password: 'password3'},
            {id: 4, email: 'email4', password: 'password4'},
            {id: 5, email: 'email5', password: 'password5'},
        ];

        const searcher = {
            search: jest.fn().mockImplementation(async (page, size) => {
                return Promise.all(
                    mockedData
                        .slice(page * size, page * size + size)
                ).then(((item) => new PaginatedResource(page, size, true, page > 0, item)));
            }),
        };

        const userService = new UserService(null, null, null, searcher);
        await userService.findAll(0, 2).then((resource) => {
            const withoutPassword = mockedData.map((user) => ({
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
                updateAt: user.updatedAt
            }));

            expect(resource).toEqual({
                pageNumber: 0,
                pageSize: 2,
                hasNextPage: true,
                hasPreviousPage: false,
                items: withoutPassword.slice(0, 2)
            });
        });
    });
});