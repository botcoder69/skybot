
import { BaseMobObject, EmojiIdentifierResolvable, MobHealthObject, Status } from 'discord.js'

declare class SkybotStatusEffect<Type extends keyof StatusEffectTypes> {	
	public constructor(statusEffect: SkybotStatusEffect);

	private endIndex: number;
	private initiateStatusEffect(currentIndex: number): this;

	public weight: number;
	public emoji: EmojiIdentifierResolvable;
	public name: string;
	public id: string;
	public duration: number;
	public readonly typeImmunity: SkybotStatusEffectTypeReducer<Type, 'IMMUNITY', keyof StatusEffectTypes, null>
	public readonly effectImmunity: SkybotStatusEffectTypeReducer<Type, 'IMMUNITY', string[], null>
	public fn: StatusEffectTypes[Type];
	public afterFn: StatusEffectTypes[Type];
	public readonly type: Type;

	public setEmoji(emoji: EmojiIdentifierResolvable): this;
	public setEffectDuration(number: number): this;
	public setEffectWeight(number: number): this;
	public setId(id: string): this;
	public setName(name: string): this;
	public setType<Types extends keyof StatusEffectTypes>(type: Types): SkybotStatusEffect<Types>;

	public isPeriodicDamage(): this is SkybotStatusEffect<'PERIODIC_DAMAGE'>
	public isDebuff(): this is SkybotStatusEffect<'DEBUFF'>
	public isStun(): this is SkybotStatusEffect<'STUN'>
	public isImmunity(): this is SkybotStatusEffect<'IMMUNITY'>

	public setStatusEffectFunction(fn: StatusEffectTypes[Type]): this;
	public setAfterStatusEffectFunction(fn: StatusEffectTypes[Type]): this;

	public setImmunityToTypes: SkybotStatusEffectTypeReducer<Type, 'IMMUNITY', <Types extends keyof StatusEffectTypes>(types: Types[]) => this, null>;
	public setImmunityToSpecificEffects: SkybotStatusEffectTypeReducer<Type, 'IMMUNITY', (effectIds: string[]) => this, null>;
}

type SkybotStatusEffectTypeReducer<
	Type,
	WantedType extends keyof StatusEffectTypes,
	TrueValue,
	FalseValue
> = [Type] extends [WantedType] 
	? TrueValue
	: FalseValue;

interface StatusEffectTypes {
	PERIODIC_DAMAGE: (fightActions: string[], statusEffect: SkybotStatusEffect<'PERIODIC_DAMAGE'>, baseDamage: number, addedDamage: number) => number;
	DEBUFF: (fightActions: string[], statusEffect: SkybotStatusEffect<'DEBUFF'>, mobObject: {}, mob: BaseMobObject) => number;
	STUN: (fightActions: string[], statusEffect: SkybotStatusEffect<'STUN'>, mob: BaseMobObject) => number;
	IMMUNITY: (fightActions: string[], statusEffect: SkybotStatusEffect<'IMMUNITY'>, mob: BaseMobObject) => number;
}



export = SkybotStatusEffect;