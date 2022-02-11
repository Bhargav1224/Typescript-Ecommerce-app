const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const d = new Date();

let filename = `${d.getFullYear()}_${d.getMonth() + 1}_${d.getDate()}.log`;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] [${level}] ${label}: ${message}`;
});

function LoggerInfo(category, levelMsg) {
  const logConfiguration = {
    level: levelMsg,
    format: combine(
      label({ label: category }),
      timestamp({ format: "YYYY-MM-DD - HH:mm:ss" }),
      myFormat
    ),
    transports: [
      new transports.File({ filename: `./logs/config_${filename}` }),
    ],
  };
  const logger = createLogger(logConfiguration);
  return logger;
}
module.exports = LoggerInfo;
