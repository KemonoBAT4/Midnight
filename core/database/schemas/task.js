
const taskSchema = {
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
    description: {
        type: 'string',
        required: true
    },
    status: {
        type: 'string',
        required: true
    },
    priority: {
        type: 'string',
        required: true
    },
    dueDate: {
        type: 'datetime',
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
    }
}

module.exports = taskSchema