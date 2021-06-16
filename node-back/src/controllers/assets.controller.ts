import console from "../config/logger";
import { RequestHandler } from 'express';
import assetsService from '../services/assets.service';
import oauthService from '../services/oauth.service';
import sitesService from '../services/sites.service';

export const getAssetsGraphqlPag: RequestHandler = async (req: any, res: any) => {
    try {
        console.info('----queryParams----');
        console.info(req.query);
        console.info('---coockies---');
        console.info(req?.cookies);
        console.info('---session---');
        console.info(req?.session);
        console.info(oauthService.getTokens());
        console.info(sitesService.getId());
        const token = req.session.token;
        const idSite = req.session.siteId;
        const result = await assetsService.getGraphqlAssetsPag(oauthService.getTokens().token, sitesService.getId(), req.query);
        console.info('----- Results ---------');
        console.info(result);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};

export const getAssetsGraphql: RequestHandler = async (req: any, res: any) => {
    console.info(oauthService.getTokens());
    console.info(sitesService.getId());
    try {
        const result = await assetsService.getGraphqlAssets(oauthService.getTokens().token, sitesService.getId());
        console.info('----- results ---------');
        console.info(result);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};

export const getAsset : RequestHandler = async (req: any, res: any) => {
    try {
    const result = await assetsService.getAsset(req.params.id);
    console.info('----- results ---------');
    console.info(result);
    res.json(result);
    } catch (error) {
        res.json(error);
    }
};

export const getAssets : RequestHandler = async (req: any, res: any) => {
    try {
        const result = await assetsService.getAssets();
        console.info('----- results ---------');
        console.info(result);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};