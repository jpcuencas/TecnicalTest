
import axios from 'axios';
import config from '../config/config';

import Asset from '../models/Asset/Asset';
import sitesService from './sites.service';
import Pagination from '../models/Pagination';
import oauthService from './oauth.service';
/**/
let assets: Asset[] =  [];
/**/

  const getGraphqlAssets = async (token: string, idSite:string) => {
    let res:any;
    console.log('idSite')
    console.log(idSite)
    if(idSite) {
        let body = {"query":
        "query getAssetResources {site(id: \""+idSite+"\") { assetResources( fields: [\"assetBasicInfo.name\", \"assetBasicInfo.type\",\"assetCustom.model\",\"assetCustom.manufacturer\",\"resourceGroup.assetKey\",\"key\"] ) {total,  items } } }",
         "operationName":"getAssetResources"}
        try {
            res = await axios.post(config.apiURL, body, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              }
            });
            console.log('response')
            console.log(res)
            console.log(res?.data)
            console.log(res?.data?.data?.site)
            console.log(res?.data?.data?.site?.assetResources)
            console.log(res?.data?.data?.site?.assetResources?.items)
            assets = res?.data?.data?.site?.assetResources?.items;
        } catch (error) {
            console.error(error);
            if(error.status ==403) {
                oauthService.getRefresh(oauthService.getTokens().refreshToken)
            }
            return error?.response;
        }
        return res?.data;
    }
    return 'AreNotLoggin'
}

const getGraphqlAssetsPag = async (token: string, idSite: string, pagination:Pagination) => {
    let res:any;
    console.log('idSite')
    console.log(idSite)
    if(idSite){
        let body = 
        (pagination.page==0)? {"query":
        `query getAssetResources { site(id: \"${idSite}\") { assetResources( pagination: { limit: ${pagination.limit}, page: FIRST }, fields: ["assetBasicInfo.name", "assetBasicInfo.type","assetCustom.model","assetCustom.manufacturer","resourceGroup.assetKey","key"] ) { total pagination { limit current next page  } items } } }`}
        :{"query":
        "query getAssetResources { site(id: \""+idSite+"\") { assetResources( pagination: { cursor: \""+ pagination.cursor +"\",limit: "+pagination.limit+", page: "+pagination.operation+" }, fields: [\"assetBasicInfo.name\", \"assetBasicInfo.type\",\"assetCustom.model\",\"assetCustom.manufacturer\",\"resourceGroup.assetKey\",\"key\"] ) { total pagination { limit current next page  } items } } }"};
        try {
            res = await axios.post(config.apiURL, body, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              }
            });
            console.log('response')
            console.log(res)
            console.log(res?.data)
            console.log(res?.data?.data?.site)
            console.log(res?.data?.data?.site?.assetResources?.items)
            assets = res?.data?.data?.site?.assetResources?.items;
        } catch (error) {
            console.error(error);
            console.error(error?.response);
            if(error.status ==403) {
                oauthService.getRefresh(oauthService.getTokens().refreshToken)
            }
            return error?.response;
        }
        return res?.data;
    }
    return 'AreNotLoggin'
}

const getAssets = () => {
    return assets;
}

const getAsset = (id: string) => {
    console.log('id:' + id)
    console.log(assets.length)
    console.log(assets.filter((a)=> a._id === id)[0])
    return assets.filter((a)=> a._id === id)[0];
}

export default {
    getAsset: getAsset,
    getAssets: getAssets,
    getGraphqlAssets:getGraphqlAssets,
    getGraphqlAssetsPag:getGraphqlAssetsPag,
}
