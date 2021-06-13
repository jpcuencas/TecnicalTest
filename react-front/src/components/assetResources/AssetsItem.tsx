import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

interface Props {
    element:any
}
const AssetItem = ({element}: Props) => {
    return (
        <tr>
            <td>{element?._id}</td>
            <td>{element?.assetBasicInfo?.name}</td>
            <td>{element?.assetBasicInfo?.type}</td>
            <td>{element?.assetCustom?.model}</td>
            <td>{element?.assetCustom?.manufacturer}</td>
            <td><Link to={`/detail/${element?._id}/${element?.key}`}> Details </Link></td>
        </tr>
    );
};

export default AssetItem;
