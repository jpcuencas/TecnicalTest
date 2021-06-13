import app from './app';
import oauthService from './services/oauth.service';
import * as assetsService from './services/assets.service';

//oauthService.oauth()
const getAssets = () => {
    let token = oauthService.getCode();
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
}

const server = app.listen(app.get('port'), ()=> {
    console.log(`server on port : ${app.get('port')}`);
});
//getAssets()
export default server;