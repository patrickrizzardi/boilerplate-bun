import type { THttpResponse } from 'root/Elysia.typedefs.ts';
import type { BunContext } from 'root/index.ts';
import { User } from 'root/services/user/models/User.model.ts';
import formatErrorsUtils from 'utils/formatErrors.utils.ts';

export default async ({ set, userId }: BunContext): Promise<THttpResponse<{ user: User }>> => {
  const user = await User.findByPk(userId);

  if (!user) return formatErrorsUtils('User not found', { set, status: 404 });

  return {
    success: true,
    message: 'User found successfully',
    data: { user },
  };
};
