// como se resuelve lo que se puede consultar

import  Assert  from '../models/Asset/Asset';
import PaginationTest from '../models/PaginationTest';
import assetsService from '../services/assets.service';

export const resolvers = {

    Query: {
        hello: () => {
            return 'Hello :)';
        },
        test1: () => {
            return 2;
        },
        greet: (root:any, args:any, context:any) => {
            console.log(context);
            return `Hello ${args.name}`;
        },
         asserts(pagination: PaginationTest) {
            return assetsService.getAssetsPag(pagination);
        },
    },
};
// _, (no estoy usando la primera propiedad)