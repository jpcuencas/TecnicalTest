import { RequestHandler } from 'express';
import authService from '../services/oauth.service';
import sitesService from '../services/sites.service';


export const getCode: RequestHandler = (req: any, res: any) => {

    return  authService.getCode();    
}

export const getRedirecct = async (req: any, res: any) => {

    const code = req.query.code
    console.log('code');
    console.log(code);
    
    let resp = await authService.getAutentication(code);
    console.log(resp?.data)
    /**
    if(!req.cookies.access_token) {
        res.cookie('access_token', resp?.data?.access_token, {maxAge: 900000, httpOnly: true});
        res.cookie('refresh_token', resp?.data?.refresh_token, {maxAge: 900000, httpOnly: true});
    }
    console.log(res.cookies);
    /**/
    req.session.refreshToken =resp?.data?.refresh_token;
    req.session.token = resp?.data?.access_token;
    /**/
    let siteId = await sitesService.getGraphqlSites(resp?.data?.access_token);
    req.session.siteId = siteId;
    console.log(req.session)
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    /**/
    //res.cookie('site_id', siteId, {maxAge: 900000, httpOnly: true});
    //console.log(req.cookies);
    res.end();
    /**/
}

export const getRefresh = async (req: any, res: any) => {
    console.log(req?.cookies)
    console.log(req?.session)
    if(req.session.refreshToken) {
        let resp = await authService.getRefresh(req.session.refreshToken);
        console.log(resp.data)
        console.log(resp.data.access_token)
        /**
        if(!req.cookies.access_token) {
            res.cookie('access_token', resp?.data?.access_token, {
                expires: new Date(new Date().getTime() + 86000 * 1000),
                httpOnly: true,
            }).send("cookie being reinitialised");
        }
        /**/
    req.session.token = resp?.data?.access_token;
    } else {
        res.send("Need Loggin!"); 
    }
    /** */
}