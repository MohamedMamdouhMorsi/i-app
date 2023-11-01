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
  id:'1' 
  name: '${projectName}'
  title: '${projectName}'
  short_name: '${projectName}'
  description: '${projectName} Description '
  keywords: '${projectName}'
  version: '0.0.1' 
  type: 'website' 
  domain: 'localhost' 
  port: 4800 
  lang:[ 'en' 'fr' 'du' 'ar' ]
  defLang: 'en' 
  pwa: true 
  mode: 'dev' 
      dir: { 
              main:'/public/'
              src: '/src/' 
              start: 'home.app' 
              icon: '/img/icon/' 
              db: '/db/' ,
              txt: '/txt/' 
              script: '/js/' 
              css: '/css/' 
              img: '/img/' 
              style: '/css/style.json' 
              colors: '/css/colors.json'
      }
   }`
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

// Use npm ls to get the installed version of @i-app/i-app
const { exec } = require('child_process');
exec('npm ls -g @i-app/i-app --json', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error checking the installed version: ${error}`);
    return;
  }
  try {
    const installedPackages = JSON.parse(stdout);
    const iAppVersion = installedPackages.dependencies['@i-app/i-app'].version;
    console.log(`@i-app/i-app version : ${iAppVersion}`);

    // Add the installed @i-app/i-app version to the package.json file
    packageJson.dependencies['@i-app/i-app'] = `^${iAppVersion}`;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    exec(`cd ${projectPath} && npm install`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error installing package dependencies: ${error}`);
        return;
      }
      console.log('@i-app installed successfully.');
      console.log(`To get started, navigate to the project folder: cd '${projectName}'`);
      console.log(`You can run your project with: npm start`);
    });
  } catch (parseError) {
    console.error(`Error parsing npm ls output: ${parseError}`);
  }
});
