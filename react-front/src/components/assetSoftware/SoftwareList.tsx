import React, { useEffect, useState } from 'react';
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
            console.log(pagination)
            console.log(props)
            if(pagination.operation ==='FIRST') {
               body = {"query":
                    `{ getSoftwareGraphql(key:\"${props?.value}\") { softwares{ total items { name publisher version operatingSystem } } } }`};
                console.log(body.query); 
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
         <ul className="pagination">
           <li className={`page-item ${pagination.page === '1' ? 'disabled' : ''}`}>
           { 
           (pagination.page ==='1')
           ? <a className="page-link disabledCursor" onClick={ (event) => event.preventDefault() } href="#">Previous</a>
           : <a className='page-link' onClick={()=> setPagePrev(parseInt(pagination.page)-1) } href="#">Previous</a>
           }
         </li>
           <li className={`page-item ${parseInt(pagination.page) === pagination.totalPages ? 'disabled' : ''}`}><a className="page-link" onClick={()=> setPageNext(parseInt(pagination.page)+1) } href="#">Next</a></li>
         </ul>
         <p>Page: {pagination.page}</p>
       </nav>
       {
       (pagination.total)?
       <p>Total: {pagination.total}</p>:<p></p>
        }
       
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
     <p>Has no elements</p>
     :
     <p>Loading...</p>
    }
    </>
    );
}

export default SoftwareList;