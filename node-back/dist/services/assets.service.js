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
let assets = [];
/**/
const getGraphqlAssets = (token, idSite) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    let res;
    console.log('idSite');
    console.log(idSite);
    if (idSite) {
        let body = { "query": "query getAssetResources {site(id: \"" + idSite + "\") { assetResources( fields: [\"assetBasicInfo.name\", \"assetBasicInfo.type\",\"assetCustom.model\",\"assetCustom.manufacturer\",\"resourceGroup.assetKey\",\"key\"] ) {total,  items } } }",
            "operationName": "getAssetResources" };
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
            console.log((_b = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.site);
            console.log((_e = (_d = (_c = res === null || res === void 0 ? void 0 : res.data) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.site) === null || _e === void 0 ? void 0 : _e.assetResources);
            console.log((_j = (_h = (_g = (_f = res === null || res === void 0 ? void 0 : res.data) === null || _f === void 0 ? void 0 : _f.data) === null || _g === void 0 ? void 0 : _g.site) === null || _h === void 0 ? void 0 : _h.assetResources) === null || _j === void 0 ? void 0 : _j.items);
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
const getGraphqlAssetsPag = (token, idSite, pagination) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m, _o, _p, _q;
    let res;
    console.log('idSite');
    console.log(idSite);
    if (idSite) {
        let body = (pagination.page == 0) ? { "query": `query getAssetResources { site(id: \"${idSite}\") { assetResources( pagination: { limit: ${pagination.limit}, page: FIRST }, fields: ["assetBasicInfo.name", "assetBasicInfo.type","assetCustom.model","assetCustom.manufacturer","resourceGroup.assetKey","key"] ) { total pagination { limit current next page  } items } } }` }
            : { "query": "query getAssetResources { site(id: \"" + idSite + "\") { assetResources( pagination: { cursor: \"" + pagination.cursor + "\",limit: " + pagination.limit + ", page: " + pagination.operation + " }, fields: [\"assetBasicInfo.name\", \"assetBasicInfo.type\",\"assetCustom.model\",\"assetCustom.manufacturer\",\"resourceGroup.assetKey\",\"key\"] ) { total pagination { limit current next page  } items } } }" };
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
            console.log((_l = (_k = res === null || res === void 0 ? void 0 : res.data) === null || _k === void 0 ? void 0 : _k.data) === null || _l === void 0 ? void 0 : _l.site);
            console.log((_q = (_p = (_o = (_m = res === null || res === void 0 ? void 0 : res.data) === null || _m === void 0 ? void 0 : _m.data) === null || _o === void 0 ? void 0 : _o.site) === null || _p === void 0 ? void 0 : _p.assetResources) === null || _q === void 0 ? void 0 : _q.items);
        }
        catch (error) {
            console.error(error);
            console.error(error === null || error === void 0 ? void 0 : error.response);
            if (error.status == 403) {
                oauth_service_1.default.getRefresh(oauth_service_1.default.getTokens().refreshToken);
            }
            return error === null || error === void 0 ? void 0 : error.response;
        }
        return res === null || res === void 0 ? void 0 : res.data;
    }
    return 'AreNotLoggin';
});
const getAssets = () => {
    return assets;
};
const getAsset = (id) => {
    console.log('id:' + id);
    console.log(assets.length);
    console.log(assets.filter((a) => a._id === id)[0]);
    return assets.filter((a) => a._id === id)[0];
};
exports.default = {
    getAsset: getAsset,
    getAssets: getAssets,
    getGraphqlAssets: getGraphqlAssets,
    getGraphqlAssetsPag: getGraphqlAssetsPag,
};
//# sourceMappingURL=assets.service.js.map