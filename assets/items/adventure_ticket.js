const { Item } = require('../../SkyblockHelper/src/index.js');

module.exports = new Item(
	{
		group: `Item`,    
		name: `Adventure Ticket`,
		keyName: `adventureTicket`,
		description: `A ticket to start up an adventure in \`/adventure\`!`,
		rarity: `Rare`,
		emoji: {
			name: `<:Ticket:955745457181716480>`,
			url: `https://cdn.discordapp.com/emojis/955745457181716480.png`,
		},
		NPC: {
			sell: {
				sellable: false,
				price: 0
			},
			buy: {
				buyable: true,
				price: 80_000
			}
		},
		sellall: {
			included: false
		},
		includeInParsing: true
	}
);