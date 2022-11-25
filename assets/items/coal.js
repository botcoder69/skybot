
const { MinionFuel } = require('../../SkyblockHelper/src/index.js');

module.exports = new MinionFuel(
	{
		group: `Minion Fuel`,
		name: `Coal`,
		keyName: `coal`,
		description: `A fuel source found from mining coal ore in the Deepmines. Used for smelting ores.`,
		rarity: `Common`,
		emoji: {
			name: `<:Coal:816982880802439178>`,
			url: `https://cdn.discordapp.com/emojis/816982880802439178.png?v=1`,
		},
		NPC: {
			sell: {
				sellable: true,
				price: 2
			},
			buy: {
				buyable: true,
				price: 4
			}
		},
		sellall: {
			included: true,
			filterGroup: "minerals"
		},
		minionFuel: {
		// the duration this fuel will last in seconds
			duration: 1800,
			// the multiplier this fuel will give your minion (1 * multiplier)
			multiplier: 1,
			// the speed in percent this fuel will give your minion (timeBetweenActions = Math.floor(timeBetweenActions * (speed / 100)))
			speed: 10,
			// 
			reclaimable: false
		},
		includeInParsing: true
	}
);