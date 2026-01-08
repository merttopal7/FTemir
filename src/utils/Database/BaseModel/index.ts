import { Database } from "..";

// BaseModel/index.ts
export abstract class BaseModel<T> {
    abstract tableName: string;

    constructor(TABLE_NAME: string) {
        this.tableName = TABLE_NAME;
    }

    // Knex query builder'ı döndür
    static query<T extends BaseModel<T>>(this: new () => T) {
        const instance = new this();
        const Shard = Database.SRO_VT_SHARD();
        const knexQuery = Shard((instance as any).tableName);

        // Knex query'yi wrap et
        return {
            // Orijinal knex objesi
            knex: knexQuery,

            // Where
            where: (column: string, value: any) => {
                knexQuery.where(column, value);
                return this.query.call(this);
            },

            // Where In
            whereIn: (column: string, values: any[]) => {
                knexQuery.whereIn(column, values);
                return this.query.call(this);
            },

            // Order By
            orderBy: (column: string, direction: 'asc' | 'desc' = 'asc') => {
                knexQuery.orderBy(column, direction);
                return this.query.call(this);
            },

            // Limit
            limit: (count: number) => {
                knexQuery.limit(count);
                return this.query.call(this);
            },

            // Offset
            offset: (count: number) => {
                knexQuery.offset(count);
                return this.query.call(this);
            },

            // Select
            select: (...columns: string[]) => {
                knexQuery.select(...columns);
                return this.query.call(this);
            },

            // Join
            join: (table: string, first: string, operator: string, second: string) => {
                knexQuery.join(table, first, operator, second);
                return this.query.call(this);
            },

            // Left Join
            leftJoin: (table: string, first: string, operator: string, second: string) => {
                knexQuery.leftJoin(table, first, operator, second);
                return this.query.call(this);
            },

            // Group By
            groupBy: (...columns: string[]) => {
                knexQuery.groupBy(...columns);
                return this.query.call(this);
            },

            // Having
            having: (column: string, operator: string, value: any) => {
                knexQuery.having(column, operator, value);
                return this.query.call(this);
            },

            // First - tek kayıt döndür ve class'a assign et
            first: async (): Promise<T> => {
                const data = await knexQuery.first();
                if (!data) return null as any;
                return Object.assign(new (this as any)(), data);
            },

            // Get/All - tüm kayıtları döndür ve class array'e assign et
            get: async (): Promise<T[]> => {
                const data = await knexQuery.select('*');
                return data.map(item => Object.assign(new (this as any)(), item));
            },

            // Alias for get
            all: async (): Promise<T[]> => {
                const data = await knexQuery.select('*');
                return data.map(item => Object.assign(new (this as any)(), item));
            },

            // Count
            count: async (column: string = '*'): Promise<number> => {
                const result = await knexQuery.count(column);
                return parseInt(result[0][`count(${column})`] || '0');
            },

            // Exists
            exists: async (): Promise<boolean> => {
                const count = await this.query.call(this).count();
                return count > 0;
            },

            // Pluck - sadece belirli bir kolonu array olarak döndür
            pluck: async (column: string): Promise<any[]> => {
                const data = await knexQuery.select(column);
                return data.map(item => item[column]);
            },

            // Raw query execution
            raw: async (sql: string, bindings?: any[]): Promise<any> => {
                const Shard = Database.SRO_VT_SHARD();
                return await Shard((instance as any).tableName).raw(sql, bindings);
            },

            // Pagination
            paginate: async (page: number = 1, perPage: number = 15): Promise<{
                data: T[];
                total: number;
                perPage: number;
                currentPage: number;
                lastPage: number;
            }> => {
                const offset = (page - 1) * perPage;
                const countQuery = knexQuery.clone();
                const total = await countQuery.count('* as count').first();
                const totalCount = parseInt(total?.count || '0');

                const data = await knexQuery.limit(perPage).offset(offset).select('*');
                const items = data.map(item => Object.assign(new (this as any)(), item));

                return {
                    data: items,
                    total: totalCount,
                    perPage,
                    currentPage: page,
                    lastPage: Math.ceil(totalCount / perPage)
                };
            },

            // Update
            update: async (data: Partial<T>): Promise<number> => {
                return await knexQuery.update(data);
            },

            // Delete
            delete: async (): Promise<number> => {
                return await knexQuery.delete();
            },

            // Insert
            insert: async (data: Partial<T> | Partial<T>[]): Promise<number[]> => {
                return await knexQuery.insert(data);
            }
        };
    }

    // Shorthand metodlar (eski metodları koruyalım)
    static async findOne<T extends BaseModel<T>>(
        this: new () => T,
        column: string,
        value: any
    ): Promise<T> {
        return this.query().where(column, value).first();
    }

    static async findById<T extends BaseModel<T>>(
        this: new () => T,
        id: number
    ): Promise<T> {
        return this.query().where("ID", id).first();
    }

    static async all<T extends BaseModel<T>>(this: new () => T): Promise<T[]> {
        return this.query().all();
    }

    static async find<T extends BaseModel<T>>(
        this: new () => T,
        conditions: Record<string, any>
    ): Promise<T> {
        let query = this.query();
        for (const [key, value] of Object.entries(conditions)) {
            query = query.where(key, value);
        }
        return query.first();
    }

    static async findMany<T extends BaseModel<T>>(
        this: new () => T,
        conditions: Record<string, any>
    ): Promise<T[]> {
        let query = this.query();
        for (const [key, value] of Object.entries(conditions)) {
            query = query.where(key, value);
        }
        return query.get();
    }

    static fromData<T extends BaseModel<T>>(this: new () => T, data: any): T {
        return Object.assign(new this(), data);
    }

    static fromDataArray<T extends BaseModel<T>>(
        this: new () => T,
        dataArray: any[]
    ): T[] {
        return dataArray.map(data => Object.assign(new this(), data));
    }
}