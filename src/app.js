'use strict';

const path = require('path') ,
      serveStatic = require('feathers').static ,
      favicon = require('serve-favicon') ,
      compress = require('compression') ,
      cors = require('cors') ,
      feathers = require('feathers') ,
      configuration = require('feathers-configuration') ,
      hooks = require('feathers-hooks') ,
      rest = require('feathers-rest') ,
      bodyParser = require('body-parser') ,
      socketio = require('feathers-socketio') ,
      middleware = require('./middleware') ,
      services = require('./services') ,

      app = feathers()

import { router } from './lib/router-server'

app .configure(configuration(path.join(__dirname , '..')))
    .use(compress())
    .options('*', cors())
    .use(cors())
    .use(favicon( path.join(__dirname , '../static-assets/pics/favicon.ico') ))
    .use(`/static-assets/`, serveStatic(path.join(__dirname, `../static-assets`) ))
    .use('/', router.route({}))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .configure(hooks())
    .configure(rest())
    .configure(socketio())
    .configure(services)
    .configure(middleware)

module.exports = app
