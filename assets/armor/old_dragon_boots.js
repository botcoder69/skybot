
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Old Dragon Boots`,
		keyName: `oldDragonBoots`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Old_Dragon_Boots:978508695715610664>`,
			url: `https://cdn.discordapp.com/emojis/978508695715610664.png`,
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
			materials: [[`Old Dragon Fragment`, `oldDragonFragment`, `<:Old_Dragon_Fragment:978509327830773820>`, 40]]
		},
		armor: {
			stats: {
				health: 80,
				defense: 90,
			},
			helmet: `oldDragonHelmet`,
			chestplate: `oldDragonChestplate`,
			leggings: `oldDragonLeggings`,
			boots: `oldDragonBoots`
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