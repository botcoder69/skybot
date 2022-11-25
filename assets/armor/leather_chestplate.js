
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Leather Chestplate`,
		keyName: `leatherChestplate`,
		description: ``,
		rarity: `Common`,
		emoji: {
			name: `<:Leather_Chestplate:966938197005336607>`,
			url: `https://cdn.discordapp.com/emojis/966938197005336607.png`,
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
			materials: [[`leather`, `leather`, `<:Leather:966938933156016158>`, 8]]
		},
		armor: {
			stats: {
				defense: 15
			},
			helmet: `leatherHelmet`,
			chestplate: `leatherChestplate`,
			leggings: `leatherLeggings`,
			boots: `leatherBoots`
		},
		equipData: {
			key: `chestplate`,
			value: `<:Leather_Chestplate:966938197005336607>`
		},
		onEquip(_interaction, maidObj) {
			maidObj.chestplate = this.emoji.name;
		},
		includeInParsing: false
	}
);