const CostCenterService = require('../../../main/services/cost-center/CostCenterService');

describe("CostCenterService", () => {
    it("Should find by id", async () => {
        const model = {
            findByPk: jest.fn().mockResolvedValue({id: 1, code: '213', name: 'Cost Center 1'})
        };

        const service = new CostCenterService(model, null);
        const result = await service.findById(1);
        expect(result).toEqual({id: 1, code: '213', name: 'Cost Center 1'});
    });

    it("Should find all", async () => {
        const searcher = {
            search: jest.fn().mockResolvedValue({page: 0, size: 10, hasNext: false, hasPrevious: false, data: []})
        };

        const service = new CostCenterService(null, searcher);
        const result = await service.findAll(0, 10);
        expect(result).toEqual({page: 0, size: 10, hasNext: false, hasPrevious: false, data: []});
        expect(searcher.search).toBeCalledWith(0, 10);
    });

    it("Should create", async () => {
        const model = {
            create: jest.fn().mockResolvedValue({id: 1, code: '213', name: 'Cost Center 1'})
        };

        const service = new CostCenterService(model, null);
        const result = await service.create('Cost Center 1', '213');
        expect(result).toEqual({id: 1, code: '213', name: 'Cost Center 1'});
        expect(model.create).toBeCalledWith({name: 'Cost Center 1', code: '213'});
    });

    it("Should update", async () => {
        const expected = {
            id: 1,
            code: '214',
            name: 'Cost Center 2',
        }

        const model = {
            findByPk: jest.fn().mockResolvedValue({
                id: 1,
                code: '213',
                name: 'Cost Center 1',
                save: jest.fn().mockResolvedValue(expected),
            }),
        };

        const service = new CostCenterService(model, null);
        const result = await service.update(1, 'Cost Center 2', '214');
        expect(result).toEqual(expected);
        expect(model.findByPk).toBeCalledWith(1);
    });

    it("Should fail update when cost center not found", async () => {
        const model = {
            findByPk: jest.fn().mockResolvedValue(null),
        };

        const service = new CostCenterService(model, null);
        await expect(service.update(1, 'Cost Center 2', '214')).rejects.toThrow('Cost center not found');
        expect(model.findByPk).toBeCalledWith(1);
    });

    it("Should delete", async () => {

        const model = {
            findByPk: jest.fn().mockResolvedValue({
                id: 1,
                destroy: jest.fn(),
            }),
        };

        const service = new CostCenterService(model, null);
        await service.delete(1);
        expect(model.findByPk).toBeCalledWith(1);
    });

    it("Should fail delete when cost center not found", async () => {
        const model = {
            findByPk: jest.fn().mockResolvedValue(null)
        };

        const service = new CostCenterService(model, null);
        await expect(service.delete(1)).rejects.toThrow('Cost center not found');
    });
});