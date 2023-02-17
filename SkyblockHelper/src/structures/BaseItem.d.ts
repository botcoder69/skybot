
import { EmojiIdentifierResolvable } from "discord.js";

/**
 * The basic class for making a Skybot Item.
 */
export declare class BaseItem {
	public constructor(data: BaseItemData);

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
	public bazaar?: BazaarData;
	public soulbound?: boolean;
	public includeInParsing: boolean;
	
	public displayEmojiName(minionEmojiType?: 'placed' | 'inventory'): string;
	public displayEmojiURL(minionEmojiType?: 'placed' | 'inventory'): string;
}

export declare interface BaseItemData {
	public group: string;
	public name: string;
	public keyName: string;
	public description?: string;
	public rarity: keyof ItemRarities;
	public emoji: any;
	public NPC: NPCData;
	public sellall: SellallData
	public crafting?: CraftingData;
	public levelReq?: LevelRequirement;
	public enchanted?: BaseItem;
	public fuel?: FuelData;
	public bazaar?: BazaarData;
	public soulbound?: boolean;
	public includeInParsing: boolean;
}

interface ItemRarities {
	public Common: string;
	public Uncommon: string;
	public Rare: string;
	public Epic: string;
	public Legendary: string;
	public Mythic: string;
	public Divine: string;
	public Special: string;
	public 'Very Special': string;
}

interface FuelData {
	public time: number;
}

interface SellNPCData {
	public sellable: boolean; 
	public price: number;
}

interface BuyNPCData {
	public buyable: boolean; 
	public price: number;
}

interface NPCData {
	public sell: SellNPCData;
	public buy: BuyNPCData;
}

interface CraftingData {
	public type: `oneItem`,
	public materials?: [string, string, string, number][],
	public outputs?: number;
	public repair?: RepairData;
}

interface SellallData {
	public included: boolean; 
	public filterGroup?: string;
}

interface SmeltData {
	public output: BaseItem;
	public amount: number;
}

interface LevelRequirement {
	public skill: `Foraging` | `Mining` | `Fishing` | `Combat`;
	public level: number;
}

interface RepairData {
	public materials: [string, string, string, number][];
	public outputs: [string, string, string, number];
}

interface BazaarData {
	/** The category this item's subcategory will belong in. */
	public category: BazaarCategoryData;
	/** The subcategory this item will belong in. */
	public subcategory: BazaarSubcategoryData;
	/** Individual precedences for this item, its category and subcategory. */
	public precedence: BazaarPrecedenceData;
	/** To be filled up by SkybotBazaarAPI */
	public marketTrends: BazaarMarketTrendData?;
}

interface BazaarCategoryData {
	/** The name of this category. */
	public name: string;
	/** The emoji for this category. It's value must be constant throughout all the items with this category, since the emoji of this category will be based off that */
	public emoji: EmojiIdentifierResolvable | null;
}

interface BazaarSubcategoryData {
	/** The name of this subcategory. */
	public name: string;
	/** The emoji for this subcategory. It's value must be constant throughout all the items with this subcategory, since the emoji of this subcategory will be based off that */
	public emoji: EmojiIdentifierResolvable | null;
}

interface BazaarPrecedenceData {
	/** This is the precedence of the category this item is in. It's value must be constant throughout all the items with this category, since the order of this category inside the Bazaar menu will be based off that. */
	public categoryPrecedence: number;
	/** This is the precedence of the subcategory this item is in. It's value must be constant throughout all the items with this subcategory, since the order of the subcategory inside the category will be based off that. */
	public subcategoryPrecedence: number;
	/** This is the precedence of the subcategory place this item is in. It's value must be different throughout all the items with this subcategory, since the order of the items inside the subcategory will be based of that. */
	public itemPrecedence: number;
}

interface BazaarMarketTrendData {
	/** Lowest value to buy this item from the Bazaar */
	public buy: number;
	/** Highest value to sell this item to the Bazaar */
	public sell: number;
}