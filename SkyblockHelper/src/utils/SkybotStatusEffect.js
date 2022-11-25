
class SkybotStatusEffect {
	constructor(statusEffect) {
		this.endIndex = statusEffect?.endIndex ?? null;

		this.emoji = statusEffect?.emoji ?? null;

		this.name = statusEffect?.name ?? null;

		this.id = statusEffect?.id ?? null;

		this.duration = statusEffect?.duration ?? null;

		this.typeImmunity = statusEffect?.typeImmunity ?? null;

		this.effectImmunity = statusEffect?.effectImmunity ?? null;

		this.fn = statusEffect?.fn ?? null;

		this.afterFn = statusEffect?.afterFn ?? null;

		this.weight = statusEffect?.weight ?? null;

		this.type = statusEffect?.type ?? null;
	}

	setEmoji(emoji) {
		this.emoji = emoji;

		return this;
	}

	setEffectDuration(duration) {
		this.duration = duration;

		return this;
	}

	setEffectWeight(weight) {
		this.weight = weight;

		return this;
	}

	setId(id) {
		this.id = id;

		return this;
	}

	setName(name) {
		this.name = name;

		return this;
	}

	setType(type) {
		this.type = type;

		return this;
	}


	
	setStatusEffectFunction(fn) {
		this.fn = fn;

		return this;
	}

	setAfterStatusEffectFunction(fn) {
		this.afterFn = fn;

		return this;
	}

	initiateStatusEffect(currentIndex) {
		this.endIndex = this.duration + currentIndex;

		return this;
	}



	isPeriodicDamage() {
		return this.type === 'PERIODIC_DAMAGE';
	}
	
	isDebuff() {
		return this.type === 'DEBUFF';
	}

	isStun() {
		return this.type === 'STUN';
	}

	isImmunity() {
		return this.type === 'IMMUNITY';
	}



	setImmunityToTypes(types) {
		this.typeImmunity = types;

		return this;
	}

	setImmunityToSpecificEffects(statusEffects) {
		this.effectImmunity = statusEffects;

		return this;
	}
}

module.exports = SkybotStatusEffect;