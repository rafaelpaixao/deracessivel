function menuCriarRelacionamento() {
    return {
        "menuAnteriorFuncao": "menuAcessarEntidade",
        "menuAnteriorParametro": idAuxiliar.entidadeA,
        "tipo": "entrada",
        "opcoes": [
            {
                "funcao": "criarRelacionamento",
                "msg": "Digite o nome do relacionamento e pressione Enter"
            }
        ]
    };
}

function criarRelacionamento() {
    var nome = getTextoDaEntrada();
    if (nome.length > 0) {
        idRelacionamento = codigoProxElemento++;
        diagrama.listaElementos.push({
            "tipo": "Relacionamento",
            "variacao": "Normal",
            "nome": nome,
            "posX": 0,
            "posY": 0,
            "codigo": idRelacionamento
        });
        diagrama.listaConexoes.push({
            "elementoA": idAuxiliar.entidadeA,
            "elementoB": idRelacionamento,
            "cardinalidadeA": "1",
            "cardinalidadeB": "1"
        });
        saidaNarrador("Relacionamento " + nome + " criado!");
        saidaDiagrama();
        return executaFuncaoPeloNome("menuAcessarRelacionamento", idRelacionamento);
    } else {
        saidaNarrador("Não foi possível criar o relacionamento.");
        return executaFuncaoPeloNome(menuAtual.menuAnteriorFuncao, menuAtual.menuAnteriorParametro);
    }

}

function navegarRelacionamentos() {
    var array = [];
    for (var i = 0; i < diagrama.listaConexoes.length; i++) {
        if (diagrama.listaConexoes[i].cardinalidadeA != "-1" && diagrama.listaConexoes[i].cardinalidadeB != "-1") {
            if (diagrama.listaConexoes[i].elementoA == idAuxiliar.entidadeA) {
                array.push(diagrama.listaElementos[diagrama.listaConexoes[i].elementoB]);
            } else if (diagrama.listaConexoes[i].elementoB == idAuxiliar.entidadeA) {
                array.push(diagrama.listaElementos[diagrama.listaConexoes[i].elementoA]);
            }
        }
    }
    if (array.length > 0) {
        var menu = {
            "nome":"Relacionamentos da Entidade "+diagrama.listaElementos[recebeIdRetornaIndex(idAuxiliar.elementoA)].nome,
            "menuAnteriorFuncao": "menuAcessarEntidade",
            "menuAnteriorParametro": idAuxiliar.entidadeA,
            "tipo": "menu",
            "opcoes": []
        };
        for (var i = 0; i < array.length; i++) {
            menu.opcoes.push(
                {
                    "funcao": "menuAcessarRelacionamento",
                    "parametro": array[i].codigo,
                    "msg": "Relacionamento " + array[i].nome
                }
            );
        }
        return menu;
    }
    else {
        saidaNarrador("A entidade não possui relacionamentos.");
        return menuAtual;
    }
}

function menuAcessarRelacionamento(idRelacionamento) {
    idAuxiliar.elementoB = idRelacionamento;
    idAuxiliar.indexConexao = -1;

    var array = [];
    for (var i = 0; i < diagrama.listaConexoes.length; i++) {
        if (diagrama.listaConexoes[i].elementoA == idRelacionamento) {
            array.push({ "indexConexao": i, "idEntidade": diagrama.listaConexoes[i].elementoB });
        }
        if (diagrama.listaConexoes[i].elementoB == idRelacionamento) {
            array.push({ "indexConexao": i, "idEntidade": diagrama.listaConexoes[i].elementoA });
        }
    }

    var msgA;
    var msgB;

    if (array.length == 0) {
        msgA = "Definir elemento A";
        array.push({ "indexConexao": -1, "idEntidade": -1 })
    } else {
        msgA = "Alterar elemento A, atualmente " + diagrama.listaElementos[recebeIdRetornaIndex(array[0].idEntidade)].tipo + " " + diagrama.listaElementos[recebeIdRetornaIndex(array[0].idEntidade)].nome;
    }

    if (array.length < 2) {
        msgB = "Definir elemento B";
        array.push({ "indexConexao": -1, "idEntidade": -1 })
    } else {
        msgB = "Alterar elemento B, atualmente " + diagrama.listaElementos[recebeIdRetornaIndex(array[1].idEntidade)].tipo + " " + diagrama.listaElementos[recebeIdRetornaIndex(array[1].idEntidade)].nome;
    }

    return {
        "nome": "Menu do relacionamento " + diagrama.listaElementos[recebeIdRetornaIndex(idRelacionamento)].nome,
        "menuAnteriorFuncao": "navegarRelacionamentos",
        "tipo": "menu",
        "opcoes": [
            {
                "funcao": "menuAlterarNomeRelacionamento",
                "msg": "Alterar nome"
            },
            {
                "funcao": "menuRelacionamentoAlterarConexao",
                "parametro": array[0].indexConexao,
                "msg": msgA
            },
            {
                "funcao": "menuRelacionamentoAlterarConexao",
                "parametro": array[1].indexConexao,
                "msg": msgB
            }
        ]
    };
}

