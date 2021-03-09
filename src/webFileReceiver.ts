import { Manager } from '@berish/orm';

export type WebFileMethodParameters<N extends keyof Manager['file']> = Parameters<Manager['file'][N]>;
export type WebFileMethodReturn<N extends keyof Manager['file']> = ReturnType<Manager['file'][N]>;

export class WebFileReceiver {
  private _manager: Manager = null;

  constructor(manager: Manager) {
    this._manager = manager;
  }

  get manager() {
    return this._manager;
  }

  public get API() {
    return {
      get: this.get,
      create: this.create,
      delete: this.delete,
    };
  }

  public get = (...[ids, fetchData]: WebFileMethodParameters<'get'>) => {
    return this.manager.file.get(ids, fetchData);
  };

  public create = (...[items]: WebFileMethodParameters<'create'>) => {
    return this.manager.file.create(items);
  };

  public delete = (...[ids]: WebFileMethodParameters<'delete'>) => {
    return this.manager.file.delete(ids);
  };
}
