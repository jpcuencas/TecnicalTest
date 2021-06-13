import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as AssetsService from '../../services/AssetsService';
import * as SoftwareService from '../../services/SoftwareService';
import Asset from '../../models/Asset/Asset';
import Software from '../../models/Software';
import SoftwareItem from '../assetSoftware/SoftwareItem';


const AssetDetails = (props:any) => {
    /**/
    const initialAsset: Asset = {
        _id:'',
        key:''
    };
    /**
    let initialAsset = 
    {
      _id: '60a78bda0aa271a8743784d0',
      key: 'NDEtQXNzZXQtOTc0YzVmMjctNzlmNi00NGQyLWJiNDktYjdjYjgxOWYxOTA0',
      assetBasicInfo: { name: 'XLAN-41', type: 'Windows' },
      assetCustom: { manufacturer: 'Dell Inc.', model: 'Latitude E6420' }
    }
    /**/
    const [asset, setAsset] = useState<Asset>(initialAsset);
    const initialElements: Software[] = [];
    const [softwares, setSoftwares] = useState<Software[]>(initialElements);
    /**/
    
    const loadTable = async(key: string) => {
        try {
            const data = await SoftwareService.loadSoftwareGrap(key);
            console.log(data)
            
            setSoftwares(data?.data?.site?.softwares?.items);
        } catch(error) {
            console.error(error);
        }
    };
    
    const loadAssetDetails = async(id: string) => {
        try {
            const element = await AssetsService.loadAsset(id);
            console.log(element)
            setAsset(element);
           // await loadTable(element.key)
        } catch(error) {
            console.error(error);
        }
    };

    useEffect( () => {
        console.log(props)
        loadAssetDetails(props.match.params.id);
    }, []);
   
    if(asset) {
       return (
       <>
       <div className="card-body">
       <table className="table">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{asset?._id}</td>
              </tr>
            </tbody>
           </table>
       </div>
       <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                Basic Info
              </button>
            </h5>
          </div>
          <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div className="card-body">
           <table className="table">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{asset?.assetBasicInfo?.name}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{asset?.assetBasicInfo?.type}</td>
              </tr>
            </tbody>
           </table>
            </div>
          </div>
        </div>
     
        <div className="card">
        <div className="card-header" id="headingTwo">
          <h5 className="mb-0">
            <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Custom
            </button>
          </h5>
        </div>
        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
          <div className="card-body">
           <table className="table">
            <tbody>
              <tr>
                <th>Model</th>
                <td>{asset?.assetCustom?.model}</td>
              </tr>
              <tr>
                <th>Manufacturer</th>
                <td>{asset?.assetCustom?.manufacturer}</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      </div>
      
        <div className="card">
        <div className="card-header" id="headingThree">
          <h5 className="mb-0">
            <button className="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Software In Asset
            </button>
          </h5>
        </div>
        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
          <div className="card-body">
          <>
       {
       (softwares?.length)?
       <>
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
     <p>Has no elements</p>
    }
    </>
          </div>
        </div>
      </div>
      </div>

      <hr/>
          <Link className="nav-link" to="/list">Back</Link>
      </>
      );
    } else {
        return <p>Has no element</p>;
    }
    //    <SoftwareList key={asset?.key}/>
}

export default AssetDetails;