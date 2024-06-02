const ProductController = require("../../../main/controllers/product/ProductController");

describe("ProductController", () => {
    it("Should return a product by id.", async () => {
        const productService = {
            findById: jest.fn().mockReturnValue({ id: 1, name: "Product 1" })
        };
        const productController = new ProductController(productService);

        const req = { params: { id: 1 } };
        const res = { json: jest.fn() };

        await productController.findById(req, res);

        expect(productService.findById).toHaveBeenCalledWith(1);
        expect(res.json).toHaveBeenCalledWith({ id: 1, name: "Product 1" });
    });

    it("Should return not found when product not found in find by id.", async () => {
        const productService = {
            findById: jest.fn().mockReturnValue(null)
        };

        const req = { params: { id: 1 } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        const productController = new ProductController(productService);
        await productController.findById(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalled();
    });

    it("Should create a product if service is working.", async () => {
       const product = {
           id: 1,
           name: "Product 1",
           description: "Description",
           isActive: true
       };

       const productService = {
              create: jest.fn().mockReturnValue(product),
       };

       const req = { body: product };
       const res = { json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };

       const productController = new ProductController(productService);
       await productController.create(req, res);

       expect(productService.create).toHaveBeenCalledWith(product.name, product.description, product.isActive);
       expect(res.json).toHaveBeenCalledWith(product);
    });

    it("Should deny product creation if service isn't working.", async () => {
        const product = {
            name: "Product 1",
            description: "Description",
            isActive: true
        };

        const productService = {
            create: jest.fn().mockImplementation(async () => {
                throw new Error("Error");
            }),
        };

        const req = { body: product };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };

        const productController = new ProductController(productService);
        await productController.create(req, res);

        expect(productService.create).toHaveBeenCalledWith(product.name, product.description, product.isActive);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
    });

    it("Should update a product if service is working.", async () => {
        const product = {
            id: 1,
            name: "Product 1",
            description: "Description",
            isActive: true
        };

        const productService = {
            update: jest.fn().mockReturnValue(product),
        };

        const req = { params: { id: 1 }, body: product };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };

        const productController = new ProductController(productService);
        await productController.update(req, res);

        expect(productService.update).toHaveBeenCalledWith(product.id, product.name, product.description, product.isActive);
        expect(res.json).toHaveBeenCalledWith(product);
    });

    it("Should deny product update if service isn't working.", async () => {
        const product = {
            id: 1,
            name: "Product 1",
            description: "Description",
            isActive: true
        };

        const productService = {
            update: jest.fn().mockImplementation(async () => {
                throw new Error("Error");
            }),
        };

        const req = { params: { id: 1 }, body: product };
        const res = { json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };

        const productController = new ProductController(productService);
        await productController.update(req, res);

        expect(productService.update).toHaveBeenCalledWith(product.id, product.name, product.description, product.isActive);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
    });

    it("Should delete a product if service is working.", async () => {
        const productService = {
            delete: jest.fn(),
        };

        const req = { params: { id: 1 } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        const productController = new ProductController(productService);
        await productController.delete(req, res);

        expect(productService.delete).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalled();
    });

    it("Should deny product delete if service isn't working.", async () => {
        const productService = {
            delete: jest.fn().mockImplementation(async () => {
                throw new Error("Error");
            }),
        };

        const req = { params: { id: 1 } };
        const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };

        const productController = new ProductController(productService);
        await productController.delete(req, res);

        expect(productService.delete).toHaveBeenCalledWith(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalled();
    });
});