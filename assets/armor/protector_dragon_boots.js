
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Protector Dragon Boots`,
		keyName: `protectorDragonBoots`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Protector_Dragon_Boots:978508703483453460>`,
			url: `https://cdn.discordapp.com/emojis/978508703483453460.png`,
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
			materials: [[`Protector Dragon Fragment`, `protectorDragonFragment`, `<:Protector_Dragon_Fragment:978509330146033674>`, 40]]
		},
		armor: {
			stats: {
				health: 60,
				defense: 115,
			},
			helmet: `protectorDragonHelmet`,
			chestplate: `protectorDragonChestplate`,
			leggings: `protectorDragonLeggings`,
			boots: `protectorDragonBoots`
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