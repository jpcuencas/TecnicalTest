"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//import { graphqlHTTP } from "express-graphql";
const config_1 = __importDefault(require("./config/config"));
const assets_routes_1 = __importDefault(require("./routes/assets.routes"));
console.log(config_1.default);
const app = express_1.default();
app.set('port', config_1.default.PORT);
// MIDDLEWARES //
//loggers http
app.use(morgan_1.default('dev'));
// cruzar servers
app.use(cors_1.default());
// set session
/**
app.use(cookieSession({
    name: 'session',
    keys: ['token', 'siteId']
  }))
  /**/
// parse cookie
//app.use(cookieParser());
// parse json
app.use(express_1.default.json());
// enviar datos codificacion en uri
app.use(express_1.default.urlencoded({ extended: false }));
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
app.use(assets_routes_1.default);
app.get('/read-session', (req, res) => {
    console.log(req.session);
});
app.get('/read-cookie', (req, res) => {
    console.log(req.session);
    res.send({ tocken: req.session.token, siteName: req.session.site_id });
});
app.get('/clear-cookie', (req, res) => {
    console.log(req.signedCookies);
    res.clearCookie(req.query.name).end();
});
exports.default = app;
//# sourceMappingURL=app.js.map