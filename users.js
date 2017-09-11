const
    users = require('./users.json'),
    Router = require('koa-router'),
   UserModel = require('./usersModel').UserModel;

const
    router = new Router({prefix: '/api/users'});

router.get('/:id', async ctx =>  {
    let user = await UserModel.findById(ctx.params.id);
    if (!user) {
        ctx.status = 404;
        let id = ctx.params.id;
        await ctx.render('notFound', {id});
        return;
    }
    await ctx.render('user', { user });
});

router.get('/', async ctx => {
   let users = await UserModel.find();
 //   let users = [{name: 'user', family: 'userov'}];
    await ctx.render('users', { users });
});

router.delete('/:id', async ctx => {
    const user = await UserModel.findById(ctx.params.id);
    if (!user) {
        ctx.status = 404;
        let id = ctx.params.id;
        await ctx.render('notFound', {id});
        return;
    }
    await user.remove();
    await ctx.render('userDelete', { user });
});

router.post('/', async ctx => {
    let user = new UserModel({name: name, family: family} = ctx.request.body);
    await user.save();
    await ctx.render('userCreate', { user });
});

router.put('/:id', async ctx => {
    const user = await UserModel.findById(ctx.params.id);
    if (!user) {
        ctx.status = 404;
        let id = ctx.params.id;
        await ctx.render('notFound', {id});
        return;
    }
    user.name = ctx.request.body.name;
    user.family = ctx.request.body.family;
    await user.save();
    await ctx.render('userUpdate', { user });
});

module.exports = router;
