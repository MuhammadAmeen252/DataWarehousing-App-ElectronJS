const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const ipc = electron.ipcMain;

console.log("app.js file");
let winOne, winTwo;
function createWindow() {
  winOne = new BrowserWindow({
    height: 600, // height
    width: 800, // width
    // autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
  });
  winOne.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file",
      slashes: true,
    })
  );
  //to open dev tools like inspect ,console on browser
  winOne.webContents.openDevTools();
  winOne.on("closed", () => {
    winOne = null;
  });
}

ipc.on("open-Table", (e) => {
  winTwo = new BrowserWindow({
    width: 1000,
    height: 600,
    // autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
    },
  });
  winTwo.loadURL(
    url.format({
      pathname: path.join(__dirname, "table.html"),
      protocol: "file",
      slashes: true,
    })
  );
  //to open dev tools like inspect ,console on browser
  winTwo.webContents.openDevTools();
  winTwo.on("closed", () => {
    winTwo = null;
  });
});

app.on("ready", createWindow);
