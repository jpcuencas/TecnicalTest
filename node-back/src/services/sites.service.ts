import console from "../config/logger";
import axios from 'axios';
import config from '../config/config';
import oauthService from './oauth.service';

let idSite = '';
let check = false;
 const getGraphqlSites = async (token: string) => {
    let res:any;
    let siteName = config.siteName;
    let element:any = {};
    console.info('token')
    console.info(token)
    const body={"query":
    "{ me { username profiles { site { id name } } } }"}
    try {
        res = await axios.post(config.apiURL, body, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });
        console.info('response');
        console.info(res);
        console.info(res?.data);
        console.info(res?.data?.data?.me?.profiles);
        element = res?.data?.data?.me?.profiles?.filter((a:any)=> a?.site.name === siteName)[0];
        console.info(element?.site?.id);
        idSite = element?.site?.id;
    } catch (error) {
        console.error(error);
        if((error.status === 401 || error.status === 400) && ! check) {
            await oauthService.getRefresh(oauthService.getTokens().refreshToken);
            check = true;
            const result:any = await getGraphqlSites(oauthService.getTokens().token);
            check = false;
            return result;
        }
    }
    return element?.site?.id;
}
const getId = () => {
    return idSite;
}
const setId = (id: string) => {
    idSite = id;
}
export default {
    getId: getId,
    setId: setId,
    getGraphqlSites: getGraphqlSites,
}
