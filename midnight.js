
const { app, BrowserWindow } = require('electron');

function createWindow() {
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

    win.loadFile('core/views/test.html');
}


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.whenReady().then(() => {
    createWindow();

    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});