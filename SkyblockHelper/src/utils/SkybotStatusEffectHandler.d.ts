
import Mob from "./Mob";
import SkybotStatusEffect from "./SkybotStatusEffect";

declare class SkybotStatusEffectHandler {
	public constructor(mob: Mob);

	public registeredEffects: SkybotStatusEffect<string>[];
	public statusEffects: SkybotStatusEffect<string>[];
	public mob: Mob;

	public registerStatusEffects(statusEffects: SkybotStatusEffect<string>[]): this;
	
	public addStatusEffects(statusEffects: RawSkybotStatusEffectData[], index: number): this;
	public removeStatusEffects(statusEffects: SkybotStatusEffect<string>[]): this;
	
	public checkAndRemoveExpiredEffects(statusEffect: SkybotStatusEffect, index: number, baseDamage: number, addedDamage: number, fightActions: string[]): this;
	public handleStatusEffects(index: number, baseDamage: number, addedDamage: number, mobObject: object, fightActions: string[]): this;
}

interface RawSkybotStatusEffectData {
	/** The unique id of the effect you want to use */
	effectId: string;
	/** This is the weight of the effect they get, for example: `+20% ATK_DOWN` is `0.20` in decimal, and means that the opponent's attack will be decreased by 20% while this status effect is active. */
	multiplier?: number;
	/** This is how long the debuff will last. If this is not supplied, it uses the default length instead. */ 
	length?: number;
}

export = SkybotStatusEffectHandler;