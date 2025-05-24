import winston from 'winston';

export const logger = winston.createLogger({
  exitOnError: false,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.simple(),
  ),
  transports: [new winston.transports.Console()],
});
