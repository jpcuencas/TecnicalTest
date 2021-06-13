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
let idSite = '';
const getGraphqlSites = (token) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    let res;
    let siteName = config_1.default.siteName;
    let element = {};
    console.log('token');
    console.log(token);
    let body = { "query": "{ me { username profiles { site { id name } } } }" };
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
        console.log((_c = (_b = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.me) === null || _c === void 0 ? void 0 : _c.profiles);
        element = (_g = (_f = (_e = (_d = res === null || res === void 0 ? void 0 : res.data) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.me) === null || _f === void 0 ? void 0 : _f.profiles) === null || _g === void 0 ? void 0 : _g.filter((a) => (a === null || a === void 0 ? void 0 : a.site.name) === siteName)[0];
        console.log((_h = element === null || element === void 0 ? void 0 : element.site) === null || _h === void 0 ? void 0 : _h.id);
        idSite = (_j = element === null || element === void 0 ? void 0 : element.site) === null || _j === void 0 ? void 0 : _j.id;
    }
    catch (error) {
        console.error(error);
        if (error.status == 403) {
            oauth_service_1.default.getRefresh(oauth_service_1.default.getTokens().refreshToken);
        }
    }
    return (_k = element === null || element === void 0 ? void 0 : element.site) === null || _k === void 0 ? void 0 : _k.id;
});
const getId = () => {
    return idSite;
};
exports.default = {
    getId: getId,
    getGraphqlSites: getGraphqlSites,
};
//# sourceMappingURL=sites.service.js.map