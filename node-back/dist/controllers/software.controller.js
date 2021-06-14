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
exports.getSoftware = exports.getSoftwarePag = exports.getSoftwareGraphql = void 0;
const oauth_service_1 = __importDefault(require("../services/oauth.service"));
const sites_service_1 = __importDefault(require("../services/sites.service"));
const software_service_1 = __importDefault(require("../services/software.service"));
/** PAGINATION IS NOT WORKING ***
export const getSoftwareGraphqlPag: RequestHandler = async (req: any, res: any) => {
    try {
        console.log('------------------------------')
        console.log(req.query)
        console.log('------------------------------')
        console.log(req.session)
        console.log('------------------------------')
        console.log(req.cookies)
        console.log(oauthService.getTokens())
        console.log(sitesService.getId())
        const result = await softwareService.getGraphqlSoftwarePag(oauthService.getTokens().token, sitesService.getId(), req.params.key, req.query);
        console.log('----- results ---------')
        console.log(result)
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};
/**/
const getSoftwareGraphql = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('------------------------------');
        console.log(req.query);
        console.log('------------------------------');
        console.log(req.session);
        console.log('------------------------------');
        console.log(req.cookies);
        console.log(oauth_service_1.default.getTokens());
        console.log(sites_service_1.default.getId());
        const result = yield software_service_1.default.getGraphqlSoftware(oauth_service_1.default.getTokens().token, sites_service_1.default.getId(), req.params.key);
        console.log('----- results ---------');
        console.log(result);
        res.json(result);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getSoftwareGraphql = getSoftwareGraphql;
const getSoftwarePag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('------------------------------');
        console.log(req.query);
        console.log('------------------------------');
        const result = yield software_service_1.default.getSoftwarePag(req.params.key, req.query);
        console.log('----- results ---------');
        console.log(result);
        res.json(result);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getSoftwarePag = getSoftwarePag;
const getSoftware = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield software_service_1.default.getSoftware();
        console.log('----- results ---------');
        console.log(result);
        res.json(result);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getSoftware = getSoftware;
//# sourceMappingURL=software.controller.js.map