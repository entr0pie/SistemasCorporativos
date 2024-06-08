const SupplierService = require("../../../main/services/supplier/SupplierService");

describe("SupplierService", () => {
    it("Should find a supplier by id", async () => {
        const dataset = [
            {id: 1, name: "Supplier 1", address: "Address 1", phone: "123456789", cin: "123456789"},
        ]

        const supplierModel = {
            findByPk: jest.fn().mockImplementation((id) => {
                const found = dataset.find(supplier => supplier.id === id);
                return Promise.resolve(found ? found : null);
            }),
        };

        const supplierService = new SupplierService(supplierModel);
        const supplier = await supplierService.findById(1);
        expect(supplier).toEqual(dataset[0]);

        const notFound = await supplierService.findById(2);
        expect(notFound).toBeNull();
    });

    it("Should find all suppliers paginated", async () => {
        const dataset = [
            {id: 1, name: "Supplier 1", address: "Address 1", phone: "123456789", cin: "123456789"},
            {id: 2, name: "Supplier 2", address: "Address 2", phone: "123456789", cin: "123456789"},
            {id: 3, name: "Supplier 3", address: "Address 3", phone: "123456789", cin: "123456789"},
        ]

        const paginatedSearcher = {
            search: jest.fn().mockImplementation((page, size) => dataset),
        };

        const supplierService = new SupplierService(null, paginatedSearcher);
        const suppliers = await supplierService.findAll(0, 2);
        expect(suppliers).toEqual(dataset);
        expect(paginatedSearcher.search).toHaveBeenCalledWith(0, 2);
    });

    it("Should create a new supplier", async () => {
        const dataset = [
            {id: 1, name: "Supplier 1", address: "Address 1", phone: "123456789", cin: "123456789"},
        ]

        const supplierModel = {
            create: jest.fn().mockImplementation((supplier) => {
                dataset.push(supplier);
                return Promise.resolve(supplier);
            }),
        };

        const supplierService = new SupplierService(supplierModel);
        const supplier = await supplierService.create("Supplier 1", "Address 1", "123456789", "123456789");
        expect(supplier).toEqual(dataset[1]);
    });

    it("Should update a supplier", async () => {
        const dataset = [
            {id: 1, name: "Supplier 1", address: "Address 1", phone: "123456789", cin: "123456789"},
        ]

        const supplierModel = {
            findByPk: jest.fn().mockImplementation((id) => {
                const found = dataset.find(supplier => supplier.id === id);
                return {
                    save: jest.fn().mockResolvedValue(dataset[0]),
                    ...Promise.resolve(found ? found : null)
                };
            }),
        };

        const supplierService = new SupplierService(supplierModel);
        const supplier = await supplierService.update(1, "Supplier 1", "Address 1", "123456789", "123456789");
        expect(supplier).toEqual(dataset[0]);
    });

    it("Should throw an error when updating a supplier that does not exist", async () => {
        const model = {
            findByPk: jest.fn().mockResolvedValue(null)
        };

        const service = new SupplierService(model, null);
        await expect(service.update(1, "Supplier 1", "Address 1", "123456789", "123456789")).rejects.toThrow('Supplier not found');
    });

    it("Should delete a supplier", async () => {
        const dataset = [
            {id: 1, name: "Supplier 1", address: "Address 1", phone: "123456789", cin: "123456789"},
        ]

        function destroy() {
            return jest.fn().mockResolvedValue(1);
        }

        const supplierModel = {
            findByPk: jest.fn().mockImplementation((id) => {
                const found = dataset.find(supplier => supplier.id === id);
                return {
                    destroy: destroy(),
                    ...Promise.resolve(found ? found : null)
                };
            }),

        };
        const supplierService = new SupplierService(supplierModel);
        await supplierService.delete(1);
        expect(supplierModel.findByPk).toHaveBeenCalledWith(1);
    });

    it("Should throw an error when deleting a supplier that does not exist", async () => {
        const model = {
            findByPk: jest.fn().mockResolvedValue(null)
        };

        const service = new SupplierService(model, null);
        await expect(service.delete(1)).rejects.toThrow('Supplier not found');
    });
});