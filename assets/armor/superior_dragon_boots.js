
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Superior Dragon Boots`,
		keyName: `superiorDragonBoots`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Superior_Dragon_Boots:978508717928636416>`,
			url: `https://cdn.discordapp.com/emojis/978508717928636416.png`,
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
			materials: [[`Superior Dragon Fragment`, `superiorDragonFragment`, `<:Superior_Dragon_Fragment:978509333673410560>`, 40]]
		},
		armor: {
			stats: {
				health: 80,
				defense: 110,
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
			key: `boots`,
		},
		levelReq: {
			level: 20,
			skill: "Combat"
		},
		onEquip(_interaction, maidObj) {
			maidObj.boots = this.emoji.name;
		},
		key: `boots`,
		includeInParsing: true
	}
);