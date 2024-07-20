const fs = require('fs');
const path = require('path');
const { format } = require('date-fns');

const errorHandler = (error, req, res, next) => {
    logError(error);
    return res.status(400).send(error.message);
}

const logError = (error) => {
    const logFilePath = path.join('error-logs', 'error-log.txt');
    const date = new Date();
    const readableDateAndTime = format(date, 'EEEE, MMMM do, yyyy h:mm:ss a');
    const errorLog = `${readableDateAndTime} - Error: ${error.message}\nStack: ${error.stack}\n\n`;

    fs.appendFile(logFilePath, errorLog, (error) => {
        if (error) {
            console.error('Failed to write to log file:', error);
        }
    })
}

module.exports = errorHandler;


