/* eslint-disable no-nested-ternary */

const { Collection } = require('discord.js');
const Functions = require('./Functions');
const SkyblockMechanicUtil = require('./SkyblockMechanicUtil');
const EventEmitter = require('events');

class DragonFight extends EventEmitter {
	/**
	 * @param {import ('discord.js').Guild} guild
	 */
	constructor(guild) {
		super();

		this.cooldown = null;

		/**
		 * @type {Collection<string, DragonFightUser>}
		 */
		this.dragonDamage = new Collection();

		this.dragonWeight = new Collection();

		this.dragonHealth = null;

		this.dragonVariant = null;

		this.eyes = new Collection();

		this.type = `DORMANT`;

		this.guild = guild;
	}

	/**
	 * @param {string} user
	 */
	addSummoningEye(user) {
		const existingEyes = this.eyes.get(user) ?? 0;
		this.eyes.set(user, (existingEyes + 1));

		this.emit('eyePlaced', this.guild.members.cache.get(user), this.eyes.reduce((acc, eyes) => acc + eyes, 0));


		if (this.eyes.reduce((acc, eyes) => acc + eyes, 0) >= 8) {
			// This creates a random dragon.
			const dragonRNG = Functions.getRandomNumber(1, 100);

			// Most dragons have a health point of 9,000,000. This is just to avoid repeating 9,000,000 over the code.
			this.dragonHealth = 9_000_000;
			this.type = `ONGOING`;

			if (dragonRNG <= 16) {
				this.dragonVariant = `PROTECTOR`;
			} else if (dragonRNG <= 32) {
				this.dragonHealth = 15_000_000;
				this.dragonVariant = `OLD`;
			} else if (dragonRNG <= 48) {
				this.dragonVariant = `WISE`;
			} else if (dragonRNG <= 64) {
				this.dragonVariant = `UNSTABLE`;
			} else if (dragonRNG <= 80) {
				this.dragonHealth = 7_500_000;
				this.dragonVariant = `YOUNG`;
			} else if (dragonRNG <= 96) {
				this.dragonVariant = `STRONG`;
			} else {
				this.dragonHealth = 12_000_000;
				this.dragonVariant = `SUPERIOR`;
			}

			this.emit('dragonSummon', this.dragonVariant);
		}
	}

	/**
	 * @param {string} user
	 */
	remSummoningEye(user) {
		if (this.eyes.has(user) && this.eyes.get(user) > 0) {
			const existingEyes = this.eyes.get(user);
			this.eyes.set(user, (existingEyes - 1));
	
			this.emit('eyeRemove', this.guild.members.cache.get(user));

			return true;
		} else {
			return false;
		}
	}

