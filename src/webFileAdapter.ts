import { BaseFileAdapter, IBaseFileItem } from '@berish/orm';

export interface IWebFileAdapterParams {
  sendData: <T>(path: string, args: any[]) => Promise<T>;
}

export class WebFileAdapter extends BaseFileAdapter<IWebFileAdapterParams> {
  public async initialize(params: IWebFileAdapterParams) {
    this.params = params;
  }

  public async get(ids: string[], fetchData: boolean) {
    return this.params.sendData<IBaseFileItem[]>('get', [ids, fetchData]);
  }

  public async create(items: IBaseFileItem[]) {
    return this.params.sendData<void>('create', [items]);
  }

  public async delete(ids: string[]) {
    return this.params.sendData<void>('delete', [ids]);
  }
}
