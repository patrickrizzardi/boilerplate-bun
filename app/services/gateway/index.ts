import type { Context } from 'elysia';

import gateway from 'root/gateway.ts';
import { createApp } from 'root/index.ts';
import log from 'utils/log.utils.ts';

const app = createApp();

app

  .guard({
    beforeHandle: () => gateway,
  })

  .listen(Bun.env.PORT);

if (app.server) log.info(`🦊 ${Bun.env.SERVICE} service is running on ${app.server.hostname}:${app.server.port}`);
