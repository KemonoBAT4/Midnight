const { Low, JSONFile } = require('lowdb');

// const { addUser, getUsers, getUsersById, getUserByEmail } = require('./functions/user');

// schemas
const { userSchema } = require('./../schemas/user');
const { settingsSchema } = require('./../schemas/settings');
const { logSchema } = require('./../schemas/log');
const { websiteSchema } = require('./../schemas/website');
const { widgetSchema } = require('./../schemas/widget');
const { taskSchema } = require('./../schemas/task');
const { noteSchema } = require('./../schemas/note');
const { mailSchema } = require('./../schemas/mail');
const { calendarSchema } = require('./../schemas/calendar');
const { shortcutSchema } = require('./../schemas/shortcut');
const { themeSchema } = require('./../schemas/theme');
const { roleSchema } = require('./../schemas/tole');


const adapter = new JSONFile('db.json');
const db = new Low(adapter);

async function initializeDatabase() {
    await db.read();
    db.data ||= {
        users: [],
        settings: {},
        logs: [],
        websites: [],
        widgets: [],
        tasks: [],
        notes: [],
        mails: [],
        calendar: [],
        shortcuts: [],
        themes: [],
        roles: [],
    };
    await db.write();
}

//##################
//# USER FUNCTIONS #
//#region ##########


// get user by id
async function getUserById(id) {
    await db.read();
    return db.data.users.find(user => user.id === id);
}

// gest user by email
async function getUserByEmail(email) {
    await db.read();
    return db.data.users.find(user => user.email === email);
}

//#endregion #######

//#####################
//# WEBSITE FUNCTIONS #
//#region #############

async function addWebsite(website) {
    await db.read();
    db.data.websites.push(website);
    await db.write();
}

async function getWebsites() {
    await db.read();
    return db.data.websites;
}

async function getWebsiteById(id) {
    await db.read();
    return db.data.websites.find(website => website.id === id);
}

//#endregion ##########

//#################
//# NOTE FUNCTION #
//#################

async function addNote(note) {
    await db.read();
    db.data.notes.push(note);
    await db.write();
}

async function getNotes() {
    await db.read();
    return db.data.notes;
}

async function getNoteById(id) {
    await db.read();
    return db.data.notes.find(note => note.id === id);
}

//#endregion ######

// Export the funtions
module.exports = {
    initializeDatabase,
    db,
    getUserById,
    getUserByEmail,
    addWebsite,
    getWebsites,
    getWebsiteById,
    addNote,
    getNotes,
    getNoteById
};