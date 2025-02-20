import type { THttpResponse } from 'root/Elysia.typedefs.ts';
import type { BunContext } from 'root/index.ts';
import { User } from 'root/services/user/models/User.model.ts';
import formatErrorsUtils from 'utils/formatErrors.utils.ts';

interface CRegisterContext {
  body: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };
}

export default async (ctx: BunContext): Promise<THttpResponse<{ accessToken: string; refreshToken: string }>> => {
  try {
    const { accessJwt, refreshJwt, body } = ctx;
    const { firstName, lastName, email, password } = body as CRegisterContext['body'];

    // const validation = check.object({
    //   email: check.pipe(check.string('Email must be a string'), check.email('Email must be a valid email address')),
    //   password: check.string('Password must be a string'),
    //   firstName: check.string('First name must be a string'),
    //   lastName: check.string('Last name must be a string'),
    // });
    // check.parse(validation, { email, password, firstName, lastName });

    const user = await User.findOne({ where: { email } });
    if (user) return formatErrorsUtils('Email already exists', { set: ctx.set, status: 400 });

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    /**
     * Generate a new access token and refresh token for the user
     */
    const accessToken = await accessJwt.sign({ sub: `${newUser.id}` });
    const refreshToken = await refreshJwt.sign({ sub: `${newUser.id}` });

    /**
     * Save the refresh token to the database
     * We use the refresh token to verify the user's identity and to generate a new access token.
     * We also use the refresh token to invalidate the user's session.
     */
    // await tokenAccess.createToken({ userId: newUser.id, token: refreshToken });

    /**
     * This should only be done after the user has been created successfully and the validation has passed.
     */
    // const emailCode = generateJwtMiscTokens(newUser.id, ETokenTypes.EMAIL_VALIDATION);

    // TODO: Send email verification email

    return {
      success: true,
      message: 'Registration successful',
      data: {
        accessToken,
        refreshToken,
      },
    };
  } catch (error) {
    throw error;
  }
};
