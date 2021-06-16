import axios from 'axios';
import console from '../config/logger';
import config from '../config/config';

export const loggin =  async ()=> {
    console.info('loggin');
    let res:any;
    try {
        res = await axios.get(config.nodeUrl + '/autorize', {
            headers: {'Access-Control-Allow-Origin': '*'}
        });
    } catch (error) {
        console.error(error);
    }
    console.info(res);
    return res.data;
};

export const redirect =  async (code:string)=> {
    console.info('loggin');
    let res:any;
    try {
        res = await axios.get(config.nodeUrl + '/integrations', {
            params: { code: code },
            headers: {'Access-Control-Allow-Origin': '*'}
        });
    } catch (error) {
        console.error(error);
    }
    console.info(res);
    return res.data;
};

