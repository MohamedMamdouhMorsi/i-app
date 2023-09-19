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

// Get the project name from the command-line arguments
const projectName = process.argv[2];

if (!projectName) {
  console.error('Please provide a project name.');
  process.exit(1);
}

// Check if the project folder already exists
const projectPath = path.join(process.cwd(), projectName);
if (fs.existsSync(projectPath)) {
  console.error(`A project with the name "${projectName}" already exists.`);
  process.exit(1);
}

// Create the project folder
fs.mkdirSync(projectPath);

// Create a package.json file with the provided project name
const packageJson = {
  name: projectName,
  version: '1.0.0',
  description: 'A brief description of your project',
  main: 'index.js',
  scripts: {
    start: 'node index.js',
    test: 'echo "Error: no test specified" && exit 1'
  },
  keywords: [],
  author: 'Your Name',
  license: 'MIT',
  dependencies: {},
  devDependencies: {}
};

const packageJsonPath = path.join(projectPath, 'package.json');
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Copy the contents of the basic public folder to the project folder
const publicFolderPath = path.join(__dirname, 'public'); // Change this path to the location of your basic public folder
const targetFolderPath = path.join(projectPath, 'public');

copy(publicFolderPath, targetFolderPath);

console.log('Copied the contents of the "public" folder to the project folder.');
console.log(`Created a new project folder: ${projectName}`);
console.log(`To get started, navigate to the project folder: cd ${projectName}`);
console.log(`You can run your project with: npm start`);
