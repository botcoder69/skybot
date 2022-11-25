const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Young Dragon Helmet`,
		keyName: `youngDragonHelmet`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Young_Dragon_Helmet:978508746173071421>`,
			url: `https://cdn.discordapp.com/emojis/978508746173071421.png`,
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
			materials: [[`Young Dragon Fragment`, `youngDragonFragment`, `<:Young_Dragon_Fragment:978509338844995634>`, 50]]
		},
		armor: {
			stats: {
				health: 70,
				defense: 110,
				speed: 20
			},
			helmet: `youngDragonHelmet`,
			chestplate: `youngDragonChestplate`,
			leggings: `youngDragonLeggings`,
			boots: `youngDragonBoots`
		},
		equipData: {
			key: `helmet`,
		},
		levelReq: {
			level: 16,
			skill: "Combat"
		},
		onEquip(_interaction, maidObj) {
			maidObj.helmet = this.emoji.name;
		},
		key: `helmet`,
		includeInParsing: true
	}
);