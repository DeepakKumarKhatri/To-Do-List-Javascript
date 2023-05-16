const input_box = document.getElementById("input-box");
const list_container = document.getElementById("list-container");
const add_button = document.getElementById("addButton");

function getDateAndTime() {
    const daylist = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = new Date();
    let hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();
    const prepand = hour >= 12 ? " PM" : " AM";

    hour = hour % 12 || 12;

    if (hour === 12 && minute === 0 && second === 0) {
        prepand === " PM" ? (hour = "Noon") : (hour = "Midnight");
    }

    const todayDay = daylist[today.getDay()];
    const returnData = `${todayDay}: ${hour}${prepand} : ${minute} min : ${second} sec`;
    return returnData;
}

input_box.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === "Enter") {
        add_button.click();
    }
});

function addTask(){
    if(input_box.value === ""){
        alert("You Must Write Something!");
    }else{
        let li = document.createElement("li");
        let finalData = getDateAndTime();
        li.innerHTML = input_box.value +"<br>"+finalData;
        list_container.appendChild(li);

        const removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        removeButton.className = "remove-button";
        removeButton.addEventListener("click", function () {
            li.remove();
        });

        li.appendChild(removeButton);
    }
    input_box.value = "";
    saveData();
}

list_container.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data",list_container.innerHTML);
}

function displayData(){
    list_container.innerHTML = localStorage.getItem("data");
}

// function removeData(){
//     const key = "data";
//     // Remove the data from the local storage
//     localStorage.removeItem(key);
// }
// removeData();
displayData();