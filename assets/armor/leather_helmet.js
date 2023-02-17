
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Leather Helmet`,
		keyName: `leatherHelmet`,
		description: ``,
		rarity: `Common`,
		emoji: {
			name: `<:Leather_Helmet:966938208577396816>`,
			url: `https://cdn.discordapp.com/emojis/966938208577396816.png`,
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
			materials: [[`leather`, `leather`, `<:Leather:966938933156016158>`, 7]]
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
			key: `helmet`,
			value: `<:Leather_Helmet:966938208577396816>`
		},
		onEquip(_interaction, maidObj) {
			maidObj.helmet = this.emoji.name;
		},
		includeInParsing: false
	}
);