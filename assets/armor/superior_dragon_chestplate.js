
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Superior Dragon Chestplate`,
		keyName: `superiorDragonChestplate`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Superior_Dragon_Chestplate:978508721841901639>`,
			url: `https://cdn.discordapp.com/emojis/978508721841901639.png`,
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
			materials: [[`Superior Dragon Fragment`, `superiorDragonFragment`, `<:Superior_Dragon_Fragment:978509333673410560>`, 80]]
		},
		armor: {
			stats: {
				health: 150,
				defense: 190,
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
			key: `chestplate`,
		},
		levelReq: {
			level: 20,
			skill: "Combat"
		},
		onEquip(_interaction, maidObj) {
			maidObj.chestplate = this.emoji.name;
		},
		key: `chestplate`,
		includeInParsing: true
	}
);