const SupplierController = require('../../../main/controllers/supplier/SupplierController');

describe("SupplierController", () => {
    it("Should find by id", async () => {
        const service = {
            findById: jest.fn().mockResolvedValue({id: 1, name: 'Supplier 1'}),
        };

        const controller = new SupplierController(service);
        const req = {params: {id: 1}};

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await controller.findById(req, res);

        expect(service.findById).toHaveBeenCalledWith(1);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({id: 1, name: 'Supplier 1'});
    });

    it("Should return 404 when supplier not found", async () => {
        const service = {
            findById: jest.fn().mockResolvedValue(null)
        };

        const controller = new SupplierController(service);
        const req = {params: {id: 1}};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await controller.findById(req, res);

        expect(service.findById).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({message: 'Supplier not found'});
    });

    it("Should return paginated suppliers", async () => {
        const service = {
            findAll: jest.fn().mockResolvedValue([{id: 1, name: 'Supplier 1'}, {id: 2, name: 'Supplier 2'}])
        };

        const controller = new SupplierController(service);

        const req = {query: {page: 0, size: 10}};
        const res = {
            json: jest.fn()
        };

        await controller.findAll(req, res);

        expect(service.findAll).toHaveBeenCalledWith(0, 10);
        expect(res.json).toHaveBeenCalledWith([{id: 1, name: 'Supplier 1'}, {id: 2, name: 'Supplier 2'}]);
    });

    it("Should return error if findAll throws an error", async () => {
        const service = {
            findAll: jest.fn().mockRejectedValue(new Error('An error occurred'))
        };

        const controller = new SupplierController(service);

        const req = {query: {page: 0, size: 10}};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await controller.findAll(req, res);

        expect(service.findAll).toHaveBeenCalledWith(0, 10);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: 'An error occurred'});
    });

    it("Should create a new supplier", async () => {
        const service = {
            create: jest.fn().mockResolvedValue({id: 1, name: 'Supplier 1'})
        };

        const controller = new SupplierController(service);

        const req = {body: {name: 'Supplier 1', address: 'Address 1', phone: '123456', cin: '123456'}};
        const res = {
            json: jest.fn()
        };

        await controller.create(req, res);

        expect(service.create).toHaveBeenCalledWith('Supplier 1', 'Address 1', '123456', '123456');
        expect(res.json).toHaveBeenCalledWith({id: 1, name: 'Supplier 1'});
    });

    it("Should return error if create throws an error", async () => {
        const service = {
            create: jest.fn().mockRejectedValue(new Error('An error occurred'))
        };

        const controller = new SupplierController(service);

        const req = {body: {name: 'Supplier 1', address: 'Address 1', phone: '123456', cin: '123456'}};

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await controller.create(req, res);

        expect(service.create).toHaveBeenCalledWith('Supplier 1', 'Address 1', '123456', '123456');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: 'An error occurred'});
    });

    it("Should update a supplier", async () => {
        const service = {
            update: jest.fn().mockResolvedValue({id: 1, name: 'Supplier 1'})
        };

        const controller = new SupplierController(service);

        const req = {params: {id: 1}, body: {name: 'Supplier 1', address: 'Address 1', phone: '123456', cin: '123456'}};
        const res = {
            json: jest.fn()
        };

        await controller.update(req, res);

        expect(service.update).toHaveBeenCalledWith(1, 'Supplier 1', 'Address 1', '123456', '123456');
        expect(res.json).toHaveBeenCalledWith({id: 1, name: 'Supplier 1'});
    });

    it("Should return error if update throws an error", async () => {
        const service = {
            update: jest.fn().mockRejectedValue(new Error('An error occurred'))
        };

        const controller = new SupplierController(service);

        const req = {params: {id: 1}, body: {name: 'Supplier 1', address: 'Address 1', phone: '123456', cin: '123456'}};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await controller.update(req, res);

        expect(service.update).toHaveBeenCalledWith(1, 'Supplier 1', 'Address 1', '123456', '123456');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: 'An error occurred'});
    });

    it("Should delete a supplier", async () => {
        const service = {
            delete: jest.fn().mockResolvedValue()
        };

        const controller = new SupplierController(service);

        const req = {params: {id: 1}};
        const res = {
            json: jest.fn()
        };

        await controller.delete(req, res);

        expect(service.delete).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({message: 'Supplier deleted'});
    });

    it("Should return error if delete throws an error", async () => {
        const service = {
            delete: jest.fn().mockRejectedValue(new Error('An error occurred'))
        };

        const controller = new SupplierController(service);

        const req = {params: {id: 1}};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await controller.delete(req, res);

        expect(service.delete).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({message: 'An error occurred'});
    });


});