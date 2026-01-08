export const SETTINGS_FILE = "./Settings.json";

export interface Settings {
  Address: string;
  Port: number;
  Username: string;
  Password: string;
  SharDb: string;
  LogDb: string;
  AccountDb: string;
  ProxyDb: string;
  MaximumPool: number;
  MinimumPool: number;
  ConnectionLifetime: number;
}

export const defaultSettings: Settings = {
  Address: "127.0.0.1",
  Port: 1433,
  Username: "sa",
  Password: "password",
  SharDb: "SRO_VT_SHARD",
  LogDb: "SRO_VT_LOG",
  AccountDb: "SRO_VT_ACCOUNT",
  ProxyDb: "FTemir",
  MaximumPool: 500,
  MinimumPool: 50,
  ConnectionLifetime: 0
};