	/**
	 * @param {string} user
	 * @param {number} damage
	 * @param {number} eh Stands for `Effective Health`.
	 */
	addDragonDamage(user, damage, health, defense) {
		const userObj = this.dragonDamage.get(user) ?? { health: { current: health, initial: health }, defense: defense, damage: 0, dead: false };

		/**
		 * This allows for damage to "cap" at 500,000 damage. People with a maxed 
		 * `Aspect of the Spirit Butterfly` can deal up to 30 MILLION RAW DAMAGE, 
		 * which can guarantee a one tap of every single dragon. Since this
		 * advantage is *unfair*, I capped damage to the Dragon at 500,000.  
		 */
		damage = damage > 500_000
			? 500_000
			: damage;

		// Some other things:
		if (this.dragonVariant === `PROTECTOR`) {
			damage *= 0.80;
		} else if (this.dragonVariant === `SUPERIOR`) {
			damage *= 0.90;
		}
		
		userObj.damage += damage;
		this.dragonHealth -= damage;

		this.dragonDamage.set(user, userObj);



		if (this.dragonHealth <= 0) {
			this.type = `COOLDOWN`;

			this.cooldown = Date.now() + 600_000;

			this.emit('dragonDeath', this.dragonVariant, this.dragonDamage, this.guild.members.cache.get(user));
		} else {
			// This allows for a 40% no attack. Can be nerfed or buffed if the Dragon is TOO op or TOO ez.
			const attackRNG = Functions.getRandomNumber(1, 100);
			const players = this.dragonDamage
				.filter(dragonFightObj => !dragonFightObj.dead)
				.map((_value, key) => key);

			const fireballRNG = this.dragonVariant === `WISE`
				? 30
				: this.dragonVariant === `SUPERIOR`
					? 25
					: 20;
			const lightningRNG = this.dragonVariant === `WISE`
				? 30
				: this.dragonVariant === `SUPERIOR`
					? 25
					: 20;

			let atkType;
			if (attackRNG <= 20) {
				// This means the Rush Attack.
				const [targetUser] = Functions.randomizeArray(players, 1);
				const userObj = this.dragonDamage.get(targetUser);
				const dmgResist = Math.floor(SkyblockMechanicUtil.getDamageReduction(userObj.defense) * 100);
				
				// eslint-disable-next-line no-nested-ternary
				const rushDamage = this.dragonVariant === `STRONG`
					// This is the rushDamage for a `STRONG` type Dragon.
					? Functions.getRandomNumber((health * 0.5), (health * 0.8))
					: this.dragonVariant === `SUPERIOR`
						// This is the rushDamage for a `SUPERIOR` type Dragon.
						? Functions.getRandomNumber((health * 0.4), (health * 0.7))
						// This is the rushDamage for the other Dragons.
						: Functions.getRandomNumber((health * 0.3), (health * 0.6));

				const finalRushDmg = rushDamage - Math.floor(rushDamage * (dmgResist / 100));

				userObj.health.current -= finalRushDmg;

				const res = [
					{
						user: this.guild.members.cache.get(targetUser),
						damage: finalRushDmg,
						original: rushDamage,
						blocked: dmgResist
					}
				];

				this.emit(`dragonAttack`, `RUSH`, res);
				atkType = `RUSH`;
			} else if (attackRNG <= (fireballRNG + 20)) {
				// This means the Fireball Attack. This will target only ~50% of the players in the nest.
				const targetUsers = Functions.randomizeArray(players, Math.ceil(players.length * 0.5));
				const res = [];

				for (const targetUser of targetUsers) {
					const userObj = this.dragonDamage.get(targetUser);
					const dmgResist = Math.floor(SkyblockMechanicUtil.getDamageReduction(userObj.defense) * 100);

					// eslint-disable-next-line no-nested-ternary
					const fireballDamage = this.dragonVariant === `STRONG`
					// This is the fireballDamage for a `STRONG` type Dragon.
						? Functions.getRandomNumber((health * 0.4), (health * 0.7))
						: this.dragonVariant === `SUPERIOR`
						// This is the fireballDamage for a `SUPERIOR` type Dragon.
							? Functions.getRandomNumber((health * 0.3), (health * 0.6))
						// This is the fireballDamage for the other Dragons.
							: Functions.getRandomNumber((health * 0.2), (health * 0.5));

					const finalFireballDmg = fireballDamage - Math.floor(fireballDamage * (dmgResist / 100));

					userObj.health.current -= finalFireballDmg;

					res.push(
						{
							user: this.guild.members.cache.get(targetUser),
							damage: finalFireballDmg,
							original: fireballDamage,
							blocked: dmgResist
						}
					);
				}

				this.emit(`dragonAttack`, `FIREBALL`, res);
				atkType = `FIREBALL`;
			} else if (attackRNG <= (lightningRNG + fireballRNG + 20)) {
				// This means the Lightning Attack, This will target all players in the nest.
				const targetUsers = players;
				const res = [];

				for (const targetUser of targetUsers) {
					const userObj = this.dragonDamage.get(targetUser);
					const dmgResist = Math.floor(SkyblockMechanicUtil.getDamageReduction(userObj.defense) * 100);

					const lightningDamage = [`STRONG`, `SUPERIOR`, `UNSTABLE`].includes(this.dragonVariant)
						// This is the lightningDamage for a `STRONG`, `SUPERIOR` and `UNSTABLE` type Dragon.
						? Functions.getRandomNumber((health * 0.6), (health * 0.7))
						// This is the lightningDamage for the other Dragons.
						: Functions.getRandomNumber((health * 0.4), (health * 0.5));

					const finalLightningDmg = lightningDamage - Math.floor(lightningDamage * (dmgResist / 100));

					userObj.health.current -= finalLightningDmg;

					res.push(
						{
							user: this.guild.members.cache.get(targetUser),
							damage: finalLightningDmg,
							original: lightningDamage,
							blocked: dmgResist
						}
					);
				}

				this.emit(`dragonAttack`, `LIGHTNING`, res);
				atkType = `LIGHTNING`;
			}

			const deadUsers = this.dragonDamage
				.filter(user => user.health.current <= 0)
				.map((_userObj, user) => this.guild.members.cache.get(user));

			if (deadUsers.length > 0) this.emit('playerDeaths', deadUsers, atkType);
		}
	}

	filterAliveUser() {
		const aliveUsers = this.dragonDamage
			.filter(user => user.health.current > 0);

		if (!aliveUsers.size) return this.emit('dragonFlee', null);

		this.dragonDamage = aliveUsers;
	}

	addDragonWeight(userId, dragonWeight) {
		const currentDragonWeight = this.dragonWeight.get(userId) ?? 0;

		this.dragonWeight.set(userId, (dragonWeight + currentDragonWeight));
	}

	isDormantFight() {
		return this.type === `DORMANT`;
	}

	isOngoingFight() {
		return this.type === `ONGOING`;
	}

	isCooldownFight() {
		return this.type === `COOLDOWN`;
	}
}

/**
 * @typedef DragonFightUser
 * @property {number} damage
 * @property {DragonFightUserHealth} health
 * @property {boolean} dead
 */

/**
 * @typedef DragonFightUserHealth 
 * @property {number} initial
 * @property {number} current
 */
module.exports = DragonFight;