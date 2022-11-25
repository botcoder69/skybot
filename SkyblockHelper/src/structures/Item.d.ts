
import { BaseItem, BaseItemData } from './BaseItem';

/**
 * A Normal Skybot Item, except the Emoji is different.
 */
declare class Item extends BaseItem {
	public constructor(data: ItemData);

	public readonly group: 'Item';
	public emoji: ItemEmojiData
}

interface ItemData extends BaseItemData {
	group: 'Item';
	emoji: ItemEmojiData;
}

type ItemEmojiData = {
	name: string;
	url: string;
}


export = Item;