
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: "Item",
		name: `Enchanted Redstone Block`,
		keyName: "enchantedRedstoneBlock",
		description: "A block full of power that is capable of running thousands of circuits all by itself. Found from fusing 80 enchanted redstone dust together. Used for crafting bits and pieces that require tons of power.",
		rarity: "Rare",
		emoji: {
			name: `<:Enchanted_Redstone_Block:907504987322613800>`,
			url: "https://cdn.discordapp.com/emojis/907504987322613800.png",
		},
		NPC: {
			sell: {
				sellable: true,
				price: 25600
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
			materials: [[`enchanted redstone`, `enchantedRedstone`, `<:Enchanted_Redstone:907504986919936010>`, 80]]
		},
		includeInParsing: true,
		levelReq: {
			emoji: `<:Mining:885390554198868020>`,
			id: `mineLevel`,
			level: 10,
			skill: `Mining`
		}
	}
);