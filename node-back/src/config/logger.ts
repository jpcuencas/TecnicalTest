import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    format: format.combine(
        format.simple(), 
        format.timestamp(), 
        format.printf(info => `[${info.timestamp}] ${info.level} ${info.message}` )
        ),
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            filename: `${__dirname}/../logs/log-app.log`,
        }),
        new transports.Console({
            level: 'debug',

        })
    ]
});

export default logger;