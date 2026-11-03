const bcrypt = require('bcryptjs');

// Reads plain text from Voroa env and hashes it on boot
const rawPassword = process.env.ADMIN_PASSWORD || 'ChangeMe123!';
const passwordHash = bcrypt.hashSync(rawPassword, 8);

module.exports = {
    // Dynamic port assignment from Voroa
    uiPort: process.env.PORT || 1880,
    flowFile: 'flows.json',
    userDir: '/data',

    // Web UI Password Authentication
    adminAuth: {
        type: 'credentials',
        users: [{
            username: process.env.ADMIN_USER || 'admin',
            password: passwordHash,
            permissions: '*'
        }]
    },

    // Save and load flows directly from Postgres
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

