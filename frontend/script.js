// JS para operações CRUD com Fetch API
const alunosList = document.getElementById('alunos-list');
const cursosList = document.getElementById('cursos-list');

// Fetch inicial (simulação com dados locais)
let alunos = [
  { id: 3, nome: 'André', apelido: 'Neto', cursoId: 101 },
  { id: 4, nome: 'Tiago', apelido: 'Castro', cursoId: 102 },
  { id: 2, nome: 'Pedro', apelido: 'Sousa', cursoId: 103 },
  { id: 5, nome: 'Sonia', apelido: 'Tavares', cursoId: 104 }
];
// qualquer coisa

let cursos = [
  { id: 101, nome: 'RC' },
  { id: 102, nome: 'ECGM' },
  { id: 103, nome: 'M' },
  { id: 104, nome: 'SIRC' }
];

function renderAlunos() {
  alunosList.innerHTML = '';
  alunos.forEach(a => {
    const el = document.createElement('div');
    el.className = 'item';
    el.innerHTML = `
      ID: ${a.id}, Nome: ${a.nome}, Apelido: ${a.apelido}, CursoID: ${a.cursoId}
      <div>
        <button onclick="EditarAluno(${a.id})">Editar</button>
        <button onclick="ApagarAluno(${a.id})">Apagar</button>
      </div>`;
    alunosList.appendChild(el);
  });
}

function renderCursos() {
  cursosList.innerHTML = '';
  cursos.forEach(c => {
    const el = document.createElement('div');
    el.className = 'item';
    el.innerHTML = `
      ID: ${c.id}, Nome do Curso: ${c.nome}
      <div>
        <button onclick="EditarCurso(${c.id})">Editar</button>
        <button onclick="ApagarCurso(${c.id})">Apagar</button>
      </div>`;
    cursosList.appendChild(el);
  });
}

document.getElementById('aluno-form').onsubmit = e => {
  e.preventDefault();
  const id = parseInt(document.getElementById('aluno-id').value);
  const nome = document.getElementById('aluno-nome').value;
  const apelido = document.getElementById('aluno-apelido').value;
  const cursoId = parseInt(document.getElementById('aluno-curso-id').value);

  if (id) {
    const aluno = alunos.find(a => a.id === id);
    aluno.nome = nome;
    aluno.apelido = apelido;
    aluno.cursoId = cursoId;
  } else {
    const novoId = Math.max(...alunos.map(a => a.id), 0) + 1;
    alunos.push({ id: novoId, nome, apelido, cursoId });
  }

  e.target.reset();
  renderAlunos();
};

document.getElementById('curso-form').onsubmit = e => {
  e.preventDefault();
  const id = parseInt(document.getElementById('curso-id').value);
  const nome = document.getElementById('curso-nome').value;

  const cursoExistente = cursos.find(c => c.id === id);
  if (cursoExistente) {
    cursoExistente.nome = nome;
  } else {
    cursos.push({ id, nome });
  }

  e.target.reset();
  renderCursos();
};

function EditarAluno(id) {
  const aluno = alunos.find(a => a.id === id);
  document.getElementById('aluno-id').value = aluno.id;
  document.getElementById('aluno-nome').value = aluno.nome;
  document.getElementById('aluno-apelido').value = aluno.apelido;
  document.getElementById('aluno-curso-id').value = aluno.cursoId;
}

function ApagarAluno(id) {
  alunos = alunos.filter(a => a.id !== id);
  renderAlunos();
}

function EditarCurso(id) {
  const curso = cursos.find(c => c.id === id);
  document.getElementById('curso-id').value = curso.id;
  document.getElementById('curso-nome').value = curso.nome;
}

function ApagarCurso(id) {
  cursos = cursos.filter(c => c.id !== id);
  renderCursos();
}

renderAlunos();
renderCursos();
