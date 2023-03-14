const express = require('express');
const readFile = require('./utils/readFile');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

// Requisito 1 - Crie o endpoint GET /talker
app.get('/talker', async (request, response) => {
   const talkers = await readFile();
    return response.status(HTTP_OK_STATUS).json(talkers); 
});

// Requisito 2 - Crie o endpoint GET /talker/:id
app.get('/talker/:id', async (request, response) => {
  const { id } = request.params;
  const talkers = await readFile();
  const talkerId = talkers.find((talker) => talker.id === Number(id));
  if (!talkerId) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return response.status(HTTP_OK_STATUS).json(talkerId);
});

app.listen(PORT, () => {
  console.log('Online');
});
