import AssetBasicInfo from './AssetBasicInfo';
import AssetCustom from './AssetCustom';
import ResourceGroup from './ResourceGroup';

export default interface Asset {
    _id: string;
    key: string;
    assetBasicInfo?: AssetBasicInfo;
    assetCustom?: AssetCustom;
    resourceGroup?: ResourceGroup;
  }