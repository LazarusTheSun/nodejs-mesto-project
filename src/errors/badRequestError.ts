const DEFAULT_ERROR_MESSAGE = 'Переданы некорректные данные';

export default class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string = DEFAULT_ERROR_MESSAGE) {
    super(message);

    this.statusCode = 400;
  }
}