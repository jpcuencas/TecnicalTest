import React, { useEffect, useState } from 'react';
import * as AssetsService from '../../services/AssetsService';
import Asset from '../../models/Asset/Asset';
import Pagination from '../../models/Pagination';
import AssetItem from './AssetsItem';
import config from '../../config/config';
//import { callApolloService } from '../../services/ApolloService';

const AssetsList = () => {
    const initialAssets: Asset[] = [];
    const [assets, setAssets] = useState<Asset[]>(initialAssets);
    
  const [isLoading, setLoading] = useState(false);
    const pageSize: number = Number(config.pageSize);
    /**/
    const initialPagination: Pagination = {
        page:0,
        limit:pageSize,
        operation:'FIRST'
    };
    const [pagination, setPagination] = useState<Pagination>(initialPagination);
    
    const loadPagination = async(pagination: Pagination) => {
        try {
            setLoading(true);
            console.log(pagination)
            const body = { "query":
            `{ getAssetsGraphql ( pagination: { page: ${pagination.page} limit: ${pagination.limit} operation: \"${pagination.operation}\" } ) { total pagination { cursor } items { _id key assetBasicInfo { name type } assetCustom { model manufacturer } resourceGroup { assetKey } } } }` };
            console.log(body.query)
            //const data = await callApolloService(body);
            const data = await AssetsService.loadAssetsGrapPagination(pagination);
            console.log(data)
            
            let pag: Pagination ={...pagination}
            pag.page = pagination.page !==0? pagination.page: 1;
            pag.cursor = data?.assetResources?.pagination?.current;
            pag.total = data?.assetResources?.total;
            setPagination(pag);
            setAssets(data?.assetResources?.items);
        } catch(error) {
            console.error(error);
        }
        setLoading(false);
    };
    const setPageNext = (page: number) => {
        let pag: Pagination ={...pagination}
        pag.page = page;
        pag.operation='NEXT'
        setPagination(pag);
        loadPagination(pag);
    }
    const setPagePrev = (page: number) => {
        let pag: Pagination ={...pagination}
        pag.page = page;
        pag.operation='PREV'
        setPagination(pag);
        loadPagination(pag);
    }
    
    useEffect( () => {
        loadPagination(pagination);
    }, []);
   
    if(assets?.length && !isLoading ) {
       return (
       <>
       <nav aria-label="Page navigation">
         <ul className="pagination">
           <li className={`page-item ${pagination.page === 1 ? 'disabled' : ''}`}>
           { 
           (pagination.page ===1)
           ? <a className="page-link disabledCursor" onClick={ (event) => event.preventDefault() } href="#">Previous</a>
           : <a className='page-link' onClick={()=> setPagePrev(pagination.page-1) } href="#">Previous</a>
           }
         </li>
           <li className={`page-item ${pagination.page === pagination.totalPages ? 'disabled' : ''}`}><a className="page-link" onClick={()=> setPageNext(pagination.page+1) } href="#">Next</a></li>
         </ul>
       </nav>
       {
       (pagination.total)?
       <p>Total: {pagination.total}</p>:<p></p>
        }
       <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Model</th>
            <th scope="col">Manufacturer</th>
            <th scope="col">#</th>
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
        return <p>Has no elements</p>;
    } else {
        return <p>Loading...</p>;
    }
}

export default AssetsList;