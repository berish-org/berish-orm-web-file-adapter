import { baseFileMethods, Entity, Manager, Query, QueryData, QueryDataSchema } from '@berish/orm';

interface IDbReceiverParams {
  by?: <T extends Entity>(query: Query<T>) => Query<T> | Promise<Query<T>>;
}

type fileMethodType<N extends keyof Manager['file']> = Parameters<Manager['file'][N]>;

export class WebFileReceiver {
  private _manager: Manager = null;
  private _params: IDbReceiverParams = null;

  constructor(manager: Manager, params?: IDbReceiverParams) {
    this._manager = manager;
    this._params = params;
  }

  get manager() {
    return this._manager;
  }

  get params() {
    return this._params || {};
  }

  public async call<T extends keyof Manager['file']>(name: T, ...args: any[]) {
    if (baseFileMethods.indexOf(name) === -1) throw new Error('orm file method not found');
    if (name === 'get') {
      const [ids, fetchData] = args as fileMethodType<'get'>;
      return this.manager.file.get(ids, fetchData);
    }
    if (name === 'create') {
      const [items] = args as fileMethodType<'create'>;
      return this.manager.file.create(items);
    }
    if (name === 'delete') {
      const [ids] = args as fileMethodType<'delete'>;
      return this.manager.file.delete(ids);
    }
    throw new Error('orm method not found');
  }

  private async withBy(queryData: QueryData<QueryDataSchema>) {
    if (!queryData) throw new Error('FP-ORM: queryData is undefined');
    const query = Query.fromJSON(queryData);
    const withByQuery = (await (this.params.by && this.params.by(query))) || query;
    return withByQuery.json;
  }
}
