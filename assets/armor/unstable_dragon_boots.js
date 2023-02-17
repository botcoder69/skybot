
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Unstable Dragon Boots`,
		keyName: `unstableDragonBoots`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Unstable_Dragon_Boots:978508725465784330>`,
			url: `https://cdn.discordapp.com/emojis/978508725465784330.png`,
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
			materials: [[`Unstable Dragon Fragment`, `unstableDragonFragment`, `<:Unstable_Dragon_Fragment:978509335518928896>`, 40]]
		},
		armor: {
			stats: {
				health: 60,
				defense: 90,
				critChance: 5,
				critDamage: 15
			},
			helmet: `unstableDragonHelmet`,
			chestplate: `unstableDragonChestplate`,
			leggings: `unstableDragonLeggings`,
			boots: `unstableDragonBoots`
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