import { Router } from 'express';

import * as softwareCtrl from '../controllers/software.controller';
import * as assetsCtrl from '../controllers/assets.controller';
import * as oauthCtrl from '../controllers/oauth.controller';
const router = Router();

router.get('/autorize', oauthCtrl.getCode);
router.get('/integrations', oauthCtrl.getRedirecct);
router.get('/refresh', oauthCtrl.getRefresh);

router.get('/assets', assetsCtrl.getAssets);
router.get('/assets/:id', assetsCtrl.getAsset);
router.get('/assetsGrap', assetsCtrl.getAssetsGraphql);
router.get('/assetsGrapPag', assetsCtrl.getAssetsGraphqlPag);

router.get('/softwareGrap/:key', softwareCtrl.getSoftwareGraphql);
router.get('/softwareGrapPag/:key', softwareCtrl.getSoftwareGraphqlPag);

export default router;