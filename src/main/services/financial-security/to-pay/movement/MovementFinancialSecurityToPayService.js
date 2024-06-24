/**
 * Handle movement to pay financial securities.
 *
 * @author Caio Porcel
 */
class MovementFinancialSecurityToPayService {

    /**
     * Builds a new instance of MovementFinancialSecurityToPayService.
     *
     * @param {MovementFinancialSecurityToPay} model
     * @param {FinancialSecurityToPay} financialSecurityToPayModel
     * @param {PaginatedSearcher} paginatedSearcher
     */
    constructor(model, financialSecurityToPayModel, paginatedSearcher) {
        this.model = model;
        this.financialSecurityToPayModel = financialSecurityToPayModel;
        this.paginatedSearcher = paginatedSearcher;
    }

    /**
     * Find a movement by id.
     *
     * @param {number} id movement id.
     * @returns {Promise<MovementFinancialSecurityToPay | null>} movement found.
     */
    findById(id) {
        return this.model.findByPk(id);
    }

    /**
     * Find all movement.
     *
     * @param {number} page page number.
     * @param {number} size page size.
     * @returns {Promise<PaginatedResource>} movement found.
     */
    findAll(page, size) {
        return this.paginatedSearcher.search(page, size);
    }

    /**
     * Create a new movement.
     *
     * @param {number} financialSecurityToPayId financial security to pay id.
     * @param {Date} date movement date.
     * @param {"OPENING" | "PAYMENT"} type movement type.
     * @param {number} value movement value.
     * @param {number} fineValue movement fine value.
     * @param {number} feeValue movement fee value.
     *
     * @returns {Promise<MovementFinancialSecurityToPay>} movement created.
     */
    async create(financialSecurityToPayId, date, type, value, fineValue, feeValue) {
        const financialSecurityToPay = await this.financialSecurityToPayModel.findByPk(financialSecurityToPayId);

        if (!financialSecurityToPay) {
            throw new Error("Financial security to pay not found");
        }

        const movement = await this.model.create({
            financialSecurityToPayId,
            date,
            type,
            value,
            fineValue,
            feeValue
        });

        const movements = await this.model.findAll({
            where: {
                financialSecurityToPayId
            }
        });

        const totalValue = movements.filter((movement) => movement.type === "PAYMENT").reduce((acc, movement) => acc + movement.value, 0);

        if (totalValue >= financialSecurityToPay.value) {
            await this.financialSecurityToPayModel.update({
                status: "CLOSED"
            }, {
                where: {
                    id: financialSecurityToPayId
                }
            });
        }

        return movement;
    }

    /**
     * Update a movement.
     *
     * @param {number} id movement id.
     * @param {number} financialSecurityToPayId financial security to pay id.
     * @param {Date} date movement date.
     * @param {"OPENING" | "PAYMENT"} type movement type.
     * @param {number} value movement value.
     * @param {number} fineValue movement fine value.
     * @param {number} feeValue movement fee value.
     * @returns {Promise<MovementFinancialSecurityToPay>} movement updated.
     */
    update(id, financialSecurityToPayId, date, type, value, fineValue, feeValue) {
        return this.model.update({
            financialSecurityToPayId,
            date,
            type,
            value,
            fineValue,
            feeValue
        }, {
            where: {
                id
            }
        });
    }

    /**
     * Delete a movement.
     *
     * @param {number} id movement id.
     * @returns {Promise<void>} promise completed when the movement is deleted.
     */
    delete(id) {
        return this.model.destroy({
            where: {
                id
            }
        });
    }
}

module.exports = MovementFinancialSecurityToPayService;