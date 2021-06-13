"use strict";
// como se resuelve lo que se puede consultar
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const assets_service_1 = __importDefault(require("../services/assets.service"));
exports.resolvers = {
    Query: {
        hello: () => {
            return 'Hello :)';
        },
        test1: () => {
            return 2;
        },
        greet: (root, args, context) => {
            console.log(context);
            return `Hello ${args.name}`;
        },
        asserts(pagination) {
            return assets_service_1.default.getAssetsPag(pagination);
        },
    },
};
// _, (no estoy usando la primera propiedad)
//# sourceMappingURL=resolvers.js.map