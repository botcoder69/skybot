
import { SelectMenuOptionBuilder } from '@discordjs/builders';
import { APISelectMenuOption } from 'discord-api-types';

class MultiSelectMenuConfirmationOption extends SelectMenuOptionBuilder {
	public constructor(data?: Partial<APISelectMenuOption>)
	private normalizeOptions(): void;

	public childOptions: MultiSelectMenuConfirmationOption[];
	public setChildOptions(options: MultiSelectMenuConfirmationOption[]): this; 
	public addChildOptions(options: MultiSelectMenuConfirmationOption[]): this; 
}

export = MultiSelectMenuConfirmationOption;