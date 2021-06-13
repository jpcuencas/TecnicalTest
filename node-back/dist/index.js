"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const oauth_service_1 = __importDefault(require("./services/oauth.service"));
//oauthService.oauth()
const getAssets = () => {
    let token = oauth_service_1.default.getCode();
    /**
    assetsService.getQueryGraphql(token, `query getAssetResources {
        site(id: "6da03f27-266c-4fad-a373-190168aab403") {
          assetResources(
            fields: ["assetBasicInfo.name",
                     "assetBasicInfo.userDomain",
                     "assetBasicInfo.description"]
          ) {
            total
            items
          }
        }
      }`)
      /**/
};
const server = app_1.default.listen(app_1.default.get('port'), () => {
    console.log(`server on port : ${app_1.default.get('port')}`);
});
//getAssets()
exports.default = server;
//# sourceMappingURL=index.js.map