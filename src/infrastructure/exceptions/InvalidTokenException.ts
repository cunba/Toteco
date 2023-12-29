export class InvalidTokenException extends Error {
  constructor() {
    super("Token is empty/invalid")
  }
}
