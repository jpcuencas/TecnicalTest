import axios from 'axios';

import config from '../config/config';

export const loggin =  async ()=> {
    console.log('loggin');
    let res:any;
    try {
        res = await axios.get(config.nodeUrl + '/autorize', {
            headers: {'Access-Control-Allow-Origin': '*'}
        });
    } catch (error) {
        console.error(error);
    }
    console.log(res);
    return res.data;
};

export const redirect =  async (code:string)=> {
    console.log('loggin');
    let res:any;
    try {
        res = await axios.get(config.nodeUrl + '/integrations', {
            params: { code: code },
            headers: {'Access-Control-Allow-Origin': '*'}
        });
    } catch (error) {
        console.error(error);
    }
    console.log(res);
    return res.data;
};

