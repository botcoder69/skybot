
import { BaseItem, BaseItemData } from './BaseItem';

declare class Minion extends BaseItem {
	constructor(data: MinionData);

	public readonly group: 'Minion';
	public produces: MinionProduceData;
	public emoji: MinionEmojiData;
	public tiers: MinionTierData;
}

interface MinionData extends BaseItemData {
	group: 'Minion';
	produces: MinionProduceData;
	emoji: MinionEmojiData;
	tiers: MinionTierData;
}

type MinionProduceData = {
	keyName: string;
	displayName: string;
	emoji: string;
}

type MinionEmojiData = {
	name: InnerMinionEmojiData;
	url: InnerMinionEmojiData;
}

type InnerMinionEmojiData = {
	placed: string;
	inventory: string;
}

type MinionTierData = {
	i: LowerMinionTierData;
	ii: LowerMinionTierData;
	iii: LowerMinionTierData;
	iv: LowerMinionTierData;
	v: LowerMinionTierData;
	vi: LowerMinionTierData;
	vii: LowerMinionTierData;
	viii: LowerMinionTierData;
	ix: LowerMinionTierData;
	x: HigherMinionTierData;
}

type LowerMinionTierData = {
    timeBetweenActions: number;
    maxStorage: number;
    upgradeAmount: number;
    itemKeyName: string;
}

type HigherMinionTierData = {
	timeBetweenActions: number;
    maxStorage: number;
}

export = Minion;