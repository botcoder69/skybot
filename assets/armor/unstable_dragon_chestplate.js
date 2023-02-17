const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Unstable Dragon Chestplate`,
		keyName: `unstableDragonChestplate`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Unstable_Dragon_Chestplate:978508728951259186>`,
			url: `https://cdn.discordapp.com/emojis/978508728951259186.png`,
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
			materials: [[`Unstable Dragon Fragment`, `unstableDragonFragment`, `<:Unstable_Dragon_Fragment:978509335518928896>`, 80]]
		},
		armor: {
			stats: {
				health: 120,
				defense: 160,
				critChance: 5,
				critDamage: 15
			},
			helmet: `unstableDragonHelmet`,
			chestplate: `unstableDragonChestplate`,
			leggings: `unstableDragonLeggings`,
			boots: `unstableDragonBoots`
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