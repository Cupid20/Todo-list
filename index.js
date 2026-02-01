const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const addTaskForm = document.getElementById('add-task');
let filter = document.getElementById('search');

filter.addEventListener('keyup', filterItem);

addTaskForm.addEventListener('submit', function(e){
    e.preventDefault();
    if(inputBox.value === ''){
        alert("You must write something")
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'list-btn delete';
        deleteBtn.appendChild(document.createTextNode('X'));
        li.appendChild(deleteBtn);
        let span = document.createElement('span');
        span.innerHTML = '\u270E';
        li.appendChild(span);
       
    }
    inputBox.value = '';
    saveData();
});

listContainer.addEventListener('click', function(e) {
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle('checked');
        saveData();
    }
    else if(e.target.classList.contains('delete')){
        if(confirm('Are you sure')){
            let li = e.target.parentElement;
            listContainer.removeChild(li);
            saveData();
        }
    }
}, false);

function filterItem(e) {
    let text = e.target.value.toLowerCase();
    let items = listContainer.getElementsByTagName('li');
    Array.from(items).forEach(function(item){
        let itemName = item.firstChild.textContent
       if(itemName.toLowerCase().indexOf(text) != -1){
        item.style.display = 'block';
       } else {
        item.style.display = 'none';
       }
    })
};

function saveData(){
    localStorage.setItem('data', listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem('data');
}
showTask();
