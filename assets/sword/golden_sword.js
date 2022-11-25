
const { Functions: { keepOldObjectProperty }, Sword } = require('../../SkyblockHelper/src/index.js');

module.exports = new Sword(
	{
		group: `Sword`,
		name: `Golden Sword`,
		keyName: `goldenSword`,
		description: ``,
		rarity: `Common`,
		emoji: {
			name: `<:Golden_Sword:945957590951669800>`,
			url: `https://cdn.discordapp.com/emojis/945957590951669800.png`,
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
				[`gold`, `gold`, `<:Gold_Ingot:885715142522855494>`, 2]
			],
			outputs: 1
		},
		sword: {
			baseDamage: 20,
		},
		onEquip(interaction, maidObj) {
			const swordObj = {
				name: `Gold Sword`, 
				keyName: "goldSword",
				emoji: "<:Golden_Sword:945957590951669800>",
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