/* eslint-disable no-nested-ternary */

const { Collection } = require('discord.js');
const Functions = require('../utils/Functions');
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
		this.playerDragonDamage = new Collection();

		this.dragonWeight = new Collection();

		this.dragonHealth = null;

		this.dragonDamage = null;

		this.dragonDefense = null;

		this.dragonVariant = null;

		this.eyes = new Collection();

		this.type = `DORMANT`;

		this.guild = guild;
	}

	/**
	 * @private
	 */
	// eslint-disable-next-line class-methods-use-this
	calculateDragonDMG(damage, health) {
		if (damage < health*(0.4/100)) {
			return damage;
		} else if (damage < health*(0.6/100)) {
			return damage * 0.5;
		} else if (damage < health*(0.8/100)) {
			return damage * 0.25;
		} else if (damage < health*(1/100)) {
			return damage * 0.1;
		} else {
			return damage * 0.001;
		}
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
			this.dragonDefense = 25;
			this.dragonDamage = 1_100;
			this.type = `ONGOING`;

			if (dragonRNG <= 16) {
				this.dragonVariant = `PROTECTOR`;

				this.dragonDefense = 85;
			} else if (dragonRNG <= 32) {
				this.dragonVariant = `OLD`;

				this.dragonHealth = 15_000_000;
				this.dragonDefense = 18;
			} else if (dragonRNG <= 48) {
				this.dragonVariant = `WISE`;

				this.dragonDamage = 2_200;
			} else if (dragonRNG <= 64) {
				this.dragonVariant = `UNSTABLE`;
			} else if (dragonRNG <= 80) {
				this.dragonVariant = `YOUNG`;

				this.dragonHealth = 7_500_000;
				this.dragonDefense = 18;
			} else if (dragonRNG <= 96) {
				this.dragonVariant = `STRONG`;
			} else {
				this.dragonVariant = `SUPERIOR`;

				this.dragonHealth = 12_000_000;
				this.dragonDamage = 1_650;
				this.dragonDefense = 30;
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
		const userObj = this.playerDragonDamage.get(user) ?? { health: { current: health, initial: health }, defense: defense, damage: 0, dead: false };

		const dragonMaxHP = this.dragonVariant === `YOUNG`
			? 7_500_000
			: this.dragonVariant === `SUPERIOR`
				? 12_000_000
				: this.dragonVariant === `OLD`
					? 15_000_000
					: 9_000_000;

		// Scales DMG according to Dragon's Max Health.
		damage = this.calculateDragonDMG(damage, dragonMaxHP);
		// Adds Dragon Defense to the DMG Calculation. 
		damage = Math.floor(damage * (1 - SkyblockMechanicUtil.getDamageReduction(this.dragonDefense)));
		
		userObj.damage += damage;
		this.dragonHealth -= damage;

		this.playerDragonDamage.set(user, userObj);



		if (this.dragonHealth <= 0) {
			this.type = `COOLDOWN`;

			this.cooldown = Date.now() + 600_000;

			this.emit('dragonDeath', this.dragonVariant, this.playerDragonDamage, this.guild.members.cache.get(user));
		} else {
			// This allows for a 40% no attack. Can be nerfed or buffed if the Dragon is TOO op or TOO ez.
			const attackRNG = Functions.getRandomNumber(1, 120);
			const players = this.playerDragonDamage
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
			console.log(`Math.floor(${SkyblockMechanicUtil.getDamageReduction(defense)} * 100) / 100 => ${Math.floor(SkyblockMechanicUtil.getDamageReduction(defense) * 100) / 100}`);
			if (attackRNG <= 20) {
				// This means the Rush Attack.
				const [targetUser] = Functions.randomizeArray(players, 1);
				// Get userObject.
				const userObj = this.playerDragonDamage.get(targetUser);
				// This is the DMG% the user will ignore.
				const dmgResist = (Math.floor(SkyblockMechanicUtil.getDamageReduction(defense) * 100) / 100);


				
				/* Multiplier Calculation */
				let rushDMGMulti = 1;

				// +50% if HP < 50% Max HP
				if ((this.dragonHealth / dragonMaxHP) < 0.5) rushDMGMulti += 0.5;
				// +20% Rush and Contact DMG; +20% Passive: Strong Spells;
				if (this.dragonVariant === `STRONG`) rushDMGMulti += 0.4;	
				// +15% Rush and Contact DMG; +12.5% Passive: Superiority (62.5% of other Dragon's abilities; Passive: Strong Spells);
				if (this.dragonVariant === `SUPERIOR`) rushDMGMulti += 0.275;

		

				/* Rush DMG Calculation */
				const rushDMG = Math.floor((2_000 * rushDMGMulti) * (1 - dmgResist));
				// Deal 55% of the players Health in True DMG
				const rushTrueDMG = Math.floor(userObj.health.current * 0.55);

				userObj.health.current -= Math.floor(rushDMG + rushTrueDMG);



				const res = [
					{
						user: this.guild.members.cache.get(targetUser),
						damage: rushDMG,
						dmgResist: dmgResist,
						trueDamage: rushTrueDMG, 
						originalDamage: Math.floor(2_000 * rushDMGMulti)
					}
				];

				this.emit(`dragonAttack`, `RUSH`, res);
				atkType = `RUSH`;
			} else if (attackRNG <= (fireballRNG + 20)) {
				// This means the Fireball Attack. This will target only ~35% of the players in the nest.
				const targetUsers = Functions.randomizeArray(players, Math.ceil(players.length * 0.25));
				const res = [];

				for (const targetUser of targetUsers) {
					const userObj = this.playerDragonDamage.get(targetUser);
					// This is the DMG% the user will ignore.
					const dmgResist = (Math.floor(SkyblockMechanicUtil.getDamageReduction(defense) * 100) / 100);



					/* Multiplier Calculation */
					let fireballDMGMulti = 1;

					// +50% if HP < 50% Max HP
					if ((this.dragonHealth / dragonMaxHP) < 0.5) fireballDMGMulti += 0.5;
					// +20% Fireball and Lightning DMG;
					if (this.dragonVariant === `WISE`) fireballDMGMulti += 0.2;
					// +15% Fireball and Lightning DMG;
					if (this.dragonVariant === `SUPERIOR`) fireballDMGMulti += 0.15;



					/* Rush DMG Calculation */
					const fireballDMG = Math.floor((1_700 * fireballDMGMulti) * (1 - dmgResist));
					// Deal 20% of the players Health in True DMG
					const fireballTrueDMG = Math.floor(userObj.health.current * 0.20);

					userObj.health.current -= Math.floor(fireballDMG + fireballTrueDMG);

					res.push(
						{
							user: this.guild.members.cache.get(targetUser),
							damage: fireballDMG,
							dmgResist: dmgResist,
							trueDamage: fireballTrueDMG,
							originalDamage: Math.floor(1_700 * fireballDMGMulti)
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
					const userObj = this.playerDragonDamage.get(targetUser);
					// This is the DMG% the user will ignore.
					const dmgResist = (Math.floor(SkyblockMechanicUtil.getDamageReduction(defense) * 100) / 100);



					/* Multiplier Calculation */
					let lightningDMGMulti = 1;

					// +50% if HP < 50% Max HP
					if ((this.dragonHealth / dragonMaxHP) < 0.5) lightningDMGMulti += 0.5;
					// +20% Fireball and Lightning DMG;
					if (this.dragonVariant === `WISE`) lightningDMGMulti += 0.2;
					// +15% Fireball and Lightning DMG;
					if (this.dragonVariant === `SUPERIOR`) lightningDMGMulti += 0.15;



					/* Lightning DMG Calculation */
					const lightningDMG = Math.floor((1_700 * lightningDMGMulti) * (1 - dmgResist));
					// Deal 20% of the players Health in True DMG
					const lightningTrueDMG = Math.floor(userObj.health.current * 0.20);

					userObj.health.current -= Math.floor(lightningDMG + lightningTrueDMG);



					res.push(
						{
							user: this.guild.members.cache.get(targetUser),
							damage: lightningDMG,
							dmgResist: dmgResist,
							trueDamage: lightningTrueDMG,
							originalDamage: Math.floor(1_700 * lightningDMGMulti),
						}
					);
				}

				this.emit(`dragonAttack`, `LIGHTNING`, res);
				atkType = `LIGHTNING`;
			}

			const deadUsers = this.playerDragonDamage
				.filter(user => user.health.current <= 0)
				.map((_userObj, user) => this.guild.members.cache.get(user));

			if (deadUsers.length > 0) this.emit('playerDeaths', deadUsers, atkType);
		}

		return damage;
	}

	filterAliveUser() {
		const aliveUsers = this.playerDragonDamage
			.filter(user => user.health.current > 0);

		if (!aliveUsers.size) return this.emit('dragonFlee', null);

		this.playerDragonDamage = aliveUsers;
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