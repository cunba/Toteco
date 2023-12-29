export class AuthenticationException extends Error {
  constructor() {
    super("No token or credentials provided.")
  }
}
