export interface IPurchase {
  id: string;
  item: string;
  comment?: string;
}

export interface IList {
  title: string;
  data: IPurchase[];
}
