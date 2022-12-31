const User = require('../../dataBase/User');

module.exports = {
    getUsers: async () => {
        const users = await User.find();
        return users;
    },

    getUserByID: async (id) => {
        const user = await User.findById(id);
        return user;
    },

    findOneByParams: async (filter = {}) => {
        const user = await User.findOne(filter);
        return user;
    },

    createOneUser: async (newUser) => {
        const user = await User.create(newUser);
        return user;
    },

    updateOneUser: async (userID, newUser) => {
        const user = await User.findOneAndUpdate(userID, newUser, {new: true});
        return user;
    },

    deleteOneUser: async (userID) => {
        const user = await User.deleteOne(userID);
        return user;
    }
};