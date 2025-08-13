
const noteSchema = {
    id: {
        type: 'integer',
        required: true,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: 'string',
        required: true
    },
    content: {
        type: 'string',
        required: true
    },
    createdAt: {
        type: 'datetime',
        required: true,
        default: 'CURRENT_TIMESTAMP'
    },
    userId: {
        type: 'integer',
        required: true,
        references: {
            table: 'users',
            column: 'id'
        }
    },
}

module.exports = noteSchema;