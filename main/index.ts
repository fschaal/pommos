import { app, BrowserWindow, Tray } from "electron";
import isDev from "electron-is-dev";
import path from "path";
import main from "@electron/remote/main";

let win: BrowserWindow;
let tray: Tray;

if (process.platform === "darwin") {
  app.dock.hide();
}

main.initialize();

async function createMainWindow(): Promise<BrowserWindow> {
  win = new BrowserWindow({
    title: "Pommos",
    width: 250,
    height: 400,
    frame: false,
    fullscreenable: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      sandbox: true,
      contextIsolation: true,
      webSecurity: true,
      enableRemoteModule: true,
    },
  });

  if (isDev) {
    await win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();
  } else {
    win.hide();

    await win.loadURL(
      `file://${path.join(__dirname, "../dist/index.html")}`
    );
  }

  win.on("blur", () => {
    if (!win.webContents.isDevToolsOpened()) {
      win.hide();
    }
  });

  return win;
}

function createTray(): void {
  tray = new Tray(
    path.join(__dirname, "../dist/iconTemplate.png")
  );

  tray.on("click", () => {
    toggleWindow();
  });

  tray.setToolTip("Pommos");
}

function toggleWindow(): void {
  win.isVisible() ? win.hide() : showWindow();
}

function showWindow() {
  const position = getWindowPosition();
  win.setPosition(position.x, position.y, false);
  win.show();
}

function getWindowPosition() {
  const windowBounds = win.getBounds();
  const trayBounds = tray.getBounds();

  const x = Math.round(
    trayBounds.x +
      trayBounds.width / 2 -
      windowBounds.width / 2
  );

  const y = Math.round(
    trayBounds.y + trayBounds.height + 4
  );

  return { x: x, y: y };
}

app.whenReady().then(async () => {
  createTray();
  await createMainWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", async () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0)
    await createMainWindow();
});

process.on("unhandledRejection", (error) => {
  console.error(error);
});
