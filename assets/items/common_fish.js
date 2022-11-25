
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,
		name: `Common Fish`,
		keyName: `commonFish`,
		description: `A common fish found in the fisheries. Has no use except selling`,
		rarity: `Common`,
		emoji: {
			name: `⬜`,
			url: `https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/282/white-large-square_2b1c.png`,
		},
		NPC: {
			sell: {
				sellable: true,
				price: 1
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