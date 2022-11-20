var DerAcessivel = {};

DerAcessivel.convertStringToSQL = function (s) {
    //TODO
    s = s.toUpperCase();
    s = s.replace(/ /g, "_");
    s = s.replace(/-/gi, "_");
    s = s.replace(/Ç/gi, "C");
    s = s.replace(/Á/gi, "A");
    s = s.replace(/À/gi, "A");
    s = s.replace(/Ã/gi, "A");
    s = s.replace(/É/gi, "E");
    s = s.replace(/È/gi, "E");
    s = s.replace(/Í/gi, "I");
    s = s.replace(/Ì/gi, "I");
    s = s.replace(/Ó/gi, "O");
    s = s.replace(/Ò/gi, "O");
    s = s.replace(/Õ/gi, "O");
    s = s.replace(/Ú/gi, "U");
    s = s.replace(/Ù/gi, "U");
    return s;
}

const EnumElementModel = {

    "ENTITY" : "Entidade",

    "RELATIONSHIP": "Relacionamento",

    "ATTRIBUTE": "Atributo",

    "GENERALIZATION":"Generalização"

}



const EnumEntityType = {

    "STRONG": "Forte",

    "WEAK": "Fraca"

}



const EnumRelationshipType = {

    "NORMAL": "Normal",

    "IDENTIFIER": "Identificador"

}



const EnumAttributeType = {

    "SIMPLE": "Simples",

    "MULTIVALUED": "Multivalorado",

    "DERIVED": "Derivado"

}



const EnumGeneralizationType = {

    "PARTIAL": "Parcial",

    "TOTAL": "Total"

}



const EnumLinkType = {

    

    "ATTRIBUTE": "Atributo",

    "RELATIONSHIP": "Relacionamento",

    "IDENTIFIER": "Identificador",

    "GENERALIZATION":"Generalização",

    "ESPECIALIZATION":"Especialização",

}



const EnumCardinality = {

    "ZERO": "0",

    "ONE":"1",

    "MANY": "N",

}



const EnumSQLType = {

    "VARCHAR": "VARCHAR",

    "INTEGER": "INTEGER"

}
class ConceptualDiagram {
    constructor(params) {
        if (params == undefined) {
            params = {};
        }
        if (params.meta == undefined) {
            params.meta = {};
            //TODO
        }
        if (params.next_element_id == undefined) {
            params.next_element_id = 0;
        }
        if (params.elements == undefined) {
            params.elements = [];
            params.next_element_id = 0;
        }
        if (params.links == undefined) {
            params.links = [];
        }
        this.meta = params.meta;
        this.elements = params.elements;
        this.links = params.links;
        this.next_element_id = params.next_element_id;
    }
    insertElement(e) {
        if (!(e instanceof ConceptualElement)) {
            throw "Expected type ConceptualElement"
            return;
        }
        e.element_id = this.next_element_id++;
        this.elements.push(e);
    }
    insertLink(l) {
        if (!(l instanceof ConceptualLink)) {
            throw "Expected type ConceptualLink"
            return;
        }
        this.links.push(l);
    }
    getElementById(id) {
        var size = this.elements.length;
        for (var i = 0; i < size; i++)
            if (this.elements[i].element_id == id)
                return this.elements[i];
        throw "Couldn't find element with id: " + id;
        return null;
    }
}

class ConceptualElement{
    constructor(params) {
        if (params == undefined) {
            params = {};
        }
        if(params.element_id==undefined){
            params.element_id = -1;
            throw "Missing element's id";
        }
        if(params.model==undefined){
            params.model = EnumElementModel.ENTITY;
            throw "Missing element's model";
        }
        if(params.type==undefined){
            params.type = EnumEntityType.STRONG;
            throw "Missing element's type";
        }
        if(params.is_primary_attribute==undefined){
            params.is_primary_attribute = false;
        }
        if(params.name==undefined){
            params.name = "NEW ELEMENT";
        }
        if(params.pos_x==undefined){
            params.pos_x = 0;
        }
        if(params.pos_y==undefined){
            params.pos_y = 0;
        }

        this.element_id = params.element_id;
        this.model = params.model;
        this.type = params.type;
        this.is_primary_attribute = params.is_primary_attribute;
        this.name = params.name;
        this.pos_x = params.pos_x;
        this.pos_y = params.pos_y;
    }
}

