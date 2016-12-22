'use strict';

const service = require('feathers-mongoose');
const data = require('./data-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: data,
    paginate: {
      default: 25,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/data', service(options));

  // Get our initialize service to that we can bind hooks
  const dataService = app.service('/api/data');

  // Set up our before hooks
  dataService.before(hooks.before);

  // Set up our after hooks
  dataService.after(hooks.after);
};
