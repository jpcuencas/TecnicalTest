import logger from "../config/logger";
import assetsService from "../services/assets.service";
import oauthService from "../services/oauth.service";
import sitesService from "../services/sites.service";
import softwareService from "../services/software.service";

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
      getGraphqlAssetsPag: async(_:any, args:any)=> {
        try {
            logger.info(args);
            const result = await assetsService.getGraphqlAssetsPag(oauthService.getTokens().token, sitesService.getId(), args?.pagination);
            logger.info('----- getGraphqlAssetsPag Results ---------');
            logger.info(result);
            return result;
        } catch (error) {
            logger.error(error);
        } 
      },
      getAssetsGraphql: async()=> {
        try {
            const result = await assetsService.getGraphqlAssets(oauthService.getTokens().token, sitesService.getId());
            logger.info('----- getAssetsGraphql Results ---------');
            logger.info(result);
            return result;
        } catch (error) {
            logger.error(error);
        } 
      },
      getAsset: async(_:any, args:any)=> {
        try {
            logger.info(args);
            const result = await assetsService.getAsset(args.id);
            logger.info('----- Results ---------');
            logger.info(result);
            return result;
        } catch (error) {
            logger.error(error);
        } 
      },
      getAssets: async()=> {
        try {
            const result = await assetsService.getAssets();
            logger.info('----- Results ---------');
            logger.info(result);
            return result;
        } catch (error) {
            logger.error(error);
        } 
      },
      getSoftwareGraphql: async(_:any, args:any)=> {
        try {
            logger.info(args);
            const result = await softwareService.getGraphqlSoftware(oauthService.getTokens().token, sitesService.getId(), args.key);
            logger.info('----- getSoftwareGraphql Results ---------');
            logger.info(result);
            return result;
        } catch (error) {
            logger.error(error);
        } 
      },
      getSoftwarePag: async(_:any, args:any)=> {
        try {
            const result = await softwareService.getSoftwarePag(args.key, args?.pagination);
            logger.info('----- getSoftwarePag Results ---------');
            logger.info(result);
            return result;
        } catch (error) {
            logger.error(error);
        }
      },
      getSoftware: async()=> {
        try {
            const result = await softwareService.getSoftware();
            logger.info('----- getSoftware Results ---------');
            logger.info(result);
            return result;
        } catch (error) {
            logger.error(error);
        } 
      }
    },
  };
  export default resolvers;