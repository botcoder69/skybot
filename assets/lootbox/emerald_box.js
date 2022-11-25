
const { LootBox, Chancemaker } = require('../../SkyblockHelper/src/index.js');

module.exports = new LootBox(
	{
		search: [],
		group: `Loot Box`,    
		name: `Emerald Box`,
		keyName: `emeraldBox`,
		description: `A box that contains OP rewards. Artstyle and idea inspired by Dank Memer (best bot no cap).`,
		rarity: `Legendary`,
		emoji: {
			name: `<a:Emerald_Box:956735451622940693>`,
			url: `https://cdn.discordapp.com/emojis/956735451622940693.gif`,
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
			included: false,
			filterGroup: ""
		},
		includeInParsing: true,
		coins: {
			min: 100000,
			max: 1000000
		},
		loot: new Chancemaker()
			.setMinRolls(1)
			.setMaxRolls(5)
			.setRepeatingResults(false)
			.addEntries(
				{ 
					item: { 
						name: `Enchanted Diamond`, 
						keyName: `enchantedDiamond`, 
						emoji: `<:Enchanted_Diamond:902764556865142835>` 
					}, 
					chance: 50, 
					minAmount: 1, 
					maxAmount: 3 
				},
				{
					item: {
						name: `Enchanted Grilled Pork`,
						keyName: `enchantedGrilledPork`,
						emoji: `<:Enchanted_Grilled_Pork:953470025879146526>`
					},
					chance: 15,
					minAmount: 1,
					maxAmount: 2
				},
				{
					item: {
						name: `Spirit Butterfly`,
						keyName: `spiritButterfly`,
						emoji: `<:Spirit_Butterfly:942633700485632071>`
					},
					chance: 13,
					minAmount: 1,
					maxAmount: 1,
				},
				{
					item: {
						name: `Piggy Bank`,
						keyName: `piggyBank`,
						emoji: `<:Piggy_Bank:953469473480921098>`,
					},
					chance: 12,
					minAmount: 1,
					maxAmount: 2
				},
				{
					item: {
						name: `Plasma Bucket`,
						keyName: `plasmaBucket`,
						emoji: `<:Enchanted_Lava_Bucket:894483282253713429>`
					},
					chance: 8,
					minAmount: 1,
					maxAmount: 1
				},
				{
					item: {
						name: `Aspect of the Spirit Butterfly`,
						keyName: `aspectOfTheSpiritButterfly`,
						emoji: `<:Aspect_Of_The_Spirit_Butterfly:945957788155273226>`
					},
					chance: 1,
					minAmount: 1,
					maxAmount: 1
				},
				{
					item: {
						name: `Aspect of the Seas`,
						keyName: `aspectOfTheSeas`,
						emoji: `<:Aspect_Of_The_Seas:963296785038704690>`
					},
					chance: 1,
					minAmount: 1,
					maxAmount: 1
				}
			)
	}
);