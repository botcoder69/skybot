
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Diamond Helmet`,
		keyName: `diamondHelmet`,
		description: ``,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Diamond_Helmet:948133456439820298>`,
			url: `https://cdn.discordapp.com/emojis/948133456439820298.png`,
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
		crafting: {
			type: `oneItem`,
			materials: [[`diamond`, `diamond`, `<:Diamond:902764556697341952>`, 5]]
		},
		armor: {
			stats: {
				defense: 15
			},
			helmet: `diamondHelmet`,
			chestplate: `diamondChestplate`,
			leggings: `diamondLeggings`,
			boots: `diamondBoots`
		},
		equipData: {
			key: `helmet`,
			value: `<:Diamond_Helmet:948133456439820298>`
		},
		onEquip(_interaction, maidObj) {
			maidObj.helmet = this.emoji.name;
		},
		key: `helmet`,
		includeInParsing: true,
	}
);