class ConceptualLink{
    constructor(params) {
        if (params == undefined) {
            params = {};
        }
        if (params.type == undefined) {
            params.type = EnumLinkType.ATTRIBUTE;
            throw "Missing link's type";
        }
        if (params.relation_paper == undefined) {
            params.relation_paper = null;
        }
        if (params.origin == undefined) {
            params.origin = new ConceptualLinkVertex();
            throw "Missing link's origin";
        }
        if (params.destiny == undefined) {
            params.destiny = new ConceptualLinkVertex();
            throw "Missing link's destiny";
        }

        this.type = params.type;
        this.relation_paper = params.relation_paper;
        this.origin = params.origin;
        this. destiny = params.destiny;
    }
}

class ConceptualLinkVertex{
    constructor(params) {
        if (params == undefined) {
            params = {};
        }
        if(params.element_id==undefined){
            params.element_id = -1;
            throw "Missing element's id";
        }
        if(params.cardinality==undefined){
            params.cardinality = EnumCardinality.ONETOONE;
        }
        this.element_id = params.element_id;
        this.cardinality = params.cardinality;
    }
}
class RelationalDiagram {
    constructor(params) {
        if (params == undefined) {
            params = {};
        }
        if (params.meta == undefined) {
            params.meta = {};
            //TODO
        }
        if (params.next_table_id == undefined) {
            params.next_table_id = 0;
        }
        if (params.tables == undefined) {
            params.tables = [];
            params.next_table_id = 0;
        }
        this.meta = params.meta;
        this.tables = params.tables;
        this.next_table_id = params.next_table_id;
    }
    insertTable(t) {
        if (!(t instanceof RelationalTable)) {
            throw "Expected type RelationalTable"
            return;
        }
        t.table_id = this.next_table_id++;
        this.tables.push(t);
    }
    getTableById(id) {
        var size = this.tables.length;
        for (var i = 0; i < size; i++)
            if (this.tables[i].table_id == id)
                return this.tables[i];
        throw "Couldn't find table with id: " + id;
        return null;
    }
    getTableByElementId(id) {
        var size = this.tables.length;
        for (var i = 0; i < size; i++)
            if (this.tables[i].element_id == id)
                return this.tables[i];
        throw "Couldn't find table with element_id: " + id;
        return null;
    }
}

class RelationalTable {
    constructor(params) {
        if (params == undefined) {
            params = {};
        }
        if (params.name == undefined) {
            params.name = "NEW_TABLE";
            throw "Missing table's name"
        } else {
            params.name = DerAcessivel.convertStringToSQL(params.name);
        }
        if (params.element_id == undefined) {
            params.element_id = -1;
            throw "Missing element's id"
        }
        this.name = params.name;
        this.element_id = params.element_id;
        this.columns = [];
        this.refereced_tables = [];
    }
    insertColumn(c) {
        if (!(t instanceof RelationalColumn)) {
            throw "Expected type RelationalColumn"
            return;
        }
        this.columns.push(c);
    }
}

class RelationalColumn {
    constructor(params) {
        if (params == undefined) {
            params = {};
        }
        if (params.name == undefined) {
            params.name = "NEW_COLUMN";
            throw "Missing column's name"
        } else {
            params.name = DerAcessivel.convertStringToSQL(params.name);
        }
        if (params.sql_type == undefined) {
            params.sql_type = "VARCHAR";
        }
        if (params.is_primary == undefined) {
            params.is_primary = false;
        }
        if (params.max_length == undefined) {
            params.max_length = "255";
        }

        this.name = params.name;
        this.sql_type = params.sql_type;
        this.is_primary = params.is_primary;
        this.max_length = params.max_length;
        this.references_to = null;
    }

    setReferencesTo(r) {
        if (r == undefined) {
            r = null;
        } else if (r != null) {
            if (!(r instanceof RelationalReference)) {
                throw "Expected type RelationalReference";
                return;
            }
        }
        this.references_to = r;
    }

}

