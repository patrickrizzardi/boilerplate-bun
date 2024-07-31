interface IError {
  title: 'Error';
  description: string;
  stack?: string;
}

interface ISuccessResponse<T> {
  success: true;
  message: string;
  data?: T;
}

export interface IErrorResponse {
  success: false;
  errors: Array<IError>;
  data?: Record<string, any>;
}

export type THttpResponse<T> = IErrorResponse | ISuccessResponse<T>;

export const enum EStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}
