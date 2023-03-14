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

app.get('/talker', async (request, response) => {
   const talkers = await readFile();
    return response.status(HTTP_OK_STATUS).json(talkers); 
});

app.listen(PORT, () => {
  console.log('Online');
});
