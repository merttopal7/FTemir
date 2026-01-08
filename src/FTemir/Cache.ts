import { Cache } from "@/utils/Cache";
import { Database } from "@/utils/Database";
import { _RefObjChar } from "@/utils/Database/VSRO188/SRO_VT_SHARD/_RefObjChar";
import { _RefObjCommon } from "@/utils/Database/VSRO188/SRO_VT_SHARD/_RefObjCommon";

export class FTemirCache extends Cache {

    constructor() {
        super();
    }

    CacheTables: string[] = ["_RefObjCommon", "_RefObjChar", "_RefObjItem", "_RefSkill", "_RefRegion", "_RefLevel"];

    async FetchSingleTableForCache<T>(TABLE_NAME: string, cl: T) {
        if (!this.CacheTables.includes(TABLE_NAME)) return;
        const Shard = Database.SRO_VT_SHARD();
        const items = await Shard.raw(`SELECT * FROM ${TABLE_NAME}`)
        this.set(TABLE_NAME, items.map((item: T) => Object.assign(new cl(), item)));
        console.log(`[Cache] ${TABLE_NAME} cached!`)
    }

    async FetchTablesForCache() {
        console.log("[Cache] started to fetch for Cache!")

        this.FetchSingleTableForCache<_RefObjCommon>("_RefObjCommon", _RefObjCommon)
        this.FetchSingleTableForCache<_RefObjChar>("_RefObjChar", _RefObjChar)

    }

}