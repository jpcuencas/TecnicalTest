import { RequestHandler } from 'express';
import assetsService from '../services/assets.service';
import oauthService from '../services/oauth.service';
import sitesService from '../services/sites.service';

export const getAssetsGraphqlPag: RequestHandler = async (req: any, res: any) => {
    try {
        console.log('------------------------------');
        console.log(req.query);
        console.log('------------------------------');
        console.log(req.session);
        console.log('------------------------------');
        console.log(req.cookies);
        console.log(oauthService.getTokens());
        console.log(sitesService.getId());
        const token = req.session.token;
        const idSite = req.session.siteId;
        const result = await assetsService.getGraphqlAssetsPag(oauthService.getTokens().token, sitesService.getId(), req.query);
        console.log('----- Results ---------');
        console.log(result);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};

export const getAssetsGraphql: RequestHandler = async (req: any, res: any) => {
    console.log(oauthService.getTokens());
    console.log(sitesService.getId());
    try {
        const result = await assetsService.getGraphqlAssets(oauthService.getTokens().token, sitesService.getId());
        console.log('----- results ---------');
        console.log(result);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};

export const getAsset : RequestHandler = async (req: any, res: any) => {
    try {
    const result = await assetsService.getAsset(req.params.id);
    console.log('----- results ---------');
    console.log(result);
    res.json(result);
    } catch (error) {
        res.json(error);
    }
};

export const getAssets : RequestHandler = async (req: any, res: any) => {
    try {
        const result = await assetsService.getAssets();
        console.log('----- results ---------');
        console.log(result);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};