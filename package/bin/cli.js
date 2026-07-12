#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Function to copy a file or directory
function copy(source, destination) {
  if (fs.statSync(source).isDirectory()) {
    // If it's a directory, create the destination directory
    fs.mkdirSync(destination);
    const files = fs.readdirSync(source);
    for (const file of files) {
      const srcPath = path.join(source, file);
      const destPath = path.join(destination, file);
      copy(srcPath, destPath);
    }
  } else {
    // If it's a file, copy the file
    fs.copyFileSync(source, destination);
  }
}
function copyFile(source, destination) {
  fs.copyFileSync(source, destination);
}

// Get the project name from the command-line arguments
const projectName = process.argv[2];

if (!projectName) {
  console.error('Please provide a project name.');
  process.exit(1);
}

// Check if the project folder already exists
const projectPath = path.join(process.cwd(), projectName);
if (fs.existsSync(projectPath)) {
  console.error(`A project with the name "'${projectName}'" already exists.`);
  process.exit(1);
}

// Create the project folder
fs.mkdirSync(projectPath);

// Create a package.json file with the provided project name
const packageJson = {
  name: projectName,
  version: '1.0.0',
  description: 'A brief description of your project',
  main: 'i-app.js',
  scripts: {
    start: 'node i-app.js',
    test: 'echo "Error: no test specified" && exit 1'
  },
  keywords: [],
  author: 'Your Name',
  license: 'MIT',
  dependencies: {},
  devDependencies: {}
};
const IappConfig = `{
  id:'1' // unique app id 
  name: '${projectName}' // app name 
  title: '${projectName}' // app title for seo header
  short_name: '${projectName}' // short name for pwa
  description: '${projectName} Description ' // app description for seo
  keywords: '${projectName}' // app keywords for seo
  version: '0.0.1' // app version for pwa updates 
  type: 'website' // app type : website | article for seo
  domain: 'localhost:4800' // your app domain and port for close the requests endpoint just for your app security
  port: 4800 // your app port nodejs using server port
  lang:[ 'en' 'fr' 'du' 'ar' ] // app supported languages
  defLang: 'en' // default app language
  pwa: true // enable pwa support
  mode: 'dev' // dev | prod
  users:true // you should set db.app file to configure your database
  adsenseId: 'your_adsense_id' // your google adsense id for ads
  WP_BLOG:true // enable wordpress blog support for site map merge between your app and your wordpress blog
  three:true // enable threejs support
  gMap: 'Your_Google_Map_API_Key' // your google map api key  
  dir: { 
            // Configure your project folder structure here
            // use the default structure for best performance and less conflicts 

              main:'/public/' // recomended : for nodejs server use public folder to serve static files and php use public_html folder name 
              src: '/src/'    // source files the main folder for your app development we use .app ext here 
              start: 'home.app' // the main file to load on app start
              icon: '/img/icon/' // app icons folder
              db: '/db/' // staic database files folder
              txt: '/txt/' // static text files folder for multi language support
              script: '/js/' // javascript files folder
              css: '/css/' // for custom styles
              img: '/img/' // images folder
              style: '/css/style.json' // for app style configuration (style.json for light and dark modes )
              colors: '/css/colors.json' // for app colors configuration ( color.json for app colors palette)
      }
      // in case you enable users:true , you should configure the mail for reset passwords
      // no-replay email for email verifaction and password reset 
      noReplayMail: {
              host: 'mail.yourdomain.com' 
              port: 465 
              secure: true 
              auth: {
                  user: 'no-replay@yourdomain.com'
                  password: 'I-app-8769ec20616efcfb'
              
              }
        }
      // emailAuth for email account verification
      emailAuth:{
                  signPage:'/auth/signin'
                  redirect:'/auth/emailAuth'
                  link:'/auth/emailAuth'
      }
      // googleAuth for google account email verification
      googleAuth:{
                  signPage:'/auth/signin'
                  redirect:'/auth/googleAuth'
                  link:'/auth/googleAuth'
                  clientId:'YOUR_GOOGLE_CLIENT_ID'
      }
      // appleAuth for apple account email verification
      appleAuth:{
          clientId:'YOUR_SERVICES_ID'
          signPage:'/auth/signin'
          redirect:'/appleAuth'
          link:'/appleAuth'

      }
      // we using Firebase Cloud Messaging , only for SMS confirmation for signup process  
      fcm:{
      // Configure your Firebase settings here , you can get it from your Firebase project settings
            apiKey: "Your_Firebase_API_Key"
            authDomain: "Your_Firebase_Auth_Domain"
            projectId: "Your_Firebase_Project_ID"
            storageBucket: "Your_Firebase_Storage_Bucket"
            messagingSenderId: "Your_Firebase_Messaging_Sender_ID"
            appId: "Your_Firebase_App_ID"
            measurementId: "Your_Firebase_Measurement_ID"
     }

   }`;
