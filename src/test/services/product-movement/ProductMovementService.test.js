const ProductMovementService = require("../../../main/services/product-movement/ProductMovementService");
const {PaginatedResource} = require("../../../main/services/data/paginated");
const {Op} = require("sequelize");
describe("ProductMovementService", () => {
    it("Should create a new product movement.", async () => {
        function mockedCreation(obj) {
            return {
                id: 1,
                depositId: obj.depositId,
                productId: obj.productId,
                movementType: obj.movementType,
                quantity: obj.quantity,
                unitaryPrice: obj.unitaryPrice,
                date: obj.date,
            };
        }

        const model = {
            create: jest.fn().mockImplementation(mockedCreation),
        };

        const productMovementService = new ProductMovementService(model, null);
        const request = {
            depositId: 1,
            productId: 1,
            movementType: "IN",
            quantity: 10,
            unitaryPrice: 10.0,
            date: new Date(),
        };

        const response = await productMovementService.create(request.depositId, request.productId, request.movementType, request.quantity, request.unitaryPrice, request.date);
        expect(response).toEqual({id: 1, ...request});
        expect(model.create).toHaveBeenCalledTimes(1);
    });

    it("Should find a product movement by id.", async () => {
        const date = new Date();
        const model = {
            findByPk: jest.fn().mockImplementation(() => {
                return {
                    id: 1,
                    depositId: 1,
                    productId: 1,
                    movementType: "IN",
                    quantity: 10,
                    unitaryPrice: 10.0,
                    date: date,
                };
            }),
        };

        const productMovementService = new ProductMovementService(model, null);
        const response = await productMovementService.findById(1);

        expect(response).toEqual({
            id: 1,
            depositId: 1,
            productId: 1,
            movementType: "IN",
            quantity: 10,
            unitaryPrice: 10.0,
            date: date,
        });
    });

    it("Should find all product movements.", async () => {
        const response = new PaginatedResource(0, 2, false, false, []);
        const paginatedSearcher = {
            search: jest.fn().mockResolvedValue(response),
        };

        const productMovementService = new ProductMovementService(null, paginatedSearcher);
        const result = await productMovementService.findAll(0, 2);

        expect(paginatedSearcher.search).toBeCalledWith(0, 2);
        expect(paginatedSearcher.search).toHaveBeenCalledTimes(1);
        expect(result).toEqual(response);
    });

    it("Should find by product id.", async () => {
        const dataset = [
            {id: 1, productId: 1, name: "Sample name 1"},
            {id: 2, productId: 1, name: "Sample name 2"},
            {id: 3, productId: 2, name: "Sample name 3"}
        ];

        const paginatedSearcher = {
            query: jest.fn().mockImplementation(async (query, page, size) => {
                const data = dataset.filter((item) => item.productId === query.productId);
                return new PaginatedResource(page, size, false, page > 0, data);
            }),
        };

        const expectedResponse = new PaginatedResource(0, 2, false, false, dataset.filter((item) => item.productId === 1));

        const productMovementService = new ProductMovementService(null, paginatedSearcher);
        const result = await productMovementService.findByProductId(1, 0, 2);

        expect(paginatedSearcher.query).toBeCalledWith({productId: 1}, 0, 2);
        expect(paginatedSearcher.query).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedResponse);
    });

    it("Should find by deposit id.", async () => {
        const dataset = [
            {id: 1, depositId: 1, name: "Sample name 1"},
            {id: 2, depositId: 1, name: "Sample name 2"},
            {id: 3, depositId: 2, name: "Sample name 3"}
        ];

        const paginatedResource = new PaginatedResource(0, 2, false, false, dataset);
        const paginatedSearcher = {
            query: jest.fn().mockImplementation(async (query, page, size) => {
                const data = dataset.filter((item) => item.depositId === query.depositId);
                return new PaginatedResource(page, size, false, page > 0, data);
            }),
        };

        const expectedResponse = new PaginatedResource(0, 2, false, false, dataset.filter((item) => item.depositId === 1));

        const productMovementService = new ProductMovementService(null, paginatedSearcher);
        const result = await productMovementService.findByDepositId(1, 0, 2);

        expect(paginatedSearcher.query).toBeCalledWith({depositId: 1}, 0, 2);
        expect(paginatedSearcher.query).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedResponse);
    });

    it("Should find by date range.", async () => {
        const startDate = '2023-01-01';
        const endDate = '2023-01-31';
        const page = 1;
        const size = 10;
        const expectedResult = {data: [], total: 0};

        // Mock the return value of the query method
        const paginatedSearcherMock = {
            query: jest.fn().mockResolvedValue(expectedResult),
        }
        const productMovementService = new ProductMovementService(null, paginatedSearcherMock);
        const result = await productMovementService.findByDateInterval(new Date(startDate), new Date(endDate), page, size);

        expect(paginatedSearcherMock.query).toHaveBeenCalledWith({
            date: {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            }
        }, page, size);
        expect(result).toEqual(expectedResult);
    });

    it("Should count all product movement in all deposits.", async () => {
        const dataset = [
            {id: 2, productId: 1, depositId: 1, movementType: "OUT", quantity: 1},
            {id: 1, productId: 1, depositId: 1, movementType: "IN", quantity: 3},
            {id: 3, productId: 1, depositId: 2, movementType: "IN", quantity: 1},
            {id: 4, productId: 2, depositId: 2, movementType: "IN", quantity: 2},
            {id: 5, productId: 2, depositId: 3, movementType: "OUT", quantity: 1},
        ];

        const productMovementModel = {
            findAll: jest.fn().mockImplementation(async (query) => {
                return dataset.filter((item) => item.productId === query.where.productId && item.movementType === query.where.movementType);
            }),
        };

        const productMovementService = new ProductMovementService(productMovementModel, null);

        const result = await productMovementService.countAvailableProducts(1);

        expect(result).toEqual([
            {depositId: 1, quantity: 2},
            {depositId: 2, quantity: 1},
        ]);
    });

    it("Should calc medium price of a product.", async () => {
        const dataset = [
            {id: 2, productId: 1, depositId: 1, movementType: "OUT", quantity: 1, unitaryPrice: 10},
            {id: 1, productId: 1, depositId: 1, movementType: "IN", quantity: 3, unitaryPrice: 10},
            {id: 3, productId: 1, depositId: 2, movementType: "IN", quantity: 1, unitaryPrice: 10},
            {id: 4, productId: 2, depositId: 2, movementType: "IN", quantity: 2, unitaryPrice: 10},
            {id: 5, productId: 2, depositId: 3, movementType: "OUT", quantity: 1, unitaryPrice: 10},
        ];

        const productMovementModel = {
            findAll: jest.fn().mockImplementation(async (query) => {
                return dataset.filter((item) => item.productId === query.where.productId);
            }),
        };

        const productMovementService = new ProductMovementService(productMovementModel, null);

        const result = await productMovementService.calcMediumPrice(1);

        expect(result).toEqual(10);
    });
});