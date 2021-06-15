import logger from "../config/logger";
import axios from 'axios';
import config from '../config/config';
import oauthService from './oauth.service';

let idSite = '';
let check = false;
 const getGraphqlSites = async (token: string) => {
    let res:any;
    let siteName = config.siteName;
    let element:any = {};
    logger.info('token')
    logger.info(token)
    const body={"query":
    "{ me { username profiles { site { id name } } } }"}
    try {
        res = await axios.post(config.apiURL, body, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        });
        logger.info('response');
        logger.info(res);
        logger.info(res?.data);
        logger.info(res?.data?.data?.me?.profiles);
        element = res?.data?.data?.me?.profiles?.filter((a:any)=> a?.site.name === siteName)[0];
        logger.info(element?.site?.id);
        idSite = element?.site?.id;
    } catch (error) {
        logger.error(error);
        if(error.status === 401 && ! check) {
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