class RelationalReferencedTable {
    constructor(params) {
        if (params == undefined) {
            params = {};
        }
        if (params.table_id == undefined) {
            params.table_id = null;
            throw "Missing table's id";
        }
        if (params.is_primary == undefined) {
            params.is_primary = false;
        }
        this.table_id = params.table_id;
        this.is_primary = params.is_primary;
    }
}

class RelationalReference {
    constructor(params) {
        if (params == undefined) {
            params = {};
        }
        if (params.table_name == undefined) {
            params.table_name = null;
            throw "Missing table's name"
        }
        if (params.column_name == undefined) {
            params.column_name = null;
            throw "Missing column's name"
        }
        this.table_name = params.table_name;
        this.column_name = params.column_name;
    }
}

class DataStructureConversor {

    constructor() {

        this.is_converted = false;

    }

    run(conceptual_old) {

        this.is_converted = false;

        this.conceptual_old = conceptual_old;

        this.conceptual_new = new ConceptualDiagram();



        this.processElements();

        this.processLinks();



        this.is_converted = true;



        return this.conceptual_new;

    }



    processElements() {

        for (var i = 0; i < this.conceptual_old.listaElementos.length; i++) {

            var old = this.conceptual_old.listaElementos[i];

            var params = {};

            params.element_id = old.codigo;

            params.name = old.nome;

            params.is_primary_attribute = false;

            params.pos_x = old.posX;

            params.pos_y = old.posY;



            if (old.tipo == "Entidade") {

                params.model = EnumElementModel.ENTITY;

                if (old.variacao == "Normal")

                    params.type = EnumEntityType.STRONG;

                else if (old.variacao == "Fraca")

                    params.type = EnumEntityType.WEAK;



            } else if (old.tipo == "Atributo") {

                params.model = EnumElementModel.ATTRIBUTE;

                if (old.variacao == "Normal")

                    params.type = EnumAttributeType.SIMPLE;

                else if (old.variacao == "Multivalorado")

                    params.type = EnumAttributeType.MULTIVALUED;

                else if (old.variacao == "Derivado")

                    params.type = EnumAttributeType.DERIVED;



            } else if (old.tipo == "Relacionamento") {

                params.model = EnumElementModel.RELATIONSHIP;

                if (old.variacao == "Normal")

                    params.type = EnumRelationshipType.NORMAL;

                else if (old.variacao == "Identificador")

                    params.type = EnumRelationshipType.IDENTIFIER;



            } else if (old.tipo == "Herança") {

                params.model = EnumElementModel.GENERALIZATION;

                params.type = EnumGeneralizationType.PARTIAL;

            }



            this.conceptual_new.elements.push(new ConceptualElement(params));

        }

    }



