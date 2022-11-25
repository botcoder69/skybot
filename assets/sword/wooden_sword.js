
const { Functions: { keepOldObjectProperty }, Sword } = require('../../SkyblockHelper/src/index.js');

module.exports = new Sword(
	{
		group: `Sword`,
		name: `Wooden Sword`,
		keyName: `woodenSword`,
		description: ``,
		rarity: `Common`,
		emoji: {
			name: `<:Wooden_Sword:945957542280970300>`,
			url: `https://cdn.discordapp.com/emojis/945957542280970300.png`,
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
				[`planks`, `planks`, `<:Oak_Planks:885390616194875412>`, 2]
			],
			outputs: 1
		},
		sword: {
			baseDamage: 20,
		},
		onEquip(interaction, maidObj) {
			const swordObj = {
				name: `Wooden Sword`, 
				keyName: "woodenSword",
				emoji: "<:Wooden_Sword:945957542280970300>",
				baseDamage: 20,
				strength: 0,
				critChance: 0,
				enchantments: []
			};
			
			maidObj.sword = keepOldObjectProperty(maidObj.sword, swordObj, ['spiritButterflies', 'enchantments']);
		},
		swordFunc: {
			getBaseDamage() {
				return 20;
			},
			getSwordStats() {
				return `Damage: +20`;
			},
			getExamineStats() {
				return `Damage: +20`;
			}
		},
		key: `sword`,
		includeInParsing: true
	}
);