const input_box = document.getElementById("input-box");
const list_container = document.getElementById("list-container");

function addTask(){
    if(input_box.value === ""){
        alert("You Must Write Something!");
    }else{
        let li = document.createElement("li");
        li.innerHTML = input_box.value;
        list_container.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    input_box.value = "";
}

list_container.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
    }else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
    }
}, false);