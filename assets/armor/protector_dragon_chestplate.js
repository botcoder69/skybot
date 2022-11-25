
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Protector Dragon Chestplate`,
		keyName: `protectorDragonChestplate`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Protector_Dragon_Chestplate:978508707170234408>`,
			url: `https://cdn.discordapp.com/emojis/978508707170234408.png`,
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
			materials: [[`Protector Dragon Fragment`, `protectorDragonFragment`, `<:Protector_Dragon_Fragment:978509330146033674>`, 80]]
		},
		armor: {
			stats: {
				health: 120,
				defense: 185,
			},
			helmet: `protectorDragonHelmet`,
			chestplate: `protectorDragonChestplate`,
			leggings: `protectorDragonLeggings`,
			boots: `protectorDragonBoots`
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