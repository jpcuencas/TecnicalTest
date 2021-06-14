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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRefresh = exports.getRedirecct = exports.getCode = void 0;
const oauth_service_1 = __importDefault(require("../services/oauth.service"));
const sites_service_1 = __importDefault(require("../services/sites.service"));
const getCode = (req, res) => {
    return oauth_service_1.default.getCode();
};
exports.getCode = getCode;
const getRedirecct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const code = req.query.code;
    console.log('code');
    console.log(code);
    let resp = yield oauth_service_1.default.getAutentication(code);
    console.log(resp === null || resp === void 0 ? void 0 : resp.data);
    /**
    if(!req.cookies.access_token) {
        res.cookie('access_token', resp?.data?.access_token, {maxAge: 900000, httpOnly: true});
        res.cookie('refresh_token', resp?.data?.refresh_token, {maxAge: 900000, httpOnly: true});
    }
    console.log(res.cookies);
    /**/
    req.session.refreshToken = (_a = resp === null || resp === void 0 ? void 0 : resp.data) === null || _a === void 0 ? void 0 : _a.refresh_token;
    req.session.token = (_b = resp === null || resp === void 0 ? void 0 : resp.data) === null || _b === void 0 ? void 0 : _b.access_token;
    /**/
    let siteId = yield sites_service_1.default.getGraphqlSites((_c = resp === null || resp === void 0 ? void 0 : resp.data) === null || _c === void 0 ? void 0 : _c.access_token);
    req.session.siteId = siteId;
    console.log(req.session);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    /**/
    //res.cookie('site_id', siteId, {maxAge: 900000, httpOnly: true});
    //console.log(req.cookies);
    res.end();
    /**/
});
exports.getRedirecct = getRedirecct;
const getRefresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    console.log(req === null || req === void 0 ? void 0 : req.cookies);
    console.log(req === null || req === void 0 ? void 0 : req.session);
    if (req.session.refreshToken) {
        let resp = yield oauth_service_1.default.getRefresh(req.session.refreshToken);
        console.log(resp.data);
        console.log(resp.data.access_token);
        /**
        if(!req.cookies.access_token) {
            res.cookie('access_token', resp?.data?.access_token, {
                expires: new Date(new Date().getTime() + 86000 * 1000),
                httpOnly: true,
            }).send("cookie being reinitialised");
        }
        /**/
        req.session.token = (_d = resp === null || resp === void 0 ? void 0 : resp.data) === null || _d === void 0 ? void 0 : _d.access_token;
        res.end();
    }
    else {
        res.send("Need Loggin!");
    }
    /** */
});
exports.getRefresh = getRefresh;
//# sourceMappingURL=oauth.controller.js.map