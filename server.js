const Koa = require('koa2'),
      session = require('koa-simple-session'),
      Router = require('koa-router'),
      logger = require('koa-logger'),
      static = require('koa-static'),
      body   = require('koa-body'),
      users = require('./users'),
      fs = require('fs'),
      views = require('koa-views'),
      favicon = require('koa-favicon');

const server = new Koa();

server.keys = ['dolopihtis'];

server
   .use (async (ctx, next) => {
        try {
            await next();
        } catch (err) {
          console.log('Глобальный перехватчик ошибок: ' + err.message);
          throw err;
        }
    })

    .use (logger())
    .use(views('./views', { extension: 'ejs' }))
    .use (favicon('.images/favicon.ico'))
    .use(session({key: 'SID'}))
    .use(static('./public'))
    .use(body({ strict: true }))
    .use (users.routes())
    .use (users.allowedMethods());

server.listen(process.argv[2] );
console.log('\n'+'server started: ' + new Date());
