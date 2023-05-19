
const iAppReader = require('./utils/toolsFN/iAppReader');
const getDirectoryTree = require('./utils/toolsFN/getDirectoryTree');
const getContentType = require('./utils/toolsFN/getContentType');
const searchFiles = require('./utils/toolsFN/searchInFiles');
const manifestMaker = require('./utils/toolsFN/manifestMaker');
const getDirectoryArray = require('./utils/toolsFN/getDirectoryArray');
const createAppHead = require('./utils/toolsFN/createAppHead');
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