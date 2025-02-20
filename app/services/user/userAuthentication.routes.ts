import type { Elysia } from 'elysia';

import registerUserHandler from 'root/services/user/handlers/registerUser.handler.ts';

export default (app: Elysia): unknown => {
  /**
   * Get the user saved in the context object
   */
  app.post('/register', registerUserHandler);

  return app;
};
