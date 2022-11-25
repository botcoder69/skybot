const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,    
		name: `Dummy`,
		keyName: `dummy`,
		description: `A training dummy. You can use this dummy to test out your Sword's Abilites using \`/fight dummy\`. Be careful though, since the wood wont last a lot of attacks. Has a chance to break.`,
		rarity: `Common`,
		emoji: {
			name: `<:Dummy:963296810598809631>`,
			url: `https://cdn.discordapp.com/emojis/963296810598809631.png`,
		},
		NPC: {
			sell: {
				sellable: true,
				price: 12_500
			},
			buy: {
				buyable: true,
				price: 25_000
			}
		},
		includeInParsing: true
	}
);