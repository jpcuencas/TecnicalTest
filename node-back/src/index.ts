import { app, serverApollo } from './app';
import config from './config/config';
import { addApolloToExpress } from './config/utils';

let server:any;
//const url = config.apolloServerURL;
const startApolloServer = async () => {

    await serverApollo.start();
    let server = addApolloToExpress(serverApollo, app);
    //serverApollo.applyMiddleware({ app });
  
    await server.server.listen(app.get('port'), ()=> {
        console.log(`Node Server on port : ${app.get('port')}`);
    });
    console.log(`🚀 Server ready at http://localhost:${app.get('port')}${serverApollo.graphqlPath}`);
    return { serverApollo, app };
  }

  startApolloServer();

export default server?.server;