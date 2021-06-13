import axios, { AxiosResponse } from 'axios';

import config from '../config/config';
import Pagination from '../models/Pagination';

export const loadSoftwareGrapPagination = async (key: string, pagination: Pagination) => {
    let res: any;
    let cookies: any;
    try {
        res = await axios.get(`${config.nodeUrl}/softwareGrap/${key}`,{
        params: pagination
      });
    } catch(error) {
        console.error(error);
    }
    return  res?.data;
};