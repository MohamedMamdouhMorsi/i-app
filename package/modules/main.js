
const iAppReader = require('./utils/iAppReader');
const getDirectoryTree = require('./utils/getDirectoryTree');
const getContentType = require('./utils/getContentType');
const searchFiles = require('./utils/searchInFiles');
const manifestMaker = require('./utils/manifestMaker');
const getDirectoryArray = require('./utils/getDirectoryArray');
const createAppHead = require('./utils/createAppHead');
const api = require('./utils/api');
module.exports  = {
    iAppReader,
    getDirectoryTree,
    getDirectoryArray,
    getContentType,
    searchFiles,
    createAppHead,
    manifestMaker,
    api
}