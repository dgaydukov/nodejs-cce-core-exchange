import { assert } from 'chai';

describe('Main test', () => {
    it('should calcuate 2+2', ()=>{
        const a = 2;
        const b = 2;
        const result = a + b;
        assert.equal(result, 4, 'result should be 4');
    });
});