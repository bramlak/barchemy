/**
 * @class ApiError
 * @description Custom error class for standardized API error handling.
 */
export default class ApiError extends Error {
  /**
   * @param {string} message - Error message
   * @param {number} statusCode - HTTP status code
   * @param {string} [stack] - Optional stack trace override
   */
  constructor(message, statusCode = 500, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

 

  static badRequest(msg = 'Bad Request') {
    return new ApiError(msg, 400);
  }

  static unauthorized(msg = 'Unauthorized') {
    return new ApiError(msg, 401);
  }

  static forbidden(msg = 'Forbidden') {
    return new ApiError(msg, 403);
  }

  static notFound(msg = 'Not Found') {
    return new ApiError(msg, 404);
  }

  static conflict(msg = 'Conflict') {
    return new ApiError(msg, 409);
  }

  static internal(msg = 'Internal Server Error') {
    return new ApiError(msg, 500);
  }
}
