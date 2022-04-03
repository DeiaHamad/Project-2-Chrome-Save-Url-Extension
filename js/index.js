const inputField = document.querySelector("input");
const saveBtn = document.querySelector(".save");
const removeBtn = document.querySelector(".remove");
const deleteBtn = document.querySelector(".delete");
const urlListHtml = document.querySelector("ul");
let urlArray = [];
let btnStatus = "";

let btnSound = new Audio("sounds/btn.wav");

let urlArrayLocalStorage = JSON.parse(localStorage.getItem("urlArray"));

if (urlArrayLocalStorage) {
    //If it's a truthy value
    urlArray = urlArrayLocalStorage;
    looping();
}

function chromeActiveTab() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        inputField.value = tabs[0].url;
     });
}

chromeActiveTab();

saveBtn.addEventListener("click", () => {
    btnSound.play();
    btnStatus = "add";
    logic();
});

removeBtn.addEventListener("click", () => {
    btnSound.play();
    btnStatus = "remove";
    logic();
});

deleteBtn.addEventListener("click", () => {
    btnSound.play();
    btnStatus = "delete";
    logic();
});

function logic() {
    urlListHtml.innerHTML = "";
    if (btnStatus === "add") {
        if (inputField.value.length > 0) {
            urlArray.push(inputField.value);
        }
    } else if (btnStatus === "remove") {
        urlArray.pop();
    } else {
        urlArray = [];
    }
    looping();
    localStorageFunction();
} 

function looping() {
    inputField.value = "";
    for (let i = 0; i < urlArray.length; i++) {
        const a = document.createElement("A");
        a.href = urlArray[i];
        a.innerHTML = urlArray[i];
        a.target = "_blank";
        const li = document.createElement("li");
        li.append(a);
        urlListHtml.append(li);
    }
}

function localStorageFunction() {
    if (btnStatus === "add" || btnStatus === "remove") {
        localStorage.setItem("urlArray", JSON.stringify(urlArray));
    } else {
        localStorage.clear();
    }
}
