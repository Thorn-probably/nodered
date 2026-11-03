const bcrypt = require('bcryptjs');

// Auto-hash plain text password on startup
const rawPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
const passwordHash = bcrypt.hashSync(rawPassword, 8);

module.exports = {
    // Voroa sets PORT (usually 3000), default fallback to 1880
    uiPort: parseInt(process.env.PORT, 10) || 1880,
    flowFile: 'flows.json',
    userDir: '/data',

    // Password Protection
    adminAuth: {
        type: 'credentials',
        users: [{
            username: process.env.ADMIN_USER || 'admin',
            password: passwordHash,
            permissions: '*'
        }]
    },

    // Postgres Flow Persistence
    storageModule: require('node-red-contrib-db-storage'),
    storageModuleOptions: {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        collectionNames: {
            flows: 'nodered_flows',
            credentials: 'nodered_credentials',
            settings: 'nodered_settings',
            sessions: 'nodered_sessions'
        }
    }
};

