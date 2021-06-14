"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
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
exports.default = {
    PORT: process.env.PORT || 3001,
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
//# sourceMappingURL=config.js.map