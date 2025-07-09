import * as winston from 'winston';
import 'winston-daily-rotate-file';

const transports: winston.transport[] = [];

if (process.env.NODE_ENV !== 'production') {
  transports.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({
          format: () =>
            new Date().toLocaleString('es-SV', {
              hour12: false,
              timeZone: 'America/El_Salvador',
            }),
        }),
        winston.format.printf(
          ({
            level,
            message,
            timestamp,
          }: {
            level: string;
            message: string;
            timestamp: string;
          }) => {
            return `[${level}] ${timestamp} ${message}`;
          },
        ),
      ),
    }),
  );
}

transports.push(
  new winston.transports.DailyRotateFile({
    filename: 'logs/%DATE%-error.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
  }),
  new winston.transports.DailyRotateFile({
    filename: 'logs/%DATE%-combined.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
  }),
);

const exceptionHandlers: winston.transport[] = [
  new winston.transports.File({
    filename: 'logs/exceptions.log',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
  }),
];

export const logger = winston.createLogger({
  level: 'debug',
  transports,
  exceptionHandlers,
});
