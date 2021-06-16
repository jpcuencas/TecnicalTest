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
const assets_service_1 = __importDefault(require("../services/assets.service"));
const oauth_service_1 = __importDefault(require("../services/oauth.service"));
const sites_service_1 = __importDefault(require("../services/sites.service"));
const software_service_1 = __importDefault(require("../services/software.service"));
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];
const resolvers = {
    Query: {
        books: () => books,
        getGraphqlAssetsPag: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                logger_1.default.info(args);
                const result = yield assets_service_1.default.getGraphqlAssetsPag(oauth_service_1.default.getTokens().token, sites_service_1.default.getId(), args === null || args === void 0 ? void 0 : args.pagination);
                logger_1.default.info('----- getGraphqlAssetsPag Results ---------');
                logger_1.default.info(result);
                return result;
            }
            catch (error) {
                logger_1.default.error(error);
            }
        }),
        getAssetsGraphql: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield assets_service_1.default.getGraphqlAssets(oauth_service_1.default.getTokens().token, sites_service_1.default.getId());
                logger_1.default.info('----- getAssetsGraphql Results ---------');
                logger_1.default.info(result);
                return result;
            }
            catch (error) {
                logger_1.default.error(error);
            }
        }),
        getAsset: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                logger_1.default.info(args);
                const result = yield assets_service_1.default.getAsset(args.id);
                logger_1.default.info('----- Results ---------');
                logger_1.default.info(result);
                return result;
            }
            catch (error) {
                logger_1.default.error(error);
            }
        }),
        getAssets: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield assets_service_1.default.getAssets();
                logger_1.default.info('----- Results ---------');
                logger_1.default.info(result);
                return result;
            }
            catch (error) {
                logger_1.default.error(error);
            }
        }),
        getSoftwareGraphql: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                logger_1.default.info(args);
                const result = yield software_service_1.default.getGraphqlSoftware(oauth_service_1.default.getTokens().token, sites_service_1.default.getId(), args.key);
                logger_1.default.info('----- getSoftwareGraphql Results ---------');
                logger_1.default.info(result);
                return result;
            }
            catch (error) {
                logger_1.default.error(error);
            }
        }),
        getSoftware: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const result = yield software_service_1.default.getSoftware();
                logger_1.default.info('----- getSoftware Results ---------');
                logger_1.default.info(result);
                return result;
            }
            catch (error) {
                logger_1.default.error(error);
            }
        })
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map