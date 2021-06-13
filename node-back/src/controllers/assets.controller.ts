import { RequestHandler } from 'express';
import assetsService from '../services/assets.service';
import oauthService from '../services/oauth.service';
import sitesService from '../services/sites.service';

export const getAssetsGraphqlPag: RequestHandler = async (req: any, res: any) => {
    try {
        console.log('------------------------------')
        console.log(req.query)
        console.log('------------------------------')
        console.log(req.session)
        console.log('------------------------------')
        console.log(req.cookies)
        console.log(oauthService.getTokens())
        console.log(sitesService.getId())
        let token = req.session.token;
        let idSite = req.session.siteId;
        let result = await assetsService.getGraphqlAssetsPag(oauthService.getTokens().token, sitesService.getId(), req.query);
        console.log('----- Results ---------')
        console.log(result)
        res.json(result);
    } catch (error) {
        res.json(error);
    }
}

export const getAssetsGraphql: RequestHandler = async (req: any, res: any) => {
    console.log(oauthService.getTokens())
    console.log(sitesService.getId())
    let result = await assetsService.getGraphqlAssets(oauthService.getTokens().token, sitesService.getId());
    console.log('----- results ---------')
    console.log(result)
}

export const getAsset : RequestHandler = async (req: any, res: any) => {
    let result = await assetsService.getAsset(req.params.id);
    console.log('----- results ---------')
    console.log(result)
}

export const getAssets : RequestHandler = async (req: any, res: any) => {
    let result = await assetsService.getAssets();
    console.log('----- results ---------')
    console.log(result)
}