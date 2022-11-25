import { ChatInputCommandInteraction } from 'discord.js';
import AdventureEvent from './AdventureEvent';
import { AnyAdventureOutcome } from 'SkyblockHelper';

declare class SkybotAdventure {
	public constructor();
    private normalizeOutcomes(): void;
	/**
	 * Set the Database instance for this `SkybotAdventure`
	 * @param {any} database 
	 */
	private setDatabaseInstance(database: any): this;
	/**
	 * Set the ChatInputCommandInteraction instance for this `SkybotAdventure`
	 * @param {ChatInputCommandInteraction} interaction
	 * @returns
	 */
	private setInteractionInstance(interaction: ChatInputCommandInteraction): this;
    
	

	public adventureEvents: AdventureEvent<AnyAdventureOutcome>[];
	public db: any;
	public interaction: ChatInputCommandInteraction;
	public debug: boolean;

    /**
	 * Sets the adventure events for this `SkybotAdventure`
     * @param {AdventureEvent<AnyAdventureOutcome>[] | AdventureEvent<AnyAdventureOutcome[][]} adventureEvents
     */
    public setAdventureEvents(...adventureEvents: any[]): this;
	
	/**
	 * Sets the debug mode for all adventure events to a specific boolean.
	 */
	public setGlobalDebugMode(debug: boolean, log: boolean): this
    
	/**
	 * Adds an adventure event for this `SkybotAdventure`
     * @param {AdventureEvent<AnyAdventureOutcome>} adventureEvent
     */
    public addAdventureEvent(adventureEvent: any): this;
    
	/**
	 * Adds adventure events for this `SkybotAdventure`
     * @param {AdventureEvent<AnyAdventureOutcome>[] | AdventureEvent<AnyAdventureOutcome[][]} adventureEvents
     */
    public addAdventureEvents(...adventureEvents: any[]): this;
	
	/**
     * This function is VERY important. Your SkybotAdventure class **CANNOT** run without this function being executed. This function allows you to parse all the AdventureEvents into one SkybotAdventure without writing a hell ton of code.
     * @returns {Promise<void>}
     */
    public runSkybotAdventure(): Promise<void>;
}

export = SkybotAdventure;