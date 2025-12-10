document.getElementById("formsalario").addEventListener("submit", function(event){
    event.preventDefault()
    var salario1=document.getElementById("salario").value
    localStorage.setItem('salario', salario1)
    document.getElementById("formsalario").reset()
    exibir_resumo()
})

document.getElementById("formdespesa").addEventListener("submit", function(event){
    event.preventDefault()
    var data1=document.getElementById("data").value
    var nome1=document.getElementById("nome").value
    var valor1=document.getElementById("valor").value
    var despesa={data:data1, nome:nome1, valor:parseFloat(valor1)}
    var lista_despesas=JSON.parse(localStorage.getItem('despesas')) || []
    lista_despesas.push(despesa)
    localStorage.setItem('despesas', JSON.stringify(lista_despesas))
    document.getElementById("formdespesa").reset()
    exibir_despesas()
    exibir_resumo()
})

function exibir_despesas(){
    var lista_despesas=JSON.parse(localStorage.getItem('despesas')) || []
    var saida=document.getElementById('listadespesas')
    saida.innerHTML=''
    for(let i=0;i<lista_despesas.length;i++){
        let li=document.createElement('li')
        li.textContent='Data: ' + lista_despesas[i].data + '  Nome: ' + lista_despesas[i].nome + '  Valor: ' + lista_despesas[i].valor
        saida.appendChild(li)
    }
}

function exibir_resumo(){
    var salario=localStorage.getItem('salario') || 0
    var lista_despesas=JSON.parse(localStorage.getItem('despesas')) || []
    var total=0
    for(let i=0;i<lista_despesas.length;i++){
        total+=lista_despesas[i].valor
    }
    var saldo=salario-total
    var resumo=document.getElementById('resumo')
    resumo.textContent='Salário: ' + salario + '  Total de despesas: ' + total + '  Saldo final: ' + saldo
}

exibir_despesas()
exibir_resumo()

function apagar(){
    var lista_despesas = JSON.parse(localStorage.getItem('despesas')) || [];
        localStorage.setItem('despesas', JSON.stringify([]));
        exibir_despesas();
        exibir_resumo();
}
