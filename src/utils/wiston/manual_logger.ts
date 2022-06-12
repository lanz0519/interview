import winston = require('winston');
import {
  transportConsole,
  transportErrorFile,
  transportInfoFile,
} from './transport_file';

// 自定义Label标签
const getLabel = function (callingModule: { filename: string }) {
  return `${callingModule.filename}`;
};

/**
 * 根据 module 创建 logger 实例。label 中会包括 module 的文件路径
 * 每个调用该 logger 的 module 会有一个实例
 * @param callingModule
 * @returns
 */
module.exports = function (callingModule: { filename: string }) {
  return winston.loggers.add(callingModule.filename, {
    transports: [transportConsole, transportErrorFile, transportInfoFile],
    format: winston.format.combine(
      winston.format.label({ label: getLabel(callingModule) }),
      winston.format.timestamp({
        format: 'YYYY-MM-DDTHH:mm:ssZ',
      }),
      winston.format.colorize(),
      winston.format.json()
    ),
  });
};
