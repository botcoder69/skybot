import { EmojiIdentifierResolvable, MessagePayload, InteractionReplyOptions, WebhookEditMessageOptions } from "discord.js";

declare class CategoryPaginatorGroup<Default = false> {
	public constructor()
	private normalizeMessages(): void;

	public messages: string | MessagePayload | (Default extends true ? InteractionReplyOptions : WebhookEditMessageOptions)[];
	public default?: Default;
	public description?: string;
	public emoji: EmojiIdentifierResolvable;
	public label?: string;
		
	public addMessages(...messages: (string | MessagePayload | (Default extends true ? InteractionReplyOptions : WebhookEditMessageOptions))[]): this;
	public setMessages(...messages: (string | MessagePayload | (Default extends true ? InteractionReplyOptions : WebhookEditMessageOptions))[]): this;
	public setDefault<V extends boolean>(boolean: V): CategoryPaginatorGroup<V>;
	public setLabel(label: string): this;
	public setDescription(description: string): this;
	public setEmoji(emoji: EmojiIdentifierResolvable): this;
}

export = CategoryPaginatorGroup;