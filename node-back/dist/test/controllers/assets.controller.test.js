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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const index_1 = __importDefault(require("../../index"));
let api;
//let mockGetAssets:  jest.Mock<typeof getAssets, any>;
beforeAll(() => {
    api = supertest_1.default(app_1.default);
    jest.mock('../../services/assets.service');
});
describe('GET /assets', () => {
    it('GET all assets', () => __awaiter(void 0, void 0, void 0, function* () {
        yield api.get('/assets')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    }));
    xit('GET all assets check content', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get('/assets');
        expect((response === null || response === void 0 ? void 0 : response.body) || []).toHaveLength(0);
    }));
    it('GET one assets', () => __awaiter(void 0, void 0, void 0, function* () {
        let id = 0;
        const response = yield api.get('/assets/' + id)
            .set('Accept', 'application/json')
            .expect(204);
    }));
});
afterAll(() => {
    index_1.default.close();
});
//# sourceMappingURL=assets.controller.test.js.map