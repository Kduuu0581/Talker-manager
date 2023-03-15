const express = require('express');
const readFile = require('./utils/readFile');
const generateTolken = require('./utils/generateTolken');
const validateEmailPassword = require('./middleware/validateEmailPassword');
const checkToken = require('./middleware/checkToken');
const writeFile = require('./utils/writeFile');
const validationName = require('./middleware/validationName');
const validationAge = require('./middleware/validationAge');
const { validationTalk, validationRate } = require('./middleware/validationTalk');

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

// Requisito 3 - Crie o endpoint POST /login
// Requisito 4 - Adicione as validações para o endpoint /login
app.post('/login', validateEmailPassword, (request, response) => {
  const token = generateTolken();
  return response.status(HTTP_OK_STATUS).json({ token });
});

// Requisito 5 - Crie o endpoint POST /talker
app.use(checkToken);

app.post('/talker', validationName, validationAge, validationTalk, 
  validationRate, async (request, response) => {
  const { name, age, talk: { watchedAt, rate } } = request.body;
  const talkers = await readFile();
  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  talkers.push(newTalker);
  await writeFile(talkers);
  return response.status(201).json(newTalker);
});

// Requisito 6 - Crie o endpoint PUT /talker/:id
app.put('/talker/:id', validationName, validationAge, validationTalk,
  validationRate, checkToken, async (request, response) => {
  const { id } = request.params;
  const { name, age, talk: { watchedAt, rate } } = request.body;
  const talkers = await readFile();
  const talkerId = talkers.findIndex((talker) => talker.id === Number(id));
  if (!talkers[talkerId]) {
    return response.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  talkers[talkerId] = {
    id: Number(id),
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  await writeFile(talkers);
  return response.status(HTTP_OK_STATUS).json(talkers[talkerId]);
  });

app.listen(PORT, () => {
  console.log('Online');
});
