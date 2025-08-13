
const logSchema = {
    id: {
        type: 'integer',
        required: true,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    timestamp: {
        type: 'datetime',
        required: true,
        default: 'CURRENT_TIMESTAMP'
    },
    level: {
        type: 'string',
        required: true,
        enum: ['info', 'warn', 'error', 'debug']
    },
    message: {
        type: 'string',
        required: true
    },
    userId: {
        type: 'integer',
        required: true,
        references: {
            table: 'users',
            column: 'id'
        }
    },
    additionalData: {
        type: 'json',
        required: false
    }
}

module.exports = logSchema;