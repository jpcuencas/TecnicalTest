
import axios from 'axios';
import config from '../config/config';

import Pagination from '../models/Pagination';
import Software from '../models/Software';
import oauthService from './oauth.service';
/**/
let software: Software[] =  [];
/**

const getGraphqlSoftwarePag = async (token: string, idSite: string, key: string, pagination:Pagination) => {
    let res:any;
    console.log('idSite')
    console.log(idSite)
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
            console.log('response')
            console.log(res)
            console.log(res?.data)
            console.log(res?.data?.data?.site)
            console.log(res?.data?.data?.site?.softwares?.items)
            software = res?.data?.data?.site?.softwares?.items;
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
/**/

const getGraphqlSoftware = async (token: string, idSite: string, key: string) => {
    let res:any;
    console.log('idSite')
    console.log(idSite)
    if(idSite) {
        let body = {"query":
        "query getSoftwaresByAssetKey {site(id: \""+idSite+"\") { softwares(key: \"" +key+ "\" fields: [ \"softwares.installDate\", \"softwares.lastChanged\", \"softwares.currentUser\", \"softwares.msi\", \"softwares.name\", \"softwares.publisher\", \"softwares.operatingSystem\", \"softwares.version\", \"softwares.release\", \"softwares.architecture\", \"softwares.status\", \"softwares.error\",]) { total items } } }"
        }
        
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
            console.log(res?.data?.data)
            console.log(res?.data?.data?.site)
            console.log(res?.data?.data?.site?.softwares)
            console.log(res?.data?.data?.site?.softwares?.items)
            software = res?.data?.data?.site?.softwares?.items;
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

const getSoftwarePag = async (key: string, pagination:Pagination) => {
    let page = pagination.page || 1,
	per_page = pagination.limit || 10,
	offset = (page - 1) * per_page;
    console.log('software')
    console.log(software)
	let paginatedItems = software.slice(offset).slice(0, per_page);
	let total_pages = Math.ceil(software.length / per_page);
    console.log('----- ITEMS ------')
    console.log(paginatedItems)
    return {
        items:paginatedItems,
        totalPages: total_pages,
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
   // getGraphqlSoftwarePag:getGraphqlSoftwarePag,
}
