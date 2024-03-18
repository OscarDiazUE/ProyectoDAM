const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});


class Logger {
    constructor(__filename) {
        this.logger = createLogger({
            level: "info",
            format: combine(
                label({ label: __filename.split(/[\\/]/).slice(-1) }),
                timestamp(),
                format.json(),
                myFormat,
            ),
            transports: [
                new transports.Console({
                    format: combine(format.colorize({ all: true }))
                }),
                new transports.File({
                    filename: "logs/error.log",
                    level: "warn",
                    maxsize: 100000,
                    maxFiles: '2',
                }),
                new transports.File({
                    filename: "logs/app.log",
                    maxsize: 100000,
                    maxFiles: '2'
                }),
            ],
        });
    }

    error(message) {
        this.logger.error(message)
    }
    warn(message) {
        this.logger.warn(message)
    }
    info(message) {
        this.logger.info(message)
    }
    http(message) {
        this.logger.http(message)
    }
    verbose(message) {
        this.logger.verbose(message)
    }
    debug(message) {
        this.logger.debug(message)
    }
    silly(message) {
        this.logger.silly(message)
    }
}

module.exports = { Logger }