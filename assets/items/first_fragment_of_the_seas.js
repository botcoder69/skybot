const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: [],
		group: `Item`,    
		name: `First Fragment of the Seas`,
		keyName: `firstFragmentOfTheSeas`,
		description: `A fragment that shattered from its former item. Looks like it has minor damage! We could probably repair it if we have the other piece. A rare find from fishing.`,
		rarity: `Epic`,
		emoji: {
			name: `<:First_Fragment_of_the_Seas:965489410302935110>`,
			url: `https://cdn.discordapp.com/emojis/965489410302935110.png`,
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