const DepositController = require("../../../main/controllers/deposit/DepositController");

describe("DepositController", () => {
    it("Should create a deposit in service success.", async () => {
        const depositService = {
            create: jest.fn().mockImplementation(async (name, isActive) => {
                return {id: 1, name: name, isActive: isActive};
            }),
        };

        const depositController = new DepositController(depositService);

        const req = {
            body: {
                name: "Test",
                isActive: true,
            },
        };

        const res = {
            json: jest.fn().mockReturnThis(),
        };

        await depositController.create(req, res);
        expect(res.json).toBeCalledWith({id: 1, name: "Test", isActive: true});
    });

    it("Should not create a deposit in service fail.", async () => {
        const depositService = {
            create: jest.fn().mockImplementation(async (name, isActive) => {
                throw new Error("Error");
            }),
        };

        const depositController = new DepositController(depositService);

        const req = {
            body: {
                name: "Test",
                isActive: true,
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };

        await depositController.create(req, res);
        expect(res.status).toBeCalledWith(500);
        expect(res.send).toBeCalledWith(new Error("Error"));
    });

    it("Should update in service success.", async () => {
        const depositService = {
            update: jest.fn().mockImplementation(async (id, name, isActive) => {
                return {id: id, name: name, isActive: isActive};
            }),
        };

        const depositController = new DepositController(depositService);

        const req = {
            params: {
                id: 1,
            },
            body: {
                name: "Test",
                isActive: true,
            },
        };

        const res = {
            json: jest.fn().mockReturnThis(),
        };

        await depositController.update(req, res);
        expect(res.json).toBeCalledWith({id: 1, name: "Test", isActive: true});
    });

    it("Should not update in service fail.", async () => {
        const depositService = {
            update: jest.fn().mockImplementation(async (id, name, isActive) => {
                throw new Error("Error");
            }),
        };

        const depositController = new DepositController(depositService);

        const req = {
            params: {
                id: 1,
            },
            body: {
                name: "Test",
                isActive: true,
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };

        await depositController.update(req, res);
        expect(res.status).toBeCalledWith(500);
        expect(res.send).toBeCalledWith(new Error("Error"));
    });

    it("Should find all in service success.", async () => {
        const depositService = {
            findAll: jest.fn().mockImplementation(async (page, size) => {
                return [{id: 1, name: "Test", isActive: true}];
            }),
        };

        const depositController = new DepositController(depositService);

        const req = {
            query: {
                page: 1,
                size: 10,
            },
        };

        const res = {
            json: jest.fn().mockReturnThis(),
        };

        await depositController.findAll(req, res);
        expect(res.json).toBeCalledWith([{id: 1, name: "Test", isActive: true}]);
    });

    it("Should not find all in service fail.", async () => {
        const depositService = {
            findAll: jest.fn().mockImplementation(async (page, size) => {
                throw new Error("Error");
            }),
        };

        const depositController = new DepositController(depositService);

        const req = {
            query: {
                page: 1,
                size: 10,
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };

        await depositController.findAll(req, res);
        expect(res.status).toBeCalledWith(500);
        expect(res.send).toBeCalledWith(new Error("Error"));
    });

    it("Should find by id in service success.", async () => {
        const depositService = {
            findById: jest.fn().mockImplementation(async (id) => {
                return {id: id, name: "Test", isActive: true};
            }),
        };

        const depositController = new DepositController(depositService);

        const req = {
            params: {
                id: 1,
            },
        };

        const res = {
            json: jest.fn().mockReturnThis(),
        };

        await depositController.findById(req, res);
        expect(res.json).toBeCalledWith({id: 1, name: "Test", isActive: true});
    });

    it("Should not find by id in service fail.", async () => {
        const depositService = {
            findById: jest.fn().mockImplementation(async (id) => {
                throw new Error("Error");
            }),
        };

        const depositController = new DepositController(depositService);

        const req = {
            params: {
                id: 1,
            },
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnThis(),
        };

        await depositController.findById(req, res);
        expect(res.status).toBeCalledWith(404);
        expect(res.send).toBeCalledWith();
    });
});