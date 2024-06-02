const { PaginatedSearcherFactory } = require("../../../../main/services/data/paginated");

describe("PaginatedSearcherFactory", () => {
   it("Should create a paginated searcher for a model.", () => {
       const searcher = PaginatedSearcherFactory({
           findAll: jest.fn()
       });

       expect(searcher).toBeDefined();
   });
});

describe("PaginatedSearcher",  () => {
    it("Should paginate correctly a resource.", async () => {
        const mockedData = [
            { id: 1, email: 'email@email.com', password: 'password' },
            { id: 2, email: 'email2@email.com', password: 'password' },
            { id: 3, email: 'email3@email.com', password: 'password' },
            { id: 4, email: 'email4@email.com', password: 'password' },
            { id: 5, email: 'email4@email.com', password: 'password' },
        ];

        const model = {
            findAll: jest.fn().mockImplementation(({ limit, offset, where }) => {
                return Promise.resolve(mockedData.slice(offset, offset + limit));
            }),
        };

        const searcher = PaginatedSearcherFactory(model);
        await searcher({}, 0, 2).then((resource) => {
            expect(resource).toEqual({
                pageNumber: 0,
                pageSize: 2,
                hasNextPage: true,
                hasPreviousPage: false,
                items: mockedData.slice(0, 2)
            });
        });

        await searcher({}, 1, 2).then((resource) => {
            expect(resource).toEqual({
                pageNumber: 1,
                pageSize: 2,
                hasNextPage: true,
                hasPreviousPage: true,
                items: mockedData.slice(2, 4)
            });
        });
    });
});