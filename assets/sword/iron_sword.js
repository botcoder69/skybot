
const { Functions: { keepOldObjectProperty }, Sword } = require('../../SkyblockHelper/src/index.js');

module.exports = new Sword(
	{
		group: `Sword`,
		name: `Iron Sword`,
		keyName: `ironSword`,
		description: ``,
		rarity: `Common`,
		emoji: {
			name: `<:Iron_Sword:945957575487258634>`,
			url: `https://cdn.discordapp.com/emojis/945957575487258634.png`,
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
				[`iron`, `iron`, `<:Iron_Ingot:885715125305221120>`, 2]
			],
			outputs: 1
		},
		sword: {
			baseDamage: 30,
		},
		onEquip(interaction, maidObj) {
			const swordObj = {
				name: `Iron Sword`, 
				keyName: "ironSword",
				emoji: "<:Iron_Sword:945957575487258634>",
				baseDamage: 30,
				strength: 0,
				critChance: 0,
				enchantments: []
			};
			
			maidObj.sword = keepOldObjectProperty(maidObj.sword, swordObj, ['spiritButterflies', 'enchantments']);
		},
		swordFunc: {
			getBaseDamage() {
				return 30;
			},
			getSwordStats() {
				return `Damage: +30`;
			},
			getExamineStats() {
				return `Damage: +30`;
			}
		},
		key: `sword`,
		includeInParsing: true
	}
);