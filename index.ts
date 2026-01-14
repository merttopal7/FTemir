import { FTemir } from '@/FTemir';
import GatewayServer from '@/modules/GatewayServer/GatewayServer';
import AgentServer from '@/modules/AgentServer/AgentServer';
import { AuthServer } from '@/utils/auth-server/AuthServer';
import AuthGatewayServer from '@/modules/AuthGatewayServer/AuthGatewayServer';

const main = async () => {
  await FTemir.Initalize();

  const gatewayServer = new GatewayServer();
  gatewayServer.start();
  

  // If sro_client has an authentication code package
  // const authGatewayServer = new AuthGatewayServer();
  // authGatewayServer.start()


  new AgentServer().start();
  const authServer = new AuthServer();
  authServer.start(3000);
};

main();