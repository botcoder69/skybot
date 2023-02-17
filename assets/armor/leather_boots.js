
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Leather Boots`,
		keyName: `leatherBoots`,
		description: ``,
		rarity: `Common`,
		emoji: {
			name: `<:Leather_Boots:966938165694828648>`,
			url: `https://cdn.discordapp.com/emojis/966938165694828648.png`,
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
			materials: [[`leather`, `leather`, `<:Leather:966938933156016158>`, 5]]
		},
		armor: {
			stats: {
				defense: 5
			},
			helmet: `leatherHelmet`,
			chestplate: `leatherChestplate`,
			leggings: `leatherLeggings`,
			boots: `leatherBoots`
		},
		equipData: {
			key: `boots`,
			value: `<:Leather_Boots:966938165694828648>`
		},
		onEquip(_interaction, maidObj) {
			maidObj.boots = this.emoji.name;
		},
		includeInParsing: false
	}
);