/* eslint-disable max-classes-per-file */
import httpStatus from 'http-status';

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(message, status, isPublic, code) {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    this.status = status;
    this.isPublic = isPublic;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

/**
 * 信箱尚未註冊 Error
 * @extends ExtendableError
 */
class NotRegisteredMailError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message = '信箱尚未註冊!', status = httpStatus.NOT_FOUND, isPublic = true, code = 404) {
    super(message, status, isPublic, code);
    this.name = 'NotRegisteredMailError';
  }
}

/**
 * 密碼錯誤 Error.
 * @extends ExtendableError
 */
class WrongPasswordError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message = '您輸入的密碼有誤！', status = httpStatus.NOT_FOUND, isPublic = true, code = 404) {
    super(message, status, isPublic, code);
    this.name = 'WrongPasswordError';
  }
}

/**
 * Token 驗證失敗 Error.
 * @extends ExtendableError
 */
class TokenVerificationFailedError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message = 'Token 驗證失敗!', status = httpStatus.UNAUTHORIZED, isPublic = true, code = 401) {
    super(message, status, isPublic, code);
    this.name = 'TokenVerificationFailedError';
  }
}

export default { NotRegisteredMailError, WrongPasswordError, TokenVerificationFailedError };
