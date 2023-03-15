const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');

module.exports = async (data) => {
    await fs.writeFile(talkerPath, JSON.stringify(data));
};