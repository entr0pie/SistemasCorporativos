const CostCenterController = require("../../../main/controllers/cost-center/CostCenterController");

describe("CostCenterController", () => {
    it("Should return a cost center by id", async () => {
        const service = {
            findById: jest.fn().mockResolvedValue({id: 1, name: "Cost Center", code: "CC1"}),
        };

        const controller = new CostCenterController(service);

        const req = {params: {id: 1}};
        const res = {json: jest.fn(), status: jest.fn()};

        await controller.findById(req, res);

        expect(service.findById).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({id: 1, name: "Cost Center", code: "CC1"});
    });

    it("Should return a 404 status when cost center is not found", async () => {
        const service = {
            findById: jest.fn().mockResolvedValue(null),
        };

        const controller = new CostCenterController(service);

        const req = {params: {id: 1}};

        const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

        await controller.findById(req, res);

        expect(service.findById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({message: 'Cost center not found'});
    });

    it("Should return 500 when find by id fails.", async () => {
        const service = {
            findById: jest.fn().mockRejectedValue(new Error('Internal error')),
        };

        const controller = new CostCenterController(service);

        const req = {params: {id: 1}};
        const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

        await controller.findById(req, res);

        expect(service.findById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: 'Internal error'});
    });

    it("Should find all.", async () => {
        const service = {
            findAll: jest.fn().mockResolvedValue({content: [{id: 1, name: "Cost Center", code: "CC1"}]}),
        };

        const controller = new CostCenterController(service);

        const req = {query: {page: 0, size: 10}};
        const res = {json: jest.fn()};

        await controller.findAll(req, res);

        expect(service.findAll).toHaveBeenCalledWith(0, 10);
        expect(res.json).toHaveBeenCalledWith({content: [{id: 1, name: "Cost Center", code: "CC1"}]});
    });

    it("Should return 500 when find all fails.", async () => {
        const service = {
            findAll: jest.fn().mockRejectedValue(new Error('Internal error')),
        };

        const controller = new CostCenterController(service);

        const req = {query: {page: 0, size: 10}};
        const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

        await controller.findAll(req, res);

        expect(service.findAll).toHaveBeenCalledWith(0, 10);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: 'Internal error'});
    });

    it("Should create a cost center.", async () => {
        const service = {
            create: jest.fn().mockResolvedValue({id: 1, name: "Cost Center", code: "CC1"}),
        };

        const controller = new CostCenterController(service);

        const req = {body: {name: "Cost Center", code: "CC1"}};
        const res = {json: jest.fn()};

        await controller.create(req, res);

        expect(service.create).toHaveBeenCalledWith("Cost Center", "CC1");
        expect(res.json).toHaveBeenCalledWith({id: 1, name: "Cost Center", code: "CC1"});
    });

    it("Should return 500 when create fails.", async () => {
        const service = {
            create: jest.fn().mockRejectedValue(new Error('Internal error')),
        };

        const controller = new CostCenterController(service);

        const req = {body: {name: "Cost Center", code: "CC1"}};
        const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

        await controller.create(req, res);

        expect(service.create).toHaveBeenCalledWith("Cost Center", "CC1");
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: 'Internal error'});
    });

    it("Should update a cost center.", async () => {
        const service = {
            update: jest.fn().mockResolvedValue({id: 1, name: "Cost Center", code: "CC1"}),
        };

        const controller = new CostCenterController(service);

        const req = {params: {id: 1}, body: {name: "Cost Center", code: "CC1"}};
        const res = {json: jest.fn()};

        await controller.update(req, res);

        expect(service.update).toHaveBeenCalledWith(1, "Cost Center", "CC1");
        expect(res.json).toHaveBeenCalledWith({id: 1, name: "Cost Center", code: "CC1"});
    });

    it("Should return 500 when update fails.", async () => {
        const service = {
            update: jest.fn().mockRejectedValue(new Error('Internal error')),
        };

        const controller = new CostCenterController(service);

        const req = {params: {id: 1}, body: {name: "Cost Center", code: "CC1"}};
        const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

        await controller.update(req, res);

        expect(service.update).toHaveBeenCalledWith(1, "Cost Center", "CC1");
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: 'Internal error'});
    });

    it("Should delete a cost center.", async () => {
        const service = {
            delete: jest.fn().mockResolvedValue(),
        };

        const controller = new CostCenterController(service);

        const req = {params: {id: 1}};
        const res = {json: jest.fn()};

        await controller.delete(req, res);

        expect(service.delete).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({message: 'Cost center deleted'});
    });

    it("Should return 500 when delete fails.", async () => {
        const service = {
            delete: jest.fn().mockRejectedValue(new Error('Internal error')),
        };

        const controller = new CostCenterController(service);

        const req = {params: {id: 1}};
        const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

        await controller.delete(req, res);

        expect(service.delete).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: 'Internal error'});
    });
});