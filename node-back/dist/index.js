"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const utils_1 = require("./config/utils");
let server;
//const url = config.apolloServerURL;
const startApolloServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield app_1.serverApollo.start();
    let server = utils_1.addApolloToExpress(app_1.serverApollo, app_1.app);
    //serverApollo.applyMiddleware({ app });
    yield server.server.listen(app_1.app.get('port'), () => {
        console.log(`Node Server on port : ${app_1.app.get('port')}`);
    });
    console.log(`🚀 Server ready at http://localhost:${app_1.app.get('port')}${app_1.serverApollo.graphqlPath}`);
    return { serverApollo: app_1.serverApollo, app: app_1.app };
});
startApolloServer();
exports.default = server === null || server === void 0 ? void 0 : server.server;
//# sourceMappingURL=index.js.map