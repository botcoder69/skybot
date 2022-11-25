
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Strong Dragon Boots`,
		keyName: `strongDragonBoots`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Strong_Dragon_Boots:978508710974455868>`,
			url: `https://cdn.discordapp.com/emojis/978508710974455868.png`,
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
			materials: [[`Strong Dragon Fragment`, `strongDragonFragment`, `<:Strong_Dragon_Fragment:978509331794395137>`, 70]]
		},
		armor: {
			stats: {
				health: 100,
				defense: 140,
				strength: 25
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