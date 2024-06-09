const QuotationService = require("../../../main/services/quotation/QuotationService");
const {Op} = require("sequelize");

describe("QuotationService", () => {
    it("Should create a new quotation.", async () => {
        const data = {
            productId: 1,
            supplierId: 1,
            price: 100.0,
            date: new Date(),
            costCenterId: 1,
            expirationDate: new Date(),
        };

        const quotationModel = {
            create: jest.fn().mockResolvedValue({id: 1, ...data}),
        };

        const service = new QuotationService(quotationModel, null);
        const result = await service.create(data.productId, data.supplierId, data.price, data.date, data.costCenterId, data.expirationDate);

        expect(quotationModel.create).toHaveBeenCalledWith(data);
        expect(result).toEqual({id: 1, ...data});
    });

    it("Should find valid quotations by date.", async () => {
        const validDate = (() => {
            const date = new Date();
            date.setDate(date.getDate() + 1);
            return date;
        })();

        const dataset = [
            {id: 1, date: new Date('1990-12-31'), expirationDate: new Date('1991-01-01')},
            {id: 2, date: new Date('1991-01-01'), expirationDate: new Date('1991-01-02')},
            {id: 3, date: new Date('1991-01-02'), expirationDate: validDate},
        ];

        const searcher = {
            query: jest.fn().mockImplementation((query, page, size) => {
                return dataset.filter(item => item.expirationDate > new Date());
            }),
        };

        const service = new QuotationService(null, searcher);
        const result = await service.findValidQuotationsByProduct(1, 0, 10);
        expect(result).toEqual([dataset[2]]);
    });

    it("Should find a quotation by id.", async () => {
        const quotationModel = {
            findByPk: jest.fn().mockResolvedValue({id: 1, name: "Quotation"}),
        };

        const service = new QuotationService(quotationModel, null);
        const result = await service.findById(1);

        expect(quotationModel.findByPk).toHaveBeenCalledWith(1);
        expect(result).toEqual({id: 1, name: "Quotation"});
    });

    it("Should find all quotations.", async () => {
        const dataset = [
            {id: 1, name: "Quotation 1"},
            {id: 2, name: "Quotation 2"},
            {id: 3, name: "Quotation 3"},
        ];

        const searcher = {
            search: jest.fn().mockResolvedValue(dataset),
        };

        const service = new QuotationService(null, searcher);
        const result = await service.findAll(0, 10);

        expect(result).toEqual(dataset);
    });

    it("Should update quotation if found.", async () => {
        const data = {
            productId: 1,
            supplierId: 1,
            price: 100.0,
            date: new Date(),
            costCenterId: 1,
            expirationDate: new Date(),
        }

        const update = jest.fn().mockImplementation((data) => ({id: 1, ...data}));
        const quotationModel = {
            findByPk: jest.fn().mockResolvedValue({id: 1, name: "Quotation", update: update}),
        };

        const service = new QuotationService(quotationModel, null);
        const result = await service.update(1, data.productId, data.supplierId, data.price, data.date, data.costCenterId, data.expirationDate);

        expect(quotationModel.findByPk).toHaveBeenCalledWith(1);
        expect(update).toHaveBeenCalledWith(data);
        expect(result).toEqual({id: 1, ...data});
    });

    it("Should throw an error when updating a non existing quotation.", async () => {
        const quotationModel = {
            findByPk: jest.fn().mockResolvedValue(null),
        };

        const service = new QuotationService(quotationModel, null);
        await expect(service.update(1, 1, 1, 100.0, new Date(), 1, new Date())).rejects.toThrow('Quotation not found');
    });

    it("Should delete if found quotation.", async () => {
        const destroy = jest.fn().mockResolvedValue();
        const quotationModel = {
            findByPk: jest.fn().mockResolvedValue({destroy: destroy}),
        };

        const service = new QuotationService(quotationModel, null);
        await service.delete(1);

        expect(quotationModel.findByPk).toHaveBeenCalledWith(1);
        expect(destroy).toHaveBeenCalled();
    });

    it("Should throw an error when deleting a non existing quotation.", async () => {
        const quotationModel = {
            findByPk: jest.fn().mockResolvedValue(null),
        };

        const service = new QuotationService(quotationModel, null);
        await expect(service.delete(1)).rejects.toThrow('Quotation not found');
    });
});