const PurchaseService = require('../../../main/services/purchase/PurchaseService');

describe("PurchaseService", () => {
    it("Should throw NotEnoughQuotationsError when there's less than 3 quotations.", async () => {
        const quotations = [
            {price: 10},
            {price: 20},
        ];

        const quotationService = {
            findValidQuotationsByProduct: jest.fn().mockReturnValue({items: quotations, hasNextPage: false})
        };

        const purchaseRequest = {
            productId: 1,
            quantity: 1
        };

        const service = new PurchaseService(null, quotationService, null);
        await expect(service.buy(purchaseRequest)).rejects.toThrow("There are not enough quotations for this product.");
    });

    it("Should create purchase and product movement when there are enough quotations.", async () => {
        const quotations = [
            {id: 1, price: 10},
            {id: 2, price: 20},
            {id: 3, price: 30},
        ];

        const quotationService = {
            findValidQuotationsByProduct: jest.fn().mockReturnValue({items: quotations, hasNextPage: false})
        };

        const purchaseRequest = {
            depositId: 1,
            productId: 1,
            quantity: 1
        };

        const purchaseModel = {
            create: jest.fn().mockReturnValue({id: 1})
        };

        const productMovementService = {
            create: jest.fn().mockReturnValue({id: 1})
        };

        const service = new PurchaseService(purchaseModel, quotationService, productMovementService);
        await service.buy(purchaseRequest);

        expect(purchaseModel.create).toHaveBeenCalledWith({
            quotationId: 1,
            quantity: 1,
            date: expect.any(Date)
        });

        expect(productMovementService.create).toHaveBeenCalledWith(1, 1, "IN", 1, 10, expect.anything());
    });
});