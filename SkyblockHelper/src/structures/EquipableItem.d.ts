
import { ChatInputCommandInteraction, RawUserObj } from 'discord.js';
import { BaseItem, BaseItemData } from './BaseItem';

export declare class EquipableItem extends BaseItem {
	constructor(data: EquippableItemData)
	
	/** @deprecated Use `EquippableItemData#onEquip()` instead */
	public equipData: EquippableItemEquipData;
	public emoji: ItemEmojiData;
	public requireTarget: boolean;
	public key?: string;
	public onEquip(interaction: ChatInputCommandInteraction, maidObj: RawUserObj): RawUserObj;
}

export declare interface EquippableItemData extends BaseItemData {
	/** @deprecated Use `EquippableItemData#onEquip()` instead */
	equipData: EquippableItemEquipData;
	emoji: ItemEmojiData;
	requireTarget: boolean;
	key?: string;
	/**
	 * This function must contain everything in order for the item to be used. Things like deducting and adding items is handled by the `equip` command.  
	 */
	onEquip(interaction: ChatInputCommandInteraction, maidObj: RawUserObj): RawUserObj;
}

type ItemEmojiData = {
	name: string;
	url: string;
}

type EquippableItemEquipData = {
	key: string;
	value: any;
}