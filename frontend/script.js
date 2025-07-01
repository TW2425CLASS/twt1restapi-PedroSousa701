// JS para operações CRUD com Fetch API
const API_ALUNOS = 'https://twt1restapi-pedrosousa701-1.onrender.com/alunos';
const API_CURSOS = 'https://twt1restapi-pedrosousa701-1.onrender.com/cursos';

// ----------- ALUNOS -----------

let cursosCache = [];

function renderAlunos(alunos) {
  const alunosList = document.getElementById('alunos-list');
  alunosList.innerHTML = '';
  alunos.forEach(aluno => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <span>${aluno._id} - ${aluno.nome} ${aluno.apelido} (Curso: ${aluno.id_curso}, Ano ${aluno.anoCurricular})</span>
      <div>
        <button class="edit" onclick="editarAluno('${aluno._id}')">Editar</button>
        <button class="delete" onclick="apagarAluno('${aluno._id}')">Apagar</button>
      </div>
    `;
    alunosList.appendChild(div);
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
      document.getElementById('aluno-id').value = aluno._id;
      document.getElementById('aluno-id').readOnly = true; // <-- impede alterar o ID ao editar
      document.getElementById('aluno-nome').value = aluno.nome;
      document.getElementById('aluno-apelido').value = aluno.apelido;
      document.getElementById('aluno-curso').value = aluno.id_curso || '';
      document.getElementById('aluno-ano').value = aluno.anoCurricular;
    });
};

window.apagarAluno = function(id) {
  fetch(`${API_ALUNOS}/${id}`, { method: 'DELETE' })
    .then(carregarAlunos);
};

document.getElementById('aluno-form').onsubmit = async function(e) {
  e.preventDefault();
  const id = document.getElementById('aluno-id').value;
  const nome = document.getElementById('aluno-nome').value;
  const apelido = document.getElementById('aluno-apelido').value;
  const id_curso = document.getElementById('aluno-curso').value;
  const anoCurricular = document.getElementById('aluno-ano').value;

  if (!id || !nome || !apelido || !id_curso || isNaN(anoCurricular)) {
    alert('Preencha todos os campos!');
    return;
  }

  const aluno = { nome, apelido, id_curso, anoCurricular };

  // Verifica se o aluno já existe
  const res = await fetch(`${API_ALUNOS}/${id}`);
  if (res.ok) {
    // Atualizar (PUT)
    await fetch(`${API_ALUNOS}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    });
  } else {
    // Criar novo (POST)
    await fetch(API_ALUNOS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...aluno })
    });
  }

    carregarAlunos();
  e.target.reset();
  document.getElementById('aluno-id').value = '';
  document.getElementById('aluno-id').readOnly = false;
};

// ----------- CURSOS -----------

function renderCursos(cursos) {
  const cursosList = document.getElementById('cursos-list');
  cursosList.innerHTML = '';
  cursos.forEach(curso => {
    const div = document.createElement('div');
    div.className = 'item';
    div.innerHTML = `
      <span>${curso._id} - ${curso.nomeDoCurso}</span>
      <div>
        <button class="edit" onclick="editarCurso('${curso._id}')">Editar</button>
        <button class="delete" onclick="apagarCurso('${curso._id}')">Apagar</button>
      </div>
    `;
    cursosList.appendChild(div);
  });
}

function carregarCursos() {
  fetch(API_CURSOS)
    .then(res => res.json())
    .then(cursos => {
      renderCursos(cursos);
    });
}

window.apagarCurso = function(id) {
  fetch(`${API_CURSOS}/${id}`, { method: 'DELETE' })
    .then(carregarCursos);
};

window.editarCurso = function(id) {
  fetch(`${API_CURSOS}/${id}`)
    .then(res => res.json())
    .then(curso => {
      document.getElementById('curso-idCurso').value = curso._id;
      document.getElementById('curso-idCurso').readOnly = true; // impede alterar o ID ao editar
      document.getElementById('curso-nome').value = curso.nomeDoCurso;
    });
};

document.getElementById('curso-form').onsubmit = async function(e) {
  e.preventDefault();
  const idCurso = document.getElementById('curso-idCurso').value.trim();
  const nomeDoCurso = document.getElementById('curso-nome').value.trim();
  if (!idCurso || !nomeDoCurso) {
    alert('Preencha todos os campos do curso!');
    return;
  }

  // Verifica se o curso já existe
  const res = await fetch(`${API_CURSOS}/${idCurso}`);
  if (res.ok) {
    // Atualizar (PUT)
    await fetch(`${API_CURSOS}/${idCurso}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nomeDoCurso })
    });
  } else {
    // Criar novo (POST)
    await fetch(API_CURSOS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idCurso, nomeDoCurso })
    });
  }

  carregarCursos();
  e.target.reset();
  document.getElementById('curso-idCurso').readOnly = false;
};

// Inicialização
carregarAlunos();
carregarCursos();