
const { db } = require('./../database')
const { userSchema } = require('./../schemas/user');

async function getUserById(id) {
    await db.read();
    return db.data.users.find(user => user.id === id);
}