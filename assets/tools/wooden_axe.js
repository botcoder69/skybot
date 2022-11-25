
const { Tool } = require('../../SkyblockHelper/src/index.js');

module.exports = new Tool(
	{
		search: [],
		group: "Tool",	
		name: `Wooden Axe`,
		keyName: "woodenAxe",
		description: "",
		rarity: "Common",
		emoji: {
			name: `<:Wooden_Axe:817217337261424650>`,
			url: "https://cdn.discordapp.com/emojis/817217337261424650.png",
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
			type: "axe",
			breakingPower: 1
		},
		equipData: {
			key: `axe`,
			value: `<:Wooden_Axe:817217337261424650>` 
		},
		onEquip(_interaction, maidObj) {
			maidObj.axe = this.emoji.name;
		},
		key: `axe`,
		includeInParsing: true
	}
);