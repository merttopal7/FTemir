import { FTemir } from '@/FTemir';
import GatewayServer from '@/modules/GatewayServer/GatewayServer';
import AgentServer from '@/modules/AgentServer/AgentServer';

const main = async () => {
  await FTemir.Initalize();

  const gatewayServer = new GatewayServer();
  gatewayServer.start();

  new AgentServer().start();
};

main();