    processLinks() {

        for (var i = 0; i < this.conceptual_old.listaConexoes.length; i++) {

            var old = this.conceptual_old.listaConexoes[i];

            var link_params = {};

            var origin_params = {};

            var destiny_params = {};



            origin_params.element_id = old.elementoA;

            if (old.cardinalidadeA == "0") {

                origin_params.cardinality == EnumCardinality.ZERO;

            } else if (old.cardinalidadeA == "N" || old.cardinalidadeA == "n") {

                origin_params.cardinality == EnumCardinality.MANY;

            } else {

                origin_params.cardinality == EnumCardinality.ONE;

            }



            destiny_params.element_id = old.elementoB;

            if (old.cardinalidadeB == "0") {

                destiny_params.cardinality == EnumCardinality.ZERO;

            } else if (old.cardinalidadeB == "N" || old.cardinalidadeB == "n") {

                destiny_params.cardinality == EnumCardinality.MANY;

            } else {

                destiny_params.cardinality == EnumCardinality.ONE;

            }



            var o_el = this.conceptual_new.getElementById(old.elementoA);

            var d_el = this.conceptual_new.getElementById(old.elementoB);

            if (o_el.model == EnumElementModel.GENERALIZATION)

                link_params.type = EnumLinkType.ESPECIALIZATION;

            else if(d_el.model == EnumElementModel.GENERALIZATION)

                link_params.type = EnumLinkType.GENERALIZATION;

            else if(o_el.model == EnumElementModel.ATTRIBUTE || d_el.model == EnumElementModel.ATTRIBUTE)

                link_params.type = EnumLinkType.ATTRIBUTE;



            else if(o_el.type == EnumEntityType.WEAK && d_el.model == EnumElementModel.RELATIONSHIP){

                link_params.type = EnumLinkType.IDENTIFIER;

                d_el.type = EnumRelationshipType.IDENTIFIER;

            }else if(d_el.type == EnumEntityType.WEAK && o_el.model == EnumElementModel.RELATIONSHIP){

                link_params.type = EnumLinkType.IDENTIFIER;

                o_el.type = EnumRelationshipType.IDENTIFIER;

            }



            else

                link_params.type = EnumLinkType.RELATIONSHIP;





            link_params.origin = new ConceptualLinkVertex(origin_params);

            link_params.destiny = new ConceptualLinkVertex(destiny_params);



            this.conceptual_new.links.push(new ConceptualLink(link_params));

        }

    }

}
class RelationalConversor {
    constructor() {
        this.is_converted = false;
    }
    run(conceptual_dia) {

        if(conceptual_dia.listaElementos!=undefined){
            //É um diagrama do modelo antigo
            var dec = new DataStructureConversor();
            conceptual_dia = dec.run(conceptual_dia);
        }
        else if (!(conceptual_dia instanceof ConceptualDiagram)) {
            throw "Expected type ConceptualDiagram"
            return null;
        }
        this.is_converted = false;
        this.diagram_conceptual = conceptual_dia;
        this.diagram_relational = new RelationalDiagram();

        this.convertElementsToTables();
        this.processLinks();
        this.generateMissingPrimaryKeys();
        this.resolveReferencedTables();
        this.is_converted = true;

        return this.diagram_relational;
    }

    convertElementsToTables() {
        for (var i = 0; i < this.diagram_conceptual.elements.length; i++) {
            var element = this.diagram_conceptual.elements[i];
            if (element.model == EnumElementModel.ENTITY ||
                (element.model == EnumElementModel.RELATIONSHIP) ||
                (element.model == EnumElementModel.ATTRIBUTE && element.type == EnumAttributeType.MULTIVALUED)
            ) {
                var t = new RelationalTable({
                    "element_id": element.element_id,
                    "name": element.name
                });
                this.diagram_relational.insertTable(t);
            }
        }
    }

    processLinks() {
        for (var i = 0; i < this.diagram_conceptual.links.length; i++) {
            var link = this.diagram_conceptual.links[i];
            var e_o = this.diagram_conceptual.getElementById(link.origin.element_id);
            var e_d = this.diagram_conceptual.getElementById(link.destiny.element_id);

            if (link.type == EnumLinkType.RELATIONSHIP) {

                var is_p = (e_o.cardinality == EnumCardinality.ONE && e_d.cardinality == EnumCardinality.ONE);

                var t_id = e_o.element_id;
                var e_id = e_d.element_id;
                if (e_d.model == EnumElementModel.RELATIONSHIP) {
                    t_id = e_d.element_id;
                    e_id = e_o.element_id;
                }

                this.createReferencedTable({
                    "table_element_id": t_id,
                    "refereced_element_id": e_id,
                    "is_primary": is_p
                });
            } else if (link.type == EnumLinkType.IDENTIFIER) {
                var r_id = e_o.element_id;
                var w_id = e_d.element_id;
                if (e_d.model == EnumElementModel.RELATIONSHIP) {
                    r_id = e_d.element_id;
                    w_id = e_o.element_id;
                }

                this.createReferencedTable({
                    "table_element_id": w_id,
                    "refereced_element_id": r_id,
                    "is_primary": true
                });

                this.createReferencedTable({
                    "table_element_id": r_id,
                    "refereced_element_id": w_id,
                    "is_primary": true
                });
            } else if (link.type == EnumLinkType.ESPECIALIZATION) {
                var g_id = e_o.element_id;
                var e_id = e_d.element_id;
                if (e_d.model == EnumElementModel.GENERALIZATION) {
                    g_id = e_d.element_id;
                    e_id = e_o.element_id;
                }

                this.createReferencedTable({
                    "table_element_id": e_id,
                    "refereced_element_id": this.getGeneralizedElementId(g_id),
                    "is_primary": true
                });
            } else if (link.type == EnumLinkType.ATTRIBUTE) {

                var att = e_o;
                var ele = e_d;
                if (e_d.model == EnumElementModel.ATTRIBUTE) {
                    att = e_d;
                    ele = e_o;
                }

                if (att.type == EnumAttributeType.MULTIVALUED) {
                    this.createReferencedTable({
                        "table_element_id": att.element_id,
                        "refereced_element_id": ele.element_id,
                        "is_primary": true
                    });
                    this.createColumn({
                        "table_element_id": att.element_id,
                        "name": att.name,
                        "is_primary": true
                    });
                } else {
                    this.createColumn({
                        "table_element_id": ele.element_id,
                        "name": att.name,
                        "is_primary": att.is_primary_attribute
                    })
                }
            }
        }
    }

