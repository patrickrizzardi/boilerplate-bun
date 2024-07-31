import type { Elysia } from 'elysia';
import getUserHandler from 'root/services/user/handlers/getUser.handler.ts';

export default (app: Elysia): unknown => {
  /**
   * Get the user saved in the context object
   */
  app.get('/get', getUserHandler);

  return app;
};
