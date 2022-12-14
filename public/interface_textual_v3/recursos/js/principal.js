$(document).ready(function(){
  loadingSai();
  $("#entrada").focus();
  saidaDiagrama();
  narrador.carregar();
  saidaNarrador(frasesDoNarrador.boasvindas);
  vaiParaMenuPrincipal();
  liberarTeclas();
});

function carregarMenu(funcao,parametro){
  menu = executaFuncaoPeloNome(funcao,parametro);
  if (typeof menu.nome !== 'undefined') {
    saidaNarrador("\n"+menu.nome+".");
    setMenuFisicoTitulo(menu.nome);
  }
  menuAtual_tamanho = menu.opcoes.length-1;
  menuAtual_opcaoAtual = 0;
  menuAtual = menu;
  setMenuFisicoConteudo(menu);
  carregaOpcaoAtual();
}

function exportarParaInterfaceGrafica(){
  if (diagrama.listaElementos.length > 0){
    loadingEntra();
    localStorage.setItem('diagrama', JSON.stringify(diagrama));
    window.location.href = '/interface_grafica_v4';
  }else{
    return false;
  }
}