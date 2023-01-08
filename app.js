// Element du DOM
const input = document.querySelector('#input')
const btnAdd = document.querySelector('#btnAdd')
const selected = document.querySelector('.select-option')
const todoList = document.querySelector('.todo-list')
const btnTrash = document.querySelector('.btn-delect')

//Events
btnAdd.addEventListener('click', addTodo )
todoList.addEventListener('click', removeTodo)
document.addEventListener('DOMContentLoaded', showTodo )
selected.addEventListener('change', filterTodo)



//Function Comportement
function addTodo(e) {

    e.preventDefault();


    if (input.value !== '') {

        let todos;

        let getLocal = localStorage.getItem('todos')
    
        if (getLocal === null) {
    
            todos = [];
    
        } else {
    
            todos = JSON.parse(getLocal)
        }
    
        todos.push(input.value);
    
        localStorage.setItem('todos', JSON.stringify(todos))

        
       
            // Ajouter une Div Container
            const divTodo = document.createElement('div');
            divTodo.classList.add('container-item');
    
            //Ajouter un Li
            const itemLi = document.createElement('li');
            itemLi.classList.add('todo-li');
            todoList.appendChild(divTodo);
            divTodo.appendChild(itemLi);
            itemLi.innerHTML = input.value;
        
            // Ajouter Span Check
            const spanComplet = document.createElement('span');
            spanComplet.classList.add('btn-check');
            spanComplet.innerHTML = '<i class="fa-solid fa-check"></i>';
            divTodo.appendChild(spanComplet);
        
            // Ajouter Span Delect
            const spanTrash = document.createElement('span');
            spanTrash.classList.add('btn-delect');
            spanTrash.innerHTML = '<i class="fa-solid fa-trash"></i>';
            divTodo.appendChild(spanTrash);
    

        //Réinitialiser l'input après saisie
        input.value = '';
        
    } else {

        alert('Veuiller entrer votre tache...')    
    }
}    

function removeTodo(e){

   const item = e.target;

   if(item.classList[0] === 'btn-delect'){
       
       const todo = item.parentElement;
       removeLocal(todo)

       todo.classList.add("trash-btn")

       todo.addEventListener('animationend', () => { 

           todo.remove()
       })  
   }

   if(item.classList[0] === 'btn-check') {

    const todo = item.parentElement;

    todo.classList.toggle('complet')
   }
}
// Afficher les taches après rafraichissement de la page 
function showTodo() {
    let todos;

    let viewLocal = localStorage.getItem('todos')

    if (viewLocal === null) {

        todos = [];

    } else {

        todos = JSON.parse(viewLocal)
    }


    todos.forEach(item => {

        const divTodo = document.createElement('div');
        divTodo.classList.add('container-item');
        const itemLi = document.createElement('li');
        itemLi.classList.add('todo-li');
        todoList.appendChild(divTodo);
        divTodo.appendChild(itemLi);
        itemLi.innerHTML = item;
    
        // Ajouter Span Check
        const spanComplet = document.createElement('span');
        spanComplet.classList.add('btn-check');
        spanComplet.innerHTML = '<i class="fa-solid fa-check"></i>';
        divTodo.appendChild(spanComplet);
    
        // Ajouter Span Delect
        const spanTrash = document.createElement('span');
        spanTrash.classList.add('btn-delect');
        spanTrash.innerHTML = '<i class="fa-solid fa-trash"></i>';
        divTodo.appendChild(spanTrash);
    })
 
}

//Suprimer  un Todo dans le localStorage
function removeLocal(todo) {

    let todos;

        let viewLocal = localStorage.getItem('todos')
    
        if (viewLocal === null) {
    
            todos = [];
    
        } else {
    
            todos = JSON.parse(viewLocal)
        }

    let todoIndex = todo.children[0].innerText 
    
    todos.splice(todos.indexOf(todoIndex), 1)

    localStorage.setItem('todos', JSON.stringify(todos))
    
}

//Initialiser le select
function filterTodo(e) {

   const todo = todoList.childNodes;

   todo.forEach(todos => {

       switch(e.target.value) {
    
           case 'all': todos.style.display = 'flex'
           break;
    
           case 'complet': if (todos.classList.contains('complet')) {
               
               todos.style.display = 'flex'
    
           } else {
    
               todos.style.display = 'none'
           }
           break;
           
           case 'incomplet': if (!todos.classList.contains('complet')){
            
            todos.style.display = 'flex'

           } else {

            todos.style.display = 'none'

           }
           break;    
       }
       
   })


}
