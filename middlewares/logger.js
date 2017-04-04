const fs = require('fs');
const path = require('path');

const logsPath = path.join(__dirname, '../logs');
const logFile = Date.now().toString() + '.log';

(function ensureLogsDirectoryExists() {
    fs.stat(logsPath, (err, stats) => {
        if (err || !stats) {
            fs.mkdir(logsPath, (err, data) => {

            })
        }
    });
}());

module.exports = (req, res, next) => {
    const date = new Date().toString();
    const method = req.method;
    const url = req.originalUrl;

    const log = `[${date}]::[${method}]::[${url}] \n`;
    const logPath = path.join(logsPath, logFile);

    fs.appendFile(logPath, log, null, (err, data) => {
        next();
    });
};