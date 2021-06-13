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
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config/config"));
const oauth_service_1 = __importDefault(require("./oauth.service"));
/**/
let software = [];
/**/
const getGraphqlSoftware = (token, idSite, key) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    let res;
    console.log('idSite');
    console.log(idSite);
    if (idSite) {
        let body = { "query": "query getSoftwaresByAssetKey {site(id: \"" + idSite + "\") { softwares(key: \"" + key + "\" fields: [ \"softwares.installDate\", \"softwares.lastChanged\", \"softwares.currentUser\", \"softwares.msi\", \"softwares.name\", \"softwares.publisher\", \"softwares.operatingSystem\", \"softwares.version\", \"softwares.release\", \"softwares.architecture\", \"softwares.status\", \"softwares.error\",]) { total items } } }"
        };
        try {
            res = yield axios_1.default.post(config_1.default.apiURL, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            console.log('response');
            console.log(res);
            console.log(res === null || res === void 0 ? void 0 : res.data);
            console.log((_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.data);
            console.log((_c = (_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.site);
            console.log((_f = (_e = (_d = res === null || res === void 0 ? void 0 : res.data) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.site) === null || _f === void 0 ? void 0 : _f.softwares);
            console.log((_k = (_j = (_h = (_g = res === null || res === void 0 ? void 0 : res.data) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.site) === null || _j === void 0 ? void 0 : _j.softwares) === null || _k === void 0 ? void 0 : _k.items);
        }
        catch (error) {
            console.error(error);
            if (error.status == 403) {
                oauth_service_1.default.getRefresh(oauth_service_1.default.getTokens().refreshToken);
            }
            return error === null || error === void 0 ? void 0 : error.response;
        }
        return res === null || res === void 0 ? void 0 : res.data;
    }
    return 'AreNotLoggin';
});
const getGraphqlSoftwarePag = (token, idSite, key, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m, _o, _p, _q, _r;
    let res;
    console.log('idSite');
    console.log(idSite);
    if (idSite) {
        let body = (pagination.page == 0) ? { "query": `query getSoftwaresByAssetKey {site(id: \"${idSite}\") { softwares(key: \"${key}\" pagination: { limit: ${pagination.limit}, page: FIRST }, fields: [ \"softwares.installDate\", \"softwares.lastChanged\", \"softwares.currentUser\", \"softwares.msi\", \"softwares.name\", \"softwares.publisher\", \"softwares.operatingSystem\", \"softwares.version\", \"softwares.release\", \"softwares.architecture\", \"softwares.status\", \"softwares.error\"]) { total items } } }` }
            : { "query": `query getSoftwaresByAssetKey {site(id: \"${idSite}\") { softwares(key: \"${key}\" pagination: { cursor: \"${pagination.cursor}\",limit: ${pagination.limit}, page: ${pagination.operation} }, fields: [ \"softwares.installDate\", \"softwares.lastChanged\", \"softwares.currentUser\", \"softwares.msi\", \"softwares.name\", \"softwares.publisher\", \"softwares.operatingSystem\", \"softwares.version\", \"softwares.release\", \"softwares.architecture\", \"softwares.status\", \"softwares.error\"]) { total items } } }` };
        try {
            res = yield axios_1.default.post(config_1.default.apiURL, body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            });
            console.log('response');
            console.log(res);
            console.log(res === null || res === void 0 ? void 0 : res.data);
            console.log((_m = (_l = res === null || res === void 0 ? void 0 : res.data) === null || _l === void 0 ? void 0 : _l.data) === null || _m === void 0 ? void 0 : _m.site);
            console.log((_r = (_q = (_p = (_o = res === null || res === void 0 ? void 0 : res.data) === null || _o === void 0 ? void 0 : _o.data) === null || _p === void 0 ? void 0 : _p.site) === null || _q === void 0 ? void 0 : _q.softwares) === null || _r === void 0 ? void 0 : _r.items);
        }
        catch (error) {
            console.error(error);
            if (error.status == 403) {
                oauth_service_1.default.getRefresh(oauth_service_1.default.getTokens().refreshToken);
            }
            return error === null || error === void 0 ? void 0 : error.response;
        }
        return res === null || res === void 0 ? void 0 : res.data;
    }
    return 'AreNotLoggin';
});
exports.default = {
    getGraphqlSoftware: getGraphqlSoftware,
    getGraphqlSoftwarePag: getGraphqlSoftwarePag,
};
//# sourceMappingURL=software.service.js.map