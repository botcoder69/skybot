
/* eslint-disable class-methods-use-this */
class BaseItem {
	constructor(data) {
		this.search = data?.search ?? [];
		
		this.group = data?.group ?? "";
		
		this.name = data?.name ?? "";
		
		this.keyName = data?.keyName ?? "";
		
		this.description = data?.description ?? `No description provided.`;
		
		this.rarity = data?.rarity ?? `Common`;
		
		this.emoji = data?.emoji ?? { name: "", url: "" };
		
		this.NPC = data?.NPC ?? {
			sell: {
				sellable: false,
				price: 0
			},
			buy: {
				buyable: false,
				price: 0
			}
		};
		
		this.sellall = data?.sellall ?? { included: false, filterGroup: null };
		
		this.crafting = data?.crafting ?? null;
		
		this.includeInParsing = data?.includeInParsing ?? false;

		this.smeltable = data?.smeltable ?? null;

		this.enchanted = data.enchanted ?? null;

		this.levelReq = data.levelReq ?? null;
	}

	
	displayEmojiName(minionEmojiType='inventory') {
		if (this.group.toLowerCase() === 'minion') return this.emoji.name[minionEmojiType];
		else return this.emoji.name;
	}
	
	displayEmojiURL(minionEmojiType='inventory') {
		if (this.group.toLowerCase() === 'minion') return this.emoji.url[minionEmojiType];
		else return this.emoji.url;
	}
}

module.exports = { BaseItem };