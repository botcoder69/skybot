
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Superior Dragon Helmet`,
		keyName: `superiorDragonHelmet`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Superior_Dragon_Helmet:978508723695779921>`,
			url: `https://cdn.discordapp.com/emojis/978508723695779921.png`,
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
			materials: [[`Superior Dragon Fragment`, `superiorDragonFragment`, `<:Superior_Dragon_Fragment:978509333673410560>`, 50]]
		},
		armor: {
			stats: {
				health: 90,
				defense: 130,
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
			key: `helmet`,
		},
		levelReq: {
			level: 20,
			skill: "Combat"
		},
		onEquip(_interaction, maidObj) {
			maidObj.helmet = this.emoji.name;
		},
		key: `helmet`,
		includeInParsing: true
	}
);