const {Router} = require('express');
const departmentRouter = require('./department');
const depositRouter = require('./deposit');
const productRouter = require('./product');
const productMovementRouter = require('./product-movement');
const userRouter = require('./user');

const router = Router();

router.use('/department', departmentRouter);
router.use('/deposit', depositRouter);
router.use('/product', productRouter);
router.use('/product-movement', productMovementRouter);
router.use('/user', userRouter);

module.exports = router;