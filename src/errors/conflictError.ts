const DEFAULT_CONFLICT_ERROR_MESSAGE = 'Конфликт';

export default class ConflictError extends Error {
  statusCode: number;

  constructor(message = DEFAULT_CONFLICT_ERROR_MESSAGE) {
    super(message);

    this.statusCode = 409;
  }
}