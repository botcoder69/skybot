import { ChatInputCommandInteraction } from 'discord.js';
import CategoryPaginatorGroup from './CategoryPaginatorGroup';


declare class CategoryPaginator {
	public constructor()
	public interaction: ChatInputCommandInteraction
	public groups: CategoryPaginatorGroup[];
	public collectorTimeout?: number

	public setInteractionInstance(message: ChatInputCommandInteraction): this;
	public addGroup(group: CategoryPaginatorGroup): this;
	public addGroups(...groups: CategoryPaginatorGroup[] | CategoryPaginatorGroup[][]): this;
	public setGroups(...groups: CategoryPaginatorGroup[] | CategoryPaginatorGroup[][]): this;
	public setCollectorTimeout(idle: number): this;
	public runCategoryPaginator(): Promise<void>
}

export = CategoryPaginator;