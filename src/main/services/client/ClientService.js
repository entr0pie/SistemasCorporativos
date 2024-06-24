/**
 * Service for creating, updating, deleting and searching clients.
 *
 * @author Caio Porcel
 */
class ClientService {
    /**
     * Build a new ClientService.
     *
     * @param {Client} model
     * @param {PaginatedSearcher} searcher
     */
    constructor(model, searcher) {
        this.model = model;
        this.searcher = searcher;
    }

    /**
     * Create a new client.
     *
     * @param {string} name name of the client
     * @param {string} phone phone number of the client
     * @param {string} documentNumber document number of the client
     * @returns {Promise<Client>} The created client
     */
    create(name, phone, documentNumber) {
        return this.model.create({
            name,
            phone,
            documentNumber
        });
    }

    /**
     * Find a client by id.
     * @param {number} id
     * @returns {Promise<Client | null>} The client found or null if not found
     */
    findById(id) {
        return this.model.findByPk(id);
    }

    /**
     * Find all clients.
     *
     * @param {number} page
     * @param {number} size
     * @returns {Promise<PaginatedResource>}
     */
    findAll(page, size) {
        return this.searcher.search(page, size);
    }

    /**
     * Update a client.
     *
     * @param {number} id
     * @param {string} name
     * @param {string} phone
     * @param {string} documentNumber
     * @returns {Promise<Client | null>} The updated client or null if not found
     */
    async update(id, name, phone, documentNumber) {
        const client = await this.findById(id);
        if (!client) {
            return null;
        }
        client.name = name;
        client.phone = phone;
        client.documentNumber = documentNumber;
        return client.save();
    }

    /**
     * Delete a client.
     *
     * @param {number} id
     * @returns {Promise<boolean>} True if the client was deleted, false otherwise
     */
    async delete(id) {
        const client = await this.findById(id);
        if (!client) {
            return false;
        }
        await client.destroy();
        return true;
    }
}

module.exports = ClientService;