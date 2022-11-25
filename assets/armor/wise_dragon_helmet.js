
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Wise Dragon Helmet`,
		keyName: `wiseDragonHelmet`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Wise_Dragon_Helmet:978508739218907217>`,
			url: `https://cdn.discordapp.com/emojis/978508739218907217.png`,
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
			materials: [[`Wise Dragon Fragment`, `wiseDragonFragment`, `<:Wise_Dragon_Fragment:978509337288904794>`, 50]]
		},
		armor: {
			stats: {
				health: 70,
				defense: 110,
				intelligence: 125
			},
			helmet: `wiseDragonHelmet`,
			chestplate: `wiseDragonChestplate`,
			leggings: `wiseDragonLeggings`,
			boots: `wiseDragonBoots`
		},
		equipData: {
			key: `helmet`,
		},
		levelReq: {
			level: 16,
			skill: "Combat"
		},
		onEquip(_interaction, maidObj) {
			maidObj.helmet = this.emoji.name;
		},
		key: `helmet`,
		includeInParsing: true
	}
);