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
// TODO unificar llamadas graphql 
const getQueryGraphql = (token, graphql) => __awaiter(void 0, void 0, void 0, function* () {
    let res;
    try {
        res = yield axios_1.default.post(config_1.default.apiURL, graphql, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        console.log('response');
        console.log(res);
    }
    catch (error) {
        console.error(error);
        if (error.status == 403) {
            oauth_service_1.default.getRefresh(oauth_service_1.default.getTokens().refreshToken);
        }
        return error === null || error === void 0 ? void 0 : error.response;
    }
    return res === null || res === void 0 ? void 0 : res.data;
});
exports.default = {
    getQueryGraphql: getQueryGraphql,
};
//# sourceMappingURL=utils.service.js.map