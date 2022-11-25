
const { MinionFuel } = require('../../SkyblockHelper/src/index.js');

module.exports = new MinionFuel(
	{
		search: [`magma bucket`, `magmabucket`],
		group: "Minion Fuel",
		name: `Magma Bucket`,
		keyName: "magmaBucket",
		description: "Originally, this item wasn't craftable because Skybot has no [Heat Core](https://hypixel-skyblock.fandom.com/wiki/Heat_Core) since that item required [Bits](https://hypixel-skyblock.fandom.com/wiki/Bits), which were obtainable by [Booster Cookies](https://hypixel-skyblock.fandom.com/wiki/Booster_Cookies), which were \"paid\", which Skybot can't do, since Skybot is **MOSTLY** a F2P bot, so it stayed as a hidden item eversince. Anyways, the addition of \"loot boxes\" allowed me to add \"Semi Pay-to-win items\" like this.",
		rarity: "Legendary",
		emoji: {
			name: `<:Enchanted_Lava_Bucket:894483282253713429>`,
			url: `https://cdn.discordapp.com/emojis/894483282253713429.png`
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
		},
		minionFuel: {
		// the duration this fuel will last in seconds
			duration: Infinity,
			// the multiplier this fuel will give your minion (1 * multiplier)
			multiplier: 1,
			// the speed in percent this fuel will give your minion (timeBetweenActions = Math.floor(timeBetweenActions * (speed / 100)))
			speed: 30,
			// Will the fuel be takeable from the minion after it is placed? Equals to false when not specified
			reclaimable: true
		},
		// There is no valid way of getting a heat core when you are a "F2P" player, plus I don't know how the heck will I implement this. They MAY be craftable in the future. FUTURE: Loot Boxes are implemented, so this item can therefore be added and still maintain the "F2P" part.
		includeInParsing: true
	}
);