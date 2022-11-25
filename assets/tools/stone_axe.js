
const { Tool } = require('../../SkyblockHelper/src/index.js');

module.exports = new Tool(
	{
		search: [],
		group: "Tool",	
		name: `Stone Axe`,
		keyName: "stoneAxe",
		description: "",
		rarity: "Common",
		emoji: {
			name: `<:Stone_Axe:817216694837706793>`,
			url: "https://cdn.discordapp.com/emojis/817216694837706793.png",
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
			type: "axe",
			breakingPower: 2
		},
		equipData: {
			key: `axe`,
			value: `<:Stone_Axe:817216694837706793>` 
		},
		onEquip(_interaction, maidObj) {
			maidObj.axe = this.emoji.name;
		},
		key: `axe`,
		includeInParsing: true
	}
);