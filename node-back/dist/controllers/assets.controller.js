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
exports.getAssets = exports.getAsset = exports.getAssetsGraphql = exports.getAssetsGraphqlPag = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const assets_service_1 = __importDefault(require("../services/assets.service"));
const oauth_service_1 = __importDefault(require("../services/oauth.service"));
const sites_service_1 = __importDefault(require("../services/sites.service"));
const getAssetsGraphqlPag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info('----queryParams----');
        logger_1.default.info(req.query);
        logger_1.default.info('---coockies---');
        logger_1.default.info(req === null || req === void 0 ? void 0 : req.cookies);
        logger_1.default.info('---session---');
        logger_1.default.info(req === null || req === void 0 ? void 0 : req.session);
        logger_1.default.info(oauth_service_1.default.getTokens());
        logger_1.default.info(sites_service_1.default.getId());
        const token = req.session.token;
        const idSite = req.session.siteId;
        const result = yield assets_service_1.default.getGraphqlAssetsPag(oauth_service_1.default.getTokens().token, sites_service_1.default.getId(), req.query);
        logger_1.default.info('----- Results ---------');
        logger_1.default.info(result);
        res.json(result);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getAssetsGraphqlPag = getAssetsGraphqlPag;
const getAssetsGraphql = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(oauth_service_1.default.getTokens());
    logger_1.default.info(sites_service_1.default.getId());
    try {
        const result = yield assets_service_1.default.getGraphqlAssets(oauth_service_1.default.getTokens().token, sites_service_1.default.getId());
        logger_1.default.info('----- results ---------');
        logger_1.default.info(result);
        res.json(result);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getAssetsGraphql = getAssetsGraphql;
const getAsset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield assets_service_1.default.getAsset(req.params.id);
        logger_1.default.info('----- results ---------');
        logger_1.default.info(result);
        res.json(result);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getAsset = getAsset;
const getAssets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield assets_service_1.default.getAssets();
        logger_1.default.info('----- results ---------');
        logger_1.default.info(result);
        res.json(result);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getAssets = getAssets;
//# sourceMappingURL=assets.controller.js.map