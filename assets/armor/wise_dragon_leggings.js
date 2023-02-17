
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Wise Dragon Leggings`,
		keyName: `wiseDragonLeggings`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Wise_Dragon_Leggings:978508734391259186>`,
			url: `https://cdn.discordapp.com/emojis/978508734391259186.png`,
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
			materials: [[`Wise Dragon Fragment`, `wiseDragonFragment`, `<:Wise_Dragon_Fragment:978509337288904794>`, 70]]
		},
		armor: {
			stats: {
				health: 100,
				defense: 140,
				intelligence: 75
			},
			helmet: `wiseDragonHelmet`,
			chestplate: `wiseDragonChestplate`,
			leggings: `wiseDragonLeggings`,
			boots: `wiseDragonBoots`
		},
		equipData: {
			key: `leggings`,
		},
		levelReq: {
			level: 16,
			skill: "Combat"
		},
		onEquip(_interaction, maidObj) {
			maidObj.leggings = this.emoji.name;
		},
		key: `leggings`,
		includeInParsing: true
	}
);