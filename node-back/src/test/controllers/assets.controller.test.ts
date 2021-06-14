import supertest from 'supertest';
import app from '../../app';
import server from '../../index';

let api: supertest.SuperTest<supertest.Test>;
//let mockGetAssets:  jest.Mock<typeof getAssets, any>;
beforeAll(() => {
    api = supertest(app);
    jest.mock('../../services/assets.service');   
        
  });

describe('GET /assets', () => {
    it('GET all assets', async() => {
     
        await api.get('/assets')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });

    xit('GET all assets check content', async() => {
     
        const response = await api.get('/assets');
        expect(response?.body||[]).toHaveLength(0);
    });


    it('GET one assets', async() => {
     
        let id: number=0;
         const response = await api.get('/assets/' + id)
            .set('Accept', 'application/json')
            .expect(200);
    });

  });

  afterAll(() => {
      server.close();
  });