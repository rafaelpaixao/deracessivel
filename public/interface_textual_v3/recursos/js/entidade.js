function menuCriarEntidade() {
  limpaEntrada();

  return {
    "menuAnteriorFuncao": "menuPrincipal",
    "tipo": "entrada",
    "opcoes": [
      {
        "funcao": "criarEntidade",
        "msg": "Digite o nome da entidade e pressione Enter"
      }
    ]
  };
}

function criarEntidade() {
  var nome = getTextoDaEntrada();
  if (nome.length > 0) {
    diagrama.listaElementos.push({
      "tipo": "Entidade",
      "variacao": "Normal",
      "nome": nome,
      "posX": 0,
      "posY": 0,
      "codigo": codigoProxElemento++
    });
    saidaNarrador("Entidade " + nome + " criada!");
    saidaDiagrama();
  } else saidaNarrador("Não foi possível criar a entidade.");
  return executaFuncaoPeloNome(menuAtual.menuAnteriorFuncao, menuAtual.menuAnteriorParametro);
}

function navegarEntidades() {
  var array = [];
  for (var i = 0; i < diagrama.listaElementos.length; i++) {
    if (diagrama.listaElementos[i].tipo == "Entidade") {
      array.push(diagrama.listaElementos[i]);
    }
  }
  if (array.length > 0) {
    var menu = {
      "menuAnteriorFuncao": "menuPrincipal",
      "tipo": "menu",
      "opcoes": []
    };
    for (var i = 0; i < array.length; i++) {
      menu.opcoes.push(
        {
          "funcao": "menuAcessarEntidade",
          "parametro": array[i].codigo,
          "msg": "Entidade " + array[i].nome
        }

      );
    }
    return menu;
  }
  else {
    saidaNarrador("O diagrama não possui entidades.");
    return menuAtual;
  }
}

function menuAcessarEntidade(idEntidade) {
  idAuxiliar.entidadeA = idEntidade;
  return {
    "nome": "Menu da entidade " + diagrama.listaElementos[idAuxiliar.entidadeA].nome,
    "menuAnteriorFuncao": "navegarEntidades",
    "menuAnteriorParametro": "",
    "tipo": "menu",
    "opcoes": [
      {
        "funcao": "menuAlterarNomeEntidade",
        "msg": "Alterar nome",
      },
      {
        "funcao": "menuCriarAtributo",
        "msg": "Criar atributo",
      },
      {
        "funcao": "navegarAtributos",
        "msg": "Navegar nos atributos",
      },
      {
        "funcao": "menuCriarRelacionamento",
        "msg": "Criar relacionamento",
      },
      {
        "funcao": "navegarRelacionamentos",
        "msg": "Navegar nos relacionamentos",
      }
    ]
  };
}

function menuAlterarNomeEntidade() {
  return {
    "menuAnteriorFuncao": "menuAcessarEntidade",
    "menuAnteriorParametro": idAuxiliar.entidadeA,
    "tipo": "entrada",
    "opcoes": [
      {
        "funcao": "alterarNomeEntidade",
        "msg": "Digite o novo nome da entidade e pressione Enter"
      }
    ]
  };
}

function alterarNomeEntidade() {
  var novoNome = getTextoDaEntrada();
  if (novoNome.length > 0) {
    diagrama.listaElementos[idAuxiliar.entidadeA].nome = novoNome;
    saidaNarrador("Entidade renomeada para " + novoNome + "!");
    saidaDiagrama();
  } else saidaNarrador("Não foi possível renomear a entidade.");
  return executaFuncaoPeloNome(menuAtual.menuAnteriorFuncao, menuAtual.menuAnteriorParametro);
}
