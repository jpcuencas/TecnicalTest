import React, { useEffect, useState } from 'react';
import console from '../../config/logger';
import * as AssetsService from '../../services/AssetsService';
import Asset from '../../models/Asset/Asset';
import Pagination from '../../models/Pagination';
import AssetItem from './AssetsItem';
import config from '../../config/config';
import { callApolloService } from '../../services/ApolloService';
import { createUseStyles } from 'react-jss';

const styles = createUseStyles({
    tableText: {
        fontFamily: 'Arial'
    },
});

const AssetsList = () => {
    const classes = styles();
    const initialAssets: Asset[] = [];
    const [assets, setAssets] = useState<Asset[]>(initialAssets);
    
  const [isLoading, setLoading] = useState(false);
    const pageSize: number = Number(config.pageSize);
    /**/
    const initialPagination: Pagination = {
        page:'0',
        limit:pageSize,
        operation:'FIRST'
    };
    const [pagination, setPagination] = useState<Pagination>(initialPagination);
    
    const loadPagination = async(pagination: Pagination) => {
        try {
            let body:any;
            setLoading(true);
            console.info(pagination)
            if(!pagination.cursor){
                body = { "query":
                `{ getGraphqlAssetsPag ( pagination: { page: \"${pagination.page}\" limit: ${pagination.limit} operation: \"${pagination.operation}\" } ) { assetResources{ total pagination { current } items { _id key assetBasicInfo { name type } assetCustom { model manufacturer } resourceGroup { assetKey } } } } }` };
            }else {
                body = { "query":
                `{ getGraphqlAssetsPag ( pagination: { page: \"${pagination.page}\" current: "${pagination.cursor}" limit: ${pagination.limit} operation: \"${pagination.operation}\" } ) { assetResources{ total pagination { current } items { _id key assetBasicInfo { name type } assetCustom { model manufacturer } resourceGroup { assetKey } } } } }` };

            }
            console.info(body.query)
            const data = await callApolloService(body);
            //const data = await AssetsService.loadAssetsGrapPagination(pagination);
            console.info(data)
            
            let pag: Pagination ={...pagination}
            pag.page = parseInt(pagination.page) !==0 ? pagination.page : '1';
            pag.cursor = data?.data?.getGraphqlAssetsPag?.assetResources?.pagination?.current;
            pag.total = data?.data?.getGraphqlAssetsPag?.assetResources?.total;
            //pag.cursor = data?.assetResources?.pagination?.current;
            //pag.total = data?.assetResources?.total;
            setPagination(pag);
            setAssets(data?.data?.getGraphqlAssetsPag?.assetResources?.items);
            //setAssets(data?.assetResources?.items);
        } catch(error) {
            console.error(error);
        }
        setLoading(false);
    };
    const setPageNext = (page: number) => {
        let pag: Pagination ={...pagination}
        pag.page = page.toString();
        pag.operation = 'NEXT';
        setPagination(pag);
        loadPagination(pag);
    }
    const setPagePrev = (page: number) => {
        let pag: Pagination ={...pagination}
        pag.page = page.toString();
        pag.operation = 'PREV';
        setPagination(pag);
        loadPagination(pag);
    }

    const changeItemsSize = (event:any) =>{
        console.info(event.target.value);
        let pag: Pagination ={...pagination}
        pag.limit=event.target.value;
        setPagination(pag);
    } 
    
    useEffect( () => {
        loadPagination(pagination);
    }, []);
   
    if(assets?.length && !isLoading ) {
       return (
       <>
       <h2>All Assets</h2>
       <nav aria-label="Page navigation">
         <ul className="pagination float-left">
           <li className={`page-item ${pagination.page === '1' ? 'disabled' : ''}`}>
           { 
           (pagination.page ==='1')
           ? <a className="page-link disabledCursor" onClick={ (event) => event.preventDefault() } href="#"><i className="fas fa-chevron-left"></i> Previous</a>
           : <a className='page-link text-dark' onClick={()=> setPagePrev(parseInt(pagination.page)-1) } href="#"><i className="fas fa-chevron-left"></i> Previous</a>
           }
           </li>
           <li className={`page-item ${parseInt(pagination.page) === pagination.totalPages ? 'disabled' : ''}`}><a className="page-link text-dark" onClick={()=> setPageNext(parseInt(pagination.page)+1) } href="#">Next <i className="fas fa-chevron-right"></i></a></li>
         </ul>
         <div className="float-left card pb-2 pl-2 pr-2 ml-6">Page: {pagination.page}</div>
        {
       (pagination.total)?
       <span className="float-right ml-5">Total: {pagination.total}</span>:<span></span>
        }
       <span className="float-right">
         <span>Display: </span>
         <select id="num-items" className="form-select" value={pagination.limit} onChange={(e)=>{ changeItemsSize(e) }}>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
       </span>
       </nav>
       <table className="table">
        <thead>
          <tr>
            <th scope="col" className={classes.tableText}>ID</th>
            <th scope="col"className={classes.tableText}>Name</th>
            <th scope="col"className={classes.tableText}>Type</th>
            <th scope="col"className={classes.tableText}>Model</th>
            <th scope="col"className={classes.tableText}>Manufacturer</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
        {
            assets?.map((value, index) => {
                return <AssetItem key={index} element={value} />
              })
        }
        </tbody>
      </table>
      </>
      );
    } else if(!isLoading ) {
        return <p> <h5><i className="fas fa-info"></i> Has no elements</h5> </p>;
    } else {
        return <div className="spinner-border text-secondary" role="status">
                <span className="sr-only">Loading...</span>
              </div>;
    }
}

export default AssetsList;