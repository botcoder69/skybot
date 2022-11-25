
const { MinionUpgrade } = require('../../SkyblockHelper/src/index.js');

module.exports = new MinionUpgrade(
	{
		search: [],
		group: "Minion Upgrade",
		name: `Super Compactor`,
		keyName: "compactor",
		description: "This will automatically turn materials that a minion produces into their enchanted form when there are enough resources in the minion's storage",
		rarity: "Rare",
		emoji: {
			name: `<:Compactor:907504986605355019>`,
			url: `https://cdn.discordapp.com/emojis/907504986605355019.png`
		},
		NPC: {
			sell: {
				sellable: false,
				price: 0
			},
			buy: {
				buyable: false,
				price: 0
			}
		},
		sellall: {
			included: false,
		},
		crafting: {
			type: `oneItem`,
			materials: [[`enchanted cobblestone`, `enchantedCobblestone`, `<:Enchanted_Cobblestone:900308905635242026>`, 64], [`enchanted redstone block`, `enchantedRedstoneBlock`, `<:Enchanted_Redstone_Block:907504987322613800>`, 1]],
			outputs: 1
		},
		minionUpgrade: {
		/**
		 * The level this minion will compact items in
		 * * `0` Doesn't compact any items.
		 * * `1` Compacts items to their enchanted format.
		 * * `2` Compacts items to their enchanted format and beyond.
		 */
			compactLevel: 2,
			/**
		 * The speed in percent this fuel will give your minion 
		 * @example 
		 * (timeBetweenActions = Math.floor(timeBetweenActions * (speed / 100)))  
		 */
			speed: 0,
			/**
		 * Can this minion auto-smelt items?
		 */
			autoSmelt: true
		},
		includeInParsing: true
	}
);