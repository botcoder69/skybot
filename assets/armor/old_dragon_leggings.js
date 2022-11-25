
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Old Dragon Leggings`,
		keyName: `oldDragonLeggings`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Old_Dragon_Leggings:978508697619804182>`,
			url: `https://cdn.discordapp.com/emojis/978508697619804182.png`,
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
			materials: [[`Old Dragon Fragment`, `oldDragonFragment`, `<:Old_Dragon_Fragment:978509327830773820>`, 70]]
		},
		armor: {
			stats: {
				health: 130,
				defense: 140,
			},
			helmet: `oldDragonHelmet`,
			chestplate: `oldDragonChestplate`,
			leggings: `oldDragonLeggings`,
			boots: `oldDragonBoots`
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