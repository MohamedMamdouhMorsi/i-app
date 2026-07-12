/**
 * Test table schemas for query builder tests.
 * Mimics the table schema structure used by the i-app query system.
 */
module.exports = {
    tables: {
        users: ['id', 'username', 'email', 'password', 'role', 'created_at', 'updated_at'],
        sessions: ['id', 'userId', 'deviceId', 'token', 'expires_at', 'created_at'],
        permissions: ['id', 'name', 'description', 'created_at'],
        usersType: ['id', 'name', 'permissions', 'created_at'],
        apps: ['id', 'name', 'description', 'status', 'created_at', 'updated_at']
    },
    sampleUsers: [
        { id: 1, username: 'admin', email: 'admin@test.com', role: 'admin' },
        { id: 2, username: 'user1', email: 'user1@test.com', role: 'user' },
        { id: 3, username: 'user2', email: 'user2@test.com', role: 'user' }
    ],
    sampleSession: {
        deviceId: 'test-device-123',
        userId: '1',
        timestamp: Date.now().toString()
    }
};
