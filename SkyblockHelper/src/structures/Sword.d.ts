
import Mob from '../Fight/Mob';
import { EquipableItem, EquippableItemData } from './EquipableItem';
import { InventorySwordObj, ChatInputCommandInteraction } from 'discord.js';

declare class Sword extends EquipableItem {
	constructor(data: SwordData);

	public readonly group: `Sword`;
	public sword: SwordInfoData;
	public swordFunc: SwordFunctions;
}

interface SwordData extends EquippableItemData {
	sword: SwordInfoData;
	swordFunc: SwordFunctions;
}

type SwordInfoData = {
	baseDamage?: number;
	/**
	 * An "active-type" ability that triggers after a certain amount of hits.
	 */
	itemAbility?: string;
	/**
	 * A "passive-type" ability that triggers after a certain condition is met.
	 */
	ability?: string;
}

type SwordFunctions = {
	/**
	 * A function that can amplify damage.
	 * @param {InventorySwordObj} sword The sword object
	 * @param {number} index The index. This is how many times the user and mob traded hits.
	 */
	onHit(mob: Mob, sword: InventorySwordObj, index: number, fightActions: string[], playerHealth: number, maxHealth: number): number
	/**
	 * A function that does something with the sword when it kills a mob.
	 * @param {ChatInputCommandInteraction} interaction The ChatInputCommandInteraction object.
	 * @param {InventorySwordObj} sword The sword object. 
	 */
	onKill?(interaction: ChatInputCommandInteraction, sword: InventorySwordObj): void;
	/**
	 * A function that takes in the sword object, and returns the base damage the sword will deal.
	 * @param {InventorySwordObj} sword 
	 */
	getBaseDamage?(sword: InventorySwordObj): number;
	getSwordStats(sword: InventorySwordObj): string;
	getExamineStats(): string;
}

interface SwordEffects {
	'DEF_DOWN': string;
	'ATK_DOWN': string;
	'FIRE': string;
	'INJURY': string;
}

export = Sword;