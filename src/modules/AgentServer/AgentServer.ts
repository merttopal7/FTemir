import Proxy from '@/core/Proxy';
import configuration from '@/modules/AgentServer/config';
import { ExploitHandler } from "@/modules/AgentServer/handlers/ExploitHandler";
import { DataHandler } from "@/modules/AgentServer/handlers/DataHandler";
import { EntityParsingHandler } from "@/modules/AgentServer/handlers/EntityParsingHandler";

class AgentServer extends Proxy {
    constructor() {
        configuration.debug = true;
        configuration.module = "AgentServer";
        super(configuration);

        new EntityParsingHandler(this);
        new ExploitHandler(this);
        new DataHandler(this);
    }
}

export default AgentServer;