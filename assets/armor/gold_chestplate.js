
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Gold Chestplate`,
		keyName: `goldChestplate`,
		description: ``,
		rarity: `Common`,
		emoji: {
			name: `<:Golden_Chestplate:948133358033068043>`,
			url: `https://cdn.discordapp.com/emojis/948133358033068043.png`,
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
		crafting: {
			type: `oneItem`,
			materials: [[`gold`, `gold`, `<:Gold_Ingot:885715142522855494>`, 8]]
		},
		armor: {
			stats: {
				defense: 20
			},
			helmet: `goldHelmet`,
			chestplate: `goldChestplate`,
			leggings: `goldLeggings`,
			boots: `goldBoots`
		},
		equipData: {
			key: `chestplate`,
			value: `<:Golden_Chestplate:948133358033068043>`
		},
		sellall: {
			included: false,
			filterGroup: ""
		},
		onEquip(_interaction, maidObj) {
			maidObj.chestplate = this.emoji.name;
		},
		key: `chestplate`,
		includeInParsing: true
	}
);