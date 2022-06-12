import winston = require('winston');
require('winston-daily-rotate-file');
const { LOG } = require('../../config/main');
// 控制台日志格式
const ConsoleFormat = winston.format.printf(
  ({ level, message, label = '', timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${typeof message == 'string' ? message : JSON.stringify(message)}`;
  }
);

// 通道一：控制台
const transportConsole = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DDTHH:mm:ssZ',
    }),
    winston.format.colorize(),
    ConsoleFormat
  ),
});

// 通道二：info 文件
// @ts-ignore
const transportInfoFile = new winston.transports.DailyRotateFile({
  filename: LOG.COMBINED_FILENAME,
  datePattern: LOG.DATE_PATTERN,
  zippedArchive: LOG.ZIPPED_ARCHIVE,
  maxSize: LOG.MAX_SIZE,
  maxFiles: LOG.MAX_FILES,
  dirname: LOG.DIRNAME,
  level: 'info',
});

// 通道三：error 文件
// @ts-ignore
const transportErrorFile = new winston.transports.DailyRotateFile({
  filename: LOG.ERROR_FILENAME,
  datePattern: LOG.DATE_PATTERN,
  zippedArchive: LOG.ZIPPED_ARCHIVE,
  maxSize: LOG.MAX_SIZE,
  maxFiles: LOG.MAX_FILES,
  dirname: LOG.DIRNAME,
  level: 'error',
});

// @ts-ignore
const transportAppClientFile = new winston.transports.DailyRotateFile({
  filename: LOG.APP_CLIENT_LOG_FILENAME,
  datePattern: LOG.DATE_PATTERN,
  zippedArchive: LOG.ZIPPED_ARCHIVE,
  maxSize: LOG.MAX_SIZE,
  maxFiles: LOG.MAX_FILES,
  dirname: LOG.DIRNAME,
  level: 'info',
});

export {
  transportInfoFile,
  transportErrorFile,
  transportAppClientFile,
  transportConsole,
};
