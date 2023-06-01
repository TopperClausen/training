const express = require('express');
const router = express.Router();

let userRouter = require('./userRoute.js');

router.use('/users', userRouter);

module.exports = router;
