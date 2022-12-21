
const { EmbedBuilder } = require('discord.js');
const SkyblockHelperError = require('../errors/SkyblockHelperError');
const Sword = require('../structures/Sword');
const Mob = require('./Mob');
const { firstStrike, sharpness, critical, execute, lifeSteal } = require('./EnchantmentUtil');
const { commafy, sliceIntoChunks, getRandomNumber } = require('../utils/Functions');
let registeredStatusEffects = [];

class SkyblockMechanicUtil {
	static registerStatusEffect(statusEffect) {
		registeredStatusEffects.push(statusEffect);
		registeredStatusEffects = registeredStatusEffects.flat(Infinity);
	}
	
	static registerStatusEffects(...statusEffects) {
		registeredStatusEffects.push(statusEffects);
		registeredStatusEffects = registeredStatusEffects.flat(Infinity);
	}
	
	static clearRegisteredStatusEffects() {
		registeredStatusEffects = [];
	}

	
	/**
	 * Takes in the player's foraging level to return the player's strength
	 * @param {?number} [foragingLevel=0] The player's foraging level (chopLevel)
	 * @returns {number}
	 */
	static getStrength(foragingLevel=0) {
		if (foragingLevel <= 14) {
			return foragingLevel;
		} else {
			return ((foragingLevel - 14) * 2) + (foragingLevel - (foragingLevel - 14));
		}
	}

	/**
	 * Takes in the player's mining level to return the player's defense
	 * @param {?number} [miningLevel=0] The player's mining level (mineLevel)
	 * @returns {number}
	 */
	static getDefense(miningLevel=0) {
		if (miningLevel <= 14) {
			return miningLevel;
		} else {
			return ((miningLevel - 14) * 2) + (miningLevel - (miningLevel - 14));
		}
	}
	
	/**
	 * Takes in the player's fishing level to return the player's health
	 * @param {?number} [miningLevel=0] The player's mining level (mineLevel)
	 * @returns {number}
	 */
	static getHealth(fishingLevel=0) {
		if (fishingLevel <= 14) {
			return 100 + fishingLevel * 2;
		} else if (fishingLevel <= 19) {
			const x3 = fishingLevel - 14;
			fishingLevel -= x3;
	
			const x2 = fishingLevel;
	
			return 100 + (x2 * 2) + (x3 * 3);
		} else if (fishingLevel <= 25) {
			const x4 = fishingLevel - 20;
			fishingLevel -= x4;
	
			const x3 = fishingLevel - 14;
			fishingLevel -= x3;
	
			const x2 = fishingLevel;
	
			return 100 + ((x2 * 2) + (x3 * 3) + (x4 * 4));
		} else {
			const x5 = fishingLevel - 26;
			fishingLevel -= x5;
				
			const x4 = fishingLevel - 20;
			fishingLevel -= x4;
				
			const x3 = fishingLevel - 14;
			fishingLevel -= x3;
				
			const x2 = fishingLevel;
	
			return 100 + ((x2 * 2) + (x3 * 3) + (x4 * 4) + (x5 * 5));
		}
	}
	
	/**
	 * Takes in the player's combat level to return the player's crit chance
	 * @param {?number} [combatLevel=0] The player's mining level (attkLevel)
	 * @returns {number}
	 */
	static getCritChance(combatLevel=0) {
		return 30 + (combatLevel * 0.5);
	}

	/**
	 * Takes in defense to return a players "Damage Reduction"
	 * @param {number} defense The amount of defense the player has
	 * @returns {number}
	 */
	static getDamageReduction(defense) {
		return defense / (defense + 100);
	}
	
	/**
	 * Takes in the base damage, strength, critical damage, and added damage to return a players "Dealt Damage"
	 * @param {number} baseDamage The original damage of the wielded weapon
	 * @param {?number} [strength=0] The player's strength
	 * @param {?boolean} [crit=false] If the player landed a critical hit or not.
	 * @param {?number} [critDamage=0] The player's critical damage
	 * @param {?number} [additives=0] The damage added by enchantments and/or boosts
	 * @returns {number}
	 */
	static getDealtDamage(baseDamage, strength=0, crit=false, critDamage=50, additives=0) {
		const weaponDamage = baseDamage + 5;
		const strengthDamage = (1 + (strength / 100));
		const criticalDamage = crit 
			? (1 + (critDamage / 100)) 
			: 1;
		const addedDamage = (1 + (additives / 100));
	
		// console.log(weaponDamage, strengthDamage, criticalDamage, addedDamage);
		return weaponDamage * strengthDamage * criticalDamage * addedDamage;
	}

