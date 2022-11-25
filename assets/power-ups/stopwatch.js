
const { PowerUp } = require('../../SkyblockHelper/src/index.js');

module.exports = new PowerUp(
	{
		group: `Power-up`,
		name: `Stopwatch`,
		keyName: `stopwatch`,
		description: `A stopwatch to keep track of time! Use this item to decrease your command cooldown by 25% for 30 minutes!`,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Stopwatch:950327115558043679>`,
			url: `https://cdn.discordapp.com/emojis/950327115558043679.png`,
		},
		NPC: {
			sell: {
				sellable: true,
				price: 50_000
			},
			buy: {
				buyable: true,
				price: 100_000
			}
		},
		sellall: {
			included: false,
			filterGroup: ``
		},
		equipData: {
			key: `activeItems`,
			value: {
				name: `Stopwatch`,
				keyName: `stopwatch`,
				emoji: `<:Stopwatch:950327115558043679>`,
				expAfter: 1_800_000 
			}
		},
		onEquip(interaction, maidObj) {
			if (!maidObj.activeItems) {
				maidObj.activeItems = [
					{
						keyName: this.keyName,
						endTimestamp: Date.now() + 1_800_000
					}
				];
			} else {
				maidObj.activeItems.push(
					{
						keyName: this.keyName,
						endTimestamp: Date.now() + 1_800_000
					}
				);
			}
		},
		includeInParsing: true
	}
);