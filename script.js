const input_box = document.getElementById("input-box");
const list_container = document.getElementById("list-container");
const list_container_completed = document.getElementById("list-container-completed");
const count_container_data = document.getElementById("#count-container");
const add_button = document.getElementById("addButton");
let taskCount = 0;
let completedCount = 0;

function verifyNotNegativeTaskCount(taskCount){
    if(taskCount >=0) return true;
}

function verifyNotNegativeCompletedCount(taskCompleted){
    if(taskCompleted >=0) return true;
}

function updateTaskCount() {
    const taskCountElement = document.getElementById("taskCount");
    taskCountElement.textContent = taskCount;
}

function updateCompletedCount() {
    const completedCountElement = document.getElementById("completedCount");
    completedCountElement.textContent = completedCount;
}

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
    if(input_box.value !== ""){
        let li = document.createElement("li");
        let finalData = getDateAndTime();
        li.innerHTML = input_box.value +"<br>"+finalData;
        list_container.appendChild(li);
        taskCount++;
        if(verifyNotNegativeTaskCount(taskCount) == true){
            updateTaskCount();
        }
        
        const removeButton = document.createElement("span");
        removeButton.innerHTML = "\u00d7";
        removeButton.className = "remove-button";
        removeButton.addEventListener("click", function () {
            taskCount--;
            if(verifyNotNegativeTaskCount(taskCount) == true){
                updateTaskCount();
            }
            li.remove();
        });

        li.appendChild(removeButton);
    }
    input_box.value = "";
    saveData();
}

list_container.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){

        const li = e.target;
        li.classList.toggle("checked");
        saveData();

        if (li.classList.contains("checked")) {
            list_container.removeChild(li);
            
            completedCount++;
            taskCount--;
            if(verifyNotNegativeCompletedCount(completedCount) == true){
                updateCompletedCount();
            }
            if(verifyNotNegativeTaskCount(taskCount) == true){
                updateTaskCount();
            }

            li.classList.remove("checked");
            document.getElementById("list-container-completed").appendChild(li);
            saveData();
        }

        e.target.classList.toggle("checked");
        saveData();

    }else if(e.target.tagName === "BUTTON"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);


list_container_completed.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){

        const li = e.target;
        li.classList.toggle("checked");
        saveData();

        if (li.classList.contains("checked")) {
            list_container_completed.removeChild(li);
            li.classList.remove("checked");
            document.getElementById("list-container-completed").appendChild(li);
            saveData();
        }

        e.target.classList.toggle("checked");
        saveData();

    }else if(e.target.tagName === "BUTTON"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);


function saveData(){
    localStorage.setItem("data",list_container.innerHTML);
    localStorage.setItem("dataCompleted",list_container_completed.innerHTML);
}

function displayData(){
    list_container.innerHTML = localStorage.getItem("data");
    list_container_completed.innerHTML = localStorage.getItem("dataCompleted");
}

// Uncomment only if you get ambigious extra div element saved in your browser
// function removeData(){
//     const key = "data";
//     // Remove the data from the local storage
//     localStorage.removeItem(key);
//     localStorage.removeItem("dataCompleted");
// }
// removeData();
displayData();
