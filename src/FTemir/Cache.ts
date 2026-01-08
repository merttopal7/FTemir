import { Cache } from "@/utils/Cache";
import { Database } from "@/utils/Database";

export class FTemirCache extends Cache {

    constructor() {
        super();
    }

    CacheTables: string[] = ["_RefObjCommon", "_RefObjItem", "_RefObjChar", "_RefSkill", "_RefRegion", "_RefLevel"];

    async GetTable(TABLE_NAME: string) {
        
    }

    async FetchSingleTableForCache(TABLE_NAME: string) {
        if (!this.CacheTables.includes(TABLE_NAME)) return;
        const Shard = Database.SRO_VT_SHARD();
        this.set(TABLE_NAME, await Shard.raw(`SELECT * FROM ${TABLE_NAME}`));
        console.log(`[Cache] ${TABLE_NAME} cached!`)
    }

    async FetchTablesForCache() {
        console.log("[Cache] started to fetch for Cache!")
        const promises = [];
        for (let i = 0; i < this.CacheTables.length; i++) {
            promises.push(this.FetchSingleTableForCache(this.CacheTables[i]))
        }
        await Promise.all(promises);

        console.log("[Cache] Cache is ready!")

    }

}