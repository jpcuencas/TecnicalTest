import axios, { AxiosResponse } from 'axios';

import config from '../config/config';
import Pagination from '../models/Pagination';
import PaginationTest from '../models/PaginationTest';

export const loadAssets = async ()=> {
    let res: any;
    try {
        res = await axios.get(`${config.nodeUrl}/assets`);
    } catch(error) {
        console.error(error);
    }
    return res?.data;
};

export const loadAssetsGrapPagination = async (pagination: Pagination) => {
    let res: any;
    let cookies: any;
    try {
        cookies = await axios.get(`${config.nodeUrl}/read-cookie`);
        res = await axios.get(`${config.nodeUrl}/assetsGrapPag`,{
        params: pagination
      });
    } catch(error) {
        console.error(error);
    }
    return  res?.data;
};

export const loadAssetsPagination = async (pagination: PaginationTest) => {
    let res: any;
    try {
        res = await axios.get(`${config.nodeUrl}/assets`,{
        params: pagination
      });
    } catch(error) {
        console.error(error);
    }
    return  res?.data;
};

export const loadAsset = async (id: string)=> {
    let res: any;
    try {
        /**
        res = await axios.get(`${config.nodeUrl}/assets/${id}`);
        console.log(res);
        /**/
    const response = await fetch(`${config.nodeUrl}/assets/${id}`);
    res = await response.json();
    } catch(error) {
        console.error(error);
    }
    return res?.data;
};