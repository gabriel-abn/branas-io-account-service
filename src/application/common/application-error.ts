export default class ApplicationError extends Error {
  constructor(message: string, name?: string) {
    super();
    this.message = message;
    this.name = name ? name : "APPLICATION_ERROR";
  }
}
