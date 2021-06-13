import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as SoftwareService from '../../services/SoftwareService';
import Pagination from '../../models/Pagination';
import SoftwareItem from './SoftwareItem';
import Software from '../../models/Software';
import config from '../../config/config';
interface Props {
    value:any
}
const SoftwareList = (props:any)=> { //({key}:Props) => {
    const initialElements: Software[] = [];
    const [isLoading, setLoading] = useState(false);
    const [softwares, setSoftwares] = useState<Software[]>(initialElements);
    const pageSize: number = Number(config.pageSize);
    /**/
    const initialPagination: Pagination = {
        page:1,
        limit:pageSize,
        operation:'FIRST'
    };
    const [pagination, setPagination] = useState<Pagination>(initialPagination);
    
    const loadPagination = async(pagination: any) => {
        try {
            setLoading(true);
            console.log(pagination)
            console.log(props)
            if(pagination.operation ==='FIRST') {
                await SoftwareService.loadSoftwareGrap(props?.value);
            }
            const data = await SoftwareService.loadSoftwareGrapPagination(props?.value, pagination);
            console.log(data)
            
            setSoftwares(data?.items);
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
/**/
    useEffect( () => {        
        //if(!props.match.params.id){
        //    props.history.push("/list");
       // }
        loadPagination(pagination);
    }, []);
   
       return (
       <>
       {
       (softwares?.length && !isLoading )?
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
       
       <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Version</th>
            <th scope="col">Publisher</th>
            <th scope="col">Operating System</th>
            <th scope="col">Install Date</th>
            <th scope="col">Last Changed</th>
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