function menuRelacionamentoAlterarConexao(indexConexao) {
    idAuxiliar.indexConexao = indexConexao;
    var array = [];
    for (var i = 0; i < diagrama.listaElementos.length; i++) {
        if (diagrama.listaElementos[i].tipo == "Entidade") {
            array.push(diagrama.listaElementos[i]);
        }
    }
    if (array.length > 0) {
        var menu = {
            "nome": "Selecione uma entidade",
            "menuAnteriorFuncao": "menuAcessarRelacionamento",
            "menuAnteriorParamentro": idAuxiliar.elementoB,
            "tipo": "menu",
            "opcoes": []
        };
        for (var i = 0; i < array.length; i++) {
            menu.opcoes.push(
                {
                    "funcao": "alterarConexaoComRelacionamento",
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


function alterarConexaoComRelacionamento(idEntidade) {
    if (idAuxiliar.indexConexao == -1) {
        //criar nova conexao
        diagrama.listaConexoes.push({
            "elementoA": idEntidade,
            "elementoB": idAuxiliar.elementoB,
            "cardinalidadeA": "1",
            "cardinalidadeB": "1"
        });

    } else {
        if (diagrama.listaConexoes[idAuxiliar.indexConexao].elementoA == idAuxiliar.elementoB) {
            diagrama.listaConexoes[idAuxiliar.indexConexao].elementoB = idEntidade;
        } else if (diagrama.listaConexoes[idAuxiliar.indexConexao].elementoB == idAuxiliar.elementoB) {
            diagrama.listaConexoes[idAuxiliar.indexConexao].elementoA = idEntidade;
        }
    }
    saidaDiagrama();
    saidaNarrador("A entidade " +
        diagrama.listaElementos[recebeIdRetornaIndex(idEntidade)].nome +
        " foi conectada ao relacionamento " +
        diagrama.listaElementos[recebeIdRetornaIndex(idAuxiliar.elementoB)].nome);
    return executaFuncaoPeloNome("menuAcessarRelacionamento", idAuxiliar.elementoB);
}

function menuAlterarNomeRelacionamento() {
    limpaEntrada();
    return {
        "menuAnteriorFuncao": "menuAcessarRelacionamento",
        "menuAnteriorParametro": idAuxiliar.elementoB,
        "tipo": "menu",
        "opcoes": [
            {
                "funcao": "alterarNomeRelacionamento",
                "msg": "Digite o novo nome do Relacionamento e pressione Enter"
            }
        ]
    };
}

function alterarNomeRelacionamento() {
    var novoNome = getTextoDaEntrada();
    if (novoNome.length > 0) {
        diagrama.listaElementos[idAuxiliar.elementoB].nome = novoNome;
        saidaNarrador("Relacionamento renomeado para " + novoNome + "!");
        saidaDiagrama();
    } else saidaNarrador("Não foi possível renomear o Relacionamento.");
    return executaFuncaoPeloNome(menuAtual.menuAnteriorFuncao, menuAtual.menuAnteriorParametro);
}