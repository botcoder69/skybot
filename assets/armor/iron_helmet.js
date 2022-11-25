
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Iron Helmet`,
		keyName: `ironHelmet`,
		description: ``,
		rarity: `Common`,
		emoji: {
			name: `<:Iron_Helmet:948133266014212127>`,
			url: `https://cdn.discordapp.com/emojis/948133266014212127.png`,
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
			type: "oneItem",
			materials: [[`iron`, `iron`, `<:Iron_Ingot:885715125305221120>`, 5]]
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
			key: `helmet`,
			value: `<:Iron_Helmet:948133266014212127>`
		},
		onEquip(_interaction, maidObj) {
			maidObj.helmet = this.emoji.name;
		},
		key: `helmet`,
		includeInParsing: true
	}
);