const ProductService = require("../../../main/services/product/ProductService");

describe("ProductService", () => {
   it("Should find a product by id.", async () => {
       const mockedData = {
           id: 1,
           name: "Product 1",
           description: "Description 1",
           isActive: true
       };

       const model = {
           findByPk: jest.fn().mockImplementation(async (id) => {
              return id === 1 ? mockedData : null;
           }),
       };

       const productService = new ProductService(model);
       await expect(productService.findById(1)).resolves.toBe(mockedData);
       expect(model.findByPk).toHaveBeenCalledWith(1);

       await expect(productService.findById(2)).resolves.toBeNull();
       expect(model.findByPk).toHaveBeenCalledWith(2);
   });

   it("Should create a new product.", async () => {
       const model = {
           create: jest.fn().mockImplementation(async ({name, description, isActive}) =>
               ({
                  id: 1,
                  name: name,
                  description: description,
                  isActive: isActive
              })
           ),
       };

       const productService = new ProductService(model);
       await expect(productService.create("Product 1", "Description 1", true)).resolves.toEqual({
           id: 1,
           name: "Product 1",
           description: "Description 1",
           isActive: true
       });
   });

   it("Should update a product.", async () => {
      const mockedData = {
          id: 1,
          name: "Product 1",
          description: "Description 1",
          isActive: true,
          set: jest.fn(),
          save: jest.fn().mockImplementation(async () => mockedData)
      };

      const model = {
          findByPk: jest.fn().mockImplementation(async (id) => {
              return id === 1 ? mockedData : null;
          }),
      };

      const productService = new ProductService(model);
      await expect(productService.update(1, "Product 2", "Description 2", false)).resolves.toEqual(mockedData);
   });

   it("Should throw if product not found on update.", async () => {
      const model = {
            findByPk: jest.fn().mockImplementation(async () => null),
      };

      const productService = new ProductService(model);
      await expect(productService.update(1, "Product 2", "Description 2", false)).rejects.toThrow("Product not found");
   });

   it("Should delete existing product.", async () => {
       const mockedData = {
           id: 1,
           destroy: jest.fn().mockResolvedValue(true)
       };

       const model = {
           findByPk: jest.fn().mockImplementation(async (id) => {
               return id === 1 ? mockedData : null;
           }),
       };

       const productService = new ProductService(model);
       await expect(productService.delete(1)).resolves.toBe(true);
   });

   it("Should throw if product not found when deleting", async () => {
        const model = {
            findByPk: jest.fn().mockImplementation(async (id) => {
                return null;
            }),
        };

        const productService = new ProductService(model);
        await expect(productService.delete(1)).rejects.toThrow();
   });
});