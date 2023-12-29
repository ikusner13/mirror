import { app, BrowserWindow, screen } from "electron";
import * as path from "path";
// import { initServer } from "../../packages/api/dist/init-server";
import { initServer } from "api";

function createWindow() {
  const screenSize = screen.getPrimaryDisplay().workAreaSize;
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: screenSize.height ?? 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
    width: screenSize.width ?? 800,
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
app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("before-quit", (event) => {
  console.log("before-quit");
  event.preventDefault();

  //TODO: manually stop server

  process.exit(0);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

initServer().then((server) => {
  server.listen(5000, () => {
    console.log("server listening on port 5000");
  });
  //TODO: start server
  app.whenReady().then(() => {
    createWindow();
  });
});
