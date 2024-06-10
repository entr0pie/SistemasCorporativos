const PurchaseRequestService = require("../../../main/services/purchase-request/PurchaseRequestService");

describe("PurchaseRequestService", () => {
    it("Should find by id", async () => {
        const purchaseRequestModel = {
            findByPk: jest.fn().mockResolvedValue({id: 1}),
        };

        const service = new PurchaseRequestService(purchaseRequestModel, null, null);

        const result = await service.findById(1);

        expect(result).toEqual({id: 1});
        expect(purchaseRequestModel.findByPk).toHaveBeenCalledWith(1);
    });

    it("Should find all", async () => {
        const searcher = {
            search: jest.fn().mockResolvedValue({}),
        };

        const service = new PurchaseRequestService(null, null, searcher);

        const result = await service.findAll(1, 10);

        expect(result).toEqual({});
        expect(searcher.search).toHaveBeenCalledWith(1, 10);
    });

    it("Should retire from internal deposits", async () => {
        const depositData = [
            {depositId: 1, quantity: 10},
            {depositId: 2, quantity: 5},
        ];

        const productMovementService = {
            countAvailableProducts: jest.fn().mockResolvedValue(depositData),
            calcMediumPrice: jest.fn().mockResolvedValue(10),
            create: jest.fn().mockResolvedValue({}),
        };

        const purchaseRequestModel = {
            create: jest.fn().mockResolvedValue({}),
        };

        const service = new PurchaseRequestService(purchaseRequestModel, productMovementService, null);

        await service._retireFromInternalDeposits(1, 1, 12, depositData);

        expect(productMovementService.calcMediumPrice).toHaveBeenCalledWith(1);
        expect(productMovementService.create).toHaveBeenCalledWith(1, 1, "OUT", 10, 10, expect.any(Date));
        expect(productMovementService.create).toHaveBeenCalledWith(2, 1, "OUT", 2, 10, expect.any(Date));
    });
});