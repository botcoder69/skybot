
import { ChatInputCommandInteraction, MessagePayload, InteractionReplyOptions, InteractionResponse } from 'discord.js';
import MultiSelectMenuConfirmationOption from './MultiSelectMenuConfirmationOption';

class MultiSelectMenuConfirmation extends EventEmitter {
	public constructor();
	private normalizeOptions(): void;
	private debug(): void;
	private checkChildOptions(option: MultiSelectMenuConfirmationOption): void;
	private checkChildrenWithLength(): ChildSelectMenuConfirmationOptionValue;
	private resolveConfirmEnable(): number;

	public baseOptions: MultiSelectMenuConfirmationOption[];
	public menuMessage: string | MessagePayload | InteractionReplyOptions;
	public interaction: ChatInputCommandInteraction;
	public collectorTimeout: number;
	public debugMode: boolean;
	public confirmEnable?: number;
	public setBaseOptions(options: MultiSelectMenuConfirmationOption[]): this;
	public addBaseOptions(options: MultiSelectMenuConfirmationOption[]): this;
	public setMenuMessage(message: string | MessagePayload | InteractionReplyOptions): this;
	public setInteractionInstance(interaction: ChatInputCommandInteraction): this;
	public setCollectorTimeout(timeout: number): this;
	public setDebugMode(debugMode: boolean): this;
	public setConfirmEnable(confirmEnableAt: number | 'max' | 'always' | 'min'): this;
	public runConfirmationMenu(): Promise<void>;
	public on<K extends keyof SelectMenuConfirmationEvents>(event: K, listener: (...args: MultiSelectMenuConfirmationEvents[K]) => Awaitable<void>): this;
	public once<K extends keyof SelectMenuConfirmationEvents>(event: K, listener: (...args: MultiSelectMenuConfirmationEvents[K]) => Awaitable<void>): this;
}

interface ChildSelectMenuConfirmationOptionValue {
	public longestLength: number;
	public optionMap: Map<string, ChildSelectMenuConfirmationOptionMapValue>
}

interface ChildSelectMenuConfirmationOptionMapValue {
	public selectMenuId: string;
	public childOptions: MultiSelectMenuConfirmationOption[];
}

interface MultiSelectMenuConfirmationEvents {
	confirmed: [sent: InteractionResponse<boolean>, chosenOptions: MultiSelectMenuConfirmationChosenOptions]
	expired: [sent: InteractionResponse<boolean>, reason: string]
}

interface MultiSelectMenuConfirmationChosenOptions {
	baseOption: string?;
	childOption1: string?;
	childOption2: string?;
	childOption3: string?;
}

export = MultiSelectMenuConfirmation;