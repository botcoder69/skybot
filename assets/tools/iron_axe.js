
const { Tool } = require('../../SkyblockHelper/src/index.js');

module.exports = new Tool(
	{
		search: [],
		group: "Tool",	
		name: `Iron Axe`,
		keyName: "ironAxe",
		description: "",
		rarity: "Common",
		emoji: {
			name: `<:Iron_Axe:817216753062510633>`,
			url: "https://cdn.discordapp.com/emojis/817216753062510633.png",
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
			materials: [[`iron`, `iron`, `<:Iron_Ingot:885715125305221120>`, 3], [`stick`, `stick`, `<:Stick:817260386180792320>`, 2]],
			outputs: 1
		},
		tool: {
			type: "axe",
			breakingPower: 3
		},
		equipData: {
			key: `axe`,
			value: `<:Iron_Axe:817216753062510633>` 
		},
		onEquip(_interaction, maidObj) {
			maidObj.axe = this.emoji.name;
		},
		key: `axe`,
		includeInParsing: true
	}
);