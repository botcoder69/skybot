const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: [],
		group: `Item`,    
		name: `Hilt of the Seas`,
		keyName: `hiltOfTheSeas`,
		description: `A hilt that was lost in the seas. Looks like it resembles something upon closer inspection. A rare find from fishing!`,
		rarity: `Epic`,
		emoji: {
			name: `<:Hilt_of_the_Seas:965489391285973003>`,
			url: `https://cdn.discordapp.com/emojis/965489391285973003.png`,
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