    createReferencedTable(params) {
        if (params == undefined) {
            throw "Missing params for createReferencedTable"
            return null;
        }
        if (params.table_element_id == undefined) {
            throw "Missing table_element_id for createReferencedTable"
            return null;
        }
        if (params.refereced_element_id == undefined) {
            throw "Missing refereced_element_id for createReferencedTable"
            return null;
        }
        if (params.is_primary == undefined) {
            params.is_primary = false;
        }

        var table = this.diagram_relational.getTableByElementId(params.table_element_id);
        if (table == null) {
            return;
        }
        var table_to_be_referenced = this.diagram_relational.getTableByElementId(params.refereced_element_id);
        if (table_to_be_referenced == null) {
            return;
        }

        var rt = new RelationalReferencedTable({
            "table_id": table_to_be_referenced.table_id,
            "is_primary": params.is_primary
        });
        table.refereced_tables.push(rt);
    }

    createColumn(params) {
        if (params == undefined) {
            throw "Missing params for createColumn"
            return null;
        }
        if (params.table_element_id == undefined) {
            throw "Missing table_element_id for createColumn"
            return null;
        }
        if (params.name == undefined) {
            throw "Missing name for createColumn"
            return null;
        }
        if (params.is_primary == undefined) {
            params.is_primary = null;
        }
        if (params.references_to == undefined) {
            params.references_to = null;
        }

        var table = this.diagram_relational.getTableByElementId(params.table_element_id);
        if (table == null) {
            return;
        }

        var c = new RelationalColumn({
            "name": params.name,
            "is_primary": params.is_primary
        });
        c.setReferencesTo(params.references_to);
        table.columns.push(c);
    }

    getIdOfStrongEntityConnectedToIdentifierRelationship(relatioship_id) {
        for (var i = 0; i < this.diagram_conceptual.links.length; i++) {
            var link = this.diagram_conceptual.links[i];
            if (link.type == EnumLinkType.RELATIONSHIP) {
                if (link.origin.element_id == relatioship_id) {
                    return link.destiny.element_id;
                } else if (link.destiny.element_id == relatioship_id) {
                    return link.origin.element_id;
                }
            }
        }
        throw "Couldn't find strong entity for identifier relatioship with id: " + relation_id;
        return -1;
    }

    getGeneralizedElementId(generalization_id) {
        for (var i = 0; i < this.diagram_conceptual.links.length; i++) {
            var link = this.diagram_conceptual.links[i];
            if (link.type == EnumLinkType.GENERALIZATION) {
                if (link.origin.element_id == generalization_id) {
                    return link.destiny.element_id;
                } else if (link.destiny.element_id == generalization_id) {
                    return link.origin.element_id;
                }
            }
        }
        throw "Couldn't find generalized element with id: " + generalization_id;
        return -1;
    }

    generateMissingPrimaryKeys() {
        for (var i = 0; i < this.diagram_relational.tables.length; i++) {
            var table = this.diagram_relational.tables[i];
            var ele = this.diagram_conceptual.getElementById(table.element_id);

            if(!this.hasPrimaryKey(table)){
                if (
                    (ele.model == EnumElementModel.RELATIONSHIP && !this.hasPrimaryReference(table)) ||
                    (ele.model == EnumElementModel.ENTITY && this.isStrongEntity(ele))
                ) {
                     this.createGenericPrimaryKey(table);
                }
            }
        }
    }

