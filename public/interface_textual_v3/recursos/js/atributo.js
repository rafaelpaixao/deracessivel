function menuCriarAtributo() {
  return {
    "menuAnteriorFuncao": "menuAcessarEntidade",
    "menuAnteriorParametro": idAuxiliar.entidadeA,
    "tipo": "entrada",
    "opcoes": [
      {
        "funcao": "criarAtributo",
        "msg": "Digite o nome do atributo e pressione Enter"
      }
    ]
  };
}

function criarAtributo() {
  var nome = getTextoDaEntrada();
  if (nome.length > 0) {
    var idAtributo = codigoProxElemento++;
    diagrama.listaElementos.push({
      "tipo": "Atributo",
      "variacao": "Normal",
      "nome": nome,
      "posX": 0,
      "posY": 0,
      "codigo": idAtributo
    });
    diagrama.listaConexoes.push({
      "elementoA": idAuxiliar.entidadeA,
      "elementoB": idAtributo,
      "cardinalidadeA": "-1",
      "cardinalidadeB": "-1"
    });
    saidaNarrador("Atributo " + nome + " criado!");
    saidaDiagrama();
  } else saidaNarrador("Não foi possível criar o atributo.");
  return executaFuncaoPeloNome(menuAtual.menuAnteriorFuncao, menuAtual.menuAnteriorParametro);
}

function navegarAtributos() {
  var array = [];
  for (var i = 0; i < diagrama.listaConexoes.length; i++) {
    if (diagrama.listaConexoes[i].cardinalidadeA == "-1" && diagrama.listaConexoes[i].cardinalidadeB == "-1") {
      if (diagrama.listaConexoes[i].elementoA == idAuxiliar.entidadeA) {
        array.push(diagrama.listaElementos[diagrama.listaConexoes[i].elementoB]);
      } else if (diagrama.listaConexoes[i].elementoB == idAuxiliar.entidadeA) {
        array.push(diagrama.listaElementos[diagrama.listaConexoes[i].elementoA]);
      }
    }
  }
  if (array.length > 0) {
    var menu = {
      "menuAnteriorFuncao": "menuAcessarEntidade",
      "menuAnteriorParametro": idAuxiliar.entidadeA,
      "tipo": "menu",
      "opcoes": []
    };
    for (var i = 0; i < array.length; i++) {
      menu.opcoes.push(
        {
          "funcao": "menuAcessarAtributo",
          "parametro": array[i].codigo,
          "msg": "Atributo " + array[i].nome
        }
      );
    }
    return menu;
  }
  else {
    saidaNarrador("A entidade não possui atributos.");
    return menuAtual;
  }
}

function menuAcessarAtributo(idAtributo) {
  idAuxiliar.entidadeB = idAtributo;
  return {
    "nome": "Menu do Atributo " + diagrama.listaElementos[idAtributo].nome,
    "menuAnteriorFuncao": "navegarAtributos",
    "tipo": "menu",
    "opcoes": [
      {
        "funcao": "menuAlterarNomeAtributo",
        "msg": "Alterar nome"
      }
    ]
  };
}

function menuAlterarNomeAtributo() {
  limpaEntrada();
  return {
    "menuAnteriorFuncao": "menuAcessarAtributo",
    "menuAnteriorParametro": idAuxiliar.entidadeB,
    "tipo": "menu",
    "opcoes": [
      {
        "funcao": "alterarNomeAtributo",
        "msg": "Digite o novo nome do Atributo e pressione Enter"
      }
    ]
  };
}

function alterarNomeAtributo() {
  var novoNome = getTextoDaEntrada();
  if (novoNome.length > 0) {
    diagrama.listaElementos[idAuxiliar.entidadeB].nome = novoNome;
    saidaNarrador("Atributo renomeado para " + novoNome + "!");
    saidaDiagrama();
  } else saidaNarrador("Não foi possível renomear o atributo.");
  return executaFuncaoPeloNome(menuAtual.menuAnteriorFuncao, menuAtual.menuAnteriorParametro);
}
