import type { Context } from 'elysia';

export default async ({ request }: Context): Promise<any> => {
  console.log(request);

  const url = handleUrl(request.url);

  const requestOptions = {
    method,
    headers: request.headers,
  } as RequestInit;

  const req = await fetch(url, requestOptions);

  await req.json();
};

const handleUrl = (url: string): string => {
  const [, path] = url.split(Bun.env.API_URL);
  if (!path) throw new Error('Invalid URL');

  const services = {
    user: {
      host: 'user',
      port: 5001,
    },
  };

  if (path.startsWith('/user')) return `http://${services.user.host}:${services.user.port}${path.replace('/user', '')}`;

  throw new Error('Service not found');
};
