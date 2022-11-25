
import AdventureOutcome from './AdventureOutcome';
import { ButtonBuilder } from 'discord.js';

declare class AdventureOutcomeGroup {
    private normalizeOutcomes(): void;
	
	public readonly outcomes: AdventureOutcome<AnyAdventureOutcome>[];
	public readonly button: ButtonBuilder;

    public setOutcomes(...outcomes: AdventureOutcome<AnyAdventureOutcome>[] | AdventureOutcome<AnyAdventureOutcome>[][]): AdventureOutcomeGroup;
    public addOutcomes(...outcomes: AdventureOutcome<AnyAdventureOutcome>[] | AdventureOutcome<AnyAdventureOutcome>[][]): AdventureOutcomeGroup;
    public addOutcome(outcome: AdventureOutcome<AnyAdventureOutcome>): AdventureOutcomeGroup;
	public setButton(button: ButtonBuilder): AdventureOutcomeGroup
}

type AnyAdventureOutcome = 'DEATH' | 'FATAL_DEATH' | 'ITEM_LOSS' | 'NOTHING' | 'REWARD';

export = AdventureOutcomeGroup;