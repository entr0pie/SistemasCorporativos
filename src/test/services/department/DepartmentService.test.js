const DepartmentService = require("../../../main/services/department/DepartmentService");

describe("DepartmentService", () => {
    it("Should find by id.", async () => {
        const dataset = [
            {id: 1, name: "Department 1"},
        ];

        const model = {
            findByPk: jest.fn().mockImplementation(
                (id) => {
                    const found = dataset.find((d) => d.id === id)
                    return found ? found : null;
                }
            ),
        };

        const service = new DepartmentService(model, null);

        await expect(service.findById(1)).resolves.toEqual(dataset[0]);
        await expect(service.findById(2)).resolves.toBeNull();
    });

    it("Should find all.", async () => {
        const paginatedSearcher = {
            search: jest.fn().mockResolvedValue({
                items: [],
                page: 1,
                size: 10,
                hasNextPage: false,
                hasPreviousPage: false
            }),
        };

        const service = new DepartmentService(null, paginatedSearcher);

        const result = await service.findAll(1, 10);
        expect(paginatedSearcher.search).toHaveBeenCalledWith(1, 10);
        expect(result.items).toEqual([]);
    });

    it("Should create.", async () => {
        const model = {
            create: jest.fn().mockImplementation((data) => ({
                id: 1, ...data
            })),
        };

        const service = new DepartmentService(model, null);

        const result = await service.create("Department 1");

        expect(model.create).toHaveBeenCalledWith({name: "Department 1"});
        expect(result).toEqual({id: 1, name: "Department 1"});
    });

    it("Should update.", async () => {
        const data = {
            id: 1,
            name: "Department 1",
            save: jest.fn().mockResolvedValue({id: 1, name: "Department 2"}),
        };

        const model = {
            findByPk: jest.fn().mockResolvedValue(data),
        };

        const service = new DepartmentService(model, null);

        const result = await service.update(1, "Department 2");

        expect(model.findByPk).toHaveBeenCalledWith(1);
        expect(data.save).toHaveBeenCalled();
        expect(result).toEqual({id: 1, name: "Department 2"});
    });

    it("Should delete.", async () => {
        const dataset = [
            {id: 1, name: "Department 1"},
        ];

        const model = {
            destroy: jest.fn().mockImplementation(
                async (id) => {
                    const found = dataset.find((d) => d.id === id)
                }
            ),
        };

        const service = new DepartmentService(model, null);

        await expect(service.delete(1)).resolves.toBeUndefined();
        expect(model.destroy).toHaveBeenCalledWith({where: {id: 1}});
    });
});