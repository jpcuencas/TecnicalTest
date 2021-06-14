import * as dotenv from 'dotenv';

dotenv.config();
let path;
switch (process.env.NODE_ENV) {
  case 'production':
    path = `${__dirname}/../../.env.production`;
    break;
  case 'test':
    path = `${__dirname}/../../.env.test`;
    break;
  default:
    path = `${__dirname}../../.env.development`;
}
console.log(path)
dotenv.config({ path: path });
console.log(process.env)

export default{
    PORT: process.env.PORT || 4001,
    enviroment: process.env.enviroment || 'prueba',
    nodeUrl:process.env.nodeUrl || 'http://localhost:8081',
    client_id: process.env.client_id || '5da0b8b52e8eb7d5324b4818ae09fa78',
    getAutorizationURL: process.env.getAutorizationURL || 'https://app.lansweeper.com/authorize-app/',
    pageSize: process.env.pageSize || 20
};
export const getCookie = (key: string) => {
    console.log(document.cookie);
    const val = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return val ? val.pop() : '';
};