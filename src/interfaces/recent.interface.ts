import { IPurchase } from './purchase.interface.ts';

export interface IRecent {
  title: string;
  data: IPurchase[];
}
