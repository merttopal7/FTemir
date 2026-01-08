import knex from "knex";
import type { Knex } from "knex";
import { config, configWithMigration } from "@/utils/Database/config";
import { DATABASE } from "./DATABASE";
import { FTemir } from "@/FTemir";
import { DatabaseAdapters } from "@/core/types";

export class Database {
    static Initalized: boolean = false;
    static Adapters: DatabaseAdapters = {}

    static async Initalize() {
        if (Database.Initalized) return;
        DATABASE.SetNames();
        await Database.GenerateAdapters();
        Database.Initalized = true;
    }

    static GenerateBaseConfig(DATABASE_NAME: string) {
        const settings = FTemir.GetSettings();
        const baseConnection: Knex.MsSqlConnectionConfig = {
            user: settings.Username,
            password: settings.Password,
            server: settings.Address,
            port: settings.Port,
            database: DATABASE_NAME,
            options: {
                encrypt: false,
                trustServerCertificate: true
            }
        };
        return baseConnection;
    }

    static GeneratePoolConfig() {
        const settings = FTemir.GetSettings();
        const poolSettings = {
            min: settings.MinimumPool,
            max: settings.MaximumPool
        }
        return poolSettings;
    }

    static async GenerateAdapters() {
        const keys = Object.keys(DATABASE);
        for (let i = 0; i < keys.length; i++) {
            const key: string = keys[i];
            const cfg = key == DATABASE.FTEMIR ? configWithMigration : config;
            cfg.development.connection = Database.GenerateBaseConfig(DATABASE[key]);
            cfg.development.pool = Database.GeneratePoolConfig();
            Database.Adapters[key] = knex(cfg.development);
        }
    }
    static SRO_VT_ACCOUNT(): Knex {
        return Database.Adapters[DATABASE.SRO_VT_ACCOUNT];
    }
    static SRO_VT_LOG(): Knex {
        return Database.Adapters[DATABASE.SRO_VT_LOG];
    }
    static SRO_VT_SHARD(): Knex {
        return Database.Adapters[DATABASE.SRO_VT_SHARD];
    }
    static FTEMIR(): Knex {
        return Database.Adapters[DATABASE.FTEMIR];
    }
    static CUSTOM(DATABASE_NAME: string): Knex {
        return Database.Adapters[DATABASE_NAME];
    }
}