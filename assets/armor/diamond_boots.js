	
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Diamond Boots`,
		keyName: `diamondBoots`,
		description: ``,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Diamond_Boots:948133429629812747>`,
			url: `https://cdn.discordapp.com/emojis/948133429629812747.png`,
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
		crafting: {
			type: `oneItem`,
			materials: [[`diamond`, `diamond`, `<:Diamond:902764556697341952>`, 4]]
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
			key: `boots`,
			value: `<:Diamond_Boots:948133429629812747>`
		},
		onEquip(_interaction, maidObj) {
			maidObj.boots = this.emoji.name;
		},
		key: `boots`,
		includeInParsing: true
	}
);