import React, { useEffect, useState } from 'react';
import console from '../../config/logger';
import { Link } from 'react-router-dom';
import * as AssetsService from '../../services/AssetsService';
import Asset from '../../models/Asset/Asset';
import SoftwareList from '../assetSoftware/SoftwareList';
import { callApolloService } from '../../services/ApolloService';



const AssetDetails = (props:any) => {
    /**/
    const initialAsset: Asset = {
        _id:`${props.match.params.id}`,
        key:`${props.match.params.key}`,
    };
    const [asset, setAsset] = useState<Asset>(initialAsset);
    /**/
    
    const loadAssetDetails = async(id: string) => {
        try {
            const body ={"query":
            `{ getAsset(id:\"${id}\") { _id key assetBasicInfo { name type } assetCustom { model manufacturer } resourceGroup { assetKey } } }`};
            console.info(body.query);
            const element = await callApolloService(body);
            setAsset(element?.data?.getAsset);
            //const element = await AssetsService.loadAsset(id);
            //setAsset(element);
        } catch(error) {
            console.error(error);
        }
    };
    const toggleButton = (e:any) =>{
        let child:any =e.target.children[0];
        let element:any;
        if(child) {
            element = document.querySelector('#' + child?.id);
        } else {
            element = document.querySelector('#' + e.target?.id);
        }
        
        if(element?.classList.contains('fa-chevron-right')) {
            element?.classList.remove('fa-chevron-right');
            element?.classList.add('fa-chevron-down');
        } else {
            element?.classList.add('fa-chevron-right');
            element?.classList.remove('fa-chevron-down');
        }
    }
    
    useEffect( () => {
        console.info(props)
        loadAssetDetails(props.match.params.id);
    }, []);
   
    if(asset) {
       return (
       <>
       <div className="card">
           <div className="card-header">
               <h4>Identifier</h4>
           </div>
       </div>
       <div className="card-body">
       <table className="table">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{asset?._id}</td>
              </tr>
              <tr>
                <th>Key</th>
                <td>{asset?.key}</td>
              </tr>
            </tbody>
           </table>
       </div>
       <div className="accordion" id="accordionExample">
        <div className="card">
          <div className="card-header" id="headingOne">
            <h5 className="mb-0">
              <button className="btn btn-link text-dark" type="button" onClick={(e)=>{toggleButton(e)}} data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
               <h5><i className="fas fa-chevron-right" id="basic-icon"></i> Basic Info</h5>
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
            <button className="btn btn-link collapsed text-dark" type="button" onClick={(e)=>{toggleButton(e)}} data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
             <h5><i className="fas fa-chevron-right" id="custom-icon"></i> Custom</h5>
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
            <button className="btn btn-link collapsed text-dark" type="button" onClick={(e)=>{toggleButton(e)}} data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
             <h5><i className="fas fa-chevron-right" id="software-icon"></i> Software In Asset</h5>
            </button>
          </h5>
        </div>
        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
          <div className="card-body">
            <SoftwareList value={asset?.key}/>              
          </div>
      </div>
      </div>
      </div>
      <hr/>
          <Link className="nav-link text-dark" to="/list"><i className="fas fa-arrow-left"></i> Back</Link>
      </>
      );
    } else {
        return <p> <h5><i className="fas fa-info"></i> Has no element </h5></p>;
    }
    //    <SoftwareList value={asset?.key}/>
}

export default AssetDetails;