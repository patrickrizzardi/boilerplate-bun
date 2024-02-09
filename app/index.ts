import log from 'utils/log-utils.ts';

Bun.serve({
  development: process.env.NODE_ENV !== 'production',
  port: process.env.PORT ?? 5000,
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

log.info(`Server started on port ${process.env.PORT ?? 5000}`);
