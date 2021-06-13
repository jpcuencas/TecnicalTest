import React, { useEffect, useState } from 'react';
import * as AssetsService from '../../services/AssetsService';
import Asset from '../../models/Asset/Asset';
import Pagination from '../../models/Pagination';
import AssetItem from './AssetsItem';
import { loadAssetsGrapPagination } from '../../services/AssetsService';
import config from '../../config/config';

const AssetsList = () => {
    const initialAssets: Asset[] = [];
    const [assets, setAssets] = useState<Asset[]>(initialAssets);
    const pageSize: number = Number(config.pageSize);
    /**/
    const initialPagination: Pagination = {
        page:0,
        limit:pageSize,
        operation:'FIRST'
    };
    const [pagination, setPagination] = useState<Pagination>(initialPagination);
    
    const loadPagination = async(pagination: any) => {
        try {
            console.log('works');
            console.log(pagination)
            const data = await AssetsService.loadAssetsGrapPagination(pagination);
            console.log(data)
            
            let pag: Pagination ={...pagination}
            pag.page = pagination.page !==0? pagination.page: 1;
            pag.cursor = data?.data?.site?.assetResources?.pagination?.current;
            pag.total = data?.data?.site?.assetResources?.total;
            setPagination(pag);
            setAssets(data?.data?.site?.assetResources?.items);
        } catch(error) {
            console.error(error);
        }
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
/**/
    useEffect( () => {
        loadPagination(pagination);
    }, []);
   
    if(assets?.length) {
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
    } else {
        return <p>Has no elements</p>;
    }
}
//  <AssetsItem element={assets[0]} />
export default AssetsList;