
import { Awaitable, Collection, Guild, GuildMember } from 'discord.js';
import { EventEmitter } from 'events';

/**
 * Utility class for creating Ender Dragon fights.
 * 
 * Contains built in functions that change once a certain event happens.	
 */
declare class DragonFight<Type = `DORMANT`> extends EventEmitter {
	public constructor();

	public readonly cooldown?: DragonTypeReducer<Type, null, null, number>;
	public readonly dragonWeight: Collection<string, number>;
	public readonly playerDragonDamage?: DragonTypeReducer<Type, null, Collection<string, DragonFightUser>>;
	public readonly dragonHealth?: DragonTypeReducer<Type, null, number>;
	public readonly dragonDefense?: DragonTypeReducer<Type, null, number>
	public readonly dragonVariant?: DragonTypeReducer<Type, null, DragonVariants>;
	public readonly eyes?: DragonTypeReducer<Type, Collection<string, number>>;
	public readonly type: Type;
	public readonly guild: Guild

	public addSummoningEye?: DragonTypeReducer<Type, (user: string) => void | DragonFight<'ONGOING'>>;
	public remSummoningEye?: DragonTypeReducer<Type, (user: string) => boolean>;
	public addDragonDamage?: DragonTypeReducer<Type, null, (user: string, damage: number, health: number, defense: number) => void>;
	public filterAliveUser?: DragonTypeReducer<Type, null, () => void | DragonFight<'COOLDOWN'>>;
	public addDragonWeight(userId: string, dragonWeight: number): void;
	public isDormantFight(): this is DragonFight<`DORMANT`>;
	public isOngoingFight(): this is DragonFight<`ONGOING`>;
	public isCooldownFight(): this is DragonFight<`COOLDOWN`>;

	public on<K extends keyof DragonFightEvents>(event: K, listener: (...args: DragonFightEvents[K]) => Awaitable<void>): this;
}

type DragonTypeReducer<
	Type, 
	onDormant = null, 
	onOngoing = null,
	onCooldown = null,
	onFallback = null
> = [Type] extends ['DORMANT'] 
	? onDormant 
	: [Type] extends ['ONGOING']
	? onOngoing
	: [Type] extends ['COOLDOWN']
	? onCooldown
	: onFallback;

type DragonTypes = `DORMANT` | `ONGOING` | `COOLDOWN`;

type DragonVariants = 
	| `Protector`
	| `Old`
	| `Wise`
	| `Unstable`
	| `Young`
	| `Strong`
	| `Superior`

interface DragonFightUser {
	damage: number;
	health: DragonFightUserHealth;
	defense: number;
	dead: boolean;
}

interface DragonFightUserHealth {
	initial: number;
	current: number;
}

interface DragonFightEvents {
	eyePlaced: [user: GuildMember];
	eyeRemove: [user: GuildMember];
	dragonSummon: [type: string];
	dragonAttack: [attackType: string, targetUsers: DragonAttackObj[]];
	playerDeaths: [users: GuildMember[], attackType: string];
	/** Since all "death" functions are passed to playerDeaths, this function has a 5 second delay before execution to allow the `playerDeaths` event to fully execute */
	dragonFlee: [];
	dragonDeath: [type: string, damageDealt: Collection<string, DragonFightUser>, lastHit: GuildMember];
}

interface DragonAttackObj {
	user: GuildMember;
	damage: number;
	dmgResist: number;
	trueDamage: number;
	originalDamage: number;
}

export = DragonFight;