
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Old Dragon Helmet`,
		keyName: `oldDragonHelmet`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Old_Dragon_Helmet:978508701512138752>`,
			url: `https://cdn.discordapp.com/emojis/978508701512138752.png`,
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
			materials: [[`Old Dragon Fragment`, `oldDragonFragment`, `<:Old_Dragon_Fragment:978509327830773820>`, 50]]
		},
		armor: {
			stats: {
				health: 90,
				defense: 110,
			},
			helmet: `oldDragonHelmet`,
			chestplate: `oldDragonChestplate`,
			leggings: `oldDragonLeggings`,
			boots: `oldDragonBoots`
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