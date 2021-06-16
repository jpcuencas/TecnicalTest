import React, { useEffect, useState } from 'react';
import console from '../../config/logger';
import '../../scss/stiles.scss';
import '../../scss/navbar/navbar.scss';
import { Link, useHistory } from 'react-router-dom';
import config from '../../config/config';


const Navbar = () => {
    
  const history = useHistory();
    const initialLoggin: Boolean =false;
    const [loggin, setLoggin] = useState<Boolean>(initialLoggin);
    const madeLoggin = () => {
        let ventana = window.open((config.getAutorizationURL + config.client_id), "Loggin", "width=600, height=400");
        /**/
        setTimeout(()=>{
            ventana?.close();
            console.info('loggin window is closed');
            //history.push("/list");
        }, 180 * 1000);
        /**/
        let logg = true;
        setLoggin(logg);
        if(history.location.pathname != '/') {
          //  history.push("/");
        }
    }
    
    useEffect( () => {
        /**
        let element = document.querySelector('#recdirect-link');
        element?.dispatchEvent(
            new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true,
                buttons: 1
            })
          );
     /***/
    }, []);
//{config.getAutorizationURL + config.client_id} target="_blank"
//{config.nodeUrl+'/autorize'}
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="btn btn-primary" onClick={()=> madeLoggin() } id="recdirect-link" href="#">Loggin</a>
        
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
                {(loggin) ?

                <Link className="nav-link" to="/list">Assets</Link>
                :
                    <p></p>
                }            
            </div>
          </div>

        </div>
      </nav>
    )
}


export default Navbar

