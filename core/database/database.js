
const sqllite3 = require('sqlite3').verbose();
const path = require('path');
const { app } = require('electron');

// path to SQLite database file (auto-creates if it doesn't exist)
const dbPath = path.join(__dirname, 'database.db');



const { userSchema } = require('./schemas/user'); // done
const { settingsSchema } = require('./schemas/setting'); // dont know how to set it up
const { logSchema } = require('./schemas/log'); // done
const { websiteSchema } = require('./schemas/website'); // done
const { taskSchema } = require('./schemas/task'); // done
const { noteSchema } = require('./schemas/note'); // done
const { mailSchema } = require('./schemas/mail'); // done
const { calendarSchema } = require('./schemas/calendar');
const { shortcutSchema } = require('./schemas/shortcut');
const { themeSchema } = require('./schemas/theme');
const { roleSchema } = require('./schemas/role');
const { table } = require('console');

const db = new sqllite3.Database(dbPath, sqllite3.OPEN_READWRITE, (err) => {
    if (!err) {
        console.log('Connected to the database.');

        db.run(
            `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                name TEXT NOT NULL,
                surname TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,

            )`
        )

    } else {
        console.error('Error opening database:', err.message);
    }
});

function createTables() {
    "tables:"
    "users, settings, logs, websites, widgets, tasks, notes, mails, calendar, shortcuts, themes, roles"

    let allSchemas = [
        userSchema,
        settingsSchema,
        logSchema,
        websiteSchema,
        taskSchema,
        noteSchema,
        mailSchema,
        calendarSchema,
        shortcutSchema,
        themeSchema,
        roleSchema
    ];

    for (let schema of allSchemas) {
        let tableName = schema.tableName;

        let columns = Object.entries(schema).map(([key, value]) => {
            if (key === 'tableName') return ''; // Skip tableName
            if (key === 'id') return 'id INTEGER PRIMARY KEY AUTOINCREMENT';
            let type = value.type;
            let required = value.required ? 'NOT NULL' : '';
            let unique = value.unique ? 'UNIQUE' : '';
            let primaryKey = value.primaryKey ? 'PRIMARY KEY' : '';
            let autoIncrement = value.autoIncrement ? 'AUTOINCREMENT' : '';
            let references = value.references ? `REFERENCES ${value.references.table}(${value.references.column})` : '';
            return `${key} ${type} ${required} ${unique} ${primaryKey} ${autoIncrement} ${references}`;
        }).join(', ');
        let createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`;

        console.log(`Creating table: ${tableName}`);
        db.run(createTableQuery);
    }
}