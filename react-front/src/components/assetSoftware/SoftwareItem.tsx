import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

interface Props {
    element:any
}
const SoftwareItem = ({element}: Props) => {
    return (
        <tr>
            <td>{element?.name}</td>
            <td>{element?.version}</td>
            <td>{element?.publisher}</td>
            <td>{element?.operatingSystem}</td>
            <td>{element?.installDate}</td>
            <td>{element?.lastChanged}</td>
        </tr>
    );
};

export default SoftwareItem;
