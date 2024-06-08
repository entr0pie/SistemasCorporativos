const ProductMovementController = require("../../../main/controllers/product-movement/ProductMovementController");

describe("ProductMovementController", () => {
    it("Should create a product movement if service works.", async () => {
        const productMovementService = {
            create: jest.fn().mockReturnValue({status: 'created'}),
        };

        const productMovementController = new ProductMovementController(productMovementService);

        const req = {
            body: {
                depositId: 1,
                productId: 1,
                movementType: 'IN',
                quantity: 10,
                unitaryPrice: 10.0,
                date: new Date()
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        const result = await productMovementController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith({status: 'created'});
    });

    it("Should return 403 if service fails.", async () => {
        const productMovementService = {
            create: jest.fn().mockRejectedValue(new Error()),
        };

        const productMovementController = new ProductMovementController(productMovementService);

        const req = {
            body: {
                depositId: 1,
                productId: 1,
                movementType: 'IN',
                quantity: 10,
                unitaryPrice: 10.0,
                date: new Date()
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        const result = await productMovementController.create(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalled();
    });

    it("Should find a product movement by id if service works.", async () => {
        const productMovementService = {
            findById: jest.fn().mockReturnValue({status: 'found'}),
        };

        const productMovementController = new ProductMovementController(productMovementService);

        const req = {
            params: {
                id: 1
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        const result = await productMovementController.findById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({status: 'found'});
    });

    it("Should return 404 if service does not find a product movement.", async () => {
        const productMovementService = {
            findById: jest.fn().mockReturnValue(null),
        };

        const productMovementController = new ProductMovementController(productMovementService);

        const req = {
            params: {
                id: 1
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        const result = await productMovementController.findById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalled();
    });

    it("Should return 403 if service fails.", async () => {
        const productMovementService = {
            findById: jest.fn().mockRejectedValue(new Error()),
        };

        const productMovementController = new ProductMovementController(productMovementService);

        const req = {
            params: {
                id: 1
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        const result = await productMovementController.findById(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalled();
    });

    it("Should find all product movements if service works.", async () => {
        const productMovementService = {
            findAll: jest.fn().mockReturnValue({status: 'found'}),
        };

        const productMovementController = new ProductMovementController(productMovementService);

        const req = {
            query: {
                page: 0,
                size: 10
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        const result = await productMovementController.findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({status: 'found'});
    });

    it("Should deny find all if service fails.", async () => {
        const productMovementService = {
            findAll: jest.fn().mockRejectedValue(new Error()),
        };

        const productMovementController = new ProductMovementController(productMovementService);

        const req = {
            query: {
                page: 0,
                size: 10
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        const result = await productMovementController.findAll(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalled();
    });

    it("Should find product movements by product id if service works.", async () => {
        const productMovementService = {
            findByProductId: jest.fn().mockReturnValue({status: 'found'}),
        };

        const productMovementController = new ProductMovementController(productMovementService);

        const req = {
            params: {
                productId: 1
            },
            query: {
                page: 0,
                size: 10
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        const result = await productMovementController.findByProductId(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({status: 'found'});
    });

    it("Should deny find by product id if service fails.", async () => {
        const productMovementService = {
            findByProductId: jest.fn().mockRejectedValue(new Error()),
        };

        const productMovementController = new ProductMovementController(productMovementService);

        const req = {
            params: {
                productId: 1
            },
            query: {
                page: 0,
                size: 10
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        const result = await productMovementController.findByProductId(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalled();
    });

    it("Should find product movements by deposit id if service works.", async () => {
        const productMovementService = {
            findByDepositId: jest.fn().mockReturnValue({status: 'found'}),
        };

        const productMovementController = new ProductMovementController(productMovementService);

        const req = {
            params: {
                depositId: 1
            },
            query: {
                page: 0,
                size: 10
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        const result = await productMovementController.findByDepositId(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({status: 'found'});
    });

    it("Should deny find by deposit id if service fails.", async () => {
        const productMovementService = {
            findByDepositId: jest.fn().mockRejectedValue(new Error()),
        };

        const productMovementController = new ProductMovementController(productMovementService);

        const req = {
            params: {
                depositId: 1
            },
            query: {
                page: 0,
                size: 10
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        const result = await productMovementController.findByDepositId(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalled();
    });

    it("Should find product movements by date interval if service works.", async () => {
        const productMovementService = {
            findByDateInterval: jest.fn().mockReturnValue({status: 'found'}),
        };

        const productMovementController = new ProductMovementController(productMovementService);

        const req = {
            query: {
                startDate: new Date(),
                endDate: new Date(),
                page: 0,
                size: 10
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        const result = await productMovementController.findByDateInterval(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({status: 'found'});
    });

    it("Should deny find by date interval if service fails.", async () => {
        const productMovementService = {
            findByDateInterval: jest.fn().mockRejectedValue(new Error()),
        };

        const productMovementController = new ProductMovementController(productMovementService);

        const req = {
            query: {
                startDate: new Date(),
                endDate: new Date(),
                page: 0,
                size: 10
            }
        };

        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        const result = await productMovementController.findByDateInterval(req, res);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalled();
    });
});