const Koa = require('koa2'), 
   //   cookie = require('koa-cookie'),
     // session = require('koa-session'),
      //session = require('koa2-cookie-session'),
      session = require('koa-simple-session'),
      Router = require('koa-router'),
      logger = require('koa-logger'),
      static = require('koa-static'),
      body   = require('koa-body'),
      users = require('./users'),
      fs = require('fs'),
      views = require('koa-views'),
      favicon = require('koa-favicon');
     // users = require('./users.json'),
     // mongoose = require('mongoose');

const server = new Koa();
/*
      router = new Router({prefix: '/api'});

router.get('/:id', ctx => {
    ctx.body = `GET api/${ctx.params.id}`;
});
*/



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
  /*  .use (async (ctx, next) => {
        mongoose.connect('mongodb://localhost:27017/koa2_test');
        await mongoose.connection.dropDatabase();
        const userSchema = { name: String, family: String };
        const User = mongoose.model('User', new mongoose.Schema(userSchema));
        users.forEach(async user => {
                       let userDB = new User({name: name, family: family} = user);
                       await userDB.save();
                    });

        const cursor = User.find().cursor();
        cursor.next().then(user => {
                             console.log(user.name);
                            });
        for (let user = await cursor.next(); user != null; user = await cursor.next()) {
            console.log(user.name);
        };

        await next();
        })
     */
    .use (logger())
    .use(views('./views', { extension: 'ejs' }))
    .use (favicon('.images/favicon.ico'))
   // .use (views('./views', { extension: 'pug' }))
   // .use(cookie)
    //.use(session(server))
    .use(session({key: 'SID'}))
    .use(static('./public'))
/*
    .use(async (ctx, next) => {
        // ignore favicon
        //if (ctx.path === '/favicon.ico') return;
        if (ctx.path === '/log') {
            ctx.body = fs.createReadStream('./log.txt');
        }
        ctx.cookies.set('Last request', `${ctx.method} ${ctx.req.headers.host}${ctx.path} (${JSON.stringify(ctx.body)})`);
        let n = ctx.session.views || 0;
        ctx.session.views = ++n;
        console.log(n + ' views');
        if (ctx.session.isNew) {
            console.log('Открыта новая сессия:' + ctx.cookies.get('SID'));
        } else {
            console.log('Cтарая сессия:' + ctx.cookies.get('SID'));
            //
            // throw new Error('тест');
        }
        await next();
        })
        */
    .use(body({ strict: true }))
    /*
    .use (async (ctx, next) => {
        try {
            await next() // next is now a function
        } catch (err) {
            ctx.body = { error_message: err.message };
            ctx.status = err.status || 500;
        }
          //  ctx.body = {msg: 'error'};
        })
       */
    .use (users.routes())
    .use (users.allowedMethods());

server.listen(process.argv[2] );
console.log('\n'+'server started: ' + new Date());
