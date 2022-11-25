
import { BaseItem, BaseItemData } from './BaseItem';

declare class MinionFuel extends BaseItem {
	constructor(data: MinionFuelData)
	
	public readonly group: 'Minion Fuel';
	public minionFuel: MinionFuelInfoData;
	public emoji: ItemEmojiData;
}

interface MinionFuelData extends BaseItemData {
	group: 'Minion Fuel';
	minionFuel: MinionFuelInfoData;
	emoji: ItemEmojiData;
}

type ItemEmojiData = {
	name: string;
	url: string;
}

type MinionFuelInfoData = {
	duration: number;
    multiplier: number;
    speed: number;
    reclaimable: boolean;
}

export = MinionFuel;