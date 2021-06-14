import { RequestHandler } from 'express';
import authService from '../services/oauth.service';
import sitesService from '../services/sites.service';


export const getCode: RequestHandler = () => {

    return authService.getCode();    
};

export const getRedirecct = async (req: any, res: any) => {
    const code = req.query.code
    console.log('code');
    console.log(code);
    
    let resp = await authService.getAutentication(code);
    console.log(resp?.data);
    /**/
    if(!req.cookies.access_token) {
        res.cookie('access_token', resp?.data?.access_token, {maxAge: 900000, httpOnly: true});
        res.cookie('refresh_token', resp?.data?.refresh_token, {maxAge: 900000, httpOnly: true});
    }
    console.log(res.cookies);
    /**/
    req.session.refreshToken =resp?.data?.refresh_token;
    req.session.token = resp?.data?.access_token;
    /**/
    const siteId = await sitesService.getGraphqlSites(resp?.data?.access_token);
    req.session.siteId = siteId;
    console.log(req.session);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    /**/
    res.cookie('site_id', siteId, {maxAge: 900000, httpOnly: true});
    
    res.end();
    /**/
};

export const getRefresh = async (req: any, res: any) => {
    console.log('---coockies---');
    console.log(req?.cookies);
    console.log('---session---');
    console.log(req?.session);
    if(authService.getTokens().refreshToken) {
        const resp = await authService.getRefresh(authService.getTokens().refreshToken);
        console.log(resp.data);
        console.log(resp.data.access_token);
        /**/
        if(!req.cookies.access_token) {
            res.cookie('access_token', resp?.data?.access_token, {
                expires: new Date(new Date().getTime() + 86000 * 1000),
                httpOnly: true,
            });
        }
        /**/
        authService.setTokens({
            token: resp?.data?.access_token,
            refreshToken: authService.getTokens().refreshToken
        });
        req.session.token = resp?.data?.access_token;
        res.end();
    } else {
        res.send('Need Loggin!'); 
    }
    /**/
};