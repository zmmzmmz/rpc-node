const Koa = require('koa');
const KoaBody = require('koa-body');
const app = new Koa();
const sofaMW = require('./middleware/sofa');
const router = require('./router');

app.use(KoaBody());
app.use(sofaMW());

router(app);

app.listen(3005, function () {
  console.log('Consumer server start at http://localhost:3005');
});