	static criticalHit(critChance=30) {
		return getRandomNumber(1, 100) <= critChance;
	}

	static async fight(options) {
		const { interaction, mob, baseDamage, critChance, playerInfo, enchantments, strength, maidObj, swordFile, db } = options;
		const actionArray = [];
		const playerHealth = {
			initial: playerInfo.health,
			current: playerInfo.health,
		};
		let totalDealtDamage = 0,
			totalDamageTaken = 0,
			totalHealingDone = 0,
			totalCriticalHit = 0;



		/* Type Handling */
		if (!(mob instanceof Mob)) throw new SkyblockHelperError(`Expected instance of 'Mob' for variable Mob`, `MOB_INSTANCE_RANGE`);

		if (!(swordFile instanceof Sword)) throw new SkyblockHelperError(`Expected instance of 'Sword' for variable swordFile`, `MOB_INSTANCE_RANGE`);



		mob.initiateSkybotStatusEffectHandler(registeredStatusEffects);
	
	
	
		let repeatLoop = true;
		for (let index = 1; repeatLoop; index++) {
			const fightActions = [];
			const crit = this.criticalHit(30 + critChance);
			let addedDamage = parseInt(swordFile.swordFunc.onHit?.(mob, maidObj.sword, index, fightActions, playerHealth)) || 1,
				playerHeal = 0;
			
			const mobObject = {
				damage: mob.playerDamage,
				health: mob.health,
				defense: mob?.defense ?? 0
			};

			const firstStrikeDamage = firstStrike(enchantments, mob, baseDamage);
			addedDamage += firstStrikeDamage;
			const sharpnessDamage = sharpness(enchantments, baseDamage);
			addedDamage += sharpnessDamage;
			const criticalDamage = critical(enchantments, baseDamage, crit);
			addedDamage += criticalDamage;
			const executeDamage = execute(enchantments, mob, addedDamage);
			addedDamage += executeDamage;
	
	
	
			if (firstStrikeDamage) fightActions.push(`<a:Enchanted_Book:944112156218097686> Enchantment "FIRST_STRIKE" added ${commafy(Math.floor(firstStrikeDamage))} damage`);
			if (sharpnessDamage) fightActions.push(`<a:Enchanted_Book:944112156218097686> Enchantment "SHARPNESS" added ${commafy(Math.floor(sharpnessDamage))} damage`);
			if (criticalDamage) fightActions.push(`<a:Enchanted_Book:944112156218097686> Enchantment "CRITICAL" added ${commafy(Math.floor(criticalDamage))} damage`);
			if (executeDamage) fightActions.push(`<a:Enchanted_Book:944112156218097686> Enchantment "EXECUTE" added ${commafy(Math.floor(executeDamage))} damage`);
	
	
	
			const { periodicDamage: addedPeriodicDamage } = mob.statusEffects.handleStatusEffects(index, baseDamage, addedDamage, mobObject, fightActions);

			addedDamage += addedPeriodicDamage;
	
	
	
			playerHeal += lifeSteal(enchantments, playerHealth.current);

			const dealtDamage = SkyblockMechanicUtil.getDealtDamage(
				baseDamage,
				strength,
				crit,
				undefined,
				addedDamage
			);
	
			if (crit) totalCriticalHit += 1;
			
			totalDealtDamage += Math.floor(dealtDamage);
			mobObject.health.current -= Math.floor(dealtDamage);
	
			fightActions.push(`${crit ? `<:Critical_Hit:968705500390756403>` : `<:Normal_Hit:968705475677913138>`} You dealt ${commafy(Math.floor(dealtDamage))} damage to the ${mob.name}.`);
	
			// console.log(playerHealth.current, mob.health.current);

			!mob.statusEffects.statusEffects
				.find(statusEffect => {
					// console.log(`${statusEffect.id}: ${statusEffect.isStun()}; SkybotStatusEffect<${statusEffect.type}>`);
					
					return statusEffect.isStun();
				});

			// console.log(`mob.health.current > 0: ${mob.health.current > 0}\n!mob.statusEffects.statusEffects.find(statusEffect => statusEffect.isStun()): ${!mob.statusEffects.statusEffects.find(statusEffect => statusEffect.isStun())}\nResult: ${mob.health.current > 0 && !mob.statusEffects.statusEffects.find(statusEffect => statusEffect.isStun())}`);
			if (mob.health.current > 0 && !mob.statusEffects.statusEffects.find(statusEffect => statusEffect.isStun())) {
				const dmgResist = Math.floor(SkyblockMechanicUtil.getDamageReduction(playerInfo.defense) * 100) / 100;
				
				mobObject.damage -= (mobObject.damage * dmgResist);
	
				totalDamageTaken += Math.floor(mobObject.damage);
				playerHealth.current -= Math.floor(mobObject.damage);
				
				fightActions.push(`${mob.name} dealt ${commafy(mobObject.damage)} damage to you.`);
			}
	
			playerHeal = Math.floor(playerHeal);
			
			totalHealingDone += playerHeal;
			playerHealth.current = playerHeal + playerHealth.current > playerHealth.initial
				? playerHealth.current
				: playerHeal + playerHealth.current;
			
			fightActions.push(`<:Heal:965893066307285012> You healed ${commafy(playerHeal)} health.`);
	
			fightActions.push(``);
			fightActions.push(`<:Health:944105139944452157> You now have ${commafy(playerHealth.current > 0 ? playerHealth.current : 0)} Effective HP left.`);
			fightActions.push(`<:Health:944105139944452157> The ${mob.name} now has ${commafy(mob.health.current > 0 ? mob.health.current : 0)} HP left.`);
	
	
	
			// console.log(mob.health.current, playerHealth.current);
			if (mob.health.current <= 0) {
				// eslint-disable-next-line no-await-in-loop
				await interaction.reply(`${swordFile.displayEmojiName()} ${interaction.user}, you killed the ${mob.name}!\n\n**+${mob.xpDrop} <:Combat:946253940863942687> Combat XP <:ExperienceOrb:900572424381272064>**\n**+${mob.coinDrop} <:Coins:885677584749318154> Coins**`);
				
				if (mob?.allowOnKill) swordFile?.swordFunc?.onKill?.(null, maidObj.sword);
	
				maidObj.combatXp += mob.xpDrop;
				maidObj.coins += mob.coinDrop;
	
				repeatLoop = false;
	
				fightActions.push(``);
				fightActions.push(`🏆 You killed the ${mob.name}!`);
			} else if (playerHealth.current <= 0) {
				interaction.reply(`${swordFile.displayEmojiName()} ${interaction.user}, you died!`);
				
				SkyblockMechanicUtil.performDeath(
					interaction.user,
					maidObj,
					'You died while fighting',
					db
				);

				repeatLoop = false;
	
				fightActions.push(``);
				fightActions.push(`💀 You died!`);
			}
	
			actionArray.push(fightActions.join('\n'));
		}
	
		actionArray.push(`Total Damage Dealt: **${commafy(totalDealtDamage)}**\nTotal Damage Taken: **${commafy(totalDamageTaken)}**\nTotal Healing Recieved: **${commafy(totalHealingDone)}**\nCritical Hits: **${commafy(totalCriticalHit)}**\nAbsorbed Damage: **~${Math.floor(this.getDamageReduction(this.getDefense(maidObj.mineLevel)) * 100)}%**`);
	
		return sliceIntoChunks(
			actionArray.map((action, index, array) => {
				return {
					name: `${index + 1 < array.length ? index + 1 : `Damage Summary:`}`,
					value: action
				};
			}),
			5
		).map(value => new EmbedBuilder()
			.setTitle(options.title)
			.addFields(value)
		);
	}
}

module.exports = SkyblockMechanicUtil;