const HomeRouter = require('./home');
const APIRouter = require('./api');

module.exports = (app) => {
  app.use(HomeRouter.routes(), HomeRouter.allowedMethods());
  app.use(APIRouter.routes(), APIRouter.allowedMethods());
};
