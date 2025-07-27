
const { app, BrowserWindow } = require('electron');
const path = require('path');

const iconPath = path.join(__dirname, "core", "assets", "icons", "midnight.svg");

function midnightWindow() {
    const win = new BrowserWindow({
        show: false,
        autoHideMenuBar: true,
        minimizable: true,
        minWidth: 1600, // TODO: adjust css to make it work properly and remove this line
        minHeight: 800, // TODO: adjust css to make it work properly and remove this line

        webPreferences: {
            nodeIntegration: true
        }

    });

    win.maximize();
    win.show();

    win.loadFile('core/views/midnightDesktop.html');
}


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.whenReady().then(() => {
    midnightWindow();

    if (BrowserWindow.getAllWindows().length === 0) {
        midnightWindow();
    }
});