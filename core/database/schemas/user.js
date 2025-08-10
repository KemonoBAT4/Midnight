
const userSchema = {
    id: {
        type: 'string',
        required: true,
        unique: true
    },
    username: {
        type: 'string',
        required: true
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
        required: true
    },
    token: {
        type: 'string',
        required: true
    },
    role: {
        type: 'array',
        required: true
    },
    active: {
        type: 'boolean',
        required: true
    }
}

module.exports = userSchema;