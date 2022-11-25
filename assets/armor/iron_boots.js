const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Iron Boots`,
		keyName: `ironBoots`,
		description: ``,
		rarity: `Common`,
		emoji: {
			name: `<:Iron_Boots:948133185957527592>`,
			url: `https://cdn.discordapp.com/emojis/948133185957527592.png`,
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
			materials: [[`iron`, `iron`, `<:Iron_Ingot:885715125305221120>`, 4]]
		},
		armor: {
			stats: {
				defense: 10
			},
			helmet: `ironHelmet`,
			chestplate: `ironChestplate`,
			leggings: `ironLeggings`,
			boots: `ironBoots`
		},
		equipData: {
			key: `boots`,
			value: `<:Iron_Boots:948133185957527592>`
		},
		onEquip(_interaction, maidObj) {
			maidObj.boots = this.emoji.name;
		},
		key: `boots`,
		includeInParsing: true
	}
);