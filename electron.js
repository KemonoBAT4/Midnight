
const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        show: false,
        autoHideMenuBar: true,

        webPreferences: {
            nodeIntegration: true
        }
    });

    win.maximize();
    win.show();

    win.loadFile('core/views/homepage.html');
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