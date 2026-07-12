#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const {JD_,CL_} = require('../modules/tools');
const iAppReader = require('../modules/utils/toolsFN/iAppReader');
const iAppFileMaker = require('../modules/utils/toolsFN/iAppFileMaker');
const userDir = path.dirname(require.main.filename); 
const i_app_path = path.join(userDir, 'i.app');

fs.readFile(i_app_path, (err, data) => {
    if (err) {
      CL_("i.app not found"+userDir);
    }else{
    const i_app_st        = data.toString();
    let cleanDataSt = iAppReader(i_app_st);
    let jsonData    = JD_(cleanDataSt);
    jsonData.mode   = "dev";
    const db_app    = JDS_(appData.data);
    const db_app_file = iAppFileMaker(db_app);
    fs.writeFile(i_app_path, db_app_file, (err) => {
      if (err)
        console.log(err);
      else {
        CL_('i-app mode : dev');
      }});
    }
    });