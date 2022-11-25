import { Awaitable, ButtonInteraction, ChatInputCommandInteraction, Message, MessagePayload, InteractionReplyOptions, InteractionResponse } from 'discord.js';
import EventEmitter from 'events';

declare class Confirmation extends EventEmitter {
	/**
	 * Creates button confirmations on a message! This class has 3 events: `check`, `cross` and `error`. You can hook up anything you want to do when it happens.
	 * @param {ChatInputCommandInteraction} interaction The interaction that instantiated this. 
	 * @param {MessagePayload | MessageOptions} question The question you want to ask the user.
	 * @param {Function} fn A function to execute before executing the message component collector.
	 * @param {boolean} [removeButtons=true] Whether to remove buttons when the events have been emitted. If set to `true` or `undefined`, it will remove buttons when the event has been emitted, and if `false`, it will disable buttons when the event has been emitted.
	 */
	constructor(interaction: ChatInputCommandInteraction, question: MessagePayload | InteractionReplyOptions, fn?: (message: Message) => void, removeButtons?: boolean)
	public on<K extends keyof ConfirmationEvents>(event: K, listener: (...args: ConfirmationEvents[K]) => Awaitable<void>): this;
	public once<K extends keyof ConfirmationEvents>(event: K, listener: (...args: ConfirmationEvents[K]) => Awaitable<void>): this;
}

interface ConfirmationEvents {
	check: [button: ButtonInteraction, sent: InteractionResponse<boolean>];
	cross: [button: ButtonInteraction, sent: InteractionResponse<boolean>];
	error: [error: Error, sent: InteractionResponse<boolean>];
}

export = Confirmation;