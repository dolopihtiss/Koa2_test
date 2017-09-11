const
    users = require('./users.json'),
   // users = JSON.parse(require('./users.json')),
    Router = require('koa-router'),
    koaBody = require('koa-body')();

const
    router = new Router({prefix: '/api/users'});

router.get('/:id', async ctx =>  {
    let user = users.find( user => user.id === +ctx.params.id);
    await ctx.render('user', { user });
});

router.get('/', async ctx => {
    await ctx.render('users', { users });
});

router.delete('/:id', ctx => {
    const indx = users.findIndex( user => user.id === +ctx.params.id);
    if (indx === -1) return;
    ctx.body = users[indx];
    users.splice(indx, 1);
});

router.post('/',
  //          koaBody,
            ctx => {
                const maxID = users.reduce( (max, users) => Math.max(max, users.id), 0) + 1;
                let user = {id: maxID, name: ctx.request.body.name, family: ctx.request.body.family};
                users.push(user);
                ctx.body = user;
});

router.put('/:id',
  //          koaBody,
            ctx => {
                const indx = users.findIndex( user => user.id === +ctx.params.id);
                if (indx === -1)
                {
                    //ctx.status = 404;
                    const error = new Error(`Нет пользователя с ID: ${ctx.params.id}`);
                    error.status = 404;
                    throw error;
                }
                const user = users[indx];
                user.name = ctx.request.body.name;
                user.family = ctx.request.body.family;
                ctx.body = user;
});

module.exports = router;
