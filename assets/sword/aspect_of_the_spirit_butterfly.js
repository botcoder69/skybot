
// eslint-disable-next-line no-unused-vars
const { Sword, Functions: { commafy, keepOldObjectProperty }} = require('../../SkyblockHelper/src/index');

module.exports = new Sword(
	{
		search: [`aery sword`, `aery`],
		group: `Sword`,
		name: `Aspect of the Spirit Butterfly`,
		keyName: `aspectOfTheSpiritButterfly`,
		description: `A powerful sword that holds the very essence of the lost spirit butterflies.`,
		rarity: `Mythic`,
		emoji: {
			name: `<:Aspect_Of_The_Spirit_Butterfly:945957788155273226>`,
			url: `https://cdn.discordapp.com/emojis/945957788155273226.png`,
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
			type: `oneItem`,
			materials: [
				[`diamond sword`, `diamondSword`, `<:Diamond_Sword:945957605577228339>`, 1],
				[`enchanted diamond`, `enchantedDiamond`, `<:Enchanted_Diamond:902764556865142835>`, 4],
				[`spirit butterfly`, `spiritButterfly`, `<:Spirit_Butterfly:942633700485632071>`, 4]
			],
			outputs: 1
		},
		sword: {
			itemAbility: `**Abiity: Aery**\nKilling an enemy grants you spirit butterflies, and each spirit butterfly increases the base damage of this sword. Spirit butterflies are capped at 12,375.`
		},
		onEquip(interaction, maidObj) {
			const swordObj = {
				name: `Aspect of the Spirit Butterfly`, 
				keyName: `aspectOfTheSpiritButterfly`,
				emoji: `<:Aspect_Of_The_Spirit_Butterfly:945957788155273226>`,
				baseDamage: 250,
				strength: 100,
				critChance: 45,
				enchantments: [],
				spiritButterflies: 0
			};

			maidObj.sword = keepOldObjectProperty(maidObj.sword, swordObj, ['spiritButterflies', 'enchantments']);
		},
		swordFunc: {
			onKill(interaction, sword) {
				/** For buffs or debuffs, always follow the 60:25:14:1 ratio, and adjust as needed. Preferably, the last 3 digits as the last phase. */
				if (sword.spiritButterflies < 30_000) {
					// 600 kills to move to the next phase.
					sword.spiritButterflies += 50;
				
					interaction.channel.send(`Your <:Aspect_Of_The_Spirit_Butterfly:945957788155273226> **Aspect of the Spirit Butterfly** gained **50x** <:Spirit_Butterfly:942633700485632071> **Spirit Butterfly** after that kill! (${commafy(sword.spiritButterflies)} / 49,875)`);
				} else if (sword.spiritButterflies < 42_500) {
					// 625 kills to move to the next phase.
					sword.spiritButterflies += 20;
				
					interaction.channel.send(`Your <:Aspect_Of_The_Spirit_Butterfly:945957788155273226> **Aspect of the Spirit Butterfly** gained **20x** <:Spirit_Butterfly:942633700485632071> **Spirit Butterfly** after that kill! (${commafy(sword.spiritButterflies)} / 49,875)`);
				} else if (sword.spiritButterflies < 49_000) {
					// 650 kills to move to the next phase.
					sword.spiritButterflies += 10;

					interaction.channel.send(`Your <:Aspect_Of_The_Spirit_Butterfly:945957788155273226> **Aspect of the Spirit Butterfly** gained **10x** <:Spirit_Butterfly:942633700485632071> **Spirit Butterfly** after that kill! (${commafy(sword.spiritButterflies)} / 49,875)`);
				} else if (sword.spiritButterflies < 49_875) {
					// 875 kills to max Aspect of the Spirit Butterfly.
					sword.spiritButterflies += 1;

					interaction.channel.send(`Your <:Aspect_Of_The_Spirit_Butterfly:945957788155273226> **Aspect of the Spirit Butterfly** gained **1x** <:Spirit_Butterfly:942633700485632071> **Spirit Butterfly** after that kill! (${commafy(sword.spiritButterflies)} / 49,875)`);
				} else {
					interaction.channel.send(`Your <:Aspect_Of_The_Spirit_Butterfly:945957788155273226> **Aspect of the Spirit Butterfly** has been maxed already!`);
				}
			},
			getBaseDamage(sword) {
				return (sword.spiritButterflies * 2) + 250;
			},
			getSwordStats(sword) {
				return `Damage: +250 (+${sword.spiritButterflies * 2})\nStrength: +100\nCrit Chance: +45`;
			},
			getExamineStats() {
				return `Damage: +250 (+0)\nStrength: +100\nCrit Chance: +45`;
			}
		},
		key: `sword`,
		includeInParsing: true
	}
);