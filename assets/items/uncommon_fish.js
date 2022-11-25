
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: "Item",
		name: `Uncommon Fish`,
		keyName: "uncommonFish",
		description: "An uncommon fish found in the fisheries. Has no use except selling",
		rarity: "Uncommon",
		emoji: {
			name: `🟩`,
			url: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/twitter/185/large-green-square_1f7e9.png",
		},
		NPC: {
			sell: {
				sellable: true,
				price: 10
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