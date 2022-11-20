function setMenuFisicoTitulo(titulo) {
    $('#menuFisicoTitulo').html(titulo);
}

function setMenuFisicoConteudo(menu) {
    var html = "";
    if (menu.tipo == 'menu') {
        var bt = '<button type="button" class="btn btn-default btn-lg" onclick="executaOpcaoSelecionada($i$)" data-index="$i$">$nome$</button>';
        html = '<div class="btn-group-vertical" id="menuFisicoBotoes">';
        for (var i = 0; i < menu.opcoes.length; i++) {
            html += bt.replace('$nome$', menu.opcoes[i].msg).replace('$i$', i).replace('$i$', i);
        }
        html += '</div>';
    } else if (menu.tipo == 'entrada') {
        html = '<h5>' + menu.opcoes[0].msg + '</h5>';
        html += '<div class="form-group">';
        html += '<input class="form-control input-lg" id="entrada"></input>';
        html += '<button type="button" class="btn btn-default btn-lg" onclick="executaOpcaoAtual()">Confirma <kbd>Enter</kbd></button>';
        html += '</div>';
    }
    $('#menuFisicoConteudo').removeClass('animated flipInY');
    $('#menuFisicoConteudo').addClass('animated flipOutY');
    $('#menuFisicoConteudo').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        function () {
            $('#menuFisicoConteudo').removeClass('animated flipOutY');
            $('#menuFisicoConteudo').html(html);
            $('#menuFisicoConteudo').addClass('animated flipInY');
            $("#menuFisicoBotoes > button:nth-child(1)").removeClass('btn-default').addClass('btn-primary');
            $('#entrada').focus();
        });

}

function setMenuFisicoDestaque(index) {

    $.each($('#menuFisicoBotoes .btn'), function(index, botao) {
        if($(botao).hasClass('btn-primary')){
            $(botao).removeClass('btn-primary').addClass('btn-default');
        }
    });

    $("#menuFisicoBotoes > button:nth-child("+(index+1)+")").removeClass('btn-default').addClass('btn-primary');

}

