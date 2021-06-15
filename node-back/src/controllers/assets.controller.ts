import logger from "../config/logger";
import { RequestHandler } from 'express';
import assetsService from '../services/assets.service';
import oauthService from '../services/oauth.service';
import sitesService from '../services/sites.service';

export const getAssetsGraphqlPag: RequestHandler = async (req: any, res: any) => {
    try {
        logger.info('----queryParams----');
        logger.info(req.query);
        logger.info('---coockies---');
        logger.info(req?.cookies);
        logger.info('---session---');
        logger.info(req?.session);
        logger.info(oauthService.getTokens());
        logger.info(sitesService.getId());
        const token = req.session.token;
        const idSite = req.session.siteId;
        const result = await assetsService.getGraphqlAssetsPag(oauthService.getTokens().token, sitesService.getId(), req.query);
        logger.info('----- Results ---------');
        logger.info(result);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};

export const getAssetsGraphql: RequestHandler = async (req: any, res: any) => {
    logger.info(oauthService.getTokens());
    logger.info(sitesService.getId());
    try {
        const result = await assetsService.getGraphqlAssets(oauthService.getTokens().token, sitesService.getId());
        logger.info('----- results ---------');
        logger.info(result);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};

export const getAsset : RequestHandler = async (req: any, res: any) => {
    try {
    const result = await assetsService.getAsset(req.params.id);
    logger.info('----- results ---------');
    logger.info(result);
    res.json(result);
    } catch (error) {
        res.json(error);
    }
};

export const getAssets : RequestHandler = async (req: any, res: any) => {
    try {
        const result = await assetsService.getAssets();
        logger.info('----- results ---------');
        logger.info(result);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};