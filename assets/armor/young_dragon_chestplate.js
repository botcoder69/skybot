const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Young Dragon Chestplate`,
		keyName: `youngDragonChestplate`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Young_Dragon_Chestplate:978508744545681458>`,
			url: `https://cdn.discordapp.com/emojis/978508744545681458.png`,
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
			materials: [[`Young Dragon Fragment`, `youngDragonFragment`, `<:Young_Dragon_Fragment:978509338844995634>`, 80]]
		},
		armor: {
			stats: {
				health: 120,
				defense: 160,
				speed: 20
			},
			helmet: `youngDragonHelmet`,
			chestplate: `youngDragonChestplate`,
			leggings: `youngDragonLeggings`,
			boots: `youngDragonBoots`
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