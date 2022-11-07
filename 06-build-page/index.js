const path = require('node:path');
const fs = require('node:fs/promises');

const PROJECT_DIST_PATH = path.resolve(__dirname, 'project-dist');

const main = async () => {
    createDirs();
    buildHtml();
    buildStyles();
    buildAssets();
};


const createDirs = async() => {
    await fs.mkdir(PROJECT_DIST_PATH, { recursive: true });
};

const buildHtml = async () => {
    const TEMPLATE_PATH = path.resolve(__dirname, 'template.html');
    const COMPONENTS_PATH = path.resolve(__dirname, 'components');
    const INDEX_HTML_PATH = path.resolve(PROJECT_DIST_PATH, 'index.html');

    const templateContent = await fs.readFile(TEMPLATE_PATH, { encoding: 'utf8' });

    const pattern = /{{(.*?)}}/g;

    let currentMatch;
    let nextContent = templateContent;

    while(currentMatch = pattern.exec(templateContent)) {
        const name = currentMatch[1];
        const filename = name + '.html';
        const templatePath = path.resolve(COMPONENTS_PATH, filename);
        const fileContent = await fs.readFile(templatePath, { encoding: 'utf8' });
        nextContent = nextContent.replace(currentMatch[0], fileContent);
    }

    await fs.writeFile(INDEX_HTML_PATH, nextContent, { encoding: 'utf8' });
}

const buildStyles = async () => {
    const STYLES_DIR_PATH = path.resolve(__dirname, 'styles');
    const BUNDLE_PATH = path.resolve(PROJECT_DIST_PATH, 'style.css');

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
}

const buildAssets = async () => {
    const SRC_DIR_PATH = path.resolve(__dirname, 'assets');
    const DEST_DIR_PATH = path.resolve(PROJECT_DIST_PATH, 'assets');

    await copyDirectory(SRC_DIR_PATH, DEST_DIR_PATH);
};

const copyDirectory = async (from, to) => {
    await fs.rm(to, { recursive: true, force: true });
    await fs.mkdir(to, { recursive: true });
    const readObjects = await fs.readdir(from, { withFileTypes: true });

    for (const readObject of readObjects) {
        const srcPath = path.resolve(from, readObject.name);
        const destPath = path.resolve(to, readObject.name);

        if (readObject.isFile()) {
            await fs.copyFile(srcPath, destPath);
        } else if (readObject.isDirectory()) {
            copyDirectory(srcPath, destPath);
        }
    }
};


main();