const fs = require("node:fs/promises");
const path = require("node:path");


const pathDB = path.join('dataBase', 'data.json');

module.exports = {
    readData: async () => {
        const users = await fs.readFile(pathDB);
        return JSON.parse(users.toString());
    },

    writeData: async (users) => {
        await fs.writeFile(pathDB, JSON.stringify(users));
    },

    checkName: async (usersDB, userBody) => {
        const userWithSameName = usersDB.find(u => u.name === userBody.name);
        if (userWithSameName) {
            throw new Error('User with this name already exists');
        }
    },

    findUserByID: async (users, id) => {
        const user = users.find(u => u.id === +id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    },
};