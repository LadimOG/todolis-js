                            // Element du DOM
const input = document.querySelector('#input')
const btnAdd = document.querySelector('#btnAdd')
const selected = document.querySelector('.select-option')
const todoList = document.querySelector('.todo-list')
const btnTrash = document.querySelector('.btn-delect')
const countItem = document.querySelector('.count')
                              
                              //Events
btnAdd.addEventListener('click', addTodo )
todoList.addEventListener('click', removeTodo)
document.addEventListener('DOMContentLoaded', showTodo )
selected.addEventListener('change', filterTodo)

// Variable pour le nombre de Todo
let count = 0;

                            //FUNCTION//
                            
//Fonction création élément du DOM
function CreateElementDom(todo) {

    // Ajouter une Div Container
    const divTodo = document.createElement('div');
    divTodo.classList.add('container-item');

    //Ajouter un Li
    const itemLi = document.createElement('li');
    itemLi.classList.add('todo-li');
    todoList.appendChild(divTodo);
    divTodo.appendChild(itemLi);
    itemLi.innerHTML = todo;


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
}


function addTodo(e) {

    e.preventDefault();
    




    if (input.value !== '') {

        //   Ajouter le nombre de Todo
        countItem.innerHTML = count += 1


        //Récupérer les todos dans le localStorage
        let todos;

        let getLocalStorage = localStorage.getItem('todos')
    
        if (getLocalStorage === null) {
    
            todos = [];
    
        } else {
    
            todos = JSON.parse(getLocalStorage)
        }
           

        todos.push(input.value);
    
        localStorage.setItem('todos', JSON.stringify(todos)) 
        
        
        
        CreateElementDom(input.value)
    
        //Réinitialiser l'input après saisie
        input.value = '';
        
        
    } else {

        alert('Veuiller entrer votre tache...')    
    }
}    

// Afficher les taches après rafraichissement du navigateur
function showTodo() {

    //récupérer le localStorage
    let todos = JSON.parse(localStorage.getItem('todos'))

    todos.forEach(item => {

        
        CreateElementDom(item)

        //Afficher le nombre de todo après rafraichissement du DOM
        countItem.innerHTML = count += 1;
    })
 
}

function removeTodo(e){

    const item = e.target;
 
    if(item.classList[0] === 'btn-delect') {
       countItem.innerHTML = count -= 1
        
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
 
//Supprimer  les Todos dans le localStorage
function removeLocal(todo) {

    
    let todoIndex = todo.children[0].innerText 
    
    let todos = JSON.parse(localStorage.getItem('todos'))

    todos.splice(todos.indexOf(todoIndex), 1);
   
    localStorage.setItem('todos', JSON.stringify(todos))
    
}

//Afficher les Todos en fonction du filtre
function filterTodo(e) {
   
   // Récupérer les items
   const todo = todoList.childNodes;

   todo.forEach(todos => {

       switch(e.target.value) {
    
           case 'all': todos.style.display = 'flex';
           break;
    
           case 'complet': 
           if (todos.classList.contains('complet')) {
               
               todos.style.display = 'flex';
    
           } else {
    
               todos.style.display = 'none';
           }
           break;
           
           case 'incomplet': 
           if (!todos.classList.contains('complet')) {
            
            todos.style.display = 'flex';

           } else {

            todos.style.display = 'none';

           }
           break;    
       }
       
   })


}



