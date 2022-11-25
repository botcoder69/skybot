
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: ["oak wood", "oakwood"],
		group: "Item",
		name: `Oak Wood`,
		keyName: "oakWood",
		description: "A piece of oak wood found from the Floating Islands. Used to make planks.",
		rarity: "Common",
		emoji: {
			name: `<:Oak_Log:885390554005897237>`,
			url: "https://cdn.discordapp.com/emojis/885390554005897237.png",
		},
		NPC: {
			sell: {
				sellable: true,
				price: 2
			},
			buy: {
				buyable: true,
				price: 5
			}
		},
		sellall: {
			included: true,
			filterGroup: "woodworking"
		},
		includeInParsing: true
	}
);