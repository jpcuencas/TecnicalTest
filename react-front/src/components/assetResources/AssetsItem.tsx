import React from 'react';
import '../../scss/styles.scss';
import '../../scss/assetResources/assetsItem.scss';
import console from '../../config/logger';
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
            <td><Link className="text-dark" to={`/detail/${element?._id}/${element?.key}`}> Details <i className="fas fa-info-circle"></i> </Link></td>
        </tr>
    );
};

export default AssetItem;
