├── server.js: Likely the entry point for the server or application.
├── main.js: Main configuration or entry point for modules.
├── tools.js: Contains utility functions or tools.
├── appDir.js: Utility for determining directories and generating a directory tree.
├── dbData.js: Likely related to database data or configurations.
├── readAppData.js: For reading application data.
│
├── middelWare
│   ├── middleWareApp.js: Middleware application file.
│   ├── app_file.js: Middleware related to application files.
│   ├── asset_file.js: Middleware for assets.
│   ├── is_api.js: Middleware to check or handle API requests.
│   ├── is_app.js: Middleware for application requests.
│   ├── is_asset.js: Middleware for asset requests.
│   └── is_route.js: Middleware for route requests.
│
├── sessions: Related to session management or configuration.
│
├── basicDB
│   └── dataBaseUpdate.js: Database update script.
│
├── utils
│   ├── dataSpeechSynthesis.json: Configurations for speech synthesis.
│   ├── voicesDB.json: Voice configurations for the database.
│   └── toolsFN
│       ├── getDirectoryTree.js: Generates a directory tree from a given root directory.
│       ├── getDirectoryArray.js: Transforms a directory tree into an array format.
│       ├── iAppReader.js: Reads and processes .app files.
│       └── iAppFileMaker.js: Converts input to a string format appropriate for .app files.
│
└── queryData
    ├── checkQuery.js: Verifies the validity of queries.
    ├── checkQueryUptime.js: Checks the uptime of queries.
    ├── deleteQuery.js: Generates DELETE SQL queries.
    ├── getJQuery.js: Handles jQuery-related queries.
    ├── getQuery.js: Generates SELECT SQL queries.
    ├── insertQuery.js: Generates INSERT SQL queries.
    ├── insertValues.js: Formulates the VALUES section of INSERT queries.
    ├── orAndOption.js: Handles SQL conditions using OR and AND.
    ├── orAndOptionJoin.js: Handles JOIN conditions with OR and AND.
    ├── querySize.js: Calculates or retrieves the size of query results.
    ├── querySizeJoin.js: Handles size calculations for JOIN operations.
    ├── selectColumn.js: Selects columns for SQL queries.
    ├── selectColumnJoin.js: Handles column selection for JOIN operations.
    ├── setUpData.js: Sets up data for SQL UPDATE queries.
    └── updateQuery.js: Generates UPDATE SQL queries.