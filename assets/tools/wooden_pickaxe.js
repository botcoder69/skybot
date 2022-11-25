
const { Tool } = require('../../SkyblockHelper/src/index.js');

module.exports = new Tool(
	{
		search: [],
		group: "Tool",	
		name: `Wooden Pickaxe`,
		keyName: "woodenPickaxe",
		description: "",
		rarity: "Common",
		emoji: {
			name: `<:Wooden_Pickaxe:817217441394196572>`,
			url: "https://cdn.discordapp.com/emojis/817217441394196572.png",
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
			materials: [[`planks`, `planks`, `<:Oak_Planks:817261928212463616>`, 3], [`stick`, `stick`, `<:Stick:817260386180792320>`, 2]],
			outputs: 1
		},
		tool: {
			type: "pickaxe",
			breakingPower: 1
		},
		equippable: true,
		equipData: {
			key: `pickaxe`,
			value: `<:Wooden_Pickaxe:817217441394196572>` 
		},
		onEquip(_interaction, maidObj) {
			maidObj.pickaxe = this.emoji.name;
		},
		key: `pickaxe`,
		includeInParsing: true
	}
);