const apiRouter = require('express').Router();

const {userRouter} = require('./users/user.router');

apiRouter.use('/users', userRouter);

module.exports = {
    apiRouter
};