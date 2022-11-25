
const { Functions: { keepOldObjectProperty }, Sword } = require('../../SkyblockHelper/src/index.js');

module.exports = new Sword(
	{
		group: `Sword`,
		name: `Diamond Sword`,
		keyName: `diamondSword`,
		description: ``,
		rarity: `Uncommon`,
		emoji: {
			name: `<:Diamond_Sword:945957605577228339>`,
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
				[`diamond`, `diamond`, `<:Diamond:902764556697341952>`, 2]
			],
			outputs: 1
		},
		sword: {
			baseDamage: 35,
		},
		onEquip(interaction, maidObj) {
			const swordObj = {
				name: `Diamond Sword`, 
				keyName: "diamondSword",
				emoji: "<:Diamond_Sword:945957605577228339>",
				baseDamage: 35,
				strength: 0,
				critChance: 0,
				enchantments: []
			};
			
			maidObj.sword = keepOldObjectProperty(maidObj.sword, swordObj, ['spiritButterflies', 'enchantments']);
		},
		swordFunc: {
			getBaseDamage() {
				return 35;
			},
			getSwordStats() {
				return `Damage: +35`;
			},
			getExamineStats() {
				return `Damage: +35`;
			}
		},
		key: `sword`,
		includeInParsing: true
	}
);