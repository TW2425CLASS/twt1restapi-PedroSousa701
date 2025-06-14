// JS para operações CRUD com Fetch API
const alunos = [
  {
    nome: "Pedro",
    apelido: "Sousa",
    curso: 1,
    anoCurricular: 2,
    idade: 21
  },
  {
    id: "05e2",
    nome: "Manuel",
    apelido: "Sousa",
    curso: 2,
    anoCurricular: 3,
    idade: 20
  }
];

const cursos = [
  {
    id: 1,
    nomeDoCurso: "Engenharia da Computação Gráfica e Multimédia"
  },
  {
    id: 2,
    nomeDoCurso: "Engenharia de Redes e Sistemas de Computadores"
  }
];

renderAlunos();
renderCursos();