
const { Tool } = require('../../SkyblockHelper/src/index.js');

module.exports = new Tool(
	{
		search: [],
		group: "Tool",	
		name: `Diamond Axe`,
		keyName: "diamondAxe",
		description: "",
		rarity: "Uncommon",
		emoji: {
			name: `<:Diamond_Axe:817216864626802771>`,
			url: "https://cdn.discordapp.com/emojis/817216864626802771.png",
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
			materials: [[`diamond`, `diamond`, `<:Diamond:902764556697341952>`, 3], [`stick`, `stick`, `<:Stick:817260386180792320>`, 2]],
			outputs: 1
		},
		tool: {
			type: "axe",
			breakingPower: 4
		},
		equipData: {
			key: `axe`,
			value: `<:Diamond_Axe:817216864626802771>` 
		},
		onEquip(_interaction, maidObj) {
			maidObj.axe = this.emoji.name;
		},
		key: `axe`,
		includeInParsing: true
	}
);