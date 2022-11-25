
const { Tool } = require('../../SkyblockHelper/src/index.js');

module.exports = new Tool(
	{
		search: [],
		group: "Tool",	
		name: `Gold Axe`,
		keyName: "goldAxe",
		description: "",
		rarity: "Common",
		emoji: {
			name: `<:Gold_Axe:817216806845677568>`,
			url: "https://cdn.discordapp.com/emojis/817216806845677568.png",
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
			materials: [[`gold`, `gold`, `<:Gold_Ingot:885715142522855494>`, 3], [`stick`, `stick`, `<:Stick:817260386180792320>`, 2]],
			outputs: 1
		},
		tool: {
			type: "axe",
			breakingPower: 1
		},
		equipData: {
			key: `axe`,
			value: `<:Gold_Axe:817216806845677568>` 
		},
		onEquip(_interaction, maidObj) {
			maidObj.axe = this.emoji.name;
		},
		key: `axe`,
		includeInParsing: true
	}
);