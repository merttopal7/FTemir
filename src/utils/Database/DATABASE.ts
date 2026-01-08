import { FTemir } from "@/FTemir";

export class DATABASE {
    static SRO_VT_ACCOUNT = "";
    static SRO_VT_LOG = "";
    static SRO_VT_SHARD = "";
    static FTEMIR = "";
    
    static SetNames() {
        const settings = FTemir.GetSettings();
        DATABASE.SRO_VT_ACCOUNT = settings.AccountDb;
        DATABASE.SRO_VT_LOG = settings.LogDb;
        DATABASE.SRO_VT_SHARD = settings.SharDb;
        DATABASE.FTEMIR = settings.ProxyDb;
    }
    
}