
const SkybotStatusEffectHandler = require("./SkybotStatusEffectHandler");

class Mob {
	constructor() {
		this.playerDamage = null;

		this.name = null;

		this.emoji = null;

		this.isFirstStriked = false;

		this.health = {
			current: 0,
			initial: 0
		};
		
		this.xpDrop = null;

		this.coinDrop = null;

		this.statusEffects = null;	
	}

	getMobDamage() {
		if (this.statusEffects.has('ATK_DOWN')) {
			return this.playerDamage * 0.8;
		} else if (this.statusEffects.has('STUN')) {
			return 0;
		} else {
			return this.playerDamage;
		}
	}

	getMobHealth() {
		if (this.statusEffects.has('INJURY')) {
			const leftHP = this.health.initial - (this.health.initial * 0.125);
			
			return this.health.current > leftHP
				? leftHP
				: this.health.current;
		} else {
			return this.health.current;
		}
	}	

	/**
	 * Sets the mob's player damage.
	 * @param {number} damage 
	 */
	setPlayerDmg(damage) {
		this.playerDamage = damage;

		return this;
	}

	/**
	 * Sets the mob's name
	 * @param {string} name 
	 */
	setMobName(name) {
		this.name = name;

		return this;
	}

	/**
	 * Sets the emoji for this mob.
	 * @param {string} emoji 
	 */
	setMobEmoji(emoji) {
		this.emoji = emoji;

		return this;
	}

	/**
	 * Sets the mob's health
	 * @param {MobHealthData} health 
	 */
	setHealth(health) {
		this.health = {
			current: health,
			initial: health
		};

		return this;
	}

	/**
	 * Sets the mob's xp drop.
	 * @param {number} xp 
	 */
	setXpDrop(xp) {
		this.xpDrop = xp;

		return this;
	}

	/**
	 * Sets the mob's coin drop.
	 * @param {number} coins 
	 */
	setCoinDrop(coins) {
		this.coinDrop = coins;

		return this;
	}

	initiateSkybotStatusEffectHandler(statusEffects) {
		this.statusEffects = new SkybotStatusEffectHandler(this)
			.registerStatusEffects(statusEffects);

		return this;
	}
}

module.exports = Mob;

/**
 * @typedef MobHealthData
 * @property {number} current
 * @property {number} initial
 */