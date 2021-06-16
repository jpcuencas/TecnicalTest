import axios from 'axios';
import console from '../config/logger';
import config from '../config/config';
import Pagination from '../models/Pagination';

export const loadAssets = async () => {
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
    try {
        res = await axios.get(`${config.nodeUrl}/assetsGrapPag`, {
        params: pagination
      });
    } catch (error) {
        console.error(error);
    }
    return  res?.data;
};

export const loadAssetsPagination = async (pagination: Pagination) => {
    let res: any;
    try {
        res = await axios.get(`${config.nodeUrl}/assets`,{
        params: pagination
      });
    } catch (error) {
        console.error(error);
    }
    return  res?.data;
};

export const loadAsset = async (id: string)=> {
    let res: any;
    try {
        res = await axios.get(`${config.nodeUrl}/assets/${id}`);
        console.info(res);
    } catch (error) {
        console.error(error);
    }
    return res?.data;
};