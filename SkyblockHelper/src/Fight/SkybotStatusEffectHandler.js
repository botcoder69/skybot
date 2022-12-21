
// REPLACE WHEN MOVING FILE
const Functions = require('../utils/Functions');
const SkybotStatusEffect = require('./SkybotStatusEffect');

class SkybotStatusEffectHandler {
	constructor(mob) {
		this.mob = mob;

		/** @type {SkybotStatusEffect[]} */
		this.registeredEffects = [];
		
		/** @type {SkybotStatusEffect[]} */
		this.statusEffects = [];
	}

	/* Registration Commands; used for registering SkybotStatusEffects */

	normalizeStatusEffects() {
		this.registeredEffects = this.registeredEffects.flat(Infinity);
	}

	registerStatusEffects(statusEffects) {
		this.registeredEffects.push(statusEffects);
		this.normalizeStatusEffects();

		return this;
	}

	/* Effect Commands; used for adding and removing SkybotStatusEffects to the target */

	addStatusEffects(statusEffectDatas, index) {
		if (!index || isNaN(index) || typeof index !== 'number') throw new TypeError(`REPLACE WITH FIGHT ERROR. BETA ERROR ONLY. [FightError] | The index you supplied is not a number.`);

		for (const statusEffectData of statusEffectDatas) {
			const statusEffect = this.registeredEffects.find(registeredEffect => registeredEffect.id === statusEffectData.effectId);

			if (statusEffect) {
				// Create a new SkybotStatusEffect to push so that the new data wouldn't overlap with the old data.
				this.statusEffects.push(
					new SkybotStatusEffect(statusEffect)
						.setEffectWeight(statusEffectData?.weight ?? statusEffect.weight)
						.setEffectDuration(statusEffectData?.length ?? statusEffect.duration)
						.initiateStatusEffect(index)
				);
			}
		}
	}

	removeStatusEffects(statusEffects) {
		for (const statusEffect of statusEffects) {
			if (this.statusEffects.includes(statusEffect)) Functions.removeArrayElement(this.statusEffects, statusEffect);
		}
	}

	/* Handler Commands; used for handling SkybotStatusEffects */

	checkAndRemoveExpiredEffects(statusEffect, index, baseDamage, addedDamage, fightActions) {
		// console.log(`${statusEffect.id} | ${statusEffect.endIndex} <= ${index}: ${statusEffect.endIndex <= index}`);

		if (statusEffect.endIndex <= index) {
			fightActions.push(`${statusEffect.emoji} Status Effect \`${statusEffect.name}\` has worn off!`);
		
			Functions.removeArrayElement(this.statusEffects, statusEffect);
		
			if (statusEffect.isPeriodicDamage()) {
				statusEffect.afterFn?.(fightActions, statusEffect, baseDamage, addedDamage);
			} else if (statusEffect.isDebuff()) {
				statusEffect.afterFn?.(fightActions, statusEffect, this.mob);
			} else if (statusEffect.isStun()) {
				statusEffect.afterFn?.(fightActions, statusEffect);
			} else if (statusEffect.isImmunity()) {
				statusEffect.afterFn?.(fightActions, statusEffect);
			}
		}
	}

	handleStatusEffects(index, baseDamage, addedDamage, mobObject, fightActions) {
		// console.log(`SkybotStatusEffectHandler | handleStatusEffects() | Argument Log\nindex: ${index}\nbaseDamage: ${baseDamage}\naddedDamage: ${addedDamage}\nmobObject: ${mobObject}\nfightActions: ${fightActions}`);

		/* Periodic Damage Handler */
		const periodicDamageOutput = this.statusEffects
			.filter(statusEffect => statusEffect.isPeriodicDamage())
			.reduce((acc, statusEffect) => {
				const value = statusEffect.fn(fightActions, statusEffect, baseDamage, addedDamage);

				this.checkAndRemoveExpiredEffects(statusEffect, index, baseDamage, addedDamage, fightActions);

				return acc + (isNaN(value) ? 0 : value);
			}, 0);



		/* Debuff Handler */
		const debuffOutput = this.statusEffects
			.filter(statusEffect => statusEffect.isDebuff())
			.forEach(statusEffect => {
				statusEffect.fn(fightActions, statusEffect, mobObject, this.mob);

				this.checkAndRemoveExpiredEffects(statusEffect, index, baseDamage, addedDamage, fightActions);
			});



		/* Stun Handler */
		const stunOutput = this.statusEffects
			.filter(statusEffect => statusEffect.isStun())
			.forEach(statusEffect => {
				statusEffect.fn(fightActions, statusEffect, this.mob);

				this.checkAndRemoveExpiredEffects(statusEffect, index, baseDamage, addedDamage, fightActions);
			});
		


		/* Immunity Handler */
		const immunityOutput = this.statusEffects
			.filter(statusEffect => statusEffect.isImmunity())
			.forEach(statusEffect => {
				statusEffect.fn(fightActions, statusEffect, this.mob);

				this.checkAndRemoveExpiredEffects(statusEffect, index, baseDamage, addedDamage, fightActions);
			});

		return {
			periodicDamage: periodicDamageOutput,
			debuff: debuffOutput,
			stun: stunOutput,
			immunity: immunityOutput,
		};
	}
}

module.exports = SkybotStatusEffectHandler;