const path = require('path');
const fs = require('fs');

const logPath = path.join(__dirname, '../logs');
const logFile = `${Date.now().toString()}.log`;


(function ensureDirectoryExists() {
    fs.stat(logPath, (err, stats) => {
        if (err || !stats) {
            fs.mkdir(logPath);
        }
    });
}());


module.exports = (req, res, next) => {
    const filePath = path.join(logPath, logFile);
    const log = `[${Date().toString()}]:::[${req.method}]:::[${req.originalUrl}] \n`;

    fs.appendFile(filePath, log, {}, (err, data) => {
        next();
    });
};