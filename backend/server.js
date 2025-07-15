const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Liga ao MongoDB Atlas
mongoose.connect('mongodb+srv://Pedro:pedro@cluster0.zskbh29.mongodb.net/TW', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Modelos
const Aluno = mongoose.model('Aluno', new mongoose.Schema({
  _id: { type: String, required: true }, // usa o id manual como _id
  nome: String,
  apelido: String,
  id_curso: String,
  anoCurricular: Number,
}));

const Curso = mongoose.model('Curso', new mongoose.Schema({
  _id: { type: String, required: true }, // usa o idCurso manual como _id
  nomeDoCurso: String,
}));

// ----------- ENDPOINTS ALUNOS -----------

// Listar todos os alunos
app.get('/alunos', async (req, res) => {
  const alunos = await Aluno.find();
  res.json(alunos);
});

// Obter aluno por ID
app.get('/alunos/:id', async (req, res) => {
  const aluno = await Aluno.findById(req.params.id);
  if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
  res.json(aluno);
});

// Adicionar aluno
app.post('/alunos', async (req, res) => {
  req.body.anoCurricular = Number(req.body.anoCurricular);
  if (
    !req.body.id ||
    !req.body.nome ||
    !req.body.apelido ||
    !req.body.id_curso ||
    isNaN(req.body.anoCurricular)
  ) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  // Mapeia id para _id
  const aluno = new Aluno({
    _id: req.body.id,
    nome: req.body.nome,
    apelido: req.body.apelido,
    id_curso: req.body.id_curso,
    anoCurricular: req.body.anoCurricular
  });
  await aluno.save();
  res.status(201).json(aluno);
});

// Editar aluno
app.put('/alunos/:id', async (req, res) => {
  req.body.anoCurricular = Number(req.body.anoCurricular);
  const aluno = await Aluno.findByIdAndUpdate(
    req.params.id,
    {
      nome: req.body.nome,
      apelido: req.body.apelido,
      id_curso: req.body.id_curso,
      anoCurricular: req.body.anoCurricular
    },
    { new: true }
  );
  if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
  res.json(aluno);
});

// Apagar aluno
app.delete('/alunos/:id', async (req, res) => {
  const aluno = await Aluno.findByIdAndDelete(req.params.id);
  if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });
  res.status(204).end();
});

// ----------- ENDPOINTS CURSOS -----------

// Listar todos os cursos
app.get('/cursos', async (req, res) => {
  const cursos = await Curso.find();
  res.json(cursos);
});

// Obter curso por ID
app.get('/cursos/:id', async (req, res) => {
  const curso = await Curso.findById(req.params.id);
  if (!curso) return res.status(404).json({ error: 'Curso não encontrado' });
  res.json(curso);
});

// Adicionar curso
app.post('/cursos', async (req, res) => {
  console.log('REQ BODY:', req.body); // <-- Adiciona esta linha
  if (!req.body.idCurso || !req.body.nomeDoCurso) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  const curso = new Curso({
    _id: req.body.idCurso,
    nomeDoCurso: req.body.nomeDoCurso
  });
  await curso.save();
  res.status(201).json(curso);
});

// Editar curso
app.put('/cursos/:id', async (req, res) => {
  const curso = await Curso.findByIdAndUpdate(
    req.params.id,
    { nomeDoCurso: req.body.nomeDoCurso },
    { new: true }
  );
  if (!curso) return res.status(404).json({ error: 'Curso não encontrado' });
  res.json(curso);
});

// Apagar curso
app.delete('/cursos/:id', async (req, res) => {
  const curso = await Curso.findByIdAndDelete(req.params.id);
  if (!curso) return res.status(404).json({ error: 'Curso não encontrado' });
  res.status(204).end();
});

// Endpoint raiz para mostrar mensagem personalizada
app.get('/', (req, res) => {
  res.send('API TWT1 REST API ativa!');
});

// Arranca o servidor
app.listen(3000, () => console.log('API real a correr na porta 3000'));