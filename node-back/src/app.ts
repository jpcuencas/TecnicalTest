import express from 'express';
//import session from 'express-session';
import cookieSession from 'cookie-session';
import morgan from 'morgan';
import cors from 'cors';
//import cookieParser from 'cookie-parser';
import { graphqlHTTP } from "express-graphql";
import schema from './graphql/schema';

import config from './config/config';
import assetsRoutes from './routes/assets.routes';

console.log(config)

const app = express();
app.set('port', config.PORT);

// MIDDLEWARES //
//loggers http
app.use(morgan(config.enviroment));
// cruzar servers
app.use(cors());
// set session
app.use(cookieSession({
    name: 'session',
    keys: ['token', 'siteId']
  }))
// parse cookie
//app.use(cookieParser());
// parse json
app.use(express.json());
// enviar datos codificacion en uri
app.use(express.urlencoded({extended: false}));
/**
//graphql playground setup code
app.use("/graphql",
  graphqlHTTP({
      graphiql: true,
      schema: schema,
  })
);
/**/
// routes
app.use(assetsRoutes );
app.get('/read-session', (req:any, res:any) => {
    console.log(req.session);
  });
app.get('/read-cookie', (req:any, res:any) => {
    console.log(req.session);
    res.send({tocken:req.session.token, siteName:req.session.site_id});
  });
  
  app.get('/clear-cookie', (req:any, res:any) => {
    console.log(req.signedCookies);
    res.clearCookie(req.query.name).end();
  });

export default app;

