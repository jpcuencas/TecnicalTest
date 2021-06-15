

import { gql } from 'apollo-server';


const typeDefs = gql`
  # Comments in GraphQL Strings (such as this one) start with the hash (#) symbol.

  type Book {
    title: String
    author: String
  }
  type AssetBasicInfo {
    name: String
    type: String
  }
  type AssetCustom {
    model: String
    manufacturer: String
  }
  type ResourceGroup {
    assetKey: String
  }
  type Asset {
    _id: String!
    key: String!
    assetBasicInfo: AssetBasicInfo
    assetCustom: AssetCustom
    resourceGroup: ResourceGroup
  }

type Pagination {
    page: Int!
    cursor: String
    limit: Int
    operation: String
    total: Int
    totalPages: Int
}
type AssetResources {
    total: Int
    pagination: Pagination
    items: [Asset]
}
  input PaginationInput {
    page: Int!
    cursor: String
    limit: Int
    operation: String
    total: Int
    totalPages: Int
}

type Software {
    name: String!
    publisher: String
    version: String
    operatingSystem: String
}

type Softwares {
    total: Int
    pagination: Pagination
    items: [Software]
}

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. 
  type Query {
    
    getGraphqlAssetsPag(pagination:PaginationInput):AssetResources,
    getAssetsGraphql:AssetResources,
    getAsset(id:String):Asset,
    getAssets:[Asset],

    getSoftwarePag(key:String, pagination:PaginationInput):[Software],
    getSoftwareGraphql(key:String):Softwares,
    getSoftware:Software
  }
`;

export default typeDefs;