import axios from 'axios';
import config from '../config/config';
import oauthService from './oauth.service';

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
        console.log('response')
        console.log(res)
    } catch (error) {
        console.error(error);
        if(error.status ==403) {
            oauthService.getRefresh(oauthService.getTokens().refreshToken);
        }
        return error?.response;
    }
    return res?.data;
}
export default {
    getQueryGraphql:getQueryGraphql,
}
