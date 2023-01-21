import 'whatwg-fetch';

import 'setimmediate';

require('dotenv').config({
  path: 'test.env',
});

// Realizar el mock completo de las variables de entorno
jest.mock('./src/helpers/getEnvVar', () => ({
  getEnvVar: () => ({ ...process.env }),
}));
