
const { Tool } = require('../../SkyblockHelper/src/index.js');

module.exports = new Tool(
	{
		search: [],
		group: "Tool",	
		name: `Iron Pickaxe`,
		keyName: "ironPickaxe",
		description: "",
		rarity: "Common",
		emoji: {
			name: `<:Iron_Pickaxe:817216520828092436>`,
			url: "https://cdn.discordapp.com/emojis/817216520828092436.png",
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
			type: "pickaxe",
			breakingPower: 3
		},
		equipData: {
			key: `pickaxe`,
			value: `<:Iron_Pickaxe:817216520828092436>` 
		},
		onEquip(_interaction, maidObj) {
			maidObj.pickaxe = this.emoji.name;
		},
		key: `pickaxe`,
		includeInParsing: true
	}
);