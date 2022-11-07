const path = require('node:path');
const fs = require('node:fs/promises');


(async() => {
    const DIR_PATH = path.resolve(__dirname, 'secret-folder');

    const readObjects = await fs.readdir(DIR_PATH, { withFileTypes: true });

    for (const readObject of readObjects) {
        if (readObject.isFile()) {
            const filePath = path.resolve(DIR_PATH, readObject.name);
            const { ext, name } = path.parse(filePath);
            const fileStat = await fs.stat(filePath);
            const clearExt = ext.replace('.', '');

            console.log(`${name} - ${clearExt} - ${fileStat.size}`);
        }
    }
})();