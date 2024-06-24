/**
 * Service for MovementFinancialSecurityToReceive
 *
 * @author Caio Porcel
 */
class MovementFinancialSecurityToReceiveService {

    /**
     * Constructor
     * @param {MovementFinancialSecurityToReceive} model
     * @param {PaginatedSearcher} searcher
     * @param {FinancialSecurityToReceiveService} financialSecurityToReceiveService
     */
    constructor(model, searcher, financialSecurityToReceiveService) {
        this.model = model;
        this.searcher = searcher;
        this.financialSecurityToReceiveService = financialSecurityToReceiveService;
    }

    /**
     * Find by id
     * @param {number} id
     * @return {Promise<MovementFinancialSecurityToReceive | null>}
     */
    findById(id) {
        return this.model.findByPk(id);
    }

    /**
     * Find all
     * @param {number} page
     * @param {number} size
     * @return {Promise<PaginatedResource>}
     */
    findAll(page, size) {
        return this.searcher.search(page, size);
    }

    /**
     * Create a new MovementFinancialSecurityToReceive
     *
     * @param {number} financialSecurityToReceiveId
     * @param {"OPENING" | "PAYMENT"} type
     * @param {number} value
     * @param {Date} date
     * @param {number} fineValue
     * @param {number} feeValue
     * @return {Promise<MovementFinancialSecurityToReceive>}
     */
    async create(financialSecurityToReceiveId, type, value, date, fineValue, feeValue) {
        const movement = await this.model.create({
            financialSecurityToReceiveId,
            type,
            value,
            date,
            fineValue,
            feeValue
        });

        const financialSecurityToReceive = await this.financialSecurityToReceiveService.findById(financialSecurityToReceiveId);

        let payed = 0;

        const movements = await this.model.findAll({
            where: {
                financialSecurityToReceiveId
            }
        });

        movements.forEach(movement => {
            if (movement.type === 'PAYMENT') {
                payed += movement.value;
            }
        });

        if (payed >= financialSecurityToReceive.value) {
            financialSecurityToReceive.status = 'PAYED';
            await financialSecurityToReceive.save();
        }

        return movement;
    }
}

module.exports = MovementFinancialSecurityToReceiveService;