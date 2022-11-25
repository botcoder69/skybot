
const { Tool } = require('../../SkyblockHelper/src/index.js');

module.exports = new Tool(
	{
		search: [],
		group: "Tool",	
		name: `Diamond Pickaxe`,
		keyName: "diamondPickaxe",
		description: "",
		rarity: "Uncommon",
		emoji: {
			name: `<:Diamond_Pickaxe:817216616084930602>`,
			url: "https://cdn.discordapp.com/emojis/817216616084930602.png",
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
			type: "pickaxe",
			breakingPower: 4
		},
		equipData: {
			key: `pickaxe`,
			value: `<:Diamond_Pickaxe:817216616084930602>` 
		},
		onEquip(_interaction, maidObj) {
			maidObj.pickaxe = this.emoji.name;
		},
		key: `pickaxe`,
		includeInParsing: true
	}
);