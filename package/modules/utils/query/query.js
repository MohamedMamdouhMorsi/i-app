const mysqlConnect = require('./mysqlConnect');

const query = (body, res_) => {
    const callBack = (data, res, upTime, Qsize) => {
        let Qsize_ = typeof Qsize === 'number' ? Qsize : (Qsize ? Qsize.length : 0);
        console.log(["data",data])
        const resJson = JSON.stringify({ res: data, upTime: upTime, Qsize: Qsize_ });

        // REGEX EXPLANATION:
        // T       -> Literal T
        // \d{2}   -> Any 2 numbers (00, 21, 22, 05, etc) - The Hour
        // :00:00  -> Minutes and Seconds must be strictly 00
        // \.000Z  -> Milliseconds must be 0
        const resJsonCleaned = resJson.replace(/T\d{2}:00:00\.000Z/g, '');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(resJsonCleaned);
    }

    return mysqlConnect(body, res_, callBack);
}

module.exports = query;