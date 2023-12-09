 "use strict";

// find elements
const task = document.getElementById("busy");
const addBt = document.getElementById("addBt");
const form1 = document.getElementById("doing");
const listDoing = document.querySelector("#doing ul");
const form2 = document.getElementById("finish");
const listFinish = document.querySelector("#finish ul");
const initBt = document.getElementById("initBt");
const error = document.getElementById("error");

// "Add" button listening event
addBt.addEventListener("click", (e) => {
  // "Change", "Delete" och "Finished" working as Object
  const changeEl = {
    changeBt: document.createElement("button"),
    initial: function() {
      this.changeBt.innerText = "Change";
      this.changeBt.classList.add("button");
      this.changeBt.addEventListener("click", this.changeButtonEvent);
    },
    changeButtonEvent: function(e) {
      e.preventDefault();
      // edit or lock input
      const inputEl = e.target.previousElementSibling;
      if (inputEl.readOnly === true) {
        inputEl.readOnly = false;
        e.target.innerText = "Save";
      } else {
        inputEl.readOnly = true;
        e.target.innerText = "Change";
      }
      const currentText = inputEl.value;
      currentText !== ""
        ? (error.style.display = "none")
        : (error.style.display = "block");
    },
  };

  const deleteEl = {
    deleteBt: document.createElement("button"),
    initial: function() {
      this.deleteBt.innerText = "Delete";
      this.deleteBt.classList.add("button");
      this.deleteBt.addEventListener("click", this.deleteButtonEvent);
    },
    deleteButtonEvent: function(e) {
      e.preventDefault();
      e.target.parentNode.remove();
    },
  };

  const finishEl = {
    finishBt: document.createElement("button"),
    initial: function() {
     this.finishBt.innerText = "Finished";
     this.finishBt.classList.add("button");
     this.finishBt.addEventListener("click", this.finishButtonEvent);
    },
    finishButtonEvent: function(e) {
      e.preventDefault();
      e.target.parentNode.remove();
      form2.style.display = "block";
      // input
      const input = document.createElement("input");
      input.classList.add("input");
      input.type = "text";
      input.value =  e.target.previousElementSibling.previousElementSibling.value;
      input.readOnly = true;
      // "Change" button
      const changeButton = Object.create(changeEl);
      changeButton.initial();
      // "Delete" button
      const deleteButton = Object.create(deleteEl);
      deleteButton.initial();
      // create li and add the children
      const finishLi = document.createElement("li");
      listFinish.appendChild(finishLi);
      finishLi.appendChild(input);
      finishLi.appendChild(changeButton.changeBt);
      finishLi.appendChild(deleteButton.deleteBt);
    }, 
  };

  // "Add" condition and elements
  if (task.value.trim() !== "") {
    e.preventDefault();
    form1.style.display = "block";
    // input
    const input = document.createElement("input");
    input.setAttribute("class", "input");
    input.type = "text";
    input.value = task.value;
    input.readOnly = true;

    // "Change" button
    const changeButton = Object.create(changeEl);
    changeButton.initial();
  
    // "Finished" button
    const finishButton = Object.create(finishEl);
    finishButton.initial();

    // "Delete" button
    const deleteButton = Object.create(deleteEl);
    deleteButton.initial();

    // create li and add the children
    const doLi = document.createElement("li");
    listDoing.appendChild(doLi);
    doLi.appendChild(input);
    doLi.appendChild(changeButton.changeBt);
    doLi.appendChild(finishButton.finishBt);
    doLi.appendChild(deleteButton.deleteBt);
    task.value = "";

    // "Reset" button listening event
    initBt.addEventListener("click", (e) => {
      e.preventDefault();
      form1.style.display = "none";
      form2.style.display = "none";
      error.style.display = "none";
      document.querySelector("li").remove();
    });
  }
});


