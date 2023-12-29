"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
// import { initServer } from "../../packages/api/dist/init-server";
var api_1 = require("api");
function createWindow() {
    var _a, _b;
    var screenSize = electron_1.screen.getPrimaryDisplay().workAreaSize;
    // Create the browser window.
    var mainWindow = new electron_1.BrowserWindow({
        height: (_a = screenSize.height) !== null && _a !== void 0 ? _a : 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
        },
        width: (_b = screenSize.width) !== null && _b !== void 0 ? _b : 800,
        x: 0,
        y: 0,
        darkTheme: true,
        backgroundColor: "#000000",
        // show: false,
        frame: false,
        transparent: true,
        hasShadow: false,
        fullscreen: true,
    });
    // load frontend app
    mainWindow.loadURL(path.join(__dirname, "./ui-dist/index.html"));
}
//app handlers
electron_1.app.on("window-all-closed", function () {
    electron_1.app.quit();
});
electron_1.app.on("activate", function () {
    if (electron_1.BrowserWindow.getAllWindows().length === 0)
        createWindow();
});
electron_1.app.on("before-quit", function (event) {
    console.log("before-quit");
    event.preventDefault();
    //TODO: manually stop server
    process.exit(0);
});
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
(0, api_1.initServer)().then(function (server) {
    server.listen(5000, function () {
        console.log("server listening on port 5000");
    });
    //TODO: start server
    electron_1.app.whenReady().then(function () {
        createWindow();
    });
});
