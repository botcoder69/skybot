
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,    
		name: `Remnant of the Eye`,
		keyName: `remnantOfTheEye`,
		description: `Keeps you alive when you're on death's door, granting a short period of invincibility.\nConsumed on use.`,
		rarity: `Epic`,
		emoji: {
			name: `<:Remnant_of_the_Eye:978135927060824086>`,
			url: `https://cdn.discordapp.com/emojis/978135927060824086.png`,
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
			filterGroup: ""
		},
		includeInParsing: true
	}
);