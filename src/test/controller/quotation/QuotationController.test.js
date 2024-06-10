const QuotationController = require("../../../main/controllers/quotations/QuotationController");

describe("QuotationController", () => {
    it("Should create a new quotation.", async () => {
        const req = {
            body: {
                productId: 1,
                supplierId: 1,
                price: 100.0,
                date: new Date(),
                costCenterId: 1,
                expirationDate: new Date(),
            },
        };

        const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

        const service = {
            create: jest.fn().mockResolvedValue(req.body),
        };

        const controller = new QuotationController(service);
        await controller.create(req, res);

        expect(service.create).toHaveBeenCalledWith(1, 1, 100.0, req.body.date, 1, req.body.expirationDate);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it("Should return 400 when create fails.", async () => {
        const req = {
            body: {
                productId: 1,
                supplierId: 1,
                price: 100.0,
                date: new Date(),
                costCenterId: 1,
                expirationDate: new Date(),
            },
        };

        const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

        const service = {
            create: jest.fn().mockRejectedValue(new Error('Internal error')),
        };

        const controller = new QuotationController(service);
        await controller.create(req, res);

        expect(service.create).toHaveBeenCalledWith(1, 1, 100.0, req.body.date, 1, req.body.expirationDate);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: 'Internal error'});
    });

    it("Should find by id.", async () => {
        const req = {
            params: {id: 1},
        };

        const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

        const service = {
            findById: jest.fn().mockResolvedValue({id: 1}),
        };

        const controller = new QuotationController(service);
        await controller.findById(req, res);

        expect(service.findById).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({id: 1});
    });

    it("Should return 404 when find by id fails.", async () => {
        const req = {
            params: {id: 1},
        };
        const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};
        const service = {
            findById: jest.fn().mockResolvedValue(null),
        };
        const controller = new QuotationController(service);

        await controller.findById(req, res);

        expect(service.findById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({error: 'Quotation not found.'});

    });

    it("Should return 500 when find by id fails.", async () => {
        const req = {
            params: {id: 1},
        };

        const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

        const service = {
            findById: jest.fn().mockRejectedValue(new Error('Quotation not found')),
        };

        const controller = new QuotationController(service);
        await controller.findById(req, res);

        expect(service.findById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({error: 'Quotation not found'});
    });

    it("Should find all", async () => {
        const req = {
            query: {page: 0, size: 10},
        };

        const res = {json: jest.fn()};

        const service = {
            findAll: jest.fn().mockResolvedValue({content: [{id: 1, name: "Cost Center", code: "CC1"}]}),
        };

        const controller = new QuotationController(service);
        await controller.findAll(req, res);

        expect(service.findAll).toHaveBeenCalledWith(0, 10);
        expect(res.json).toHaveBeenCalledWith({content: [{id: 1, name: "Cost Center", code: "CC1"}]});
    });

    it("Should return error if find all fails", async () => {
        const req = {
            query: {page: 0, size: 10},
        };

        const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

        const service = {
            findAll: jest.fn().mockRejectedValue(new Error('Internal error')),
        };

        const controller = new QuotationController(service);
        await controller.findAll(req, res);

        expect(service.findAll).toHaveBeenCalledWith(0, 10);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: 'Internal error'});
    });

    it("Should update a quotation.", async () => {
        const req = {
            params: {id: 1},
            body: {
                productId: 1,
                supplierId: 1,
                price: 100.0,
                date: new Date(),
                costCenterId: 1,
                expirationDate: new Date(),
            },
        };

        const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

        const service = {
            update: jest.fn().mockResolvedValue(req.body),
        };

        const controller = new QuotationController(service);
        await controller.update(req, res);

        expect(service.update).toHaveBeenCalledWith(1, 1, 1, 100.0, req.body.date, 1, req.body.expirationDate);
        expect(res.json).toHaveBeenCalledWith(req.body);
    });

    it("Should return 500 when update fails.", async () => {
        const req = {
            params: {id: 1},
            body: {
                productId: 1,
                supplierId: 1,
                price: 100.0,
                date: new Date(),
                costCenterId: 1,
                expirationDate: new Date(),
            },
        };

        const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

        const service = {
            update: jest.fn().mockRejectedValue(new Error('Internal error')),
        };

        const controller = new QuotationController(service);
        await controller.update(req, res);

        expect(service.update).toHaveBeenCalledWith(1, 1, 1, 100.0, req.body.date, 1, req.body.expirationDate);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({error: 'Internal error'});
    });

    it("Should delete a quotation.", async () => {
        const req = {
            params: {id: 1},
        };

        const res = {sendStatus: jest.fn()};

        const service = {
            delete: jest.fn(),
        };

        const controller = new QuotationController(service);
        await controller.delete(req, res);

        expect(service.delete).toHaveBeenCalledWith(1);
        expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it("Should return 500 when delete fails.", async () => {
        const req = {
            params: {id: 1},
        };

        const res = {json: jest.fn(), status: jest.fn().mockReturnThis()};

        const service = {
            delete: jest.fn().mockRejectedValue(new Error('Internal error')),
        };

        const controller = new QuotationController(service);
        await controller.delete(req, res);

        expect(service.delete).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({error: 'Internal error'});
    });
});