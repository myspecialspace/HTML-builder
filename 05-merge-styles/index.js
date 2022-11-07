const path = require('node:path');
const fs = require('node:fs/promises');


(async () => {
    const STYLES_DIR_PATH = path.resolve(__dirname, 'styles');
    const BUNDLE_PATH = path.resolve(__dirname, 'project-dist/bundle.css');

    await fs.rm(BUNDLE_PATH, { recursive: true, force: true });

    const readObjects = await fs.readdir(STYLES_DIR_PATH, { withFileTypes: true });

    for (const readObject of readObjects) {
        if (readObject.isFile()) {
            const filePath = path.resolve(STYLES_DIR_PATH, readObject.name);
            const parsedPath = path.parse(filePath);

            if (parsedPath.ext === '.css') {
                const content = await fs.readFile(filePath, { encoding: 'utf8' });
                await fs.appendFile(BUNDLE_PATH, content + '\n', { encoding: 'utf8' });
            }
        }
    }
})();
