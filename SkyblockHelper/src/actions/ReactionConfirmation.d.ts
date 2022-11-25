import { EventEmitter } from "events";
import { Awaitable, GuildEmoji, Message, EmbedBuilder, MessageOptions, MessagePayload, MessageReaction } from "discord.js";

declare class ReactionConfirmation<QuestionTypes extends keyof VersionReturnsTypes> extends EventEmitter {
	constructor(message: Message, version: QuestionTypes, question: VersionReturnsTypes[QuestionTypes], checkEmoji?: string | GuildEmoji, crossEmoji?: string | GuildEmoji, time?: number)
	public on<K extends keyof ReactionConfirmationEvents>(event: K, listener: (...args: ReactionConfirmationEvents[K]) => Awaitable<void>): this;
	public on<K extends keyof ReactionConfirmationEvents>(event: K, listener: (...args: ReactionConfirmationEvents[K]) => Awaitable<void>): this;
}

interface VersionReturnsTypes {
	v12: string | EmbedBuilder | MessageOptions
	v13: string | MessagePayload | MessageOptions
}

interface ReactionConfirmationEvents {
	check: [MessageReaction, Message];
	cross: [MessageReaction, Message];
	error: [Error, Message];
}

export = ReactionConfirmation