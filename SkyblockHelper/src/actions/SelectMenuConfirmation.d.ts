import EventEmitter from "events";
import { Awaitable, ChatInputCommandInteraction, EmojiIdentifierResolvable, Interaction, Message, MessageEditOptions, MessageOptions, MessagePayload, RestOrArray, SelectMenuOptionBuilder, APISelectMenuOption } from 'discord.js';

/**
 * Creates a SelectMenuBuilder confirmation on a Message! This class has 2 events: `confirmed` and `expired`. The `confirmed` event fires when the user confirms their selection, and the `expired` event fires when the user's time runs out. 
 */
declare class SelectMenuConfirmation extends EventEmitter {
	public collectorTimeout?: number;
	public maxValues?: number;
	public menuMessage: string | MessageOptions | MessagePayload;
	public interaction: ChatInputCommandInteraction;
	public minValues?: number;
	public options: SelectMenuConfirmationOptions[];
	public placeholder?: string;

	/**
     * Sets the options for the `SelectMenuBuilder` for this confirmation.
     */
	public setMenuOptions(...component: SelectMenuConfirmationOptions[]): this;
	/**
	 * Sets the maximum number of selections allowed for this select menu
	 */
	public setMenuMaxValues(maxValues: number): this;
	/**
	 * Sets the minimum number of selections required for this select menu.
	 * This will default the maxValues to the number of options, unless manually set
	 */
	public setMenuMinValues(minValues: number): this;
	/**
	 * Sets the placeholder of this select menu
	 */
	public setMenuPlaceholder(placeholder: string): this;
	/**
	 * Sets the message of the SelectMenuBuilder. If this message has components, it will be replaced.
	 */
	public setMenuMessage(message: string | MessagePayload | MessageOptions): this;
	/**
	 * Sets the instance of `ChatInputCommandInteraction` the `SelectMenuConfirmation` is going to use.
	 */
	public setInteractionInstance(interaction: ChatInputCommandInteraction): this;
	/**
	 * Sets the number of milliseconds the collector waits for interactions.
	 */
	public setCollectorTimeout(timeout: number): this;
	/**
	 * Runs the confirmation menu based on the given data.
	 */
	public runConfirmationMenu(): Promise<void>;

	public on<K extends keyof SelectMenuConfirmationEvents>(event: K, listener: (...args: SelectMenuConfirmationEvents[K]) => Awaitable<void>): this;
	public once<K extends keyof SelectMenuConfirmationEvents>(event: K, listener: (...args: SelectMenuConfirmationEvents[K]) => Awaitable<void>): this;
}

interface SelectMenuConfirmationOptions extends RestOrArray<SelectMenuOptionBuilder | APISelectMenuOption> {
    disabled?: boolean;
	message: string | MessagePayload | MessageEditOptions;
}

interface SelectMenuConfirmationEvents {
	confirmed: [sent: Message<boolean>, selected: string[]]
	expired: [sent: Message<boolean>, error: Error]
}

export = SelectMenuConfirmation;

