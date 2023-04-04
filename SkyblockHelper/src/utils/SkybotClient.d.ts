/* eslint-disable no-unused-vars */

import { SkybotCurrencyProfile, ErrorStates, DragonFight, UserErrorObject, AssetMapValues, Collection, Message, ChatInputCommandInteraction, Client, SkybotAchievementData, SlashCommand, ItemAuctionData, ClientOptions } from 'discord.js';

/**
 * An extended `Client` instance, adding more utilities for Skybot.
 */
declare class SkybotClient extends Client {
	public constructor(options: SkybotClientOptions); 

	public readonly achievements: Collection<string, SkybotAchievementData>;
	public readonly assetMap: Collection<string, AssetMapValues>
	public readonly auctionHouse: Collection<string, ItemAuctionData[]>
	public readonly bugMap: Collection<string, UserErrorObject>
	public readonly confirmations: Collection<string, boolean>
	public readonly cooldowns: Collection<string, Collection<string, number>>
	public readonly console: string[]
	public readonly dragonFights: Collection<string, DragonFight>
	public readonly leaderboard: Collection<string, SkybotCurrencyProfile>
	public readonly levelReq: Collection<number, number>
	public readonly slashCommands: Collection<string, SlashCommand>
	public readonly updateMap: Collection<string, number>
}

interface SkybotClientOptions extends ClientOptions {
	levelRequirements: [number, number][];
	updateValues: [string, number][];
	achievements: [string, SkybotAchievementData][];
}

export = SkybotClient;