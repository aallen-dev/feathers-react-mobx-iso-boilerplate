'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('data service', function() {
  it('registered the data service', () => {
    assert.ok(app.service('data'));
  });
});
