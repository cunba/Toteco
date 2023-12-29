export class ConnectionRefusedException extends Error {
    constructor(error?: Error) {
      super("Connection not available." + error)
    }
  }
  