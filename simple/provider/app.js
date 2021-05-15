const Koa = require('koa');
const KoaBody = require('koa-body');
const start = require('./middleware/sofa');
const app = new Koa();
app.use(KoaBody());
app.use(async (ctx) => {
  ctx.body = 'Hello World';
});

app.listen(3006, function () {
  console.log('server start at http://localhost:3006');
});

start();
