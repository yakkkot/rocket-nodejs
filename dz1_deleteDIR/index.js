const fs = require('node:fs/promises');
const path = require('node:path');

const deleteFolder = async (dir) => {
    try {
        const infoAboutDir = await fs.readdir(dir, {withFileTypes: true});
        for (const dirOrFile of infoAboutDir) {
            const fullPath = path.join(dir, dirOrFile.name);
            if (dirOrFile.isDirectory()) {
                await deleteFolder(fullPath);
            } else await fs.unlink(fullPath);
        }
        await fs.rmdir(dir);

    }catch (e) {
        if (e.code === 'ENOTDIR') await fs.unlink(dir)
        console.log(e);
    }
}


module.exports = {
    deleteFolder
}
