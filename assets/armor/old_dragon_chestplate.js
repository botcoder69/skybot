
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Old Dragon Chestplate`,
		keyName: `oldDragonChestplate`,
		description: ``,
		rarity: `Legendary`,
		emoji: {
			name: `<:Old_Dragon_Chestplate:978508699419176990>`,
			url: `https://cdn.discordapp.com/emojis/978508699419176990.png`,
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
			materials: [[`Old Dragon Fragment`, `oldDragonFragment`, `<:Old_Dragon_Fragment:978509327830773820>`, 80]]
		},
		armor: {
			stats: {
				health: 150,
				defense: 160,
			},
			helmet: `oldDragonHelmet`,
			chestplate: `oldDragonChestplate`,
			leggings: `oldDragonLeggings`,
			boots: `oldDragonBoots`
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