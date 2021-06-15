
import logger from "../config/logger";
import axios from 'axios';
import config from '../config/config';

import Asset from '../models/Asset/Asset';
import Pagination from '../models/Pagination';
import oauthService from './oauth.service';

let assets: Asset[] = [];
let check = false;

  const getGraphqlAssets = async (token: string, idSite:string) => {
    let res:any;
    logger.info('idSite');
    logger.info(idSite);
    if(idSite) {
        const body = {"query":
        "query getAssetResources {site(id: \"" + idSite + "\") { assetResources( fields: [\"assetBasicInfo.name\", \"assetBasicInfo.type\",\"assetCustom.model\",\"assetCustom.manufacturer\",\"resourceGroup.assetKey\",\"key\"] ) {total,  items } } }",
        "operationName":"getAssetResources"};
        try {
            res = await axios.post(config.apiURL, body, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
              }
            });
            logger.info('response');
            logger.info(res);
            logger.info(res?.data);
            logger.info(res?.data?.data?.site);
            logger.info(res?.data?.data?.site?.assetResources);
            logger.info(res?.data?.data?.site?.assetResources?.items);
            assets = res?.data?.data?.site?.assetResources?.items;
        } catch (error) {
            logger.error(error);
            if(error.status === 401 && ! check) {
                await oauthService.getRefresh(oauthService.getTokens().refreshToken);
                check = true;
                const result:any = await getGraphqlAssets(oauthService.getTokens().token, idSite);
                check = false;
                return result;
            }
            return error?.response;
        }
        return res?.data?.data?.site;
    }
    return 'AreNotLoggin';
}

const getGraphqlAssetsPag = async (token: string, idSite: string, pagination:Pagination) => {
    let res:any;
    logger.info('idSite');
    logger.info(idSite);
    if(idSite) {
        const body = (pagination.page === 0) ? {"query":
        `query getAssetResources { site(id: \"${idSite}\") { assetResources( pagination: { limit: ${pagination.limit}, page: FIRST }, fields: ["assetBasicInfo.name", "assetBasicInfo.type","assetCustom.model","assetCustom.manufacturer","resourceGroup.assetKey","key"] ) { total pagination { limit current next page  } items } } }` }
        : {"query":
        "query getAssetResources { site(id: \"" + idSite + "\") { assetResources( pagination: { cursor: \"" + pagination.cursor + "\",limit: " + pagination.limit + ", page: " + pagination.operation + " }, fields: [\"assetBasicInfo.name\", \"assetBasicInfo.type\",\"assetCustom.model\",\"assetCustom.manufacturer\",\"resourceGroup.assetKey\",\"key\"] ) { total pagination { limit current next page  } items } } }" };
        try {
            res = await axios.post(config.apiURL, body, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
              }
            });
            logger.info('response');
            logger.info(res);
            logger.info(res?.data);
            logger.info(res?.data?.data?.site);
            logger.info(res?.data?.data?.site?.assetResources?.items);
            assets = res?.data?.data?.site?.assetResources?.items;
        } catch (error) {
            logger.error(error);
            logger.error(error?.response);
            if(error.status === 401 && ! check) {
                await oauthService.getRefresh(oauthService.getTokens().refreshToken);
                check = true;
                const result:any = await getGraphqlAssetsPag(oauthService.getTokens().token, idSite, pagination);
                check = false;
                return result;
            }
            return error?.response;
        }
        return res?.data?.data?.site;
    }
    return 'AreNotLoggin';
}

const getAssets = () => {
    return assets;
}

const getAsset = (id: string) => {
    logger.info('id:' + id);
    logger.info(assets.length);
    logger.info(assets.filter((a)=> a._id === id)[0]);
    return assets.filter((a)=> a._id === id)[0];
}

export default {
    getAsset: getAsset,
    getAssets: getAssets,
    getGraphqlAssets:getGraphqlAssets,
    getGraphqlAssetsPag:getGraphqlAssetsPag,
}
