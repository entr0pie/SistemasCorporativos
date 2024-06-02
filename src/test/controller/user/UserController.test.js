const UserController = require('../../../main/controllers/user/UserController');
const {PaginatedResource} = require("../../../main/services/data/paginated");

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
            login: jest.fn().mockImplementation(() => {throw new Error("Invalid password-manager.")})
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

    it("Should find all in service success.", async () => {
       const mockedData = new PaginatedResource(0, 2, false, false, []);
       const userService = {
           findAll: jest.fn().mockResolvedValue(mockedData)
       };

       const userController = new UserController(userService);

       req.query = {
           page: 0,
           size: 2
       };

       await userController.findAll(req, res);
       expect(res.json).toBeCalledWith(mockedData);
    });

    it("Should deny find all in service fail.", async () => {
        const mockedData = new PaginatedResource(0, 2, false, false, []);
        const userService = {
            findAll: jest.fn().mockImplementation(async () => {throw new Error("Could not find users.")}),
        };

        const userController = new UserController(userService);

        req.query = {
            page: 0,
            size: 2
        };

        await userController.findAll(req, res);
        expect(res.status).toBeCalledWith(500);
        expect(res.send).toBeCalled();
    });
})