
import { ChatInputCommandInteraction } from 'discord.js';
import SkybotAdventureData from './SkybotAdventureData';

class SkybotAdventureSelection {
	public constructor();
	
	public adventureSelections: SkybotAdventureData[];
	public db: any;
	public interaction: ChatInputCommandInteraction;

	public setInteractionInstance(interaction: ChatInputCommandInteraction): this;
	public setDatabaseInstance(db: any): this;
	public setSkybotAdventures(...skybotAdventures: SkybotAdventureData[]): this;
	public addSkybotAdventures(skybotAdventure: SkybotAdventureData): this;
	public addSkybotAdventures(...skybotAdventures: SkybotAdventureData[]): this;
	public runSkybotAdventureSelection(): Promise<void>;
}

export = SkybotAdventureSelection;