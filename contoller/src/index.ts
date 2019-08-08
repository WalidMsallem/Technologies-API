import {ContollerApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {ContollerApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new ContollerApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
