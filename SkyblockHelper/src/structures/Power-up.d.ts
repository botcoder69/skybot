
import { EquipableItem, EquippableItemData } from './EquipableItem';

declare class PowerUp extends EquipableItem {
	public constructor(data: PowerUpData);
	
	public readonly group: 'Power-up';
}

interface PowerUpData extends EquippableItemData {}

export = PowerUp;