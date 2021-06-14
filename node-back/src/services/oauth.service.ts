import axios from 'axios';
import config from '../config/config';

let oauthBody = 
{
    "client_id": config.client_id,
    "client_secret": config.client_secret,
    "grant_type": "authorization_code",
    "code": "",
    "redirect_uri": config.redirect_uri
};

let refreshBody = 
{
    "client_id": config.client_id,
    "client_secret": config.client_secret,
    "grant_type": "refresh_token",
    "refresh_token": ""
};
let token:string;
let refreshtoken:string;

export default {
    getTokens: () => {
        return {
            token: token,
            refreshToken: refreshtoken
        }
    },
    setTokens: (tokens:any) => {
        return {
            token: tokens.token,
            refreshToken: tokens.refreshtoken
        }
    },
    getCode:  async ()=> {
        let res:any;
        try {
            let url: string = config.getAutorizationURL + config.client_id;
            res = await axios.get(url, { 
                headers: {
                'Access-Control-Allow-Origin': '*'
            } });
        } catch (error) {
            console.error(error);
            console.error(error?.response);
            return error?.response;
        }
        console.log(res);
        return res.data;
    },
    getAutentication:  async (code:string)=> {
        let res:any;
        try {
            oauthBody.code = code;
            console.log(oauthBody)
            let url: string = config.getAutenticationURL;
            res = await axios.post(url, oauthBody, {
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
              }
            });
        } catch (error) {
            console.error(error);
            console.error(error?.response);
            return error?.response;
        }
        
        token = res?.data?.access_token
        refreshtoken = res?.data?.refresh_token
        return res;
    },
    getRefresh:  async (refreshToken:string)=> {
        let res:any;
        try {
            refreshBody.refresh_token = refreshToken;
            let url: string = config.getAutenticationURL;
            res = await axios.post(url, refreshBody, {
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
              }
            });
        } catch (error) {
            console.error(error);
            console.error(error?.response);
            return error?.response;
        }
        console.log(res);
        token = res?.data?.access_token
        return res;
    }

};




