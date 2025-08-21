
const mailSchema = {
    tableName: 'mails',
    id: {
        type: 'integer',
        required: true,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true
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