import logger from "../config/logger";
import { RequestHandler } from 'express';
import oauthService from '../services/oauth.service';
import sitesService from '../services/sites.service';
import softwareService from '../services/software.service';

/** PAGINATION IS NOT WORKING ***
export const getSoftwareGraphqlPag: RequestHandler = async (req: any, res: any) => {
    try {
        logger.info('------------------------------')
        logger.info(req.query)
        logger.info('------------------------------')
        logger.info(req.session)
        logger.info('------------------------------')
        logger.info(req.cookies)
        logger.info(oauthService.getTokens())
        logger.info(sitesService.getId())
        const result = await softwareService.getGraphqlSoftwarePag(oauthService.getTokens().token, sitesService.getId(), req.params.key, req.query);
        logger.info('----- results ---------')
        logger.info(result)
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};
/**/

export const getSoftwareGraphql: RequestHandler = async (req: any, res: any) => {
    try {
        logger.info('-----queryParams-----');
        logger.info(req.query)
        logger.info('---coockies---');
        logger.info(req?.cookies);
        logger.info('---session---');
        logger.info(req?.session);
        logger.info(oauthService.getTokens());
        logger.info(sitesService.getId());
        const result = await softwareService.getGraphqlSoftware(oauthService.getTokens().token, sitesService.getId(), req.params.key);
        logger.info('----- results ---------');
        logger.info(result);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};

export const getSoftwarePag: RequestHandler = async (req: any, res: any) => {
    try {
        logger.info('------------------------------');
        logger.info(req.query);
        logger.info('------------------------------');
        const result = await softwareService.getSoftwarePag(req.params.key, req.query);
        logger.info('----- results -----');
        logger.info(result);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};

export const getSoftware : RequestHandler = async (req: any, res: any) => {
    try {
        const result = await softwareService.getSoftware();
        logger.info('----- results ---------');
        logger.info(result);
        res.json(result);
    } catch (error) {
        res.json(error);
    }
};
