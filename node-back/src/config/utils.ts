
export const addApolloToExpress = (serverApollo:any, server:any) => {

    serverApollo.applyMiddleware({
        app:server,
        path: '/graphql',
        cors: false
    })
    return {
        server,
        serverApollo
    }
};
