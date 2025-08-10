const { remote } = require('electron');

const dbInstance = remote.getGlobal('db');

document.addEventListener('DOMContentLoaded', () => {

    let user = document.querySelector('.user-name');
    let role = document.querySelector('.user-role');

    // Fetch user data from the server


});