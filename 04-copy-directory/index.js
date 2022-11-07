const path = require('node:path');
const fs = require('node:fs/promises');


const copyDir = async () => {
    const SRC_DIR_PATH = path.resolve(__dirname, 'files');
    const DEST_DIR_PATH = path.resolve(__dirname, 'files-copy');

    await fs.rm(DEST_DIR_PATH, { recursive: true, force: true });
    await fs.mkdir(DEST_DIR_PATH, { recursive: true });
    const readObjects = await fs.readdir(SRC_DIR_PATH, { withFileTypes: true });

    for (const readObject of readObjects) {
        if (readObject.isFile()) {
            const srcFilePath = path.resolve(SRC_DIR_PATH, readObject.name);
            const destFilePath = path.resolve(DEST_DIR_PATH, readObject.name);

            await fs.copyFile(srcFilePath, destFilePath);
        }
    }
};

copyDir();
