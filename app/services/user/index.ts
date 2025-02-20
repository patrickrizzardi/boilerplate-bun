import type { Context } from 'elysia';

import { createApp } from 'root/index.ts';
import userRoutes from 'root/services/user/user.routes.ts';
import userAuthenticationRoutes from 'root/services/user/userAuthentication.routes.ts';
import authUtils from 'utils/auth.utils.ts';
import log from 'utils/log.utils.ts';

const app = createApp();

app
  .guard(
    {
      beforeHandle: async (ctx) => authUtils(((ctx as unknown) as Context)),
    },
    (guard) => guard.use((userRoutes as any)),
  )
  .use((userAuthenticationRoutes as any))
  .listen(Bun.env.PORT);

if (app.server) log.info(`🦊 ${Bun.env.SERVICE} service is running on ${app.server.hostname}:${app.server.port}`);