    hasPrimaryReference(table){
        for(var i=0; i<table.refereced_tables.length; i++){
            if(table.refereced_tables[i].is_primary){
                return true;
            }
        }
        return false;
    }

    hasPrimaryKey(table){
        for(var i=0; i<table.columns.length; i++){
            if(table.columns[i].is_primary){
                return true;
            }
        }
        return false;
    }

    isStrongEntity(ele) {
        if (ele.model == EnumElementModel.ENTITY) {
            for (var i = 0; i < this.diagram_conceptual.links.length; i++) {
                var link = this.diagram_conceptual.links[i];
                if (link.type == EnumLinkType.IDENTIFIER) {
                    if (link.origin.element_id == ele.element_id || link.destiny.element_id == ele.element_id) {
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    }

    createGenericPrimaryKey(table) {
        var c = new RelationalColumn({
            "name": "ID",
            "is_primary": true
        });
        table.columns.push(c);
    }

    resolveReferencedTables() {
        var iterations = 0;
        var unsolved_old = this.getNumberOfReferencedTables();

        while (unsolved_old > 0) {
            iterations++;
            var unsolved_new = this.processReferencedTables();
            if (unsolved_new == unsolved_old) {
                throw "Found a deadlock while resolving referenced tables. Iterations: " + iterations + ", unsolved references: " + unsolved_new
                return;
            } else {
                unsolved_old = unsolved_new;
            }
        }
    }
    processReferencedTables() {
        var unsolved = 0;
        for (var i = 0; i < this.diagram_relational.tables.length; i++) {
            var table = this.diagram_relational.tables[i];
            for (var j = 0; j < table.refereced_tables.length; j++) {
                var rf = table.refereced_tables[j];
                var table_referenced = this.diagram_relational.getTableById(rf.table_id);
                if (this.hasUnsolvedPrimaryReferencedTable(table_referenced)) {
                    unsolved++;
                } else {
                    for (var k = 0; k < table_referenced.columns.length; k++) {
                        var column = table_referenced.columns[k];
                        if (column.is_primary) {
                            var name, rt;
                            if (column.references_to != null) {
                                rt = column.references_to;
                            } else {
                                rt = new RelationalReference({
                                    "table_name": table_referenced.name,
                                    "column_name": column.name
                                });
                            }
                            var c = new RelationalColumn({
                                "name": rt.table_name + "_" + rt.column_name,
                                "is_primary": rf.is_primary
                            });
                            c.setReferencesTo(rt);
                            table.columns.push(c);
                        }
                    }
                    table.refereced_tables.splice(j, 1);
                    j--;
                }

            }
        }
        return unsolved;
    }
    getNumberOfReferencedTables() {
        var unsolved = 0;
        for (var i = 0; i < this.diagram_relational.tables.length; i++) {
            unsolved += this.diagram_relational.tables[i].refereced_tables.length;
        }
        return unsolved;
    }
    hasUnsolvedPrimaryReferencedTable(table) {
        for (var i = 0; i < table.refereced_tables.length; i++) {
            if (table.refereced_tables[i].is_primary)
                return true;
        }
        return false;
    }
}


class RelationalView {


    constructor() {


        this.is_finished = false;


    }


    run(relational_dia) {


        if (!(relational_dia instanceof RelationalDiagram)) {


            throw "Expected type RelationalDiagram"


            return null;


        }


        this.is_finished = false;


        this.diagram_relational = relational_dia;


        this.html = "";





        for (var i = 0; i < this.diagram_relational.tables.length; i++) {


            this.html += this.convertTableToHtml(this.diagram_relational.tables[i]);


        }





        return this.html;


    }





    convertTableToHtml(table) {


        var normal_keys = [];


        var primary_keys = [];


        var foreign_keys = [];





        for (var i = 0; i < table.columns.length; i++) {


            var c = table.columns[i];


            if (c.references_to != null) {


                foreign_keys.push('<p data-relational="foreign-key">' + c.name + ' referencia ' + c.references_to.table_name + '</p>');


            }


            if (c.is_primary) {


                primary_keys.push(c.name);


            } else {


                normal_keys.push(c.name);


            }


        }





        var table_html = '<div data-relational="table">';


        table_html += '<p data-relational="keys"> ' + table.name + ' (';





        if (primary_keys.length > 0) {


            table_html += '<span data-relational="primary-keys">';


            for (var i = 0; i < primary_keys.length - 1; i++) {


                table_html += primary_keys[i] + ", ";


            }


            table_html += primary_keys[i] + "</span>";


            if (normal_keys.length > 0) {


                table_html += ", "


            }


        }





        if (normal_keys.length > 0) {


            for (var i = 0; i < normal_keys.length - 1; i++) {


                table_html += normal_keys[i] + ", ";


            }


            table_html += normal_keys[i]


        }


        table_html += ")</p>";





        for (var i = 0; i < foreign_keys.length; i++) {


            table_html += foreign_keys[i];


        }


        table_html += "</div>";





        return table_html;


    }


}
class SQLView {
    constructor() {
        this.is_finished = false;
    }
    run(relational_dia) {
        if (!(relational_dia instanceof RelationalDiagram)) {
            throw "Expected type RelationalDiagram"
            return null;
        }
        this.is_finished = false;
        this.diagram_relational = relational_dia;
        this.html = "";

        for (var i = 0; i < this.diagram_relational.tables.length; i++) {
            this.html += this.convertTableToHtml(this.diagram_relational.tables[i]);
        }

        return this.html;
    }

    convertTableToHtml(table) {
        var normal_keys = [];
        var primary_keys = [];
        var foreign_keys = [];

        for (var i = 0; i < table.columns.length; i++) {
            var c = table.columns[i];

            var k = '<p data-sql="line">';
            k += c.name + ' <span data-sql="command">' + c.sql_type + "</span>(" + c.max_length + ")";
            if (!k.is_nullable) {
                k += ' <span data-sql="command">NOT NULL</span>';
            }
            k += ",</p>";
            normal_keys.push(k);

            if (c.is_primary) {
                primary_keys.push(c.name);
            }

            if (c.references_to != null) {
                var fk = null;
                for (var j = 0; j < foreign_keys.length; j++) {
                    if (foreign_keys[j].table_name == c.references_to.table_name) {
                        fk = foreign_keys[j];
                        break;
                    }
                }
                if (fk == null) {
                    fk = {
                        "table_name": c.references_to.table_name,
                        "keys": []
                    }
                    foreign_keys.push(fk);
                }
                fk.keys.push({
                    "foreign_key": c.name,
                    "referenced_key": c.references_to.column_name
                })
            }

        }

        var table_html = '<div data-sql="table">';
        table_html += '<p><span data-sql="command">CREATE TABLE</span> ';
        table_html += '<span data-sql="table-name">' + table.name + '</span>(</p>';

        for (var i = 0; i < normal_keys.length; i++) {
            table_html += normal_keys[i];
        }

        var primary_key_html = '<p data-sql="primary-key"><span data-sql="command">PRIMARY KEY</span> (';
        for (var i = 0; i < primary_keys.length - 1; i++) {
            primary_key_html += primary_keys[i] + ", ";
        }
        primary_key_html += primary_keys[i] + ')';
        table_html += primary_key_html;

        for (var i = 0; i < foreign_keys.length; i++) {
            var fk = foreign_keys[i];
            var fk_html='<p data-sql="primary-key"><span data-sql="command">FOREIGN KEY</span> (';
            
            for (var j = 0; j < fk.keys.length-1; j++) {
                fk_html += fk.keys[j].foreign_key+', ';
            }
            fk_html += fk.keys[j].foreign_key+')';
            
            fk_html += ' <span data-sql="command">REFERENCES</span> '+fk.table_name + ' (';
            
            for (var j = 0; j < fk.keys.length-1; j++) {
                fk_html += fk.keys[j].referenced_key+', ';
            }
            fk_html += fk.keys[j].referenced_key+')';

            table_html += ',</p>'+fk_html;
        }

        table_html += "</p><p>);</p></div>";

        return table_html;
    }


}