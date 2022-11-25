
import { ChatInputCommandInteraction } from 'discord.js';
import SkybotAdventure from "./SkybotAdventure";

declare class SkybotAdventureHandler {
	public constructor() 
	public db: any;
	public interaction: ChatInputCommandInteraction;
	public skybotAdventure: SkybotAdventure;

	public setDatabaseInstance(database: any): this
	public setInteractionInstance(interaction: ChatInputCommandInteraction): this;
	public setSkybotAdventure(adventure: SkybotAdventure): this;
	public setOnCompleteFunction(onComplete: (interaction: ChatInputCommandInteraction, maidObj: any) => void | Promise<void>): this;
	public runSkybotAdventureHandler(): Promise<void>
}

export = SkybotAdventureHandler;