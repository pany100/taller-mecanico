export class PasswordHashVacioError extends Error {
  constructor() {
    super('PasswordHash is empty');
    this.name = 'PasswordHashVacioError';
  }
}
