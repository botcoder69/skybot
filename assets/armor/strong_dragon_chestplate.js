
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Strong Dragon Chestplate`,
		keyName: `strongDragonChestplate`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Strong_Dragon_Chestplate:978508714170548266>`,
			url: `https://cdn.discordapp.com/emojis/978508714170548266.png`,
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
			materials: [[`Strong Dragon Fragment`, `strongDragonFragment`, `<:Strong_Dragon_Fragment:978509331794395137>`, 80]]
		},
		armor: {
			stats: {
				health: 120,
				defense: 160,
				strength: 25
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