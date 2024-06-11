const {Router} = require('express');
const toPayRouter = require('./to-pay');

const router = Router();

router.use('/to-pay', toPayRouter);

module.exports = router;