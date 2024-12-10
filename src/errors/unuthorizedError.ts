const UNAUTHORIZED_ERROR_MESSAGE = 'Необходима авторизация';

export default class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message = UNAUTHORIZED_ERROR_MESSAGE) {
    super(message);

    this.statusCode = 401;
  }
}