
import SkybotStatusEffect from "./SkybotStatusEffect";
import SkybotStatusEffectHandler from "./SkybotStatusEffectHandler";

declare class Mob {
	public constructor();
	private getMobDamage(): number;
	private getMobHealth(): number;
	
	public playerDamage: number;
	public name: string;
	public emoji: string;
	public isFirstStriked: boolean;
	public health: MobHealthObject
	public xpDrop: number;
	public coinDrop: number;
	public statusEffects: SkybotStatusEffectHandler;
	public setCoinDrop(coins: number): this;
	public setHealth(health: number): this;
	public setMobEmoji(emoji: string): this;
	public setMobName(name: string): this;
	public setPlayerDmg(damage: number): this;
	public setXpDrop(xp: number): this;

	public initiateSkybotStatusEffectHandler(statusEffects: SkybotStatusEffect<string>[]): this;
}

interface MobHealthData {
	current: number;
	initial: number;
}

interface MobHealthObject extends MobHealthData {
	maximum: number;
}

export = Mob;