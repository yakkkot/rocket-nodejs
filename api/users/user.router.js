const userRouter = require('express').Router();

const {userController} = require('./user.controller');

userRouter.get('/', userController.getAllUsers);
userRouter.post('/', userController.createUser);

userRouter.get('/:id', userController.getUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);


module.exports = {
    userRouter
};
