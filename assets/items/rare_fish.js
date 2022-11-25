
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: "Item",
		name: `Rare Fish`,
		keyName: "rareFish",
		description: "A rare fish found in the fisheries. Has no use except selling",
		rarity: "Rare",
		emoji: {
			name: `🟦`,
			url: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/282/large-blue-square_1f7e6.png",
		},
		NPC: {
			sell: {
				sellable: true,
				price: 25
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