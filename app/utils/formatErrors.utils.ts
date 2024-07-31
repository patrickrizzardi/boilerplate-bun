import type { Context } from 'elysia';
import type { IErrorResponse } from 'root/Elysia.typedefs.ts';
import { EStatusCode } from 'root/Elysia.typedefs.ts';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (errors: any, statusCode?: { set: Context['set']; status: EStatusCode }): IErrorResponse => {
  /**
   * This does not need returned as Elysia will handle the status code, we just need to set it
   * if it is passed in. If it is not passed in, we will default to 500 in the Elysia.onError method.
   */
  if (statusCode) statusCode.set.status = statusCode.status;

  const errorResponse: IErrorResponse = {
    success: false,
    errors: [],
  };

  if (statusCode && statusCode.status === EStatusCode.INTERNAL_SERVER_ERROR && Bun.env.NODE_ENV === 'production') {
    errorResponse.errors.push({
      title: 'Error',
      description: 'An error occurred while processing your request. Please try again later.',
    });
    return errorResponse;
  }

  if (typeof errors === 'string' || Array.isArray(errors)) {
    let errorsArray = <Array<string>>errors;
    if (typeof errors === 'string') errorsArray = [errors];

    for (const error of errorsArray) {
      errorResponse.errors.push({
        title: 'Error',
        description: error,
      });
    }

    return errorResponse;
  }

  if (errors instanceof Error) {
    errorResponse.errors.push({
      title: 'Error',
      description: errors.message,
    });
  }

  return errorResponse;
};
