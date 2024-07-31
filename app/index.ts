import { jwt } from '@elysiajs/jwt';
import type { JWTPayloadSpec } from '@elysiajs/jwt';
import { Elysia } from 'elysia';
import type { Context } from 'elysia';
import { cors } from '@elysiajs/cors';
import formatErrorsUtils from 'utils/formatErrors.utils.ts';
import log from 'utils/log.utils.ts';
import { userDatabase } from 'root/services/user/models/sequelize.ts';

export interface BunContext extends Context {
  userId: string;
  accessJwt: { sign: (payload: JWTPayloadSpec) => Promise<string>; verify: (token: string) => Promise<JWTPayloadSpec | false> };
  refreshJwt: { sign: (payload: JWTPayloadSpec) => Promise<string>; verify: (token: string) => Promise<JWTPayloadSpec | false> };
  emailJwt: { sign: (payload: JWTPayloadSpec) => Promise<string>; verify: (token: string) => Promise<JWTPayloadSpec | false> };
}

export const createApp = (): Elysia => {
  const app = new Elysia();

  app
    .onStop(() => {
      log.warn(`🦊 ${Bun.env.SERVICE} service is shutting down...`);
    })

    .onStart(async () => {
      log.info(`🦊 ${Bun.env.SERVICE} service is starting...`);
      await userDatabase.authenticate();
      await userDatabase.sync();
    })

    .onError(({ error, set }: { error: any; set: Context['set'] }) => {
      log.error('Error', error);
      return formatErrorsUtils(error, { set, status: 500 });
    })

    .onBeforeHandle((ctx) => {
      /**
       * If the body is empty, set it to an empty object elysia parsing errors
       */
      if (!ctx.body) ctx.body = {};
    })

    .use(
      cors({
        // Only allow the origin to be the production domain and its subdomains.
        origin: '*',
        // Only allow the following headers.
        allowedHeaders: ['Authorization', 'content-type', 'x-forwarded-for'],
        // Allow the following methods.
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
      }),
    )

    .use(
      jwt({
        name: 'accessJwt',
        exp: '1h',
        secret: Buffer.from(Bun.env.JWT_SECRET_ACCESS_KEY, 'base64').toString('ascii'),
        algorithms: ['ES256'],
        issuer: Bun.env.API_URL,
        audience: Bun.env.APP_URL,
      }),
    )

    .use(
      jwt({
        name: 'refreshJwt',
        exp: '30d',
        secret: Buffer.from(Bun.env.JWT_SECRET_REFRESH_KEY, 'base64').toString('ascii'),
        algorithms: ['ES256'],
        issuer: Bun.env.API_URL,
        audience: Bun.env.APP_URL,
      }),
    )

    .use(
      jwt({
        name: 'emailJwt',
        exp: '1d',
        secret: Buffer.from(Bun.env.JWT_SECRET_REFRESH_KEY, 'base64').toString('ascii'),
        algorithms: ['ES256'],
        issuer: Bun.env.API_URL,
        audience: Bun.env.APP_URL,
      }),
    )

    .use(
      jwt({
        secret: Buffer.from(Bun.env.JWT_PUBLIC_ACCESS_KEY, 'base64').toString('ascii'),
        issuer: Bun.env.API_URL,
        audience: Bun.env.APP_URL,
        alg: 'ES256',
      }),
    )

    .get('/status', () => ({ success: true }));
  // .group(<''>'/auth', <any>authRoutes)

  return app;
};
