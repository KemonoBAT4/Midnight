
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// FIXME: this does not work, find a way to put the icons
// const iconPath = path.join(__dirname, "core", "assets", "icons", "midnight.svg");

const userSchema = require('./core/database/schemas/user.json');
const websiteSchema = require('./core/database/schemas/website.json');
const taskSchema = require('./core/database/schemas/task.json');

// const { logSchema } = require('./core/database/schemas/log'); // done
// const { taskSchema } = require('./core/database/schemas/task'); // done
// const { noteSchema } = require('./core/database/schemas/note'); // done
// const { mailSchema } = require('./core/database/schemas/mail'); // done
// const { calendarSchema } = require('./core/database/schemas/calendar');
// const { shortcutSchema } = require('./core/database/schemas/shortcut');
// const { themeSchema } = require('./core/database/schemas/theme');
// const { roleSchema } = require('./core/database/schemas/role');
// const { table } = require('console');


// Database setup
const dbPath = path.join(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.CREATE, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
        createTables();
    }
});

// Create database tables
function createTables() {
    "tables:"
    "users, settings, logs, websites, widgets, tasks, notes, mails, calendar, shortcuts, themes, roles"

    let allSchemas = [
        userSchema,
        websiteSchema,
        taskSchema
    ];

    for (let schema of allSchemas) {

        let tableName = schema.tableName;

        let resultQuery = '';
        let primaryKeys = [];
        let foreignKeys = [];

        Object.entries(schema).filter(([key, value]) => {
            if (key === 'tableName') return false; // Skip tableName
            if (value.primaryKey != undefined) {
                primaryKeys.push(key);

                let type = value.type;
                switch(type) {
                    case 'integer': resultQuery += `${key} INTEGER `; break;
                    case 'boolean': resultQuery += `${key} BOOLEAN `; break;
                    case 'string': resultQuery += `${key} VARCHAR(255) `; break;
                    case 'text': resultQuery += `${key} TEXT `; break;
                    case 'datetime': resultQuery += `${key} DATETIME `; break;
                    case 'date': resultQuery += `${key} DATE `; break;

                    default: return;
                }

                let autoIncrement = value.autoIncrement ? resultQuery += 'AUTO_INCREMENT ' : '';
                resultQuery += ',';
            }
            else if (value.references != undefined) {
                foreignKeys.push({ column: key, references: value.references });
                let type = value.type;
                switch(type) {
                    case 'integer': resultQuery += `${key} INTEGER `; break;
                    case 'boolean': resultQuery += `${key} BOOLEAN `; break;
                    case 'string': resultQuery += `${key} VARCHAR(255) `; break;
                    case 'text': resultQuery += `${key} TEXT `; break;
                    case 'datetime': resultQuery += `${key} DATETIME `; break;
                    case 'date': resultQuery += `${key} DATE `; break;

                    default: return;
                }
                // let required = value.required ? resultQuery += 'NOT NULL ' : '';
                resultQuery += ',';
            }
            else {
                let type = value.type;

                switch(type) {
                    case 'integer': resultQuery += `${key} INTEGER `; break;
                    case 'boolean': resultQuery += `${key} BOOLEAN `; break;
                    case 'string': resultQuery += `${key} VARCHAR(255) `; break;
                    case 'text': resultQuery += `${key} TEXT `; break;
                    case 'datetime': resultQuery += `${key} DATETIME `; break;
                    case 'date': resultQuery += `${key} DATE `; break;

                    default: return;
                }

                let required = value.required ? resultQuery += 'NOT NULL ' : '';
                let unique = value.unique ? resultQuery += 'UNIQUE ' : '';
                let autoIncrement = value.autoIncrement ? resultQuery += 'AUTO_INCREMENT ' : '';
                resultQuery += ',';
            }
        })

        if (primaryKeys.length > 0) {
            for (let pk of primaryKeys) {
                resultQuery += `PRIMARY KEY (${pk}),`
            }
        }

        if (foreignKeys.length > 0) {
            for (let fk of foreignKeys) {
                resultQuery += `FOREIGN KEY (${fk.column}) REFERENCES ${fk.references.table}(${fk.references.column}),`
            }
        }

        resultQuery = resultQuery.slice(0, -1); // Remove trailing comma

        let createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${resultQuery})`;

        console.log(`Creating table: ${tableName}`);
        db.run(createTableQuery);
    }
}

function createSampleData() {

}

// IPC handlers for database operations
ipcMain.handle('get-objects-from-table', async (event, tableName) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM ${tableName}`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
});

ipcMain.handle('add-object-to-table', async (event, tableName, data) => {
    return new Promise((resolve, reject) => {
        const { username, name, surname, email } = data;
        db.run(
            `INSERT INTO users (username, name, surname, email) VALUES (?, ?, ?, ?)`,
            [username, name, surname, email],
            function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, ...userData });
                }
            }
        );
    });
});

// ipcMain.handle('delete-object-from-table', async (event, tableName, id) => {
//     return new Promise((resolve, reject) => {
//         db.run(`DELETE FROM users WHERE id = ?`, [id], function(err) {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve({ deleted: this.changes > 0 });
//             }
//         });
//     });
// });


function midnightWindow() {
    const win = new BrowserWindow({
        show: false,
        autoHideMenuBar: true,
        minimizable: true,
        minWidth: 1600,
        minHeight: 800,

        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.maximize();
    win.show();

    // future page name
    win.loadFile('core/views/window.html');

    // win.loadFile('core/views/midnightDesktopNew.html');
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