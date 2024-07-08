export default class ApplicationError extends Error {
  constructor(message: string, name?: string) {
    super(message);
    this.name = !name ? "ApplicationError" : name;
  }
}
