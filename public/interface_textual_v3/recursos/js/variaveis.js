//Use as setas cima e baixo para navegar entre as opções. Utilize Enter para confirmar uma opção, e Esc para voltar.

var frasesDoNarrador = {
  "boasvindas": "Bem-vindo! Pressione a tecla CONTROL para obter ajuda.",
  "preopcao": "Opção atual: ",
  "posopcao": "Pressione Enter para confirmar.",
  "ajuda": "Utilize as teclas cima e baixo para navegar entre as opções. Use Enter para confirmar uma opção e Esc para retornar ao menu anterior. A qualquer momento utilize Tab para ir ao Menu Principal e Control para obter ajuda."
};

var diagrama = {"listaElementos":[],"listaConexoes":[]};

try {
  var saved_diagram = JSON.parse(localStorage.getItem('diagrama'));
  if(saved_diagram.listaElementos && saved_diagram.listaConexoes) {
    diagrama = saved_diagram
  }
} catch (e) {
  // ignore
} finally {
  localStorage.removeItem('diagram');
}

var menuAtual_tamanho;
var menuAtual_opcaoAtual;
var menuAtual;
var teclasStatus = {"cima":false,"baixo":false,"enter":false,"escape":false,"tab":false,"control":false};
var codigoProxElemento = 0;

var idAuxiliar = {"elementoA":0,"elementoB":0,"indexConexao":-1};

function menuPrincipal(){
  return {
  "nome":"Menu Principal",
  "tipo": "menu",
  "menuAnteriorFuncao":"menuPrincipal",
  "opcoes":[
    {
      "funcao":"menuCriarEntidade",
      "msg":"Criar entidade"
    },
    {
      "funcao":"navegarEntidades",
      "msg":"Navegar nas entidades"
    },
    {
      "funcao":"exportarParaInterfaceGrafica",
      "msg":"Exportar para Interface Gráfica"
    },
        {
      "funcao":"funcaoNaoImplementada",
      "msg":"Alterar nome do diagrama"
    },
    {
      "funcao":"funcaoNaoImplementada",
      "msg":"Compartilhar diagrama"
    },
    {
      "funcao":"funcaoNaoImplementada",
      "msg":"Sair"
    }
  ]};
}
