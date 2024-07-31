import type { JWTPayloadSpec } from '@elysiajs/jwt';
import type { Context } from 'elysia';
import type { THttpResponse } from 'root/Elysia.typedefs.ts';
import formatErrorsUtils from 'utils/formatErrors.utils.ts';

/**
 * We return undefined if the user is authenticated and verified.
 * This is so that the next middleware can run. If we return anything other than void or undefined, the next middleware will not run.
 */
export default async (ctx: Context): Promise<THttpResponse<undefined> | undefined> => {
  const { accessJwt, headers } = <Context & { accessJwt: { verify: (token: string) => Promise<JWTPayloadSpec | false> } }>ctx;

  if (!headers.authorization) return formatErrorsUtils('No token provided', { set: ctx.set, status: 401 });
  const [, token] = headers.authorization.split(' ');
  if (!token) return formatErrorsUtils('No token provided', { set: ctx.set, status: 401 });

  const decodedToken = await accessJwt.verify(token);
  if (!decodedToken) return formatErrorsUtils('Invalid token', { set: ctx.set, status: 401 });

  //   const user = await userAccess.findUserById(Number(decodedToken.sub));
  //   if (!user) return formatErrorsUtils('Unauthorized', { set: ctx.set, status: 401 });

  //   await userAccess.updateUserById(user.id, { lastActive: dayjs().toDate() });

  //   if (!user.verifiedAt) return formatErrorsUtils('Please verify your email', { set: ctx.set, status: 403 });
  //   Object.assign(ctx, { user });

  Object.assign(ctx, { userId: decodedToken.sub });

  return undefined;
};
