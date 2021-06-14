import { RequestHandler } from 'express';
import oauthService from '../services/oauth.service';
import sitesService from '../services/sites.service';
import softwareService from '../services/software.service';

/** PAGINATION IS NOT WORKING ***
export const getSoftwareGraphqlPag: RequestHandler = async (req: any, res: any) => {
    try {
        console.log('------------------------------')
        console.log(req.query)
        console.log('------------------------------')
        console.log(req.session)
        console.log('------------------------------')
        console.log(req.cookies)
        console.log(oauthService.getTokens())
        console.log(sitesService.getId())
        const result = await softwareService.getGraphqlSoftwarePag(oauthService.getTokens().token, sitesService.getId(), req.params.key, req.query);
        console.log('----- results ---------')
        console.log(result)
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};
/**/

export const getSoftwareGraphql: RequestHandler = async (req: any, res: any) => {
    try {
        console.log('------------------------------');
        console.log(req.query)
        console.log('------------------------------');
        console.log(req.session)
        console.log('------------------------------');
        console.log(req.cookies);
        console.log(oauthService.getTokens());
        console.log(sitesService.getId());
        const result = await softwareService.getGraphqlSoftware(oauthService.getTokens().token, sitesService.getId(), req.params.key);
        console.log('----- results ---------');
        console.log(result);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};

export const getSoftwarePag: RequestHandler = async (req: any, res: any) => {
    try {
        console.log('------------------------------');
        console.log(req.query);
        console.log('------------------------------');
        const result = await softwareService.getSoftwarePag(req.params.key, req.query);
        console.log('----- results ---------');
        console.log(result);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};

export const getSoftware : RequestHandler = async (req: any, res: any) => {
    try {
        const result = await softwareService.getSoftware();
        console.log('----- results ---------');
        console.log(result);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};
