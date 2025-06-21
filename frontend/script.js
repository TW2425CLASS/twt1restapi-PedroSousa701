// JS para operações CRUD com Fetch API
const alunosList = document.getElementById('alunos-list');
const cursosList = document.getElementById('cursos-list');

const API_ALUNOS = 'http://localhost:3000/alunos';
const API_CURSOS = 'http://localhost:3000/cursos';

let isEditingAluno = false;
let isEditingCurso = false;

// ----------- ALUNOS -----------
function renderAlunos(alunos) {
  alunosList.innerHTML = '';
  alunos.forEach(a => {
    const el = document.createElement('div');
    el.className = 'item';
    el.innerHTML = `
      ID: ${a.id}, Nome: ${a.nome}, Apelido: ${a.apelido}, CursoID: ${a.curso}
      <div>
        <button class="edit" onclick="editarAluno('${a.id}')">Edit</button>
        <button class="delete" onclick="apagarAluno('${a.id}')">Delete</button>
      </div>`;
    alunosList.appendChild(el);
  });
}

function carregarAlunos() {
  fetch(API_ALUNOS)
    .then(res => res.json())
    .then(renderAlunos);
}

window.editarAluno = function(id) {
  fetch(`${API_ALUNOS}/${id}`)
    .then(res => res.json())
    .then(aluno => {
      document.getElementById('aluno-id').value = aluno.id;
      document.getElementById('aluno-nome').value = aluno.nome;
      document.getElementById('aluno-apelido').value = aluno.apelido;
      document.getElementById('aluno-curso-id').value = aluno.curso;
      isEditingAluno = true;
    });
};

window.apagarAluno = function(id) {
  fetch(`${API_ALUNOS}/${id}`, { method: 'DELETE' })
    .then(carregarAlunos);
};

document.getElementById('aluno-form').onsubmit = e => {
  e.preventDefault();
  const id = document.getElementById('aluno-id').value;
  const nome = document.getElementById('aluno-nome').value;
  const apelido = document.getElementById('aluno-apelido').value;
  const curso = Number(document.getElementById('aluno-curso-id').value);

  const aluno = { id, nome, apelido, curso };

  if (isEditingAluno) {
    fetch(`${API_ALUNOS}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    }).then(() => {
      e.target.reset();
      isEditingAluno = false;
      carregarAlunos();
    });
  } else {
    fetch(API_ALUNOS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    }).then(() => {
      e.target.reset();
      carregarAlunos();
    });
  }
};

// ----------- CURSOS -----------
function renderCursos(cursos) {
  cursosList.innerHTML = '';
  cursos.forEach(c => {
    const el = document.createElement('div');
    el.className = 'item';
    el.innerHTML = `
      ID: ${c.id}, Nome do Curso: ${c.nomeDoCurso}
      <div>
        <button class="edit" onclick="editarCurso('${c.id}')">Edit</button>
        <button class="delete" onclick="apagarCurso('${c.id}')">Delete</button>
      </div>
    `;
    cursosList.appendChild(el);
  });
}

function carregarCursos() {
  fetch(API_CURSOS)
    .then(res => res.json())
    .then(renderCursos);
}

window.editarCurso = function(id) {
  fetch(`${API_CURSOS}/${id}`)
    .then(res => res.json())
    .then(curso => {
      document.getElementById('curso-id').value = curso.id;
      document.getElementById('curso-nome').value = curso.nomeDoCurso;
      isEditingCurso = true;
    });
};

window.apagarCurso = function(id) {
  fetch(`${API_CURSOS}/${id}`, { method: 'DELETE' })
    .then(carregarCursos);
};

document.getElementById('curso-form').onsubmit = e => {
  e.preventDefault();
  const id = document.getElementById('curso-id').value;
  const nomeDoCurso = document.getElementById('curso-nome').value;

  const curso = { id, nomeDoCurso };

  if (isEditingCurso) {
    fetch(`${API_CURSOS}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(curso)
    }).then(() => {
      e.target.reset();
      isEditingCurso = false;
      carregarCursos();
    });
  } else {
    fetch(API_CURSOS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(curso)
    }).then(() => {
      e.target.reset();
      carregarCursos();
    });
  }
};

// Inicialização
carregarAlunos();
carregarCursos();