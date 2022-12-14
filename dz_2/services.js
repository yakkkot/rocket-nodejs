const fs = require("node:fs/promises");
const path = require("node:path");

module.exports = {
    readData: async () => {
        const users = await fs.readFile(path.join(__dirname, 'data.json'));
        return JSON.parse(users.toString())
    },
    writeData: async (users) => {
        await fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(users))
    }
};