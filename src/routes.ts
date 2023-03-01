/**
 * Main application routes
 */
import { Application } from 'express';

import authLocal from './modules/auth/local';
import doctor from './modules/doctor';
import healthcheck from './modules/healthcheck';
import hospital from './modules/hospital';
import user from './modules/user';

function routes(app: Application) {
  app.use('/api/doctors', doctor);
  app.use('/api/healthcheck', healthcheck);
  app.use('/api/hospitals', hospital);
  app.use('/api/users', user);

  app.use('/auth/local', authLocal);
}

export default routes;
