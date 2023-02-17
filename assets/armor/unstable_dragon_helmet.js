
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Unstable Dragon Helmet`,
		keyName: `unstableDragonHelmet`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Unstable_Dragon_Helmet:978508730725437450>`,
			url: `https://cdn.discordapp.com/emojis/978508730725437450.png`,
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
			materials: [[`Unstable Dragon Fragment`, `unstableDragonFragment`, `<:Unstable_Dragon_Fragment:978509335518928896>`, 50]]
		},
		armor: {
			stats: {
				health: 70,
				defense: 110,
				critChance: 5,
				critDamage: 15,
				inteligence: 25
			},
			helmet: `unstableDragonHelmet`,
			chestplate: `unstableDragonChestplate`,
			leggings: `unstableDragonLeggings`,
			boots: `unstableDragonBoots`
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