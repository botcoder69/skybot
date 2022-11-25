
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Leather Leggings`,
		keyName: `leatherLeggings`,
		description: ``,
		rarity: `Common`,
		emoji: {
			name: `<:Leather_Leggings:966938177933807636>`,
			url: `https://cdn.discordapp.com/emojis/966938177933807636.png`,
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
			materials: [[`leather`, `leather`, `<:Leather:966938933156016158>`, 4]]
		},
		armor: {
			stats: {
				defense: 10
			},
			helmet: `leatherHelmet`,
			chestplate: `leatherChestplate`,
			leggings: `leatherLeggings`,
			boots: `leatherBoots`
		},
		equipData: {
			key: `leggings`,
			value: `<:Leather_Leggings:966938177933807636>`
		},
		onEquip(_interaction, maidObj) {
			maidObj.leggings = this.emoji.name;
		},
		includeInParsing: false
	}
);