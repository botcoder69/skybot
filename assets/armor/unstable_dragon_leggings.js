const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Unstable Dragon Leggings`,
		keyName: `unstableDragonLeggings`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Unstable_Dragon_Leggings:978508727118340097>`,
			url: `https://cdn.discordapp.com/emojis/978508727118340097.png`,
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
			materials: [[`Unstable Dragon Fragment`, `unstableDragonFragment`, `<:Unstable_Dragon_Fragment:978509335518928896>`, 70]]
		},
		armor: {
			stats: {
				health: 100,
				defense: 140,
				critChance: 5,
				critDamage: 15
			},
			helmet: `unstableDragonHelmet`,
			chestplate: `unstableDragonChestplate`,
			leggings: `unstableDragonLeggings`,
			boots: `unstableDragonBoots`
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