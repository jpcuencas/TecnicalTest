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
const logger_1 = __importDefault(require("../config/logger"));
const oauth_service_1 = __importDefault(require("../services/oauth.service"));
const sites_service_1 = __importDefault(require("../services/sites.service"));
const software_service_1 = __importDefault(require("../services/software.service"));
/** PAGINATION IS NOT WORKING ***
export const getSoftwareGraphqlPag: RequestHandler = async (req: any, res: any) => {
    try {
        logger.info('------------------------------')
        logger.info(req.query)
        logger.info('------------------------------')
        logger.info(req.session)
        logger.info('------------------------------')
        logger.info(req.cookies)
        logger.info(oauthService.getTokens())
        logger.info(sitesService.getId())
        const result = await softwareService.getGraphqlSoftwarePag(oauthService.getTokens().token, sitesService.getId(), req.params.key, req.query);
        logger.info('----- results ---------')
        logger.info(result)
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};
/**/
const getSoftwareGraphql = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('-----queryParams-----');
        logger_1.default.info(req.query);
        logger_1.default.info('---coockies---');
        logger_1.default.info(req === null || req === void 0 ? void 0 : req.cookies);
        logger_1.default.info('---session---');
        logger_1.default.info(req === null || req === void 0 ? void 0 : req.session);
        logger_1.default.info(oauth_service_1.default.getTokens());
        logger_1.default.info(sites_service_1.default.getId());
        const result = yield software_service_1.default.getGraphqlSoftware(oauth_service_1.default.getTokens().token, sites_service_1.default.getId(), req.params.key);
        logger_1.default.info('----- results ---------');
        logger_1.default.info(result);
        res.json(result);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getSoftwareGraphql = getSoftwareGraphql;
const getSoftwarePag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('------------------------------');
        logger_1.default.info(req.query);
        logger_1.default.info('------------------------------');
        const result = yield software_service_1.default.getSoftwarePag(req.params.key, req.query);
        logger_1.default.info('----- results -----');
        logger_1.default.info(result);
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
        logger_1.default.info('----- results ---------');
        logger_1.default.info(result);
        res.json(result);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getSoftware = getSoftware;
//# sourceMappingURL=software.controller.js.map