
/* eslint-disable no-unused-vars, class-methods-use-this, no-await-in-loop */

const Functions = require('../utils/Functions');
const SkybotDatabase = require('./SkybotDatabase');
const SkyblockHelperError = require(`../errors/SkyblockHelperError`);
const { Collection } = require('discord.js');
const chalk = require('chalk');

class SkybotBazaarAPI {
	constructor() {
		/** @type {SkybotDatabase} */
		this.bazaarDatabase = null;

		/** @type {Collection<string, import ('discord.js').AssetMapValues>} */
		this.assetMap = null;

		this.debugMode = false;
	}

	debug(message) {
		// eslint-disable-next-line no-console
		if (this.debugMode) console.log(`${Functions.getUTCTime()} [SkybotBazaarAPI]${[chalk.greenBright(`[Logging]`)]} |`, message);
	}

	checkPropertyValidity() {
		this.debug(`initItemBazaarMarketTrends() | Checking if property 'bazaarDatabase' is an instance of SkybotDatabase...`);
		if (!(this.bazaarDatabase instanceof SkybotDatabase)) throw new SkyblockHelperError(`Expected instanceof SkybotDatabase for property 'bazaarDatabase'`, `PROPERTY_INSTANCE_TYPE`);

		this.debug(`initItemBazaarMarketTrends() | Checking if property 'assetMap' is an instance of Collection`);
		if (!(this.assetMap instanceof Collection)) throw new SkyblockHelperError(`Expected instanceof Collection for property 'assetMap'`, `PROPERTY_INSTANCE_TYPE`);
	}

	setAssetMap(assetMap) {
		this.assetMap = assetMap;

		return this;
	}

	setBazaarDatabase(bazaarDatabase) {
		this.bazaarDatabase = bazaarDatabase;

		return this;
	}

	async initItemBazaarMarketTrends() {
		this.debug(`initItemBazaarMarketTrends() | Checking class property validity...`);
		this.checkPropertyValidity();
		this.debug(`initItemBazaarMarketTrends() | Check successful: All class properties are valid!`);

		this.debug(`initItemBazaarMarketTrends() | Getting all assets with 'bazaar' property...`);
		const assetsWithBazaarProperty = this.assetMap.filter(asset => asset.bazaar);
		this.debug(`initItemBazaarMarketTrends() | Filter successful: All items without property 'bazaar' have been filtered out!`);

		for (const asset of assetsWithBazaarProperty.values()) {
			// eslint-disable-next-line no-await-in-loop
			this.debug(`initItemBazaarMarketTrends() | Getting bazaar market trends of: '${asset.keyName}'...`);
			const itemMarketTrends = await this.bazaarDatabase.database.get(asset.keyName);
			this.debug(`initItemBazaarMarketTrends() | Get successful: Market trends for: '${asset.keyName}' have been collected!`);

			this.debug(`initItemBazaarMarketTrends() | Parsing market trends...`);
			const [buyMarketTrend] = itemMarketTrends.buyOrders.sort((a, b) => a.coins - b.coins);
			const [sellMarketTrend] = itemMarketTrends.sellOrders.sort((a, b) => b.coins - a.coins);

			// b - a => descending order
			// a - b => ascending order
			this.debug(`initItemBazaarMarketTrends() | Setting parsed market trends...`);
			asset.bazaar.marketTrends = {
				buy: buyMarketTrend ?? null,
				sell: sellMarketTrend ?? null
			};
			this.debug(`initItemBazaarMarketTrends() | Finished BazaarMarketTrends for: '${asset.keyName}'.`);
		}
	}

