import * as dotenv from 'dotenv';

dotenv.config();
let pathFile;
switch (process.env.NODE_ENV) {
  case 'production':
    pathFile = `${__dirname}/../../.env.production`;
    break;
  case 'test':
    pathFile = `${__dirname}/../../.env.test`;
    break;
  default:
    pathFile = `${__dirname}/../../.env.development`;
}

dotenv.config({ path: pathFile });
export default {
    PORT: process.env.PORT || 8081,
    client_id: process.env.client_id || '5da0b8b52e8eb7d5324b4818ae09fa78',
    client_secret: process.env.client_secret || 'm3GGGwsvivbPIpyKtKpcDHvG288rT3lA_jNWr7J5snOocz59sI6WVcY4ywQSCZHx',
    code: process.env.code || '',
    apiURL: process.env.apiURL || 'https://api.lansweeper.com/api/v2/graphql',
    getAutorizationURL: process.env.getAutorizationURL || 'https://app.lansweeper.com/authorize-app/',
    getAutenticationURL: process.env.getAutenticationURL || 'https://api.lansweeper.com/api/integrations/oauth/token',
    redirect_uri: process.env.redirect_uri || 'http://127.0.0.1:8081/integrations/',
    siteName: process.env.siteName || 'rafa-new-sync-vmware',
    enviroment: process.env.enviroment || 'prueba',
};