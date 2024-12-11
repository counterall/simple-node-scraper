import pino from "pino";

const logger = pino(pino.destination('error.log'))

export default logger;