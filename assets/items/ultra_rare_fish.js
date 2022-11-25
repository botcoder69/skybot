
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: "Item",
		name: `Ultra Rare Fish`,
		keyName: "ultraRareFish",
		description: "An ultra rare fish found in the fisheries. Has no use except selling",
		rarity: "",
		emoji: {
			name: `🟥`,
			url: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/282/large-red-square_1f7e5.png",
		},
		NPC: {
			sell: {
				sellable: true,
				price: 50
			},
			buy: {
				buyable: false,
				price: 0
			}
		},
		sellall: {
			included: true,
			filterGroup: "fish"
		},
		includeInParsing: true
	}
);