const { remote } = require('electron');

const dbInstance = remote.getGlobal('db');

document.addEventListener('DOMContentLoaded', () => {

    let user = document.querySelector('.user-name');
    let role = document.querySelector('.user-role');

    // Fetch user data from the server


});


// Example usage in your renderer process

// Get all users
async function getAllUsers() {
    try {
        const users = await window.electronAPI.getAllFromTable('users');
        console.log('All users:', users);
        return users;
    } catch (error) {
        console.error('Error getting users:', error);
    }
}

// Insert a new user
async function addUser(userData) {
    try {
        const newUser = await window.electronAPI.insertRecord('users', userData);
        console.log('New user added:', newUser);
        return newUser;
    } catch (error) {
        console.error('Error adding user:', error);
    }
}

// Update a user
async function updateUser(userId, updateData) {
    try {
        const result = await window.electronAPI.updateRecord('users', userId, updateData);
        console.log('Update result:', result);
        return result;
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

// Delete a user
async function deleteUser(userId) {
    try {
        const result = await window.electronAPI.deleteRecord('users', userId);
        console.log('Delete result:', result);
        return result;
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

// Get table statistics
async function getUsersStats() {
    try {
        const stats = await window.electronAPI.getTableStats('users');
        console.log('Users table stats:', stats);
        return stats;
    } catch (error) {
        console.error('Error getting stats:', error);
    }
}

// Usage examples
async function exampleUsage() {
    // Get all users
    const users = await getAllUsers();
    
    // Add a new user
    const newUser = await addUser({
        username: 'johndoe',
        name: 'John',
        surname: 'Doe',
        email: 'john@example.com'
    });
    
    // Update a user
    if (users && users.length > 0) {
        await updateUser(users[0].id, { name: 'John Updated' });
    }
    
    // Get statistics
    const stats = await getUsersStats();
}

// Call the example
exampleUsage();
