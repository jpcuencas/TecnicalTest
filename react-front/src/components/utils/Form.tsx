import React, { useEffect } from 'react';
import config from '../../config/config';
import { redirect } from '../../services/LogginService';


const Form = (props:any) => {
    
    useEffect( () => {
        console.log(props.location.search)
        redirect(props.location.search.code)
    }, []);
//{config.getAutorizationURL + config.client_id}
//{config.nodeUrl+'/autorize'}
    return (
      <h1> Conectando... </h1>
    )
}

export default Form

