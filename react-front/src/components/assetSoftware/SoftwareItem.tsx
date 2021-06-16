import React from 'react';
import console from '../../config/logger';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

interface Props {
    element:any
}
const SoftwareItem = ({element}: Props) => {
    const formatDate = (date:Date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
    return (
        <tr>
            <td>{element?.name}</td>
            <td>{element?.version}</td>
            <td>{element?.publisher}</td>
            <td>{element?.operatingSystem}</td>
        </tr>
    );
    /** 
    
            <td>{formatDate(element?.installDate)}</td>
            <td>{formatDate(element?.lastChanged)}</td>
    /**/
};

export default SoftwareItem;
