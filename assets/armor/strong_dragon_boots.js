
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Strong Dragon Leggings`,
		keyName: `strongDragonLeggings`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Strong_Dragon_Leggings:978508712614461460>`,
			url: `https://cdn.discordapp.com/emojis/978508712614461460.png`,
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
			materials: [[`Strong Dragon Fragment`, `strongDragonFragment`, `<:Strong_Dragon_Fragment:978509331794395137>`, 40]]
		},
		armor: {
			stats: {
				health: 60,
				defense: 90,
				strength: 25
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