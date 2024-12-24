
export enum ResponseCode {
  SUCCESS_OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  CLIENT_ERROR_BAD_REQUEST = 400,
  CLIENT_ERROR_UNAUTHORIZED = 401,
  CLIENT_ERROR_FORBIDDEN = 403,
  CLIENT_ERROR_NOT_FOUND = 404,
  CLIENT_ERROR_METHOD_NOT_ALLOWED = 405,
  CLIENT_ERROR_REQUEST_TIMEOUT = 408,
  CLIENT_ERROR_UNPROCESSABLE_ENTITY = 422,
  SERVER_ERROR_INTERNAL = 500,
  SERVER_ERROR_BAD_GATEWAY = 502,
  SERVER_ERROR_SERVICE_UNAVAILABLE = 503,
  SERVER_ERROR_GATEWAY_TIMEOUT = 504,
}

export class ApiResponse<T = any> {
  statusCode: ResponseCode;
  data: T;
  message: string;
  success: boolean;

  constructor(statusCode: ResponseCode, data: T, message: string = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }

  static getResponseMessage(code: ResponseCode): string {
    const responseMessages: Record<ResponseCode, string> = {
      [ResponseCode.SUCCESS_OK]: "Request successful.",
      [ResponseCode.CREATED]: "Resource created successfully.",
      [ResponseCode.NO_CONTENT]: "No content to send for this request.",
      [ResponseCode.CLIENT_ERROR_BAD_REQUEST]:
        "Bad request. Please check your input.",
      [ResponseCode.CLIENT_ERROR_UNAUTHORIZED]: "Unauthorized. Please log in.",
      [ResponseCode.CLIENT_ERROR_FORBIDDEN]:
        "Forbidden. You don't have permission to access this resource.",
      [ResponseCode.CLIENT_ERROR_NOT_FOUND]: "Resource not found.",
      [ResponseCode.CLIENT_ERROR_METHOD_NOT_ALLOWED]: "Method not allowed.",
      [ResponseCode.CLIENT_ERROR_REQUEST_TIMEOUT]:
        "Request timed out. Please try again.",
      [ResponseCode.CLIENT_ERROR_UNPROCESSABLE_ENTITY]:
        "Unprocessable entity. Please check the data you submitted.",
      [ResponseCode.SERVER_ERROR_INTERNAL]:
        "Internal server error. Please try again later.",
      [ResponseCode.SERVER_ERROR_BAD_GATEWAY]:
        "Bad gateway. Please check server configuration.",
      [ResponseCode.SERVER_ERROR_SERVICE_UNAVAILABLE]:
        "Service unavailable. Try again later.",
      [ResponseCode.SERVER_ERROR_GATEWAY_TIMEOUT]:
        "Gateway timeout. Please try again.",
    };

    return responseMessages[code];
  }
}
