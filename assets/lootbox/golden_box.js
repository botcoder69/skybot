
const { LootBox, Chancemaker } = require('../../SkyblockHelper/src/index.js');

module.exports = new LootBox(
	{
		search: [],
		group: `Loot Box`,    
		name: `Golden Box`,
		keyName: `goldenBox`,
		description: `A box that will contain average rewards. Right now it does absolutely nothing, except being a collectable. Artstyle and idea inspired by Dank Memer.`,
		rarity: `Rare`,
		emoji: {
			name: `<a:Golden_Box:956735326800478258>`,
			url: `https://cdn.discordapp.com/emojis/956735326800478258.gif`,
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
		includeInParsing: false,
		coins: {

		},
		loot: new Chancemaker()
			.setMinRolls(1)
			.setMaxRolls(2)
			.setRepeatingResults(false)
			.addEntries(
				{
					item: {
						name: `Enchanted Lava Bucket`,
						keyName: `enchantedLavaBucket`,
						emoji: `<:Enchanted_Lava_Bucket:894483282253713429>`
					},
					chance: 9,
					minAmount: 1,
					maxAmount: 1
				},
				{
					item: {
						name: `bruh`,
						keyName: `bruh`,
						emoji: `bruh`
					},
					chance: 69
				}
			)
	}
);