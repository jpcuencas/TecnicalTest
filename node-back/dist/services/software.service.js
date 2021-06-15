"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../config/logger"));
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config/config"));
const oauth_service_1 = __importDefault(require("./oauth.service"));
let check = false;
let software = [];
/**

const getGraphqlSoftwarePag = async (token: string, idSite: string, key: string, pagination:Pagination) => {
    let res:any;
    logger.info('idSite')
    logger.info(idSite)
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
            logger.info('response')
            logger.info(res)
            logger.info(res?.data)
            logger.info(res?.data?.data?.site)
            logger.info(res?.data?.data?.site?.softwares?.items)
            software = res?.data?.data?.site?.softwares?.items;
        } catch (error) {
            logger.error(error);
            if(error.status ==403) {
                oauthService.getRefresh(oauthService.getTokens().refreshToken)
            }
            return error?.response;
        }
        return res?.data?.data?.site;
    }
    return 'AreNotLoggin'
}
/**/
const getGraphqlSoftware = (token, idSite, key) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    let res;
    logger_1.default.info('idSite');
    logger_1.default.info(idSite);
    if (idSite) {
        const body = { "query": "query getSoftwaresByAssetKey {site(id: \"" + idSite + "\") { softwares(key: \"" + key + "\" fields: [ \"softwares.installDate\", \"softwares.lastChanged\", \"softwares.currentUser\", \"softwares.msi\", \"softwares.name\", \"softwares.publisher\", \"softwares.operatingSystem\", \"softwares.version\", \"softwares.release\", \"softwares.architecture\", \"softwares.status\", \"softwares.error\",]) { total items } } }"
        };
        try {
            res = yield axios_1.default.post(config_1.default.apiURL, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            logger_1.default.info('response');
            logger_1.default.info(res);
            logger_1.default.info(res === null || res === void 0 ? void 0 : res.data);
            logger_1.default.info((_b = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.site);
            logger_1.default.info((_f = (_e = (_d = (_c = res === null || res === void 0 ? void 0 : res.data) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.site) === null || _e === void 0 ? void 0 : _e.softwares) === null || _f === void 0 ? void 0 : _f.items);
            software = (_k = (_j = (_h = (_g = res === null || res === void 0 ? void 0 : res.data) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.site) === null || _j === void 0 ? void 0 : _j.softwares) === null || _k === void 0 ? void 0 : _k.items;
        }
        catch (error) {
            logger_1.default.error(error);
            if (error.status === 401 && !check) {
                yield oauth_service_1.default.getRefresh(oauth_service_1.default.getTokens().refreshToken);
                check = true;
                const result = yield getGraphqlSoftware(oauth_service_1.default.getTokens().token, idSite, key);
                check = false;
                return result;
            }
            return error === null || error === void 0 ? void 0 : error.response;
        }
        return (_m = (_l = res === null || res === void 0 ? void 0 : res.data) === null || _l === void 0 ? void 0 : _l.data) === null || _m === void 0 ? void 0 : _m.site;
    }
    return 'AreNotLoggin';
});
const getSoftwarePag = (key, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    const page = pagination.page || 1, per_page = pagination.limit || 10, offset = (page - 1) * per_page;
    logger_1.default.info('software');
    logger_1.default.info(software);
    const paginatedItems = software.slice(offset).slice(0, per_page);
    const total_pages = Math.ceil(software.length / per_page);
    logger_1.default.info('----- ITEMS ------');
    logger_1.default.info(paginatedItems);
    return {
        items: paginatedItems,
        totalPages: total_pages,
        total: software.length
    };
});
const getSoftware = () => {
    return software;
};
exports.default = {
    getSoftware: getSoftware,
    getSoftwarePag: getSoftwarePag,
    getGraphqlSoftware: getGraphqlSoftware,
    // getGraphqlSoftwarePag:getGraphqlSoftwarePag, // TODO pagination of software in graphql-api is not working
};
//# sourceMappingURL=software.service.js.map