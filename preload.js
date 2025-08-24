const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
    // Database operations
    getAllFromTable: (tableName) => ipcRenderer.invoke('get-objects-from-table', tableName),
    // insertRecord: (tableName, data) => ipcRenderer.invoke('insert-record', tableName, data),
    // updateRecord: (tableName, id, data) => ipcRenderer.invoke('update-record', tableName, id, data),
    // deleteRecord: (tableName, id) => ipcRenderer.invoke('delete-record', tableName, id),
    // getTableStats: (tableName) => ipcRenderer.invoke('get-table-stats', tableName)
});