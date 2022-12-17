const {readData, writeData, checkName, findUserByID} = require("./users.services");

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await readData();
            res.json(users);
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const createUser = req.body;
            const users = await readData();

            await checkName(users, createUser);
            if (typeof createUser.name !== 'string' || createUser.name.length < 2) {
                return res.status(400).json('Incorrect Name');
            }

            if (typeof createUser.age !== 'number' || createUser.age < 0) {
                return res.status(400).json('Incorrect Age');
            }

            const newUser = {
                id: users.at(-1) ? users.at(-1).id + 1 : 1,
                name: createUser.name,
                age: createUser.age,
            };

            users.push(newUser);
            await writeData(users);

            res.status(201).json(newUser);
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    },

    getUser: async (req, res) => {
        try {
            const {id} = req.params;
            const users = await readData();

            const user = await findUserByID(users,id);
            res.json(user);
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            const updateUser = req.body;
            const {id} = req.params;

            const users = await readData();
            const user = await findUserByID(users,id);
            await checkName(users, updateUser);

            const index = user.id - 1;
            users[index] = {...users[index], ...updateUser};

            await writeData(users);
            res.json('Users updated successfully');
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const {id} = req.params;

            const users = await readData();
            const user = await findUserByID(users,id);
            const index = user.id - 1;

            users.splice(index, 1);  // or filter

            await writeData(users);
            res.status(200).json('User was deleted');
        }
        catch (e) {
            res.status(400).json(e.message);
        }
    },
};

module.exports = {
    userController
};