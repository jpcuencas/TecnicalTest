import console from "../config/logger";
import { RequestHandler } from 'express';
import oauthService from '../services/oauth.service';
import sitesService from '../services/sites.service';
import softwareService from '../services/software.service';

/** PAGINATION IS NOT WORKING ***
export const getSoftwareGraphqlPag: RequestHandler = async (req: any, res: any) => {
    try {
        console.info('------------------------------')
        console.info(req.query)
        console.info('------------------------------')
        console.info(req.session)
        console.info('------------------------------')
        console.info(req.cookies)
        console.info(oauthService.getTokens())
        console.info(sitesService.getId())
        const result = await softwareService.getGraphqlSoftwarePag(oauthService.getTokens().token, sitesService.getId(), req.params.key, req.query);
        console.info('----- results ---------')
        console.info(result)
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};
/**/

export const getSoftwareGraphql: RequestHandler = async (req: any, res: any) => {
    try {
        console.info('-----queryParams-----');
        console.info(req.query)
        console.info('---coockies---');
        console.info(req?.cookies);
        console.info('---session---');
        console.info(req?.session);
        console.info(oauthService.getTokens());
        console.info(sitesService.getId());
        const result = await softwareService.getGraphqlSoftware(oauthService.getTokens().token, sitesService.getId(), req.params.key);
        console.info('----- results ---------');
        console.info(result);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};

export const getSoftwarePag: RequestHandler = async (req: any, res: any) => {
    try {
        console.info('------------------------------');
        console.info(req.query);
        console.info('------------------------------');
        const result = await softwareService.getSoftwarePag(req.params.key, req.query);
        console.info('----- results -----');
        console.info(result);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};

export const getSoftware : RequestHandler = async (req: any, res: any) => {
    try {
        const result = await softwareService.getSoftware();
        console.info('----- results ---------');
        console.info(result);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};
