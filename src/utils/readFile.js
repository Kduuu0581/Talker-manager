const fs = require('fs').promises;
const path = require('path');

const pathTalker = path.resolve(__dirname, '../talker.json');

module.exports = async () => {
    try {
        const data = await fs.readFile(pathTalker);
        return JSON.parse(data);
    } catch (error) {
        console.error(`Erro na leitura do arquivo: ${error}`);
    }
};