
import { BaseItem, BaseItemData } from './BaseItem';

declare class MinionUpgrade extends BaseItem {
	constructor(data: MinionUpgradeData)

	public readonly group: `Minion Upgrade`;
	public minionUpgrade: MinionUpgradeInfoData;
	public emoji: ItemEmojiData;
}

interface MinionUpgradeData extends BaseItemData {
	group: `Minion Upgrade`;
	minionUpgrade: MinionUpgradeInfoData;
	emoji: ItemEmojiData;
}

type ItemEmojiData = {
	name: string;
	url: string;
}

type MinionUpgradeInfoData = {
	compactLevel: number;
    speed: number;
    autoSmelt: boolean;
}

export = MinionUpgrade;