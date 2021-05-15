const { client, registry } = require('sofa-rpc-node');
const { ZookeeperRegistry } = registry;
const { RpcClient } = client;
const logger = console;

// 1. 创建 zk 注册中心客户端
let registryInstance;
let rpcConsumer;
async function createConsumer() {
  try {
    if (!registryInstance) {
      registryInstance = new ZookeeperRegistry({
        logger,
        address: '127.0.0.1:2181',
      });
    }
  } catch (e) {
    console.log('Registry service failed, errMessage: ', e.message);
    process.exit(1);
  }
  console.log(registryInstance);
  if (!registryInstance.isReady) {
    throw Error('Registry Instace is not ready');
  } else {
    console.log('Registry connected');
  }
  if (rpcConsumer) return rpcConsumer;
  // 2. 创建 RPC Client 实例
  const clientInstance = new RpcClient({
    logger,
    registry: registryInstance,
  });
  // 3. 创建服务的 consumer
  const consumer = clientInstance.createConsumer({
    group: 'HSF',
    interfaceName: 'com.nodejs.test.TestService',
  });
  rpcConsumer = consumer;

  await consumer.ready();
  return consumer;
}

module.exports = function () {
  return async (ctx, next) => {
    console.log('client start');
    try {
      const consumer = await createConsumer();
      ctx.rpcClient = consumer;
    } catch (e) {
      console.log('rpc client start failed, err message: ', e.message);
    }
    return await next();
  };
};
