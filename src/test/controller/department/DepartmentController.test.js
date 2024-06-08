const DepartmentController = require("../../../main/controllers/department/DepartmentController");
describe("DepartmentController", () => {
    it("Should return department by id", async () => {
        const service = {
            findById: jest.fn().mockResolvedValue({id: 1, name: "Department 1"}),
        };

        const controller = new DepartmentController(service);

        const req = {params: {id: 1}};
        const res = {
            json: jest.fn(),
        };

        await controller.findById(req, res);

        expect(service.findById).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({id: 1, name: "Department 1"});
    });

    it("Should return 404 when department not found", async () => {
        const service = {
            findById: jest.fn().mockResolvedValue(null),
        };

        const controller = new DepartmentController(service);

        const req = {params: {id: 1}};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await controller.findById(req, res);

        expect(service.findById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({message: 'Department not found'});
    });

    it('Should return error if service fails.', async () => {
        const service = {
            findById: jest.fn().mockImplementation(async (_id) => {
                throw new Error("Error");
            }),
        };

        const controller = new DepartmentController(service);

        const req = {params: {id: 1}};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await controller.findById(req, res);

        expect(service.findById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: 'Error'});
    });

    it("Should find all in service success. ", async () => {
        const service = {
            findAll: jest.fn().mockResolvedValue([{id: 1, name: "Department 1"}]),
        };

        const controller = new DepartmentController(service);

        const req = {query: {page: 1, size: 10}};
        const res = {
            json: jest.fn(),
        };

        await controller.findAll(req, res);

        expect(service.findAll).toHaveBeenCalledWith(1, 10);
        expect(res.json).toHaveBeenCalledWith([{id: 1, name: "Department 1"}]);
    });

    it("Should fail to find all if service fails. ", async () => {
        const service = {
            findAll: jest.fn().mockImplementation(async (_page, _size) => {
                throw new Error("Error");
            }),
        };

        const controller = new DepartmentController(service);

        const req = {query: {page: 1, size: 10}};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await controller.findAll(req, res);

        expect(service.findAll).toHaveBeenCalledWith(1, 10);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: 'Error'});
    });

    it("Should create a department", async () => {
        const service = {
            create: jest.fn().mockResolvedValue({id: 1, name: "Department 1"}),
        };

        const controller = new DepartmentController(service);

        const req = {body: {name: "Department 1"}};
        const res = {
            json: jest.fn(),
        };

        await controller.create(req, res);
        expect(service.create).toHaveBeenCalledWith("Department 1");
        expect(res.json).toHaveBeenCalledWith({id: 1, name: "Department 1"});
    });

    it("Should fail to create a department", async () => {
        const service = {
            create: jest.fn().mockImplementation(async (_name) => {
                throw new Error("Error");
            }),
        };

        const controller = new DepartmentController(service);

        const req = {body: {name: "Department 1"}};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await controller.create(req, res);
        expect(service.create).toHaveBeenCalledWith("Department 1");
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: 'Error'});
    });

    it("Should update a department", async () => {
        const service = {
            update: jest.fn().mockResolvedValue({id: 1, name: "Department 1"}),
        };

        const controller = new DepartmentController(service);

        const req = {params: {id: 1}, body: {name: "Department 1"}};
        const res = {
            json: jest.fn(),
        };

        await controller.update(req, res);
        expect(service.update).toHaveBeenCalledWith(1, "Department 1");
        expect(res.json).toHaveBeenCalledWith({id: 1, name: "Department 1"});
    });

    it("Should fail to update a department", async () => {
        const service = {
            update: jest.fn().mockImplementation(async (_id, _name) => {
                throw new Error("Error");
            }),
        };

        const controller = new DepartmentController(service);

        const req = {params: {id: 1}, body: {name: "Department 1"}};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await controller.update(req, res);
        expect(service.update).toHaveBeenCalledWith(1, "Department 1");
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: 'Error'});
    });

    it("Should delete a department", async () => {
        const service = {
            delete: jest.fn().mockResolvedValue(),
        };

        const controller = new DepartmentController(service);

        const req = {params: {id: 1}};
        const res = {
            json: jest.fn(),
        };

        await controller.delete(req, res);
        expect(service.delete).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({message: 'Department deleted'});
    });

    it("Should fail to delete a department", async () => {
        const service = {
            delete: jest.fn().mockImplementation(async (_id) => {
                throw new Error("Error");
            }),
        };

        const controller = new DepartmentController(service);

        const req = {params: {id: 1}};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await controller.delete(req, res);
        expect(service.delete).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: 'Error'});
    });
});