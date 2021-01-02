const electron = require("electron");
const ipc = electron.ipcRenderer;

function app() {
  const btn1 = document.getElementById("btn1");

  if (btn1 !== null) {
    btn1.addEventListener("click", (e) => {
      let selIndex = document.getElementById("t1").selectedIndex;
      let selValue = document.getElementById("t1").options[selIndex].innerHTML;
      localStorage.setItem("item-clicked", selValue);
      ipc.send("open-Table");
    });
  }
  const btn2 = document.getElementById("btn2");

  if (btn2 !== null) {
    btn2.addEventListener("click", (e) => {
      let selIndex = document.getElementById("t2").selectedIndex;
      let selValue = document.getElementById("t2").options[selIndex].innerHTML;
      localStorage.setItem("item-clicked", selValue);
      ipc.send("open-Table");
    });
  }
  const btn3 = document.getElementById("btn3");

  if (btn3 !== null) {
    btn3.addEventListener("click", (e) => {
      let selIndex = document.getElementById("t3").selectedIndex;
      let selValue = document.getElementById("t3").options[selIndex].innerHTML;
      localStorage.setItem("item-clicked", selValue);
      ipc.send("open-Table");
    });
  }
  const btn4 = document.getElementById("btn4");

  if (btn4 !== null) {
    btn4.addEventListener("click", (e) => {
      let selIndex = document.getElementById("t4").selectedIndex;
      let selValue = document.getElementById("t4").options[selIndex].innerHTML;
      localStorage.setItem("item-clicked", selValue);
      ipc.send("open-Table");
    });
  }
  const btn5 = document.getElementById("btn5");

  if (btn5 !== null) {
    btn5.addEventListener("click", (e) => {
      let selIndex = document.getElementById("t5").selectedIndex;
      let selValue = document.getElementById("t5").options[selIndex].innerHTML;
      localStorage.setItem("item-clicked", selValue);
      ipc.send("open-Table");
    });
  }
  const btn6 = document.getElementById("btn6");

  if (btn6 !== null) {
    btn6.addEventListener("click", (e) => {
      let selIndex = document.getElementById("t6").selectedIndex;
      let selValue = document.getElementById("t6").options[selIndex].innerHTML;
      localStorage.setItem("item-clicked", selValue);
      ipc.send("open-Table");
    });
  }
}

app();
