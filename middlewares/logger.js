const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../logs/', `${Date.now()}.log`);

module.exports = (req, res, next) => {
    const log = `${Date().toString()}:[${req.method}]:${req.url}\n`;

    fs.stat(filePath, function (err) {
        if (err) {
            return fs.writeFile(filePath, log, next);
        }

        return fs.appendFile(filePath, log, next);
    });
};
