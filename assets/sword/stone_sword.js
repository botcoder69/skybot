
const { Functions: { keepOldObjectProperty }, Sword } = require('../../SkyblockHelper/src/index.js');

module.exports = new Sword(
	{
		group: `Sword`,
		name: `Stone Sword`,
		keyName: `stoneSword`,
		description: ``,
		rarity: `Common`,
		emoji: {
			name: `<:Stone_Sword:945957556461916190>`,
			url: `https://cdn.discordapp.com/emojis/945957605577228339.png`,
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
		crafting: {
			type: `one-to-one`,
			materials: [
				[`stick`, `stick`, `<:Stick:817260386180792320>`, 1],
				[`cobblestone`, `cobblestone`, `<:Cobblestone:816984558317600799>`, 2]
			],
			outputs: 1
		},
		sword: {
			baseDamage: 25,
		},
		onEquip(interaction, maidObj) {
			const swordObj = {
				name: `Stone Sword`, 
				keyName: "stoneSword",
				emoji: "<:Stone_Sword:945957556461916190>",
				baseDamage: 25,
				strength: 0,
				critChance: 0,
				enchantments: []
			};
			
			maidObj.sword = keepOldObjectProperty(maidObj.sword, swordObj, ['spiritButterflies', 'enchantments']);
		},
		swordFunc: {
			getBaseDamage() {
				return 25;
			},
			getSwordStats() {
				return `Damage: +25`;
			},
			getExamineStats() {
				return `Damage: +25`;
			}
		},
		key: `sword`,
		includeInParsing: true
	}
);