const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,    
		name: `Second Fragment of the Seas`,
		keyName: `secondFragmentOfTheSeas`,
		description: `Wait a minute, this looks like it could fit the other fragment! This must be the second fragment! Now we just need that hilt...\n> \n> A rare find from fishing!`,
		rarity: `Epic`,
		emoji: {
			name: `<:Second_Fragment_of_the_Seas:965489428137144403>`,
			url: `https://cdn.discordapp.com/emojis/965489428137144403.png`,
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