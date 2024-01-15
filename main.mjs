/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { BrowserWindow, app, screen } from "electron";
import { URL } from "url";

import { startServer } from "./dist/server/start-server.js";

app.disableHardwareAcceleration();

const createWindow = () => {
  const size = screen.getPrimaryDisplay().workAreaSize;
  const mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    backgroundColor: "#000000",
    darkTheme: true,
    fullscreen: true,
    height: size.height,
    webPreferences: {
      nodeIntegration: false,
    },
    width: size.width,
    x: 0,
    y: 0,
  });

  //mainWindow.webContents.openDevTools()

  const u = new URL("http://localhost:5000");

  mainWindow.loadURL(u.href);
};

void app.whenReady().then(async () => {
  await startServer();

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
