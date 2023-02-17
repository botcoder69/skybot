
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Superior Dragon Leggings`,
		keyName: `superiorDragonLeggings`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Superior_Dragon_Leggings:978508719862190120>`,
			url: `https://cdn.discordapp.com/emojis/978508719862190120.png`,
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
			materials: [[`Superior Dragon Fragment`, `superiorDragonFragment`, `<:Superior_Dragon_Fragment:978509333673410560>`, 70]]
		},
		armor: {
			stats: {
				health: 130,
				defense: 170,
				strength: 10,
				speed: 3,
				critChance: 2,
				critDamage: 10,
				intelligence: 25,
			},
			helmet: `superiorDragonHelmet`,
			chestplate: `superiorDragonChestplate`,
			leggings: `superiorDragonLeggings`,
			boots: `superiorDragonBoots`
		},
		equipData: {
			key: `leggings`,
		},
		levelReq: {
			level: 20,
			skill: "Combat"
		},
		onEquip(_interaction, maidObj) {
			maidObj.leggings = this.emoji.name;
		},
		key: `leggings`,
		includeInParsing: true
	}
);