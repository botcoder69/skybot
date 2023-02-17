const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Iron Chestplate`,
		keyName: `ironChestplate`,
		description: ``,
		rarity: `Common`,
		emoji: {
			name: `<:Iron_Chestplate:948133251250257960>`,
			url: `https://cdn.discordapp.com/emojis/948133251250257960.png`,
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
			materials: [[`iron`, `iron`, `<:Iron_Ingot:885715125305221120>`, 8]]
		},
		armor: {
			stats: {
				defense: 30
			},
			helmet: `ironHelmet`,
			chestplate: `ironChestplate`,
			leggings: `ironLeggings`,
			boots: `ironBoots`
		},
		equipData: {
			key: `chestplate`,
			value: `<:Iron_Chestplate:948133251250257960>`
		},
		onEquip(_interaction, maidObj) {
			maidObj.chestplate = this.emoji.name;
		},
		key: `chestplate`,
		includeInParsing: true
	}
);