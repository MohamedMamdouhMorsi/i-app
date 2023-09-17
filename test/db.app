{
    mysql:[
            {
                host: 'server'
                user: 'userName'
                password: 'db@password'
                database: 'databaseName'
                tables: {usersApps: ['id' 'appName' 'description'] usersPasswords: ['userId' 'password'] appsPermissions: ['appId' 'permissionId'] usersSessions: ['userId' 'deviceToken' 'scureToken'] users: ['id' 'username' 'firstname' 'lastname' 'email' 'phonenumber' 'accountType' 'activate'] typesApps: ['typeId' 'appId'] permissions: ['id' 'permissionName' 'description'] usersPermissions: ['userId' 'appId' 'permissionId'] usersType: ['id' 'typeName' 'description']}
            }
        ]
}