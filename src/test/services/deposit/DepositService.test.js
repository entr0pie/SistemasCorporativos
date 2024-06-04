const DepositService = require("../../../main/services/deposit/DepositService");
describe("DepositService", () => {
   it("Should create a new deposit", async () => {
        const depositModel = {
            create: jest.fn().mockImplementation(({ name, isActive }) => Promise.resolve({ id: 1, name, isActive })),
        };
        const depositService = new DepositService(depositModel, null);

        const createdDeposit = await depositService.create("Test", true);

        expect(depositModel.create).toHaveBeenCalledWith({ name: "Test", isActive: true });
        expect(createdDeposit).toEqual({ id: 1, name: "Test", isActive: true });
   });

    it("Should update a deposit if it exists", async () => {
        const depositModel = {
            findByPk: jest.fn().mockImplementation((id) =>
                Promise.resolve({
                    id: id,
                    name: "Mocked Name",
                    isActive: true,
                    set: jest.fn().mockImplementation(function ({ name, isActive }) {
                        this.name = name;
                        this.isActive = isActive;
                    }),
                    save: jest.fn().mockImplementation(function () {
                        return Promise.resolve({ id: this.id, name: this.name, isActive: this.isActive });
                    }),
                })),
        };

        const depositService = new DepositService(depositModel, null);

        const updatedDeposit = await depositService.update(1, "Test", true);

        expect(depositModel.findByPk).toHaveBeenCalledWith(1);
        expect(updatedDeposit).toEqual({ id: 1, name: "Test", isActive: true });
    });

    it("Should not update if a deposit doesn't exists", async () => {
        const depositModel = {
            findByPk: jest.fn().mockImplementation((id) => Promise.resolve(null)),
        };

        const depositService = new DepositService(depositModel, null);

        await expect(depositService.update(1, "Test", true)).rejects.toThrow("Deposit not found");
    });

    it("Should find all deposits using pagination", async () => {
        const paginatedSearcher = {
            search: jest.fn().mockImplementation((page, size) => Promise.resolve({ page, size })),
        };

        const depositService = new DepositService(null, paginatedSearcher);

        const paginatedDeposits = await depositService.findAll(0, 10);

        expect(paginatedSearcher.search).toHaveBeenCalledWith(0, 10);
        expect(paginatedDeposits).toEqual({ page: 0, size: 10 });
    });

    it("Should find by id.", async () => {
        const depositModel = {
            findByPk: jest.fn().mockImplementation((id) => Promise.resolve({ id: id, name: "Test", isActive: true })),
        };

        const depositService = new DepositService(depositModel, null);

        const deposit = await depositService.findById(1);

        expect(depositModel.findByPk).toHaveBeenCalledWith(1);
        expect(deposit).toEqual({ id: 1, name: "Test", isActive: true });
    });
});