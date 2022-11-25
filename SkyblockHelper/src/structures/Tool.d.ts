
import { EquipableItem, EquippableItemData } from './EquipableItem';

declare class Tool extends EquipableItem {
	public constructor(data: ToolData);
	
	public readonly group: 'Tool';
	public tool: ToolData 
}

interface ToolData extends EquippableItemData {
	tool: ToolInfoData;
}

interface ToolInfoData {
	type: string,
	breakingPower: number
}

export = Tool;