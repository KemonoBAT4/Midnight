// user schema
const userSchma = {
    id: {
        type: 'integer',
        required: true,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    name: {
        type: 'string',
        required: true
    },
    surname: {
        type: 'string',
        required: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    role: {
        type: 'string',
        required: true
    }
}

module.exports = userSchma