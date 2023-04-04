
import { AssetMapValues } from "discord.js";
import SkybotDatabase from "./SkybotDatabase";

class SkybotBazaarAPI {
	constructor();
	private readonly bazaarDatabase: SkybotDatabase;
	private readonly assetMap: Collection<string, AssetMapValues>;
	private readonly debugMode: boolean;
	private debug(message: string): void;

	public checkPropertyValidity(): void;
	public setAssetMap(assetMap: Collection<string, AssetMapValues>): this;
	public setBazaarDatabase(bazaarDatabase: SkybotDatabase): this;
	public initItemBazaarMarketTrends(): Promise<void>
	public buyInstantly(item: AssetMapValues, amount: number): Promise<BazaarOfferData>
	public sellInstantly(item: AssetMapValues, amount: number): Promise<BazaarOfferData>
	public createBuyOffer(item: AssetMapValues, amount: number, price: number): Promise<void>
	public createSellOffer(item: AssetMapValues, amount: number, price: number): Promise<void> 
}

interface BazaarOfferData {
	public totalCoinSpend: number;
	public buyOrders: BazaarUserOfferData;
}

interface BazaarUserOfferData {
	public user: Snowflake;
	public amount: number;
	public coins: number;
}

export = SkybotBazaarAPI;