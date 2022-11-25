
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Protector Dragon Helmet`,
		keyName: `protectorDragonHelmet`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Protector_Dragon_Helmet:978508708986363934>`,
			url: `https://cdn.discordapp.com/emojis/978508708986363934.png`,
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
			materials: [[`Protector Dragon Fragment`, `protectorDragonFragment`, `<:Protector_Dragon_Fragment:978509330146033674>`, 50]]
		},
		armor: {
			stats: {
				health: 70,
				defense: 135,
			},
			helmet: `protectorDragonHelmet`,
			chestplate: `protectorDragonChestplate`,
			leggings: `protectorDragonLeggings`,
			boots: `protectorDragonBoots`
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