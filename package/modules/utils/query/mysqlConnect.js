
const dbConfigFn = require('./dbConfig');
const {JD_, COPY_OB} = require('../../tools');
const creatAUTH = require('../toolsFN/createAUTH');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql');
const makeQuery = require('./makeQuery');

const getTimeZone = (ob) => {
    const query = ob.query;
    for (let q = 0; q < query.length; q++) {
        if (query[q].timeZone) {
            return query[q].timeZone;
        }
    }
    return false;
};

const isGetQuery = (ob) => {
    const query = ob.query;
    for (let q = 0; q < query.length; q++) {
        const cureAction = query[q].a;
        if (cureAction === 'get' || cureAction === 'getJ') {
            return true;
        }
    }
    return false;
};

const isInsertQuery = (ob) => {
    const query = ob.query;
    for (let q = 0; q < query.length; q++) {
        const cureAction = query[q].a;
        if (cureAction === 'in') {
            return true;
        }
    }
    return false;
};

const isUpToDate = (userDate, dbDate) => {
    let process = true;
    for (let d = 0; d < dbDate.length; d++) {
        const AUTH = dbDate[d];
        let find = false;
        for (let u = 0; u < userDate.length; u++) {
            const userAUTH = userDate[u];
            if (AUTH === userAUTH) {
                find = true;
            }
        }
        if (!find) {
            process = false;
        }
    }
    return process;
};

const isAutoLimit = (ob) => {
    let isAutoLimit_ = false;
    for (let i = 0; i < ob.length; i++) {
        if (ob.limitAuto) {
            isAutoLimit_ = true;
        }
    }
    return isAutoLimit_;
};

const makeUpTodate = (dbDate) => {
    const AUTHARRAY = [];
    for (let d = 0; d < dbDate.length; d++) {
        const dbString = `${dbDate[d].TABLE_NAME}_${dbDate[d].UPDATE_TIME}`;
        const AUTH = creatAUTH(dbString);
        AUTHARRAY.push(AUTH);
    }
    return AUTHARRAY;
};

const getTables = (ob) => {
    const query = ob.query;
    const back = [];
    for (let q in query) {
        let cureAction = query[q].j;
        for (let c in cureAction) {
            let cureTableName = cureAction[c].n;
            back.push(cureTableName);
        }
    }
    return back;
};

const updateBack = (result, selectables) => {
    for (let r = 0; r < result.length; r++) {
        const row = result[r];
        for (const columnName in row) {
            const dataColumn = row[columnName];
            if (Object.hasOwnProperty.call(row, columnName)) {
                if (selectables.includes(columnName)) {
                    row[columnName] = JSON.parse(dataColumn);
                } else {
                    row[columnName] = dataColumn;
                }
            }
        }
        result[r] = row;
    }
    return result;
};

