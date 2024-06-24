const {Router} = require('express');
const toPayRouter = require('./to-pay');
const toReceiveRouter = require('./to-receive');

const router = Router();

router.use('/to-pay', toPayRouter);
router.use('/to-receive', toReceiveRouter);

module.exports = router;