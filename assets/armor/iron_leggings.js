const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Iron Leggings`,
		keyName: `ironLeggings`,
		description: ``,
		rarity: `Common`,
		emoji: {
			name: `<:Iron_Leggings:948133237400674336>`,
			url: `https://cdn.discordapp.com/emojis/948133237400674336.png`,
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
			type: "oneItem",
			materials: [[`iron`, `iron`, `<:Iron_Ingot:885715125305221120>`, 7]]
		},
		armor: {
			stats: {
				defense: 25
			},
			helmet: `ironHelmet`,
			chestplate: `ironChestplate`,
			leggings: `ironLeggings`,
			boots: `ironBoots`
		},
		equipData: {
			key: `leggings`,
			value: `<:Iron_Leggings:948133237400674336>`
		},
		onEquip(_interaction, maidObj) {
			maidObj.leggings = this.emoji.name;
		},
		key: `leggings`,
		includeInParsing: true
	}
);