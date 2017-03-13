const path = require('path');
const fs = require('fs');


const dirPath = path.join(__dirname, './logs');
const filePath = Date.now() + '.log';

fs.stat(dirPath, (err, stats) => {
    if (err) {
        fs.mkdir(dirPath, (err, success)=> {
            if (err) {
                console.error("ERROR: ", err);
            }
        });
    }
});

const logsPath = path.join(dirPath, filePath);

module.exports = (req, res, next) => {
    const date = new Date();
    const method = req.method;
    const url = req.url;

    const logTemplate = `[${date}][${method}][${url}] \n`;
    fs.appendFile(logsPath, logTemplate, (err, done) => {
        if (err) {
            return res.status(500).send(err)
        }

        next();
    });
}
