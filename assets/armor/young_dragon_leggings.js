const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Young Dragon Leggings`,
		keyName: `youngDragonLeggings`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Young_Dragon_Leggings:978508743044120637>`,
			url: `https://cdn.discordapp.com/emojis/978508743044120637.png`,
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
			materials: [[`Young Dragon Fragment`, `youngDragonFragment`, `<:Young_Dragon_Fragment:978509338844995634>`, 70]]
		},
		armor: {
			stats: {
				health: 100,
				defense: 140,
				speed: 20
			},
			helmet: `youngDragonHelmet`,
			chestplate: `youngDragonChestplate`,
			leggings: `youngDragonLeggings`,
			boots: `youngDragonBoots`
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