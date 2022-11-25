
const { Functions: { commafy, keepOldObjectProperty }, Sword } = require('../../SkyblockHelper/src/index.js');

module.exports = new Sword(
	{
		group: `Sword`,
		name: `Aspect of the Seas`,
		keyName: `aspectOfTheSeas`,
		description: `OMG, we just made a sword by crafting all those fragments into one! A sword embedded with "the might of the seas." If you have any problems with this weapon, feel free to DM <@714828907966365747>.username about your complaint, since this was one of her item ideas. If your complaint is about it's power, go cope because the developer decided the power level of this weapon.`,
		rarity: `Legendary`,
		emoji: {
			name: `<:Aspect_Of_The_Seas:963296785038704690>`,
			url: `https://cdn.discordapp.com/emojis/963296785038704690.png`,
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
				[`Hilt of the Seas`, `hiltOfTheSeas`, `<:Hilt_of_the_Seas:965489391285973003>`, 1],
				[`First Fragment of the Seas`, `firstFragmentOfTheSeas`, `<:First_Fragment_of_the_Seas:965489410302935110>`, 1],
				[`Second Fragment of the Seas`, `secondFragmentOfTheSeas`, `<:Second_Fragment_of_the_Seas:965489428137144403>`, 1]
			],
			outputs: 1
		},
		sword: {
			baseDamage: 200,
			itemAbility: `**Abiity: Soaring Compassion**\nStuns your enemy at the start of the battle. After 6 hits, "Fires a stream of water, inflicting 150% of your base damage and stunning the target. After 1 more hit, the pool of water created underneath the target bursts up, dealing 500% of your base damage"`
		},
		onEquip(interaction, maidObj) {
			const swordObj = {
				name: `Aspect of the Seas`, 
				keyName: `aspectOfTheSeas`,
				emoji: `<:Aspect_Of_The_Seas:963296785038704690>`,
				baseDamage: 200,
				strength: 0,
				critChance: 0,
				enchantments: []
			};

			maidObj.sword = keepOldObjectProperty(maidObj.sword, swordObj, ['spiritButterflies', 'enchantments']);
		},
		swordFunc: {
			getBaseDamage() {
				return 200;
			},
			onHit(mob, sword, index, fightActions) {
				if (index < 6 && index !== 1) return 0;
				
				if (index === 1) {
					fightActions.push(`<:Aspect_Of_The_Seas:963296785038704690> Soaring Compassion inflicted debuff <:Stun:1002470359641096252> \`Stun\` to ${mob.emoji} ${mob.name}`);

					mob.statusEffects.addStatusEffects([
						{ effectId: `Stun`, length: 3 }
					], index);

					return 0;
				} else if (index % 6 === 0) {
					const damage = sword.baseDamage * 1.5;

					fightActions.push(`<:Aspect_Of_The_Seas:963296785038704690> Soaring Compassion added **${commafy(damage)}** (**+150%**) damage to ${mob.emoji} ${mob.name}`);
					fightActions.push(`<:Aspect_Of_The_Seas:963296785038704690> Soaring Compassion inflicted debuff <:Stun:1002470359641096252> \`Stun\` to ${mob.emoji} ${mob.name}`);

					mob.statusEffects.addStatusEffects([
						{ effectId: `Stun`, length: 3 }
					], index);

					return damage;
				} else if (index % 6 === 1) {
					const damage = sword.baseDamage * 5;

					fightActions.push(`<:Aspect_Of_The_Seas:963296785038704690> Soaring Compassion added **${commafy(damage)}** (**+500%**) damage to ${mob.emoji} ${mob.name}`);

					return damage;
				} else {
					return 0;
				}
			},
			/**
			 * This is the stats displayed when someone uses `sword` on this sword.
			 */
			getSwordStats() {
				return `Damage: +200`;
			},
			/**
			 * This is the stats displayed when someone uses `examine` on this sword
			 */
			getExamineStats() {
				return `Damage: +200`;
			}
		},
		key: `sword`,
		includeInParsing: true
	}
);