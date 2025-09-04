const { contextBridge, ipcRenderer } = require('electron');
// const { loadPage, login } = require('./core/scripts/window.js');

contextBridge.exposeInMainWorld('electronAPI', {
    // Database operations
    getAllFromTable: (tableName) => ipcRenderer.invoke('get-objects-from-table', tableName),
    insertRecord: (tableName, data) => ipcRenderer.invoke('add-object-to-table', tableName, data),

    // page navigation
    navigate: (page) => ipcRenderer.send('navigate', page),

    // updateRecord: (tableName, id, data) => ipcRenderer.invoke('update-record', tableName, id, data),
    // deleteRecord: (tableName, id) => ipcRenderer.invoke('delete-record', tableName, id),
    // getTableStats: (tableName) => ipcRenderer.invoke('get-table-stats', tableName)
});