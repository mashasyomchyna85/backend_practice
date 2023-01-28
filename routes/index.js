const {Router} = require('express');
const heroRouter = require('./heroRouter');



const rootRouter = Router();
rootRouter.use('/heroes', heroRouter);


module.exports = rootRouter;