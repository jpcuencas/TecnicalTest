

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
    page: String
    limit: Int!
    current: String
    next: String
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
    page: String
    limit: Int!
    current: String
    next: String
    operation: String
    total: Int
    totalPages: Int
}
type AssetsList {
    assetResources: AssetResources
}
type Software {
    name: String!
    publisher: String
    version: String
    operatingSystem: String
}
type Softwares {
    total: Int
    items: [Software]
}
type SoftwareList {
    softwares: Softwares
}

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. 
  type Query {
    books: [Book]
    
    getGraphqlAssetsPag(pagination:PaginationInput):AssetsList,
    getAssetsGraphql:AssetResources,
    getAsset(id:String):Asset,
    getAssets:[Asset],

    getSoftwarePag(key:String, pagination:PaginationInput):Softwares,
    getSoftwareGraphql(key:String):SoftwareList,
    getSoftware:Software
  }
`;

export default typeDefs;