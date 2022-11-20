
function saida(n,s){
  var e = $("#textarea_"+n);
  e.val(e.val()+"\n"+s);
  if(e.length)
  e.scrollTop(e[0].scrollHeight - e.height());
}

function saidaTeclas(s){
  saida("teclas",s);
}

function saidaNarrador(s){
  narrador.fila.push(s);
}

function saidaDiagrama(){
  $("#jjson").jJsonViewer(JSON.stringify(diagrama));
}

$('#entrada').on('blur',function () {
  var e = $(this);
  setTimeout(function() {
    e.focus()
  }, 10);
});

function liberarTeclas(){
  teclasStatus.cima = true;
  teclasStatus.baixo = true;
  teclasStatus.escape = true;
  teclasStatus.enter = true;
  teclasStatus.tab = true;
  teclasStatus.control = true;
}

function bloquearTeclas(){
  teclasStatus.cima = false;
  teclasStatus.baixo = false;
  teclasStatus.escape = false;
  teclasStatus.enter = false;
  teclasStatus.tab = false;
  teclasStatus.control = false;
}

function liberaTecla(t){teclasStatus.t = true};

function bloqueiaTecla(t){teclasStatus.t = false};

function funcaoNaoImplementada(){
  saidaNarrador("Função ainda não implementada!");
  carregarMenu("menuPrincipal","");
}

function vaiParaOpcaoSeguinte(){
  if(menuAtual_opcaoAtual<menuAtual_tamanho) menuAtual_opcaoAtual++;
  narrador.parar();
  carregaOpcaoAtual();
}

function vaiParaOpcaoAnterior(){
  if(menuAtual_opcaoAtual>0) menuAtual_opcaoAtual--;
  narrador.parar();
  carregaOpcaoAtual();
}

function executaOpcaoAtual(){
  narrador.parar();
  carregarMenu(menuAtual.opcoes[menuAtual_opcaoAtual].funcao,menuAtual.opcoes[menuAtual_opcaoAtual].parametro);
  limpaEntrada();
}

function executaOpcaoSelecionada(index){
  narrador.parar();
  carregarMenu(menuAtual.opcoes[index].funcao,menuAtual.opcoes[index].parametro);
  limpaEntrada();
}

function vaiParaMenuAnterior(){
  narrador.parar();
  carregarMenu(menuAtual.menuAnteriorFuncao,menuAtual.menuAnteriorParametro);
}

function executaFuncaoPeloNome(nome,parametro){
  return window[nome](parametro);
}

function carregaOpcaoAtual(){
  saidaNarrador(frasesDoNarrador.preopcao + menuAtual.opcoes[menuAtual_opcaoAtual].msg);
  narrador.falar();
  setMenuFisicoDestaque(menuAtual_opcaoAtual);
}



$( "body" ).keydown(function( event ) {
  saidaTeclas(event.keyCode+" - "+event.key);
  switch(event.keyCode){
    case 9: //tecla tab
    event.preventDefault();
    if(teclasStatus.tab) vaiParaMenuPrincipal();
    break;
    case 13: //tecla enter
    event.preventDefault();
    if(teclasStatus.enter) executaOpcaoAtual();
    break;
    case 17: //tecla control
    if(teclasStatus.control) executaAjuda();
    break;
    case 27: //tecla escape
    event.preventDefault();
    if(teclasStatus.escape) vaiParaMenuAnterior();
    break;
    case 37:// tecla esquerda
    event.preventDefault();
    break;
    case 38:// tecla cima
    event.preventDefault();
    if(teclasStatus.cima) vaiParaOpcaoAnterior();
    break;
    case 39:// tecla direita
    event.preventDefault();
    break;
    case 40://tecla baixo
    event.preventDefault();
    if(teclasStatus.baixo) vaiParaOpcaoSeguinte();
    break;
  }
});

function limpaEntrada(){
  $("#entrada").val("");
}

function getTextoDaEntrada(){
  var texto = $("#entrada").val();
  return texto;
}

function pegaElementoPeloId(idProcurado){
  for(var i=0; i<diagrama.listaElementos.length; i++){
    if(diagrama.listaElementos[i].codigo==idProcurado){
      return diagrama.listaElementos[i];
    }
  }
}

function recebeIdRetornaIndex(idProcurado){
  for(var i=0; i<diagrama.listaElementos.length; i++){
    if(diagrama.listaElementos[i].codigo==idProcurado){
      return i;
    }
  }
}

function vaiParaMenuPrincipal(){
  narrador.parar();
  carregarMenu("menuPrincipal","");
}

function executaAjuda(){
  narrador.parar();
  saidaNarrador("\n"+frasesDoNarrador.ajuda);
  narrador.falar();
}