const mysqlConnect = async (body, res_, callBack) => {
    const dbConfig = dbConfigFn.get();

    if (dbConfig && dbConfig.host && dbConfig.user && dbConfig.password) {

        const queryResult = await makeQuery(body, dbConfig.tables);
        if (queryResult) {

            const queryTextUp = await makeQuery({query: [{a: 'checkUpTime', ob: body}]}, dbConfig.tables);
            const querySize = await makeQuery({query: [{a: 'querySize', ob: body}]}, dbConfig.tables);
            const selectedTables = getTables(body);

            const connection = mysql.createConnection({
                host: dbConfig.host,
                user: dbConfig.user,
                password: dbConfig.password,
                database: dbConfig.database,
                dateStrings: true
            });

            if (isGetQuery(body)) {
                connection.connect();

                if (dbConfig.timeZone) {
                    console.log('Setting TimeZone...');
                    const timeZone_st = dbConfig.timeZone;
                    const timeZone = timeZone_st.replace(/aaa@aaa/g, ':');
                    const setTimeZone = await new Promise((resolve, reject) => {
                        connection.query('SET time_zone = ?;', [timeZone], (queryError, result, fields) => {
                            if (queryError) {
                                console.error('Error executing MySQL query:', queryError.message);
                                reject(queryError);
                            } else {
                                resolve(result);
                            }
                        });
                    });
                }

                const upTime = await new Promise((resolve, reject) => {
                    connection.query(queryTextUp.sql, queryTextUp.params, (queryError, upTime, fields) => {
                        if (queryError) {
                            console.error('Error executing MySQL query:', queryError.message);
                            reject(queryError);
                        } else {
                            resolve(upTime);
                        }
                    });
                });

                let Qsize = 0;
                if (querySize && querySize !== undefined && querySize.sql !== '') {
                    Qsize = await new Promise((resolve, reject) => {
                        connection.query(querySize.sql, querySize.params, (queryError, Qsize, fields) => {
                            if (queryError) {
                                console.error('Error executing MySQL query:', queryError.message);
                                reject(queryError);
                            } else {
                                resolve(Qsize);
                            }
                        });
                    });
                }

                const upTimeData = COPY_OB(upTime);
                const makeUpTodateData = makeUpTodate(upTimeData);

                if (body.upTime) {
                    const isUpdated = isUpToDate(body.upTime, makeUpTodateData);
                    if (isUpdated) {
                        connection.end();
                        if (typeof callBack === 'function') {
                            callBack('UPTODATE', res_, makeUpTodateData, Qsize);
                        }
                        return 'UPTODATE';
                    } else {
                        const results = await new Promise((resolve, reject) => {
                            connection.query(queryResult.sql, queryResult.params, (queryError, results, fields) => {
                                if (queryError) {
                                    console.error('Error executing MySQL query:', queryError.message);
                                    reject(queryError);
                                } else {
                                    resolve(results);
                                    connection.end();
                                }
                            });
                        });

                        const backResult = COPY_OB(results);
                        if (typeof callBack === 'function') {
                            callBack(backResult, res_, makeUpTodateData, Qsize);
                        }
                        return backResult;
                    }
                } else {
                    const results = await new Promise((resolve, reject) => {
                        connection.query(queryResult.sql, queryResult.params, (queryError, results, fields) => {
                            if (queryError) {
                                console.error('Error executing MySQL query:', queryError.message);
                                reject(queryError);
                            } else {
                                resolve(results);
                                connection.end();
                            }
                        });
                    });

                    const backResult = COPY_OB(results);
                    const backResultUpdate = updateBack(backResult, selectedTables);
                    if (typeof callBack === 'function') {
                        callBack(backResult, res_, makeUpTodateData, Qsize);
                    }
                    return backResult;
                }

            } else {
                connection.connect();

                if (dbConfig.timeZone) {
                    console.log('Setting TimeZone...');
                    const timeZone_st = dbConfig.timeZone;
                    const timeZone = timeZone_st.replace(/aaa@aaa/g, ':');
                    const setTimeZone = await new Promise((resolve, reject) => {
                        connection.query('SET time_zone = ?;', [timeZone], (queryError, result, fields) => {
                            if (queryError) {
                                console.error('Error executing MySQL query:', queryError.message);
                                reject(queryError);
                            } else {
                                resolve(result);
                            }
                        });
                    });
                }

                const results = await new Promise((resolve, reject) => {
                    connection.query(queryResult.sql, queryResult.params, (queryError, results, fields) => {
                        if (queryError) {
                            console.error('Error executing MySQL query:', queryError.message);
                            reject(queryError);
                        } else {
                            resolve(results);
                        }
                    });
                });

                const backResult = COPY_OB(results);
                const upTime = await new Promise((resolve, reject) => {
                    connection.query(queryTextUp.sql, queryTextUp.params, (queryError, upTime, fields) => {
                        if (queryError) {
                            console.error('Error executing MySQL query:', queryError.message);
                            reject(queryError);
                        } else {
                            resolve(upTime);
                            connection.end();
                        }
                    });
                });

                const upTimeData = COPY_OB(upTime);
                const makeUpTodateData = makeUpTodate(upTimeData);
                if (typeof callBack === 'function') {
                    if (isInsertQuery(body)) {
                        callBack(backResult.insertId, res_, makeUpTodateData, false);
                    } else {
                        callBack(backResult, res_, makeUpTodateData, false);
                    }
                }
                if (isInsertQuery(body)) {
                    return backResult.insertId;
                } else {
                    return backResult;
                }
            }
        } else {
            if (typeof callBack === 'function') {
                callBack([], res_, [{sorry: true}], false);
            }
            return false;
        }
    } else {
        return false;
    }
};

module.exports = mysqlConnect;