	async buyInstantly(item, amount) {
		if (!this.assetMap.has(item)) throw new SkyblockHelperError(`Variable 'item' isn't a proper registered asset!`, `ITEM_ASSET_VALUE`);

		let wantedAmount = amount,
			totalCoinSpend = 0;

		const itemMarketTrends = await this.bazaarDatabase.database.get(item);
		const sortedBuyOrders = itemMarketTrends.buyOrders.sort((a, b) => (a.coins - b.coins));
		const usedBuyOrders = [];

		for (const buyOrder of sortedBuyOrders) {
			// console.log(`${wantedAmount} > | < ${buyOrder.amount}`);
			if (wantedAmount > buyOrder.amount) {
				totalCoinSpend += buyOrder.amount * buyOrder.coins;
				usedBuyOrders.push(buyOrder);

				wantedAmount -= buyOrder.amount;
			} else if (wantedAmount < buyOrder.amount && wantedAmount > 0) {
				totalCoinSpend += wantedAmount * buyOrder.coins;
				usedBuyOrders.push({ user: buyOrder.user, amount: wantedAmount, coins: buyOrder.coins });

				wantedAmount = 0;
			}
		}

		// console.log(usedBuyOrders, usedBuyOrders.reduce((acc, buyOrder) => buyOrder.amount + acc, 0));

		itemMarketTrends.buyOrders = itemMarketTrends.buyOrders
			.map(buyOrder => {
				const usedBuyOrder = usedBuyOrders.find(usedBuyOrder => usedBuyOrder.user === buyOrder.user);
				// console.log({ buyOrder, usedBuyOrder });
				buyOrder.amount -= (usedBuyOrder?.amount ?? 0);

				return buyOrder;
			})
			.filter(buyOrder => buyOrder.amount > 0);

		return { totalCoinSpend, buyOrders: itemMarketTrends.buyOrders };
	}

	async sellInstantly(item, amount) {
		if (!this.assetMap.has(item)) throw new SkyblockHelperError(`Variable 'item' isn't a proper registered asset!`, `ITEM_ASSET_VALUE`);

		let wantedAmount = amount,
			totalCoinSpend = 0;

		const itemMarketTrends = await this.bazaarDatabase.database.get(item);
		const sortedSellOrders = itemMarketTrends.sellOrders.sort((a, b) => (b.coins - a.coins));
		const usedSellOrders = [];

		for (const sellOrder of sortedSellOrders) {
			// console.log(`${wantedAmount} > | < ${buyOrder.amount}`);
			if (wantedAmount > sellOrder.amount) {
				totalCoinSpend += sellOrder.amount * sellOrder.coins;
				usedSellOrders.push(sellOrder);

				wantedAmount -= sellOrder.amount;
			} else if (wantedAmount < sellOrder.amount && wantedAmount > 0) {
				totalCoinSpend += wantedAmount * sellOrder.coins;
				usedSellOrders.push({ user: sellOrder.user, amount: wantedAmount, coins: sellOrder.coins });

				wantedAmount = 0;
			}
		}

		// console.log(usedBuyOrders, usedBuyOrders.reduce((acc, buyOrder) => buyOrder.amount + acc, 0));

		itemMarketTrends.buyOrders = itemMarketTrends.buyOrders
			.map(buyOrder => {
				const usedBuyOrder = usedSellOrders.find(usedBuyOrder => usedBuyOrder.user === buyOrder.user);
				// console.log({ buyOrder, usedBuyOrder });
				buyOrder.amount -= (usedBuyOrder?.amount ?? 0);

				return buyOrder;
			})
			.filter(buyOrder => buyOrder.amount > 0);

		return { totalCoinSpend, buyOrders: itemMarketTrends.buyOrders };
	}

	async createBuyOffer(item, amount, price) {

	}

	async createSellOffer(item, amount, price) {

	}
}

module.exports = SkybotBazaarAPI;

/*
DATABASE KEY STRUCTURE

keyName: {
	buyOrders: [
		{ user: Snowflake, amount: number, coins: number }
	],
	sellOrders: [
		{ user: Snowflake, amount: number, coins: number }
	]
}

Restrict users to one buy and one sell offer per item.
*/