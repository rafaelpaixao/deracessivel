var diagrama_conceitual = {};
var diagrama_relacional = {};
var editor_c = "";
var editor_r = "";

$(document).ready(function () {
    editor_c = new JSONEditor(document.getElementById("jsoneditor_c"), {});
    editor_r = new JSONEditor(document.getElementById("jsoneditor_r"), {"mode":"view"});
    resetEditor();
});

function loadTeste() {
    $.getJSON("res/conceitual_teste.json", function (json) {
        editor_c.set(json);
        editor_c.expandAll()
    });
}

function resetEditor() {
    $.getJSON("res/conceitual_vazio.json", function (json) {
        editor_c.set(json);
        editor_c.expandAll();
        editor_r.set({});
        editor_r.expandAll();
    });
}

function convert() {
    editor_r.set({});
    editor_r.expandAll();

    diagrama_conceitual = Object.assign(new ConceptualDiagram, editor_c.get());
    var conversor = new RelationalConversor();
    diagrama_relacional = conversor.run(diagrama_conceitual);

    editor_r.set(diagrama_relacional);
    editor_r.expandAll();

    var view_relacional = new RelationalView();
    var logico_html = view_relacional.run(diagrama_relacional);
    console.log(logico_html);
    $("#data_text_l").html(logico_html);

    var view_sql = new SQLView();
    var fisico_html = view_sql.run(diagrama_relacional);
    console.log(fisico_html);
    $("#data_text_f").html(fisico_html);
}