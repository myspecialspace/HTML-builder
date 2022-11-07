const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');
const readline = require('node:readline');

const FILE_NAME = 'myfile.txt';
const FILE_PATH = path.resolve(__dirname, FILE_NAME);

(async () => {
    const writeStream = fs.createWriteStream(FILE_PATH, { encoding: 'utf-8' });
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    readline.emitKeypressEvents(process.stdin);

    const stop = () => {
        rl.close();
        writeStream.close();
        console.log('Спасибо и досвидания!');
    };

    rl.on('line', (input) => {
        if ((input || input.trim()) === 'exit') {
            stop();
        } else {
            writeStream.write(input + '\n');
        }
    });

    process.stdin.on('keypress', (_, key) => {
        if (key.name === 'c' && key.ctrl) {
            stop();
        }
    });

    console.log('Введите Ваше сообщение:');

})();