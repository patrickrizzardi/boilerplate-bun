import { describe, expect, test } from 'bun:test';
import { EStatusCode } from 'root/Elysia.typedefs.ts';
import formatErrorsUtils from 'utils/formatErrors.utils.ts';

describe('format errors utility', () => {
  test('production error', () => {
    Bun.env.NODE_ENV = 'production';
    const errors = ['An error occurred', 'Another error occurred'];

    /**
     * Disabling eslint because we don't have the full context of the Elysia.onError method
     */
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-argument */
    const response = formatErrorsUtils(errors, <any>{
      set: {
        status: EStatusCode.INTERNAL_SERVER_ERROR,
      },
      status: EStatusCode.INTERNAL_SERVER_ERROR,
    });

    expect(response.success).toBe(false);
    expect(response.errors).toHaveLength(1);

    if (response.errors[0]) {
      expect(response.errors[0].title).toBe('Error');
      expect(response.errors[0].description).toBe('An error occurred while processing your request. Please try again later.');
    }
  });

  test('string error', () => {
    const errors = 'An error occurred';

    /**
     * Disabling eslint because we don't have the full context of the Elysia.onError method
     */

    const response = formatErrorsUtils(errors);

    expect(response.success).toBe(false);
    expect(response.errors).toBeArray();
    expect(response.errors).toHaveLength(1);

    if (response.errors[0]) {
      expect(response.errors[0].title).toBe('Error');
      expect(response.errors[0].description).toBe('An error occurred');
    }
  });

  test('array error', () => {
    const errors = ['An error occurred', 'Another error occurred'];

    /**
     * Disabling eslint because we don't have the full context of the Elysia.onError method
     */

    const response = formatErrorsUtils(errors);

    expect(response.success).toBe(false);
    expect(response.errors).toBeArray();
    expect(response.errors).toHaveLength(2);

    if (response.errors[0]) {
      expect(response.errors[0].title).toBe('Error');
      expect(response.errors[0].description).toBe('An error occurred');
    }

    if (response.errors[1]) {
      expect(response.errors[1].title).toBe('Error');
      expect(response.errors[1].description).toBe('Another error occurred');
    }
  });

  test('exception error', () => {
    const errors = new Error('An error occurred');

    /**
     * Disabling eslint because we don't have the full context of the Elysia.onError method
     */

    const response = formatErrorsUtils(errors);

    expect(response.success).toBe(false);
    expect(response.errors).toBeArray();
    expect(response.errors).toHaveLength(1);

    if (response.errors[0]) {
      expect(response.errors[0].title).toBe('Error');
      expect(response.errors[0].description).toBe('An error occurred');
    }
  });
});
