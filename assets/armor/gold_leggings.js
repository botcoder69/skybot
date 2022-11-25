
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Gold Leggings`,
		keyName: `goldLeggings`,
		description: ``,
		rarity: `Common`,
		emoji: {
			name: `<:Golden_Leggings:948133348939808789>`,
			url: `https://cdn.discordapp.com/emojis/948133348939808789.png`,
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
			materials: [[`gold`, `gold`, `<:Gold_Ingot:885715142522855494>`, 7]]
		},
		armor: {
			stats: {
				defense: 15
			},
			helmet: `goldHelmet`,
			chestplate: `goldChestplate`,
			leggings: `goldLeggings`,
			boots: `goldBoots`
		},
		equipData: {
			key: `leggings`,
			value: `<:Golden_Leggings:948133348939808789>`
		},
		onEquip(_interaction, maidObj) {
			maidObj.leggings = this.emoji.name;
		},
		key: `leggings`,
		includeInParsing: true
	}
);