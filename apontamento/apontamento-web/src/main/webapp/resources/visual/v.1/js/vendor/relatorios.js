function barVar() {
    return {
        labels: ["Demanda 1", "Demanda 2", "Demanda 3", "Demanda 4", "Demanda 5", "Demanda 6", "Demanda 7", "Demanda 8"],
        datasets: [
            
            {
                label: "Horas Apontadas",
                data: [28, 48, 40, 19, 86, 27, 90, 50]
            }
        ]
    }
}

var pieVar = [
    {
        value: 300,
        label: "Variável 1",
    },
    {
        value: 50,
        label: "Variável 2",
    },
    {
        value: 100,
        label: "Variável 3",
    },
    {
        value: 50,
        label: "Variável 4",
        
    },
    {
        value: 50,
        label: "Variável 5",
        
    },
    {
        value: 50,
        label: "Variável 6",
        
    }
],
doughnutVar = [
    {
        value: 38,
        label: "Compliance",
    },
    {
        value: 29,
        label: "Controles Internos",
    },
    {
        value: 23,
        label: "Prevenção a Lavagem de Dinheiro",
    },
    {
        value: 10,
        label: "Administração",
        
    },
    
    
],
doughnutConfig = {
    tooltipTemplate: "<%=value%>%"
};