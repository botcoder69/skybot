
import { EquipableItem, EquippableItemData } from './EquipableItem';
import { BaseItemData } from './BaseItem';

declare class Armor extends EquipableItem {
	constructor(data: ArmorData);

	public readonly group: `Armor`;
	public armor: ArmorInfoData;
}

interface ArmorData extends EquippableItemData {
	armor: ArmorInfoData;
}

interface ArmorStatisticData {
	health?: number;
	defense?: number;
	strength?: number;
	speed?: number;
	critChance?: number;
	critDamage?: number;
	inteligence?: number;
}

type ArmorInfoData = {
	stats: ArmorStatisticData;
	helmet: string;
	chestplate: string;
	leggings: string;
	boots: string;
}

type ItemEmojiData = {
	name: string;
	url: string;
}

type EquippableItemEquipData = {
	key: string;
	value: any;
}

export = Armor;