
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Protector Dragon Leggings`,
		keyName: `protectorDragonLeggings`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Protector_Dragon_Leggings:978508705307975780>`,
			url: `https://cdn.discordapp.com/emojis/978508705307975780.png`,
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
			materials: [[`Protector Dragon Fragment`, `protectorDragonFragment`, `<:Protector_Dragon_Fragment:978509330146033674>`, 70]]
		},
		armor: {
			stats: {
				health: 100,
				defense: 165,
			},
			helmet: `protectorDragonHelmet`,
			chestplate: `protectorDragonChestplate`,
			leggings: `protectorDragonLeggings`,
			boots: `protectorDragonBoots`
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