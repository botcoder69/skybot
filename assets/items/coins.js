
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,
		name: `Coins`,
		keyName: `coins`,
		description: `The main form of currency used in Skybot. Can be used to flex on other people and buy stuff from NPCs`,
		rarity: `Common`,
		emoji: {
			name: `<:Coins:885677584749318154>`,
			url: `https://cdn.discordapp.com/emojis/885677584749318154.png?v=1`,
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
			included: false
		},
		includeInParsing: true
	}
);