import GatewayServer from '@/modules/GatewayServer/GatewayServer';
import AgentServer from '@/modules/AgentServer/AgentServer';

const main = async () => {
  const gatewayServer = new GatewayServer();
  gatewayServer.start();
  new AgentServer().start();
};
main();

