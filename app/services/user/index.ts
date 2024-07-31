import type { Context } from 'elysia';
import { createApp } from 'root/index.ts';
import userRoutes from 'root/services/user/user.routes.ts';
import authUtils from 'utils/auth.utils.ts';
import log from 'utils/log.utils.ts';

const app = createApp();

app
  .guard(
    {
      beforeHandle: async (ctx) => authUtils(<Context>(<unknown>ctx)),
    },
    (guard) => guard.group(<''>'/user', <any>userRoutes),
  )

  .listen(Bun.env.PORT);

if (app.server) log.info(`🦊 ${Bun.env.SERVICE} service is running on ${app.server.hostname}:${app.server.port}`);
