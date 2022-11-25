
const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		search: [],
		group: `Item`,
		name: `Enhanced Lightning Gemstone`,
		keyName: `enhancedLightningGemstone`,
		description: `A gemstone that continues to crackle with lightning energy. On very rare instances, lightning strikes a lightning gemstone's shell, destroying it and overfilling the energy inside with more lightning power. This allows the gemstone to continously create crackle noises. This gemstone was once used to craft a weapon that was full to the brim with power.`,
		rarity: `Legendary`,
		emoji: {
			name: `<:Enhanced_Lightning_Gemstone:1021244024960593920>`,
			url: `https://cdn.discordapp.com/emojis/1021244024960593920.png`,
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
			filterGroup: ``
		},
		includeInParsing: true
	}
);