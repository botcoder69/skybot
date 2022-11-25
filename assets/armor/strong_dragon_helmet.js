
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Strong Dragon Helmet`,
		keyName: `strongDragonHelmet`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Strong_Dragon_Helmet:978508716297052230>`,
			url: `https://cdn.discordapp.com/emojis/978508716297052230.png`,
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
			materials: [[`Strong Dragon Fragment`, `strongDragonFragment`, `<:Strong_Dragon_Fragment:978509331794395137>`, 50]]
		},
		armor: {
			stats: {
				health: 70,
				defense: 110,
				strength: 25
			},
			helmet: `strongDragonHelmet`,
			chestplate: `strongDragonChestplate`,
			leggings: `strongDragonLeggings`,
			boots: `strongDragonBoots`
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