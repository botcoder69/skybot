
const { LootBox, Chancemaker } = require('../../SkyblockHelper/src/index.js');

module.exports = new LootBox(
	{
		search: [],
		group: `Loot Box`,    
		name: `Diamond Box`,
		keyName: `diamondBox`,
		description: `A box that will contain kinda OP rewards. Right now it does absolutely nothing, except being a collectable. Artstyle and idea inspired by Dank Memer.`,
		rarity: `Epic`,
		emoji: {
			name: `<a:Diamond_Box:956735439480422430>`,
			url: `https://cdn.discordapp.com/emojis/956735439480422430.gif`,
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
			max: 500000
		},
		loot: new Chancemaker()
			.setMinRolls(1)
			.setMaxRolls(4)
			.setRepeatingResults(false)
			.addEntries(
				{
					item: {
						name: `Dummy`,
						keyName: `dummy`,
						emoji: `<:Dummy:963296810598809631>`
					},
					chance: 40,
					minAmount: 3,
					maxAmount: 10
				},
				{
					item: {
						name: `Stopwatch`,
						keyName: `stopwatch`,
						emoji: `<:Stopwatch:950327115558043679>`
					},
					chance: 30,
					minAmount: 7,
					maxAmount: 20
				},
				{
					item: {
						name: `Magma Bucket`,
						keyName: `magmaBucket`,
						emoji: `<:Enchanted_Lava_Bucket:894483282253713429>`
					},
					chance: 14,
					minAmount: 1,
					maxAmount: 1
				},
				{
					item: {
						name: `Hilt of the Seas`,
						keyName: `hiltOfTheSeas`,
						emoji: `<:Hilt_of_the_Seas:965489391285973003>`
					},
					chance: 5,
					minAmount: 1,
					maxAmount: 1
				},
				{
					item: {
						name: `First Fragment of the Seas`,
						keyName: `firstFragmentOfTheSeas`,
						emoji: `<:First_Fragment_of_the_Seas:965489410302935110>`
					},
					chance: 5,
					minAmount: 1,
					maxAmount: 1
				},
				{
					item: {
						name: `Second Fragment of the Seas`,
						keyName: `secondFragmentOfTheSeas`,
						emoji: `<:Second_Fragment_of_the_Seas:965489428137144403>`
					},
					chance: 5,
					minAmount: 1,
					maxAmount: 1
				},
				{
					item: {
						name: `Collectable Rick Astley`,
						keyName: `rickAstley`,
						emoji: `<a:Rick_Astley:968350999465058345>`
					},
					chance: 1,
					minAmount: 1,
					maxAmount: 2
				}
			)
	}
);