const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');

// handlers here
// app.use(handlers);
const port = process.argv[2];
app.listen(3000);
console.info('listen '+3000);

app.use(static('./public'));

app.use (async (ctx, next) => {
    try {
        await next() // next is now a function
    } catch (err) {
        ctx.body = { message: err.message };
        ctx.status = err.status || 500;
    }
});

app.use (async (ctx, next) => {
    ctx.body = 'Ответ '; // ctx instead of this
    await next();
});

app.use (async (ctx, next) => {
    //const user = await User.getById(this.session.userid); // await instead of yield
    if (ctx.originalUrl === '/api') {
        ctx.body += 'Я дома!!';
    }else{
        throw new URIError('URL не обнаружен');
    } // ctx instead of this
});