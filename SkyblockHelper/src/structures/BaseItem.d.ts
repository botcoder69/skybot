
/**
 * The basic class for making a Skybot Item.
 */
export declare class BaseItem {
	public constructor(data: BaseItemData);

	public search: string[];
	public group: string;
	public name: string;
	public keyName: string;
	public description?: string;
	public rarity: keyof ItemRarities;
	public emoji: any;
	public NPC: NPCData;
	public sellall: SellallData;
	public smeltable: SmeltData;
	public crafting?: CraftingData;
	public levelReq?: LevelRequirement;
	public enchanted?: BaseItem;
	public fuel?: FuelData;
	public includeInParsing: false;
	
	public displayEmojiName(minionEmojiType?: 'placed' | 'inventory'): string;
	public displayEmojiURL(minionEmojiType?: 'placed' | 'inventory'): string;
}

export declare interface BaseItemData {
	search: string[];
	group: string;
	name: string;
	keyName: string;
	description?: string;
	rarity: keyof ItemRarities;
	emoji: any;
	NPC: NPCData;
	sellall: SellallData
	crafting?: CraftingData;
	levelReq?: LevelRequirement;
	enchanted?: BaseItem;
	fuel?: FuelData;
	includeInParsing: boolean;
}

interface ItemRarities {
	Common: string;
	Uncommon: string;
	Rare: string;
	Epic: string;
	Legendary: string;
	Mythic: string;
	Divine: string;
	Special: string;
	'Very Special': string;
}

interface FuelData {
	time: number;
}

type SellNPCData = {
	sellable: boolean; 
	price: number;
}

type BuyNPCData = {
	buyable: boolean; 
	price: number;
}

type NPCData = {
	sell: SellNPCData;
	buy: BuyNPCData;
}

type CraftingData = {
	type: `oneItem`,
	materials?: [string, string, string, number][],
	outputs?: number;
	repair?: RepairData;
}

type SellallData = {
	included: boolean; 
	filterGroup?: string;
}

type SmeltData = {
	output: BaseItem;
	amount: number;
}

type LevelRequirement = {
	skill: `Foraging` | `Mining` | `Fishing` | `Combat`;
	level: number;
}

type RepairData = {
	materials: [string, string, string, number][];
	outputs: [string, string, string, number];
}