const packageJsonPath = path.join(projectPath, 'package.json');
const iappJsonPath = path.join(projectPath, 'i.app');
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
fs.writeFileSync(iappJsonPath, IappConfig );

// Copy the contents of the basic public folder to the project folder
const publicFolderPath = path.join(__dirname, 'src', 'public'); // Change this path to the location of your basic public folder
const targetFolderPath = path.join(projectPath, 'public');
const iappjs = path.join(__dirname, 'src', 'i-app.js');
const iappjsPath = path.join(projectPath, 'i-app.js');
copy(publicFolderPath, targetFolderPath);
copyFile(iappjs, iappjsPath);

console.log(`Created a new project folder: '${projectName}'`);
// create a db.app file with default content
const dbAppContent = `{
// if you set users:true in i.app file you should configure your database here

    mysql: [

            {
                host: 'localhost' 
                user: 'your_mysql_user' 
                password: 'your_mysql_password' 
                database: 'your_database_name' 
                // tables:{} or // define your tables structure here
                tables: {

                            // this is the basic tables structure for users management system
                            // if you didn't create it the system will create it for you just let tasbles object empty {}
                            // just be sure do not change this structure you can not add or remove fields
                            // the system will audit the tables structure on the first run and will create or update the tables if needed
                            users:[ 'id' 'username' 'firstname' 'lastname' 'email' 'phonenumber' 'gender' 'birthdate' 'userType' 'activate' ]  
                            answers:[ 'id' 'userId' 'ownerId' 'answerId' 'answer' ]  
                            usersSessions:['userId' 'userToken' 'deviceToken' 'scureToken' 'connectToken' ]  
                            usersPasswords:[ 'userId' 'password' ]  
                            usersApps:[ 'id' 'appName' 'description' ]  
                            usersType:[ 'id' 'typeName' 'description' ]  
                            permissions:[ 'id' 'permissionName' 'description' ]  
                            appsPermissions:['appId' 'typeId' 'permissionId' ]  
                            usersTypeAppsUsage:[ 'appId' 'typeId' 'usageLimit' ]
                            resetPasswords:['id' 'userId' 'resetToken' 'isUsed' 'datetime' ]
                            emailConfirm:['id' 'email' 'code' 'confirm' 'datetime' ]
                            // you can add more tables if you need
                            // to add more tables just follow the same structure
                            // tableName:[ 'field1' 'field2' 'field3'  ...
                         
                            
                        }
            }
        ]
}`;
const dbAppPath = path.join(projectPath, 'db.app');
fs.writeFileSync(dbAppPath, dbAppContent);

// Check the installed version of i-app-create and add it to package.json dependencies
// Use npm ls to get the installed version of i-app-create
const { exec } = require('child_process');
exec('npm ls -g i-app-create --json', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error checking the installed version: ${error}`);
    return;
  }
  try {
    const installedPackages = JSON.parse(stdout);
    const iAppVersion = installedPackages.dependencies['i-app-create'].version;
    console.log(`i-app-create version : ${iAppVersion}`);

    // Add the installed i-app-create version to the package.json file
    packageJson.dependencies['i-app-create'] = `^${iAppVersion}`;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    exec(`cd ${projectPath} && npm install`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error installing package dependencies: ${error}`);
        return;
      }
      console.log('i-app-create installed successfully.');
      console.log(`To get started, navigate to the project folder: cd '${projectName}'`);
      console.log(`You can run your project with: npm start`);
    });
  } catch (parseError) {
    console.error(`Error parsing npm ls output: ${parseError}`);
  }
});
