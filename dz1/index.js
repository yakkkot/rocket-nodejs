const fs = require('node:fs/promises');
const path = require('node:path');

const addDirs = async () => {
    await fs.mkdir(path.join(__dirname,'boys'));

    await fs.appendFile(path.join(__dirname,'boys','karina.json'),JSON.stringify({name:'Karina',gender:'female'}));
    await fs.appendFile(path.join(__dirname,'boys','max.json'),JSON.stringify({name:'Max',gender:'male'}));
    await fs.appendFile(path.join(__dirname,'boys','viktor.json'),JSON.stringify({name:'Viktor',gender:'male'}));

    await fs.mkdir(path.join(__dirname,'girls'));

    await fs.appendFile(path.join(__dirname,'girls','vika.json'),JSON.stringify({name:'Vika',gender:'female'}));
    await fs.appendFile(path.join(__dirname,'girls','ivan.json'),JSON.stringify({name:'Ivan',gender:'male'}));
    await fs.appendFile(path.join(__dirname,'girls','natalia.json'),JSON.stringify({name:'Natalia',gender:'female'}));
};

const swapFiles = async (dirFrom,dirTo,swapValue) => {
    try {
        const pathDirFrom = path.join(__dirname, dirFrom)
        const pathDirTo = path.join(__dirname, dirTo)
        const files = await fs.readdir(pathDirFrom)

        for (const file of files) {
            const value = await fs.readFile(path.join(pathDirFrom, file));
            const valueToJSON = JSON.parse(value);

            if (valueToJSON.gender === swapValue) {
                await fs.rename(path.join(pathDirFrom, file), path.join(pathDirTo, file))
            }
        }
    }
    catch (e){
        console.log(e)
    }
};

module.exports = {
    addDirs,
    swapFiles
}