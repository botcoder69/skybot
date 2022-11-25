import { Awaitable, ButtonBuilder, ActionRowBuilder, Message, EmbedBuilder, Collection, ButtonInteraction } from 'discord.js';
import EventEmitter from 'events'

type MessageEmbedResolvable = EmbedBuilder | EmbedBuilder[]

/**
 * Creates an event users can join!
 * @param {Message} message
 * @param {MessageEmbedResolvable} eventEmbed
 * @param {ActionRowBuilder} [eventRow=ButtonBuilder]
 * @param {number} [maxTime=10000]
 */
declare class Event extends EventEmitter {
	constructor(message: Message<boolean>, eventEmbed: MessageEmbedResolvable, eventRow?: ActionRowBuilder, maxTime?: number)
	public on<K extends keyof BotEventEvents>(event: K, listener: (...args: BotEventEvents[K]) => Awaitable<void>): this;
	public once<K extends keyof BotEventEvents>(event: K, listener: (...args: BotEventEvents[K]) => Awaitable<void>): this;
	public emit<K extends keyof BotEventEvents>(event: K, ...args: BotEventEvents[K]): boolean;
	public off<K extends keyof BotEventEvents>(event: K, listener: (...args: BotEventEvents[K]) => Awaitable<void>): this;
	public removeAllListeners<K extends keyof BotEventEvents>(event?: K): this;
}

interface BotEventEvents {
	userJoined: [button: ButtonInteraction, sent: Message<boolean>]
	eventEnded: [collected: Collection<string, ButtonInteraction>, reason: string, sent: Message<boolean>]
}

export = Event;