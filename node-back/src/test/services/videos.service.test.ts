import service from '../../services/assets.service';


describe.skip('getAssets function', () => {
    it('getAssets get all asset', async() => {
        let restult = await service.getAssets();
        expect((restult||[])).toHaveLength(0);
    });

    it('getAsset get asset by id', async() => {
        let id: string='0';
        let restult = await service.getAsset(id);
        expect((restult||{})).toHaveLength(0);
    });

});