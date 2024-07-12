import log from 'utils/log-utils.ts';

Bun.serve({
  development: Bun.env.NODE_ENV !== 'production',
  port: Bun.env.PORT ?? 5000,
  fetch() {
    return Response.json({
      message: 'Hello, world!',
    });
  },
  error(error) {
    return Response.json({
      error: error.message,
    });
  },
});

log.info(`Server started on port ${Bun.env.PORT ?? 5000}`);
