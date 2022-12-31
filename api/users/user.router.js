const userRouter = require('express').Router();

const {userController} = require('./user.controller');
const {userMiddleware} = require("./user.middleware");

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userMiddleware.checkIsBodyValidPost, userMiddleware.checkIsEmailUniquePost, userController.createUser);

userRouter.use('/:id', userMiddleware.checkIsUserValid);

userRouter.get('/:id', userController.getOneUser);
userRouter.put('/:id', userMiddleware.checkIsBodyValidPut, userMiddleware.checkIsEmailUniquePut, userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);


module.exports = {
    userRouter
};
