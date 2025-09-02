const { contextBridge, ipcRenderer } = require('electron');
const windowFunctions = require('./core/scripts/window.js');

contextBridge.exposeInMainWorld('electronAPI', {
    // Database operations
    getAllFromTable: (tableName) => ipcRenderer.invoke('get-objects-from-table', tableName),
    insertRecord: (tableName, data) => ipcRenderer.invoke('add-object-to-table', tableName, data),

    loadPage: windowFunctions.loadPage,
    login: windowFunctions.login

    // updateRecord: (tableName, id, data) => ipcRenderer.invoke('update-record', tableName, id, data),
    // deleteRecord: (tableName, id) => ipcRenderer.invoke('delete-record', tableName, id),
    // getTableStats: (tableName) => ipcRenderer.invoke('get-table-stats', tableName)
});