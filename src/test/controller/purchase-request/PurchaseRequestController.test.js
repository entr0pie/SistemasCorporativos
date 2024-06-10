const PurchaseRequestController = require('../../../main/controllers/purchase-request/PurchaseRequestController');

describe('PurchaseRequestController', () => {
    it("Should return a purchase request by id", async () => {
        const service = {
            findById: jest.fn(() => Promise.resolve({id: 1}))
        };

        const controller = new PurchaseRequestController(service);

        const req = {params: {id: 1}};
        const res = {json: jest.fn()};

        await controller.findById(req, res);

        expect(service.findById).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({id: 1});
    });

    it("Should return a 404 when the purchase request is not found", async () => {
        const service = {
            findById: jest.fn().mockResolvedValue(null)
        };

        const controller = new PurchaseRequestController(service);

        const req = {params: {id: 1}};
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

        await controller.findById(req, res);

        expect(service.findById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({error: 'Purchase request not found.'});
    });

    it("Should fail find by id and return 500", async () => {
        const service = {
            findById: jest.fn(async () => {
                throw new Error('Internal error');
            })
        };

        const controller = new PurchaseRequestController(service);

        const req = {params: {id: 1}};
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

        await controller.findById(req, res)
        expect(service.findById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({error: 'Internal error'});
    });

    it("Should find all paginated if service runs successfully", async () => {
        const service = {
            findAll: jest.fn(() => Promise.resolve([{id: 1}]))
        };

        const controller = new PurchaseRequestController(service);

        const req = {query: {page: 1, size: 10}};
        const res = {json: jest.fn()};

        await controller.findAll(req, res);

        expect(service.findAll).toHaveBeenCalledWith(1, 10);
        expect(res.json).toHaveBeenCalledWith([{id: 1}]);
    });

    it("Should fail find all and return 400", async () => {
        const service = {
            findAll: jest.fn(async () => {
                throw new Error('Internal error');
            })
        };

        const controller = new PurchaseRequestController(service);

        const req = {query: {page: 1, size: 10}};
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

        await controller.findAll(req, res);

        expect(service.findAll).toHaveBeenCalledWith(1, 10);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: 'Internal error'});
    });

    it("Should create a purchase request", async () => {
        const service = {
            create: jest.fn(() => Promise.resolve({id: 1}))
        };

        const userService = {
            findByEmail: jest.fn(() => Promise.resolve({id: 1}))
        };

        const controller = new PurchaseRequestController(service, userService);

        const req = {body: {userId: 1, productId: 1, quantity: 10}, auth: {getSubject: () => "email@email.com"}};
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

        await controller.create(req, res);

        expect(service.create).toHaveBeenCalledWith(1, 1, 10);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({id: 1});
    });

    it("Should deny creation when user is not authenticated", async () => {
        const service = {
            create: jest.fn(() => Promise.resolve({id: 1}))
        };

        const controller = new PurchaseRequestController(service, null);

        const req = {body: {productId: 1, quantity: 10}};
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

        await controller.create(req, res);

        expect(service.create).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: 'Unauthorized'});
    });

    it("Should fail create and return 400", async () => {
        const service = {
            create: jest.fn(async () => {
                throw new Error('Internal error');
            })
        };

        const userService = {
            findByEmail: jest.fn(() => Promise.resolve({id: 1}))
        }

        const controller = new PurchaseRequestController(service, userService);

        const req = {body: {userId: 1, productId: 1, quantity: 10}, auth: {getSubject: () => "email@email.com"}};
        const res = {status: jest.fn().mockReturnThis(), json: jest.fn()};

        await controller.create(req, res);

        expect(service.create).toHaveBeenCalledWith(1, 1, 10);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({error: 'Internal error'});
    });
});