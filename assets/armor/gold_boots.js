
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Gold Boots`,
		keyName: `goldBoots`,
		description: ``,
		rarity: `Common`,
		emoji: {
			name: `<:Golden_Boots:948133338080768031>`,
			url: `https://cdn.discordapp.com/emojis/948133338080768031.png`,
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
			materials: [[`gold`, `gold`, `<:Gold_Ingot:885715142522855494>`, 4]]
		},
		armor: {
			stats: {
				defense: 5
			},
			helmet: `goldHelmet`,
			chestplate: `goldChestplate`,
			leggings: `goldLeggings`,
			boots: `goldBoots`
		},
		equipData: {
			key: `boots`,
			value: `<:Golden_Boots:948133338080768031>`
		},
		onEquip(_interaction, maidObj) {
			maidObj.boots = this.emoji.name;
		},
		key: `boots`,
		includeInParsing: true
	}
);