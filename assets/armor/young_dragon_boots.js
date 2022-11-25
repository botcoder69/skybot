const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Young Dragon Boots`,
		keyName: `youngDragonBoots`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Young_Dragon_Boots:978508741169258506>`,
			url: `https://cdn.discordapp.com/emojis/978508741169258506.png`,
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
			materials: [[`Young Dragon Fragment`, `youngDragonFragment`, `<:Young_Dragon_Fragment:978509338844995634>`, 40]]
		},
		armor: {
			stats: {
				health: 60,
				defense: 90,
				speed: 20
			},
			helmet: `youngDragonHelmet`,
			chestplate: `youngDragonChestplate`,
			leggings: `youngDragonLeggings`,
			boots: `youngDragonBoots`
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