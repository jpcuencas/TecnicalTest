"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const softwareCtrl = __importStar(require("../controllers/software.controller"));
const assetsCtrl = __importStar(require("../controllers/assets.controller"));
const oauthCtrl = __importStar(require("../controllers/oauth.controller"));
const router = express_1.Router();
router.get('/autorize', oauthCtrl.getCode);
router.get('/integrations', oauthCtrl.getRedirecct);
router.get('/refresh', oauthCtrl.getRefresh);
router.get('/assets', assetsCtrl.getAssets);
router.get('/assets/:id', assetsCtrl.getAsset);
router.get('/assetsGrap', assetsCtrl.getAssetsGraphql);
router.get('/assetsGrapPag', assetsCtrl.getAssetsGraphqlPag);
router.get('/softwareGrap/:key', softwareCtrl.getSoftwareGraphql);
router.get('/softwareGrapPag/:key', softwareCtrl.getSoftwareGraphqlPag);
exports.default = router;
//# sourceMappingURL=assets.routes.js.map