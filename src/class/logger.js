class Logger {
  constructor() {
    if (Logger.instance) {
      return Logger.instance; // Return the existing instance if it exists
    }
    this.logs = [];
    Logger.instance = this; // Set the instance to the current instance
  }

  log(message) {
    this.logs.push({ message, timestamp: new Date() });
    console.log(message);
  }

  getLogs() {
    return this.logs;
  }
}

// Create and export a single instance of the Logger
const logger = new Logger();
module.exports = logger;
