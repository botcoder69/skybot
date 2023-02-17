
const { Armor } = require('../../SkyblockHelper/src/index.js');

module.exports = new Armor(
	{
		search: [],
		group: `Armor`,    
		name: `Diamond Chestplate`,
		keyName: `diamondChestplate`,
		description: ``,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Diamond_Chestplate:948133448395161661>`,
			url: `https://cdn.discordapp.com/emojis/948133448395161661.png`,
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
			materials: [[`diamond`, `diamond`, `<:Diamond:902764556697341952>`, 8]]
		},
		armor: {
			stats: {
				defense: 40
			},
			helmet: `diamondHelmet`,
			chestplate: `diamondChestplate`,
			leggings: `diamondLeggings`,
			boots: `diamondBoots`
		},
		equipData: {
			key: `chestplate`,
			value: `<:Diamond_Chestplate:948133448395161661>`
		},
		onEquip(_interaction, maidObj) {
			maidObj.chestplate = this.emoji.name;
		},
		key: `chestplate`,
		includeInParsing: true
	}
);