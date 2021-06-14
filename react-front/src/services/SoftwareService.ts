import axios from 'axios';

import config from '../config/config';
import Pagination from '../models/Pagination';

export const loadSoftwareGrapPagination = async (key: string, pagination: Pagination) => {
    let res: any;
    try {
        res = await axios.get(`${config.nodeUrl}/softwareGrapPag/${key}`,{
        params: pagination
      });
    } catch(error) {
        console.error(error);
    }
    return  res?.data;
};

export const loadSoftwareGrap = async (key: string) => {
    let res: any;
    try {
        res = await axios.get(`${config.nodeUrl}/softwareGrap/${key}`);
    } catch(error) {
        console.error(error);
    }
    return  res?.data;
};