const PaginatedSearcher = require("../../../../main/services/data/paginated/PaginatedSearcher");

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
            findAll: jest.fn().mockImplementation(({ limit, offset }) => {
                return Promise.resolve(mockedData.slice(offset, offset + limit));
            }),
        };

        const searcher = new PaginatedSearcher(model);
        await searcher.search(0, 2).then((resource) => {
            expect(resource).toEqual({
                pageNumber: 0,
                pageSize: 2,
                hasNextPage: true,
                hasPreviousPage: false,
                items: mockedData.slice(0, 2)
            });
        });

        await searcher.search(1, 2).then((resource) => {
            expect(resource).toEqual({
                pageNumber: 1,
                pageSize: 2,
                hasNextPage: true,
                hasPreviousPage: true,
                items: mockedData.slice(2, 4)
            });
        });
    });

    it("Should query correctly a resource.", async () => {
        const mockedData = [
            { id: 1, name: 'User One' },
            { id: 2, name: 'User Two' },
            { id: 3, name: 'User Three' },
            { id: 4, name: 'User Four' },
            { id: 5, name: 'User Five' },
        ];

        const model = {
            findAll: jest.fn().mockImplementation( async ({ offset, limit, where }) => {
                const firstFilter = mockedData.filter((item) => item.name.includes(where.name));
                return Promise.resolve(firstFilter.slice(offset, offset + limit));
            }),
        }

        const searcher = new PaginatedSearcher(model);
        await searcher.query({ name: 'User' }, 0, 2).then((resource) => {
            expect(resource).toEqual({
                pageNumber: 0,
                pageSize: 2,
                hasNextPage: true,
                hasPreviousPage: false,
                items: mockedData.slice(0, 2)
            });
        });
    });
});