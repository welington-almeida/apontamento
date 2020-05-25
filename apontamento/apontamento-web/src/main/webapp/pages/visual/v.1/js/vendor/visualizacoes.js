var produtos = [
    { "Name": "", "id": 0 },
    {"id": 1, "Name": "RE/Fiança/Transporte"},
    {"id": 2, "Name": "Automóvel"},
    {"id": 3, "Name": "Vida e previdência"}
], reqStatus = [
    { "Name": "", "id": 0 },
    {"id": 1, "Name": "Emitida"},
    {"id": 2, "Name": "Em análise"},
    {"id": 3, "Name": "Aguardando posição"}
];

var PropostaTemplate = function(value,item) {
    return '<a href="'+value+'">'+value+'</a>';
}

var NomeTemplate = function(value,item) {
    return value.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

var StatusTemplate = function(value,item) {
    var rtn = "";
    if(value == "1")
        rtn = 'Emitida';
    else if(value == "2")
        rtn = 'Em análise';
    else if(value == "3")
        rtn = 'Pendente';
    
    return rtn;
}