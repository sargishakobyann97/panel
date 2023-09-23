const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const { routes } = require("./router/router");
const isDev = require("electron-is-dev");
const window = require("./window");
const firstRun = require("./modules/first_run");

const template = [
    {
        label: "Application",
        submenu: [
            { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
            { type: "separator" },
            {
                label: "Quit",
                accelerator: "Command+Q",
                click: function () {
                    app.quit();
                },
            },
        ],
    },
    {
        label: "Edit",
        submenu: [
            { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
            { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
            { type: "separator" },
            { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
            { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
            { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
            { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" },
        ],
    },
];

Menu.setApplicationMenu(Menu.buildFromTemplate(template));
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
    let w = window;
    let box = w.get();
    if (isDev) {
        box.webContents.openDevTools();
        box.loadURL("http://localhost:3000/").then(() => new firstRun(w).init());
    } else {
        box.loadFile(path.join(__dirname, "./front/build/index.html")).then(() => new firstRun(w).init());
    }

    return box;
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        window.get();
    }
});

routes.forEach((route) => {
    ipcMain[route.type](route.name, route.handler);
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
