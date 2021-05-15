const Router = require('@koa/router');
const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = '123';
});

module.exports = router;
