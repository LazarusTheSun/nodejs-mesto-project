const DEFAULT_FORBIDDEN_ERROR_MESSAGE = 'Доступ запрещен';

export default class ForbiddenError extends Error {
  statusCode: number;

  constructor(message = DEFAULT_FORBIDDEN_ERROR_MESSAGE) {
    super(message);

    this.statusCode = 403;
  }
}