import { BaseFileAdapter, IBaseFileItem } from '@berish/orm';
import { WebFileMethodParameters, WebFileMethodReturn } from './webFileReceiver';

export interface IWebFileAdapterParams {
  get: (...args: WebFileMethodParameters<'get'>) => WebFileMethodReturn<'get'>;
  create: (...args: WebFileMethodParameters<'create'>) => WebFileMethodReturn<'create'>;
  delete: (...args: WebFileMethodParameters<'delete'>) => WebFileMethodReturn<'delete'>;
}

export class WebFileAdapter extends BaseFileAdapter<IWebFileAdapterParams> {
  public initialize = async (params: IWebFileAdapterParams) => {
    this.params = params;
  };

  public close = async () => {
    this.params = null;
  };

  public get = async (ids: string[], fetchData: boolean) => {
    if (!this.params.get) throw new TypeError('webFileAdapter params.get is null');

    return this.params.get(ids, fetchData);
  };

  public create = async (items: IBaseFileItem[]) => {
    if (!this.params.create) throw new TypeError('webFileAdapter params.create is null');

    return this.params.create(items);
  };

  public delete = async (ids: string[]) => {
    if (!this.params.delete) throw new TypeError('webFileAdapter params.delete is null');

    return this.params.delete(ids);
  };
}
