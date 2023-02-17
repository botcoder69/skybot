
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Gold Helmet`,
		keyName: `goldHelmet`,
		description: ``,
		rarity: `Common`,
		emoji: {
			name: `<:Golden_Helmet:948133366052565022>`,
			url: `https://cdn.discordapp.com/emojis/948133366052565022.png`,
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
			materials: [[`gold`, `gold`, `<:Gold_Ingot:885715142522855494>`, 5]]
		},
		armor: {
			stats: {
				defense: 10
			},
			helmet: `goldHelmet`,
			chestplate: `goldChestplate`,
			leggings: `goldLeggings`,
			boots: `goldBoots`
		},
		equipData: {
			key: `helmet`,
			value: `<:Golden_Helmet:948133366052565022>`
		},
		onEquip(_interaction, maidObj) {
			maidObj.helmet = this.emoji.name;
		},
		key: `helmet`,
		includeInParsing: true
	}
);