/**
 * Client controller.
 *
 * @author Caio Porcel
 */
class ClientController {

    /**
     * Builds a new instance of the ClientController
     * @param {ClientService} service
     */
    constructor(service) {
        this.service = service;
    }

    async create(req, res) {
        try {
            const {name, phone, documentNumber} = req.body;
            const client = await this.service.create(name, phone, documentNumber);
            return res.status(201).json(client);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async findById(req, res) {
        try {
            const {id} = req.params;
            const client = await this.service.findById(id);
            if (client) {
                return res.json(client);
            }
            return res.status(404).json({message: 'Client not found'});
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async findAll(req, res) {
        try {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            const clients = await this.service.findAll(page, size);
            return res.json(clients);
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const {name, phone, documentNumber} = req.body;
            const client = await this.service.update(id, name, phone, documentNumber);
            if (client) {
                return res.json(client);
            }
            return res.status(404).json({message: 'Client not found'});
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            const client = await this.service.delete(id);
            if (client) {
                return res.status(204).send();
            }
            return res.status(404).json({message: 'Client not found'});
        } catch (e) {
            return res.status(500).json({message: e.message});
        }
    }
}

module.exports = ClientController;