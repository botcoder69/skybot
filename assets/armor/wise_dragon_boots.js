
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Wise Dragon Boots`,
		keyName: `wiseDragonBoots`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Wise_Dragon_Boots:978508732633862184>`,
			url: `https://cdn.discordapp.com/emojis/978508732633862184.png`,
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
			materials: [[`Wise Dragon Fragment`, `wiseDragonFragment`, `<:Wise_Dragon_Fragment:978509337288904794>`, 40]]
		},
		armor: {
			stats: {
				health: 60,
				defense: 90,
				intelligence: 75
			},
			helmet: `wiseDragonHelmet`,
			chestplate: `wiseDragonChestplate`,
			leggings: `wiseDragonLeggings`,
			boots: `wiseDragonBoots`
		},
		equipData: {
			key: `boots`,
		},
		levelReq: {
			level: 16,
			skill: "Combat"
		},
		onEquip(_interaction, maidObj) {
			maidObj.boots = this.emoji.name;
		},
		key: `boots`,
		includeInParsing: true
	}
);