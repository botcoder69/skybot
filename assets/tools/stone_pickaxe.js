
const { Tool } = require('../../SkyblockHelper/src/index.js');

module.exports = new Tool(
	{
		search: [],
		group: "Tool",	
		name: `Stone Pickaxe`,
		keyName: "stonePickaxe",
		description: "",
		rarity: "Common",
		emoji: {
			name: `<:Stone_Pickaxe:817216446899028011>`,
			url: "https://cdn.discordapp.com/emojis/817216446899028011.png",
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
			materials: [[`cobblestone`, `cobblestone`, `<:Cobblestone:816984558317600799>`, 3], [`stick`, `stick`, `<:Stick:817260386180792320>`, 2]],
			outputs: 1
		},
		tool: {
			type: "pickaxe",
			breakingPower: 2
		},
		equipData: {
			key: `pickaxe`,
			value: `<:Stone_Pickaxe:817216446899028011>` 
		},
		onEquip(_interaction, maidObj) {
			maidObj.pickaxe = this.emoji.name;
		},
		key: `pickaxe`,
		includeInParsing: true
	}
);