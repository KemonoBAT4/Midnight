
const { app, BrowserWindow } = require('electron');

// FIXME: this does not work, find a way to put the icons
// const iconPath = path.join(__dirname, "core", "assets", "icons", "midnight.svg");

function midnightWindow() {
    const win = new BrowserWindow({
        show: false,
        autoHideMenuBar: true,
        minimizable: true,
        minWidth: 1600,
        minHeight: 800,

        webPreferences: {
            nodeIntegration: true
        }
    });

    win.maximize();
    win.show();

    // future page name
    // win.loadFile('core/views/window.html');

    // win.loadFile("core/views/midnightDesktop.html");
    win.loadFile('core/views/midnightDesktopNew.html');
}


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Init the database when app is ready
app.whenReady().then(async () => {
    // await initializeDatabase();
    midnightWindow();

    if (BrowserWindow.getAllWindows().length === 0) {
        midnightWindow();
    }
});