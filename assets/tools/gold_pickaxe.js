
const { Tool } = require('../../SkyblockHelper/src/index.js');

module.exports = new Tool(
	{
		search: [],
		group: "Tool",	
		name: `Gold Pickaxe`,
		keyName: "goldPickaxe",
		description: "",
		rarity: "Common",
		emoji: {
			name: `<:Gold_Pickaxe:817216581859409971>`,
			url: "https://cdn.discordapp.com/emojis/817216581859409971.png",
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
			type: "pickaxe",
			breakingPower: 1
		},
		equipData: {
			key: `pickaxe`,
			value: `<:Gold_Pickaxe:817216581859409971>` 
		},
		onEquip(_interaction, maidObj) {
			maidObj.pickaxe = this.emoji.name;
		},
		key: `pickaxe`,
		includeInParsing: true
	}
);