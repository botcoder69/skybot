
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Diamond Leggings`,
		keyName: `diamondLeggings`,
		description: ``,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Diamond_Leggings:948133440790872064>`,
			url: `https://cdn.discordapp.com/emojis/948133440790872064.png`,
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
			materials: [[`diamond`, `diamond`, `<:Diamond:902764556697341952>`, 7]]
		},
		armor: {
			stats: {
				defense: 30
			},
			helmet: `diamondHelmet`,
			chestplate: `diamondChestplate`,
			leggings: `diamondLeggings`,
			boots: `diamondBoots`
		},
		equipData: {
			key: `leggings`,
			value: `<:Diamond_Leggings:948133440790872064>`
		},
		onEquip(_interaction, maidObj) {
			maidObj.leggings = this.emoji.name;
		},
		key: `leggings`,
		includeInParsing: true
	}
);