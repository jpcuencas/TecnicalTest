import axios from 'axios';
import console from '../config/logger';
import config from '../config/config';
/**/
export const callApolloService = async (body: any)=> {
    let res: any;
    console.info(body.query);
    let url = config.nodeUrl + config.apolloServerURL;
    console.info(url)
    try {
        res = await axios.post(url, body, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.info(res);
    } catch (error) {
        console.error(error);
    }
    return res?.data;
};
/**/