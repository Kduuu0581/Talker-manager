const express = require('express');
const { readTalkerFile } = require('../utils/fs');

const router = express.Router();

router.use(express.json());

router.get('/', async (request, response) => {
    const data = await readTalkerFile();
    return response.status(200).json(data);
});

router.get('/:id', async (request, response) => {
    const { id } = request.params;
    const data = await readTalkerFile();
    const talker = data.find(({ id: findId }) => findId.id === Number(id));
    if (!talker) {
        return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return response.status(200).json(talker);
});

module.exports = router;