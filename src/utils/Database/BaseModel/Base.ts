import { Database } from "..";

type HasTableName = {
    TableName: string;
};

export class BaseModel {
    static query(this: HasTableName) {
        const Shard = Database.SRO_VT_SHARD();
        return Shard(this.TableName);
    }
}