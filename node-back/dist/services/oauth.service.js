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
let oauthBody = {
    "client_id": config_1.default.client_id,
    "client_secret": config_1.default.client_secret,
    "grant_type": "authorization_code",
    "code": "",
    "redirect_uri": config_1.default.redirect_uri
};
let refreshBody = {
    "client_id": config_1.default.client_id,
    "client_secret": config_1.default.client_secret,
    "grant_type": "refresh_token",
    "refresh_token": ""
};
let token;
let refreshtoken;
exports.default = {
    getTokens: () => {
        return {
            token: token,
            refreshToken: refreshtoken
        };
    },
    getCode: () => __awaiter(void 0, void 0, void 0, function* () {
        let res;
        try {
            let url = config_1.default.getAutorizationURL + config_1.default.client_id;
            res = yield axios_1.default.get(url, {
                headers: {
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        catch (error) {
            console.error(error);
            console.error(error === null || error === void 0 ? void 0 : error.response);
            return error === null || error === void 0 ? void 0 : error.response;
        }
        console.log(res);
        return res.data;
    }),
    getAutentication: (code) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        let res;
        try {
            oauthBody.code = code;
            console.log(oauthBody);
            let url = config_1.default.getAutenticationURL;
            res = yield axios_1.default.post(url, oauthBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            });
        }
        catch (error) {
            console.error(error);
            console.error(error === null || error === void 0 ? void 0 : error.response);
            return error === null || error === void 0 ? void 0 : error.response;
        }
        token = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.access_token;
        refreshtoken = (_b = res === null || res === void 0 ? void 0 : res.data) === null || _b === void 0 ? void 0 : _b.refresh_token;
        return res;
    }),
    getRefresh: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        let res;
        try {
            refreshBody.refresh_token = refreshToken;
            let url = config_1.default.getAutenticationURL;
            res = yield axios_1.default.post(url, refreshBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }
        catch (error) {
            console.error(error);
            console.error(error === null || error === void 0 ? void 0 : error.response);
            return error === null || error === void 0 ? void 0 : error.response;
        }
        console.log(res);
        token = (_c = res === null || res === void 0 ? void 0 : res.data) === null || _c === void 0 ? void 0 : _c.access_token;
        return res;
    })
};
//# sourceMappingURL=oauth.service.js.map