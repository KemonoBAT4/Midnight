
const websiteSchema = {
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
    url: {
        type: 'string',
        required: true,
        unique: true
    },
    description: {
        type: 'string',
        required: true
    },
    favicon: {
        type: 'string',
        required: false
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

module.exports = websiteSchema