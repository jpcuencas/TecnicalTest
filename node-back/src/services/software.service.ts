
import console from "../config/logger";
import axios from 'axios';
import config from '../config/config';

import Pagination from '../models/Pagination';
import Software from '../models/Software';
import oauthService from './oauth.service';

let check = false;
let software: Software[] =  [];

/**
const getGraphqlSoftwarePag = async (token: string, idSite: string, key: string, pagination:Pagination) => {
    let res:any;
    console.info('idSite')
    console.info(idSite)
    if(idSite){
        let body = (pagination.page==0)? {"query":
        `query getSoftwaresByAssetKey {site(id: \"${idSite}\") { softwares(key: \"${key}\" pagination: { limit: ${pagination.limit}, page: FIRST }, fields: [ \"softwares.installDate\", \"softwares.lastChanged\", \"softwares.currentUser\", \"softwares.msi\", \"softwares.name\", \"softwares.publisher\", \"softwares.operatingSystem\", \"softwares.version\", \"softwares.release\", \"softwares.architecture\", \"softwares.status\", \"softwares.error\"]) { total items } } }`}
        :{"query":
        `query getSoftwaresByAssetKey {site(id: \"${idSite}\") { softwares(key: \"${key}\" pagination: { cursor: \"${pagination.cursor}\",limit: ${pagination.limit}, page: ${pagination.operation} }, fields: [ \"softwares.installDate\", \"softwares.lastChanged\", \"softwares.currentUser\", \"softwares.msi\", \"softwares.name\", \"softwares.publisher\", \"softwares.operatingSystem\", \"softwares.version\", \"softwares.release\", \"softwares.architecture\", \"softwares.status\", \"softwares.error\"]) { total items } } }`};
        try {
            res = await axios.post(config.apiURL, body, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              }
            });
            console.info(res)
            console.info(res?.data)
            console.info(res?.data?.data?.site)
            console.info(res?.data?.data?.site?.softwares?.items)
            software = res?.data?.data?.site?.softwares?.items;
        } catch (error) {
            console.error(error);
            if(error.status ==403) {
                oauthService.getRefresh(oauthService.getTokens().refreshToken)
            }
            return error?.console;
        }
        return res?.data?.data?.site;
    }
    return 'AreNotLoggin'
}
/**/

const getGraphqlSoftware = async (token: string, idSite: string, key: string) => {
    let res:any;
    console.info('idSite');
    console.info(idSite);
    if(idSite) {
        const body = {"query":
        "query getSoftwaresByAssetKey {site(id: \"" + idSite + "\") { softwares(key: \"" + key + "\" fields: [ \"softwares.installDate\", \"softwares.lastChanged\", \"softwares.currentUser\", \"softwares.msi\", \"softwares.name\", \"softwares.publisher\", \"softwares.operatingSystem\", \"softwares.version\", \"softwares.release\", \"softwares.architecture\", \"softwares.status\", \"softwares.error\",]) { total items } } }"
        };
        
        try {
            res = await axios.post(config.apiURL, body, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              }
            });
            console.info('console');
            console.info(res);
            console.info(res?.data);
            console.info(res?.data?.data?.site);
            console.info(res?.data?.data?.site?.softwares?.items);
            software = res?.data?.data?.site?.softwares?.items;
        } catch (error) {
            console.error(error);
            if((error.status === 401 || error.status === 400) && ! check) {
                await oauthService.getRefresh(oauthService.getTokens().refreshToken);
                check = true;
                const result:any = await getGraphqlSoftware(oauthService.getTokens().token, idSite, key);
                check = false;
                return result;
            }
            return error?.console;
        }
        return res?.data?.data?.site;
    }
    return 'AreNotLoggin';
}

const getSoftwarePag = async (key: string, pagination:Pagination) => {
    const page = pagination.page || 1,
	per_page = pagination.limit || 10,
	offset = (page - 1) * per_page;
    console.info('software');
    console.info(software);
	const paginatedItems = software.slice(offset).slice(0, per_page);
    console.info('----- ITEMS ------');
    console.info(paginatedItems);
    return {
        items:paginatedItems,
        total: software.length
    }
}

const getSoftware = () => {
    return software;
}

export default {
    getSoftware:getSoftware,
    getSoftwarePag:getSoftwarePag,
    getGraphqlSoftware:getGraphqlSoftware,
   // getGraphqlSoftwarePag:getGraphqlSoftwarePag, // TODO pagination of software in graphql-api is not working
}
