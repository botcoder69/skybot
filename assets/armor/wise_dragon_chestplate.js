
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Wise Dragon Chestplate`,
		keyName: `wiseDragonChestplate`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Wise_Dragon_Chestplate:978508736933015614>`,
			url: `https://cdn.discordapp.com/emojis/978508736933015614.png`,
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
			materials: [[`Wise Dragon Fragment`, `wiseDragonFragment`, `<:Wise_Dragon_Fragment:978509337288904794>`, 80]]
		},
		armor: {
			stats: {
				health: 120,
				defense: 160,
				intelligence: 75
			},
			helmet: `wiseDragonHelmet`,
			chestplate: `wiseDragonChestplate`,
			leggings: `wiseDragonLeggings`,
			boots: `wiseDragonBoots`
		},
		equipData: {
			key: `chestplate`,
		},
		levelReq: {
			level: 16,
			skill: "Combat"
		},
		onEquip(_interaction, maidObj) {
			maidObj.chestplate = this.emoji.name;
		},
		key: `chestplate`,
		includeInParsing: true
	}
);