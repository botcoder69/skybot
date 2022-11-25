
const { PowerUp } = require('../../SkyblockHelper/src/index.js');

module.exports = new PowerUp(
	{
		group: `Power-up`,
		name: `Four Leaf Clover`,
		keyName: `fourLeafClover`,
		description: `A lucky four leaf clover! Use this item to increase luck in certain commands such as \`/mine\` and \`/fish\` for 20 minutes!`,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Four_Leaf_Clover:948095805619859537>`,
			url: `https://cdn.discordapp.com/emojis/948095805619859537.png`,
		},
		NPC: {
			sell: {
				sellable: true,
				price: 37_500
			},
			buy: {
				buyable: true,
				price: 75_000
			}
		},
		sellall: {
			included: false,
			filterGroup: ``
		},
		equipData: {
			key: `activeItems`,
			value: {
				name: `Four Leaf Clover`,
				keyName: `fourLeafClover`,
				emoji: `<:Four_Leaf_Clover:948095805619859537>`,
				expAfter: 1200000 
			}
		},
		onEquip(interaction, maidObj) {
			if (!maidObj.activeItems) {
				maidObj.activeItems = [
					{
						keyName: this.keyName,
						endTimestamp: Date.now() + 1_200_000
					}
				];
			} else {
				maidObj.activeItems.push(
					{
						keyName: this.keyName,
						endTimestamp: Date.now() + 1_200_000
					}
				);
			}
		},
		includeInParsing: true
	}
);