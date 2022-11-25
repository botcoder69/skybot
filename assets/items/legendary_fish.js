
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: ["legendary fish", "leg fish", "legendaryfish", "legfish"],
		group: "Item",
		name: `Legendary Fish`,
		keyName: "legendaryFish",
		description: "A legendary fish found in the fisheries. Has no use except selling",
		rarity: "Legendary",
		emoji: {
			name: `🟨`,
			url: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/282/large-yellow-square_1f7e8.png",
		},
		NPC: {
			sell: {
				sellable: true,
				price: 100
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