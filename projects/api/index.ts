import { temp } from '@api/utils/temp.ts';
import { YinzerFlow, log } from 'yinzerflow';

export const app = new YinzerFlow({
  port: 5000,
  logLevel: 'info',
  networkLogs: true,
});

app.onError(({ response }, error) => {
  log.error('Server error: \n', error);
  response.setStatusCode(500);
  return { success: false, message: 'Internal server error' };
});

app.get('/status', () => ({ success: true, }));


(async (): Promise<void> => {
  await app.listen();
})().catch((error) => {
  log.error('Server error: \n', error);
  temp();
  process.exit(1);
});


