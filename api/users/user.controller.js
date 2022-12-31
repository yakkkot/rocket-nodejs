const {getUsers, createOneUser, updateOneUser, deleteOneUser} = require("./users.services");

const userController = {

    getAllUsers: async (req, res, next) => {
        try {
            const users = await getUsers();
            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getOneUser: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = await createOneUser(req.body);
            res.status(201).json(user);
        } catch (e) {
            next(e);
        }
    },


    updateUser: async (req, res, next) => {
        try {
            console.log(req.params.id);
            console.log(req.user);
            await updateOneUser(req.params.id, req.user);
            res.send('Users updated successfully');
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            await deleteOneUser(req.id);
            res.status(200).send('User was deleted');
        } catch (e) {
            next(e);
        }
    },
};

module.exports = {
    userController
};