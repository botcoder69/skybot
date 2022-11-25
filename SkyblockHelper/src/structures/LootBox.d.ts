
import { BaseItem, BaseItemData } from './BaseItem';
import Chancemaker from '../randomizer/randomizers/Chancemaker';

declare class LootBox extends BaseItem {
	constructor(data: LootBoxData)

	public readonly group: 'Loot Box';
	public coins: LootBoxCoinData;
	public loot: Chancemaker<ChancemakerDatatype>;
	public emoji: ItemEmojiData;
}

interface LootBoxData extends BaseItemData {
	coins: LootBoxCoinData;
	loot: Chancemaker<ChancemakerDatatype>;
	emoji: ItemEmojiData;
}

type ItemEmojiData = {
	name: string;
	url: string;
}

type LootBoxCoinData = {
	min: number;
	max: number;
}

type ChancemakerDatatype = {
	name: string;
	keyName: string;
	emoji: string;
}

export = LootBox;