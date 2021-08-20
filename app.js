'use strict';
const getBank = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBank = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));
const createItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(item);
}
const clearAssignment = () => {
    const todoList = document.getElementById('todoList');
    while(todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}
const updateScreen = () => {
    clearAssignment();
    const banco = getBank();
    banco.forEach ( (item, indice) => createItem (item.tarefa, item.status, indice));
}
const addItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if( tecla === 'Enter'){
        const banco = getBank();
        banco.push ({'tarefa': texto, 'status':''});
        setBank(banco);
        updateScreen();
        evento.target.value = '';
    }
}
const deleteItem = (indice) => {
    const banco = getBank();
    banco.splice (indice, 1);
    setBank(banco);
    updateScreen();
}
const updateItem = (indice) => {
    const banco = getBank();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBank(banco);
    updateScreen();
}
 const clickItem = (evento) =>{
    const element = evento.target;
    if(element.type === 'button'){
        const indice = element.dataset.indice;
        deleteItem (indice);
    }else if (element.type === 'checkbox'){
        const indice = element.dataset.indice;
        updateItem (indice);
    }
 }
document.getElementById('newItem').addEventListener('keypress', addItem);
document.getElementById('todoList').addEventListener('click', clickItem);
updateScreen();