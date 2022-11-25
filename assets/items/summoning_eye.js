
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,    
		name: `Summoning Eye`,
		keyName: `summoningEye`,
		description: `Use this at the Ender Altar in the Dragon's Nest to summon Ender Dragons!`,
		rarity: `Epic`,
		emoji: {
			name: `<:Summoning_Eye:976317456463314994>`,
			url: `https://cdn.discordapp.com/emojis/976317456463314994.png`,
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