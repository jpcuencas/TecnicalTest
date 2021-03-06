import console from "../config/logger";
import axios from 'axios';
import config from '../config/config';
import oauthService from './oauth.service';
let check = false;
// TODO unificar llamadas graphql 
  const getQueryGraphql = async (token: string, graphql:any) => {
    let res:any;
    try {
        res = await axios.post(config.apiURL, graphql, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });
        console.info('response')
        console.info(res)
    } catch (error) {
        console.error(error);
        if((error.status === 401 || error.status === 400) && ! check) {
            await oauthService.getRefresh(oauthService.getTokens().refreshToken);
            check = true;
            let result:any =await getQueryGraphql(oauthService.getTokens().token, graphql);
            check = false;
            return result;
        }
        return error?.response;
    }
    return res?.data;
}

export default {
    getQueryGraphql:getQueryGraphql,
}
