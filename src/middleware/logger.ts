import winston = require('winston');
import expressWinston = require('express-winston');
const { responseFilterPropNames, ignoredRoutes } = require('../config/main');
import { transportConsole, transportErrorFile, transportInfoFile } from '../utils/wiston/transport_file';

expressWinston.requestWhitelist = [
  'payload',
  'body',
  'url',
  'method',
  'query',
  'headers.rId',
  'headers.appinfo',
  'headers.authorization',
];
expressWinston.responseWhitelist = ['body', 'statusCode'];

// 打印 request.body 和 response.body
const logger = {
  // Request Logging
  logger: expressWinston.logger({
    transports: [transportConsole, transportInfoFile, transportErrorFile],
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DDTHH:mm:ssZ',
      }),
      winston.format.colorize(),
      winston.format.json(),
      winston.format.prettyPrint()
    ),
    meta: true,
    expressFormat: true,
    colorize: true,
    responseFilter: (res, propName) => {
      for (let filterResponsePropName of responseFilterPropNames) {
        if (
          res &&
          res.req &&
          filterResponsePropName.urlReg.test(res.req.url) &&
          filterResponsePropName.propName === propName
        ) {
          return;
        }
      }

      return res[propName];
    },
    ignoredRoutes,
  })
};

export = logger;
