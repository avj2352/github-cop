const simpleAdd = require('../src/index');
const assert = require('assert');

describe('Simple Math Test', () => {
 it('should return 2', () => {
        assert(simpleAdd(1,1), 2);
    });
 it('should return 9', () => {
        assert(3 * 3, 9);
    });
});