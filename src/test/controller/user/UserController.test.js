const UserController = require('../../../main/controllers/user/UserController');

describe("UserController", () => {

    let req;
    let res;

    beforeEach(() => {
        jest.resetAllMocks();
        req = {
            body: {
                email: "email",
                password: "password",
            }
        };

        res = {
            send: jest.fn(),
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        }
    })

    it("Should login in service success.", async () => {
        const mockAccessToken = 'mocked_access_token';
        const userService = {
            login: jest.fn().mockReturnValue(mockAccessToken)
        };

        const userController = new UserController(userService);
        await userController.login(req, res);

        expect(res.json).toHaveBeenCalledWith({ access_token: mockAccessToken });
    });

    it("Should deny login if service fails.", async () => {
        const userService = {
            login: jest.fn().mockImplementation(() => {throw new Error("Invalid password.")})
        };

        const userController = new UserController(userService);
        await userController.login(req, res);
        await expect(res.status).toBeCalledWith(403);
        await expect(res.send).toBeCalled();
    });

    it("Should register in service success.", async () => {
        const userService = {
            register: jest.fn().mockReturnValue({ id: 1, email: 'email@email.com', password: '12345' })
        };

        const userController = new UserController(userService);
        await userController.register(req, res);

        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.send).toBeCalled();
    });

    it("Should deny register in service fail.", async () => {
        const userService = {
            register: jest.fn().mockImplementation(() => {throw new Error("User already registered.")})
        };

        const userController = new UserController(userService);
        await userController.register(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toBeCalled();
    });
})