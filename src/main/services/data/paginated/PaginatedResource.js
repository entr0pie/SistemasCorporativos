/**
 * Represents a paginated resource.
 *
 * @author Caio Porcel
 */
class PaginatedResource {
    /**
     * Number of the current page.
     *
     * @type {number}
     */
    pageNumber;

    /**
     * Size of each page.
     *
     * @type {number}
     */
    pageSize;

    /**
     * If the resource has a next page.
     *
     * @type {boolean}
     */
    hasNextPage;

    /**
     * If the resource has a previous page.
     *
     * @type {boolean}
     */
    hasPreviousPage;

    /**
     * Items of the page.
     *
     * @type {Array}
     */
    items;

    constructor(pageNumber, pageSize, hasNextPage, hasPreviousPage, items) {
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.hasNextPage = hasNextPage;
        this.hasPreviousPage = hasPreviousPage;
        this.items = items;
    }
}

module.exports = PaginatedResource;