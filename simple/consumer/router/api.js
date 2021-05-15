const Router = require('@koa/router');
const router = new Router({
  prefix: '/api',
});

router.get('/test', async (ctx, next) => {
  const res = await ctx.rpcClient.invoke('plus', [1, 2], {
    responseTimeout: 3000,
  });
  ctx.body = {
    success: true,
    content: res,
  };
});

module.exports = router;
