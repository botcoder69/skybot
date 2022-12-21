
import { BaseItemData, Message, RawUserObj, ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import AdventureOutcome from './AdventureOutcome';
import AdventureOutcomeGroup from './AdventureOutcomeGroup';

declare class AdventureEvent<Type extends keyof AdventureEventTypes> {
	private validateOutcomes(): void;
    private normalizeOutcomes(): void;
    private createAdventureProgressBar(interactions: number, middle: string): string;
    private performAdventureItemLoss(maidObj: RawUserObj, sent: Message, outcome: AdventureOutcome<'ITEM_LOSS'>): Promise<void>;
    private performAdventureDeath(maidObj: RawUserObj, sent: Message, outcome: AdventureOutcome<'DEATH'>): Promise<void>;
    private performAdventureFatalDeath(maidObj: RawUserObj, sent: Message, outcome: AdventureOutcome<'FATAL_DEATH'>): Promise<void>;
    private performAdventureReward(maidObj: RawUserObj, sent: Message, outcome: AdventureOutcome<'REWARD'>): Promise<void>;
    private performAdventureNothing(maidObj: RawUserObj, sent: Message, outcome: AdventureOutcome<'NOTHING'>): Promise<void>;
    private addAdventureLuck(items: BaseItemData);
	private setDatabaseInstance(database: any): this;
	private setInteractionInstance(message: ChatInputCommandInteraction): this;
	private setDebugMode(debugMode: boolean): this;
	/**
     * This function is VERY important. Your adventure event **CANNOT** run without this function being executed. This function allows you to parse all the outcomeGroups into one adventure event without writing a gigaheap of code. This function has been moved to execute in the SkybotAdventure class, therefore this function is now a private method.
     * @returns {Promise<void>}
     */
	private runAdventureEvent(): Promise<void>;



    public db: any;
    public interaction: ChatInputCommandInteraction;
    public content: string;
	public image?: string;
    public outcomeGroups: AdventureOutcomeGroup[];
    public readonly type: Type;
    public readonly debug: boolean;
	public rngValue: number;
	public indexTrigger: number?;
	public eventIndexTriggerOnly: boolean;

	/**
	 * Set the weight for this `AdventureEvent`.
	 * @param {number} weight 
	 */
	public setEventWeight(weight: number): this;
	
	/**
	 * Set the index trigger for this `AdventureEvent`. An index trigger means that the event is guaranteed to trigger at that specific index. The value for the index is `<UserObject>.adventure.interactions` 
	 * @param {number} index 
	 */
	public setIndexTrigger(index: number): this;

	/**
	 * Set the index trigger to only apply. This means that this event will only happen if the index hits the trigger specified using `AdventureEvent#setEventTrigger` 
	 * @param {boolean} trigger 
	 */
	public setIndexTriggerOnly(trigger: boolean): this;

	/**
     * Set the intial content for this `AdventureEvent`
     * @param {string} content
     */
    public setContent(content: string): this;

	/**
     * Set the image for this `AdventureEvent`. This is displayed below the content.
     * @param {string} content
     */
	public setImage(content: string): this;

	/**
     * Set the type of this `AdventureEvent`
     * @param {Type} type
     */
    public setType<Type extends keyof AdventureEventTypes>(type: Type): AdventureEvent<Type>;

    /**
     * Sets the outcomeGroups for this AdventureEvent
     * @param {AdventureOutcome[] | AdventureOutcome[][]} outcomeGroups
     */
    public setOutcomeGroups: AdventureEventTypeResolver<Type, 'NORMAL', (...outcomeGroups: AdventureOutcome<AnyAdventureOutcome>[] | AdventureOutcome<AnyAdventureOutcome>[][]) => this, null>

    /**
     * Adds outcomeGroups to this AdventureEvent
     * @param {AdventureOutcome[] | AdventureOutcome[][]} outcomeGroups
     * @returns
     */
    public addOutcomeGroups: AdventureEventTypeResolver<Type, 'NORMAL', (...outcomeGroups: AdventureOutcome<AnyAdventureOutcome>[] | AdventureOutcome<AnyAdventureOutcome>[][]) => this, null>
    /**
     * Add an outcome to this AdventureEvent
     * @param  {AdventureOutcome} outcome
     * @returns
     */
    public addOutcomeGroup: AdventureEventTypeResolver<Type, 'NORMAL', (outcome: AdventureOutcome<AnyAdventureOutcome>) => this, null>;
}

interface AdventureEventTypes {
	NORMAL: string;
	NOTHING: string;
}

type AnyAdventureOutcome = 'DEATH' | 'FATAL_DEATH' | 'ITEM_LOSS' | 'NOTHING' | 'REWARD';

type AdventureEventTypeResolver<
	CurrentType, 
	WantedType extends keyof AdventureEventTypes, 
	TrueValue, 
	FalseValue
> = [CurrentType] extends [WantedType] ? TrueValue : FalseValue

export = AdventureEvent;