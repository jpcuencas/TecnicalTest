import React, { useEffect, useState } from 'react';
import console from '../../config/logger';
import * as SoftwareService from '../../services/SoftwareService';
import Pagination from '../../models/Pagination';
import SoftwareItem from './SoftwareItem';
import Software from '../../models/Software';
import config from '../../config/config';
import { callApolloService } from '../../services/ApolloService';
interface Props {
    value:any
}
const SoftwareList = (props:any)=> { 
    const initialElements: Software[] = [];
    const [isLoading, setLoading] = useState(false);
    const [softwares, setSoftwares] = useState<Software[]>(initialElements);
    const pageSize: number = Number(config.pageSize);
    /**/
    const initialPagination: Pagination = {
        page:'1',
        limit:pageSize,
        operation:'FIRST'
    };
    const [pagination, setPagination] = useState<Pagination>(initialPagination);
    
    const loadPagination = async(pagination: Pagination) => {
        try {
            let body:any;
            setLoading(true);
            console.info(pagination)
            console.info(props)
            if(pagination.operation ==='FIRST') {
               body = {"query":
                    `{ getSoftwareGraphql(key:\"${props?.value}\") { softwares{ total items { name publisher version operatingSystem } } } }`};
                console.info(body.query); 
                await callApolloService(body);
                //await SoftwareService.loadSoftwareGrap(props?.value);
            }
            
            body = {"query":
                `{ getSoftwarePag(key:\"${props?.value}\" pagination: { page: \"${pagination.page}\" limit: ${pagination.limit} operation: \"${pagination.operation}\" } ) { total items { name publisher version operatingSystem } } }`};
            const data = await callApolloService(body);
            setSoftwares(data?.data?.getSoftwarePag?.items);
            //const data = await SoftwareService.loadSoftwareGrapPagination(props?.value, pagination);
            //setSoftwares(data?.items);
            
            let pag: Pagination = {...pagination}
            if(pag?.total) {
                pag.totalPages = Math.ceil(pag?.total / pag.limit);
            }
            pag.total = data?.data?.getSoftwarePag?.total;
            //pag.total = data?.total;
            setPagination(pag);
        } catch(error) {
            console.error(error);
        }
        setLoading(false);
    }
    const setPageNext = (page: number) => {
        let pag: Pagination ={...pagination}
        pag.page = page.toString();
        pag.operation='NEXT'
        setPagination(pag);
        loadPagination(pag);
    }
    const setPagePrev = (page: number) => {
        let pag: Pagination ={...pagination}
        pag.page = page.toString();
        pag.operation='PREV'
        setPagination(pag);
        loadPagination(pag);
    }
/**/
    useEffect( () => {        
        //if(!props.match.params.id){
        //    props.history.push("/list");
        //}
        loadPagination(pagination);
    }, []);
   
       return (
       <>
       {
       (softwares?.length && !isLoading )?
       <>
       <nav aria-label="Page navigation">
         <span className="float-left card p-2 ml-1">Page: {pagination.page}</span>
         <ul className="float-left pagination">
           <li className={`page-item ${pagination.page === '1' ? 'disabled' : ''}`}>
           { 
           (pagination.page ==='1')
           ? <a className="page-link text-dark disabledCursor" onClick={ (event) => event.preventDefault() } href="#"><i className="fas fa-chevron-left"></i> Previous</a>
           : <a className='page-link text-dark' onClick={()=> setPagePrev(parseInt(pagination.page)-1) } href="#"><i className="fas fa-chevron-left"></i> Previous</a>
           }
         </li>
           <li className={`page-item ${parseInt(pagination.page) === pagination.totalPages ? 'disabled' : ''}`}><a className="page-link text-dark" onClick={()=> setPageNext(parseInt(pagination.page)+1) } href="#">Next <i className="fas fa-chevron-right"></i></a></li>
         </ul>
         
        {
       (pagination.total)?
       <span className="float-right card p-2 mr-5">Total: {pagination.total}</span>:<span></span>
        }
       </nav>
       
       <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Version</th>
            <th scope="col">Publisher</th>
            <th scope="col">Operating System</th>
          </tr>
        </thead>
        <tbody>
        {
            softwares?.map((value, index) => {
                return <SoftwareItem key={index} element={value} />
              })
        }
        </tbody>
      </table>
      </>
    :
    (!isLoading )?
     <p><i className="fas fa-info"></i> <h5>Has no elements</h5></p>
     :
      <div className="spinner-border text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    }
    </>
    );
}

export default SoftwareList;