
const config = {
  PORT: 3000,
  DATABASE: 'mongodb://localhost:27017',
  LOG: {
    COMBINED_FILENAME: 'interview-combined-%DATE%.log',
    ERROR_FILENAME: 'interview-error-%DATE%.log',
    DATE_PATTERN: 'YYYY-MM-DD',
    ZIPPED_ARCHIVE: true, // 是否压缩
    MAX_SIZE: '200m', // 每个文件大小200m
    MAX_FILES: '365d', // 保留365天的日志文件
    DIRNAME: `log/logs-${process.env.NODE_ENV}`,
  },
  responseFilterPropNames: [
  ],
  ignoredRoutes :[]
}
module.exports = config;
