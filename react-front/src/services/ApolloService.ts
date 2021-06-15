import axios from 'axios';
import config from '../config/config';
/**
export const callApolloService = async (body: any)=> {
    let res: any;
    console.log(body.query);
    try {
        res = await axios.post(config.nodeUrl + config.apolloServerURL, body, {
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