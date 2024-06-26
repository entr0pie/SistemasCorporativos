const { Router } = require('express');
const swaggerRouter = require("./swagger");
const departmentRouter = require('./department');
const depositRouter = require('./deposit');
const productRouter = require('./product');
const productMovementRouter = require('./product-movement');
const userRouter = require('./user');
const supplierRouter = require('./supplier');
const costCenterRouter = require('./cost-center');
const quotationRouter = require('./quotation');
const purchaseRequestRouter = require('./purchase-request');
const purchaseRouter = require('./purchase');
const financialSecurityRouter = require('./financial-security');
const clientRouter = require('./client');
const saleRouter = require('./sale');

const router = Router();

router.use('/swagger', swaggerRouter);
router.use('/department', departmentRouter);
router.use('/deposit', depositRouter);
router.use('/product', productRouter);
router.use('/product-movement', productMovementRouter);
router.use('/user', userRouter);
router.use('/supplier', supplierRouter);
router.use('/cost-center', costCenterRouter);
router.use('/quotation', quotationRouter);
router.use('/purchase-request', purchaseRequestRouter);
router.use('/purchase', purchaseRouter);
router.use('/financial-security', financialSecurityRouter);
router.use('/client', clientRouter);
router.use('/sale', saleRouter);

module.exports = router;