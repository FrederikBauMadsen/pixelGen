export interface ItemContent {
  itemId: string;
  itemColor: string;
}
export interface Item {
  name: string;
  category: string;
  content: Array<ItemContent>;
}

export interface CharItem {
  name: string;
  category: string;
  itemId: Array<string>;
  itemColor: Array<string>;
}
