
/**
 * A module exclusively for Skybot, containing various Classes and Functions to hasten coding and prevent Code Duplication.
 */
declare module 'SkyblockHelper' {
	import Database from '@replit/database';
	import { 
		AssetMapValues,
		Awaitable,
		ButtonInteraction,
		CacheType,
		Client,
		Collection,
		ChatInputCommandInteraction,
		EmojiIdentifierResolvable,
		Guild,
		GuildEmoji,
		GuildMember,
		If,
		Interaction,
		Message,
		ActionRowBuilder,
		ButtonBuilder,
		EmbedBuilder,
		MessageOptions,
		MessagePayload,
		MessageReaction,
		RawUserObj,
		Snowflake,
		ThreadMember,
		User
	} from 'discord.js';
	import EventEmitter from 'events';
	import { SlashCommandBuilder } from '@discordjs/builders'

	export const Version: string;

	/* CLASSES */
	
	export class Randomizer {
		private constructor();
		/**
		 * Outputs a random item and its number based on the itemArray value
		 * @param {string[]} itemArray A stringed array with the template of displayName:skyblockID:minCollectable:maxCollectable:chance
		 * @returns {(string | number)[]}
		 */
		public simpleRandomizer(itemArray: string): (string | number)[]
	}

	export class Chancemaker<DataType = undefined> {
		/**
		 * Making custom chances for items has never been easier!
		 * @param {ChancemakerData} [data]
		 */
		public constructor(data?: ChancemakerData);
		public entries: ChancemakerEntryData<DataType>[];
		public rolls: number;
		public minRolls: number;
		public maxRolls: number;
		public noRepeatingRes: boolean;
	
		/**
		 * Replaces the existing Chancemaker entries with new entries
		 * @param  {...ChancemakerEntryData<T>} entries
		 */
		public setEntries<T>(...entries: ChancemakerEntryData<T>[]): Chancemaker<T>
	
		/**
		 * Adds more entries to the existing Chancemaker entries
		 * @param  {...ChancemakerEntryData} entries
		 */
		public addEntries<T>(...entries: ChancemakerEntryData<T>[]): Chancemaker<UnifyRealTypes<T, DataType>>
	
		/**
		 * Sets the amount of rolls the `Chancemaker` will do.
		 * @param {number} amount
		 */
		public setRolls(amount: number): this;
	
		/**
		 * Sets the maximum amount of rolls the `Chancemaker` will do.
		 * @param {number} amount
		 */
		public setMaxRolls(amount: number): this;
		
		/**
		 * Sets the minimum amount of rolls the `Chancemaker` will do.
		 * @param {number} amount
		 */
		public setMinRolls(amount: number): this;
	
		/**
		 * Sets the `Chancemaker` to repeat, or not repeat results.
		 * @param {number} amount
		 */
		public setRepeatingResults(boolean: any): this;
	
		/**
		 * Parses all the Chancemaker's entries and rolls to a readable value.
		 * @returns
		 */
		public makeChance(): ChancemakerReturnData<DataType>[];
			
		/**
		 * Parses all entries into a `Possible Items` result.
		 */
		public getPossibleItems(): ChancemakerPossibleItems<DataType>[]

		/**
		 * Parses all entries and rolls into a `Chances for Items` result.
		 */
		public getChances(): ChancemakerItemChances<DataType>[]
	}

	/**
	 * A Database that uses the map API without having to use the async and await operators.
	 * @extends {Map}
	 */
	export class MapDatabase<K, V> extends Map<K, V> {
		constructor()
		/**
	     * Identical to [Map.get()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get).
	     * Gets an element with the specified key, and returns its value, or `undefined` if the element does not exist.
	     * @param {string} key - The key to get from this database
		 * @param {useNull} nullify - If the key doesn't exist, returns `null` instead of `undefined`. Automatically sets to true if left undefined
	     * @returns {* | undefined | null}
	     */
		public get<useNull extends boolean>(key: K, nullify?: useNull): V | If<useNull, null, undefined>
		/**
	     * Identical to [Map.set()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set).
	     * Sets a new element in the database with the specified key and value.
	     * @param {string} key - The key of the element to add
	     * @param {any} value - The value of the element to add
	     * @returns {this}
	     */
		public set(key: K, value: V): this
		/**
	     * Identical to [Map.delete()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete).
	     * Deletes an element from the database.
	     * @param {*} key - The key to delete from the database
	     * @returns {boolean} `true` if the element was removed, `false` if the element does not exist.
	     */
		public delete(key: K): boolean
		/**
		 * Identical to [Map.clear()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear).
		 * Removes all elements from the database.
		 * @returns {void}
		 */
		public clear(): void
		/**
		 * Returns an array full of arrays with the format [[key, value], [key, value]]
		 * @returns {any[][]}
		 */
		public toArray(): [K, V][]
		/**
		 * Returns a map using the arrays formatted using `toArray()`
		 * @param {ArrayType[][]} array
		 * @returns {MapDatabase} 
		 */
		public toMap<ArrayType>(array: ArrayType[][]): MapDatabase<ArrayType, ArrayType>
	}

	export class SkyblockHelperError extends Error {
		constructor(message: string, code: string);
	}

	export class DeveloperTypeError extends TypeError {
		constructor(message?: string)
	}

	export class MentionError extends Error {
		constructor(message?: string)
	}

	export class MessageError extends TypeError {
		constructor(message?: string)
	}

	/**
	 * The hub for interacting with Skybot Minions. This has various methods that can help you interact with the messy minion arrays. You can use these methods to further increase productivity.
	 */
	export class Minions extends null {	
		/**
		 * Gets the minion array, then outputs the total number of resources you collected in the format [["resource", "keyName", "amount"]]. Only to be used when you CONFIRMED getting items since it relies on the time there.
		 * @param {any} db The variable you set your `new Database()` to. 
		 * @param {User} maid The id of the message author that instantiated this.
		 * @param {Collection} itemMap The collection of your items.
		 * @returns {Promise<(string | number)[][]>} 
		 */
		static allResources(db: any, maid: User, itemMap: Collection<any, any>): Promise<[string, string, number][]>	
		
		/**
		 * Gets a users minion inventory.
		 * @param {any} db The variable you set your `new Database()` to.
		 * @param {string} maid The id of the message author that instantiated this.
		 * @param {User} messageAuthor The user that instantiated this.
		 * @param {Collection<any, any>} itemMap The collection of your items.
		 * @returns {Promise<EmbedBuilder[]>}
		 */
		static inventory(db: any, maid: string, messageAuthor: User, itemMap: Collection<any, any>): Promise<EmbedBuilder[]>

		/**
		 * The class for interacting with advanced minions. This class supports new minion additions like fuel and requires 15 minion slots instead of 14.
		 */
		static BETA: typeof MinionsBETA
	}

	class MinionsBETA extends null {
		/**
		 * Gets the minion array, then outputs the total number of resources you collected in the format [["resource", "keyName", "amount", "minionKeyName"]]. Only to be used when you CONFIRMED getting items. This is the function when including minion fuel.
		 * @param {any} db The variable you set your `new Database()` to. 
		 * @param {string} maid The id of the message author that instantiated this.
		 * @param {Collection<any, any>} itemMap The collection of your items.
		 * @returns {Promise<(string | number)[][]>} 
		 */
		static allResources(db: any, maid: string, itemMap: Collection<any, any>): Promise<[string, string, number, string][]>
		
		/**
		 * Gets the minion array, then outputs an array of embeds you can put on your page. This is the function when including minion fuel.
		 * @param {any} db 
		 * @param {string} maid 
		 * @param {User} messageAuthor 
		 * @param {Collection<any, any>} itemMap 
		 * @returns {EmbedBuilder[]}
		 */

		static inventory(db: string, maid: string, messageAuthor: User, itemMap: Collection<any, any>): Promise<EmbedBuilder[]>
		
		/**
		 * Collects from a minion in the given number. Since JavaScript arrays are zero-indexed, the number you will give will be subtracted by 1. This can also only be used when you have confirmed getting items from this minion.
		 * @param {number} placeValue An index in the minion array, added by 1.
		 * @param {any} db Can be the Repl.it `Database` or a `MapDatabase`
		 * @param {string} maid The ID of the user that instantiated this.
		 * @param {Collection<string, any>} itemMap A collection of the items in Skybot. 
		 * @returns {Promise<(string | number)[][]>}
		 */
		static minion(placeValue: number, db: any, maid: string, itemMap: Collection<any, any>): Promise<(string | number)[][]>
	}

	/**
	 * Various Skybot utilities that can also help you with commands.
	 */
	export class Functions {
		static calcTime(offset: number): string
		/**
		 * Insert's commas in your number. A better way to read large numbers
		 * @param {number} number
		 */
		static commafy(number: number): string
		static getUTCTime(): string
		/**
		 * Makes a random ID with a set length
		 * @param {number} length
		 * @param {string} characters
		 */
		static makeid(length: number, characters?: string): string
		static msToHMSMs(ms: number): string
		/**
		 * Require a user to have a certain skill level to continue executing. If the user passes, returns `true`, otherwise, returns `false`
		 * @param {Skill} skill
		 * @param {number} level
		 * @param {string} maid
		 * @param {any} db
		 */
		static requireSkillLevel<Skill extends keyof SkillCollections>(skill: Skill, level: number, maid: string, db: any): Promise<boolean>
		/**
		 * Require a user to have a certain tool to continue executing. If the user passes, returns `true`, otherwise, returns `false`
		 * @param {Tool} tool
		 * @param {string} maid
		 * @param {any} db
		 * @deprecated Since v5.0.0 - Use the "toolMap" instead.
		 */
		static requireToolAndAbove<Tool extends keyof ToolRequirements>(tool: Tool, maid: string, db: any): Promise<boolean>
		static secondsToHMS(seconds: number): string
		/**
		 * Splits an array into even chunks. Good for pages and your 2048 embed description character limit
		 * @param {any[]} array
		 * @param {number} chunkSize
		 */
		static sliceIntoChunks<ArrayType>(array: ArrayType, chunkSize: number): ArrayType[]
		/**
		 * Returns a roman numeral of a number
		 * @param {number} num 
		 */
		static toRomanNumeral(num: number): string
		/**
		 * Checks if the last element in an array is a number in a string.
		 * @param {string[]} args 
		 * @deprecated Since v4.0.0 - Use arrayValidNumber instead.
		 */
		static arrayLastNumber(args: string[]): boolean
		/**
		 * Checks if the last element in an array is a number in a string.
		 * @param {string[]} args 
		 */
		static arrayValidNumber(args: string[]): boolean
		/**
		 * @param {number} SkybotTimeMs The number of milliseconds since the Day-Night Update epoch. ~~`October 25, 2021. 00:00:00`~~
		 * @param {SkybotTimeOptions} options
		 */
		static formatSkybotTime(SkybotTimeMs: number, options?: SkybotTimeOptions): string
		/**
		 * Syncs an old Repl.it Database, with a new Repl.it Database. Perfect for transferring important data from one repl to another.
		 * @param {string} dbUrlToSyncTo The URL of the Repl.it Database that you want to add the values from the old database to. Basically, this is the database you are copying all the data to.
		 * @param {string} dbUrlToSyncFrom The URL of the Repl.it Database that you want to extract the values from the old database to. Basically, this is the database you are copying all the data from. 
		 * @param {boolean} [logResults=false] If you would like to log results of adding keys to the database, simply enable this. Automatically sets to `false` when undefined.
		 */
		static databaseResync(dbUrlToSyncTo: string, dbUrlToSyncFrom: string, logResults?: boolean): Promise<void>
		/**
		 * An array that you want to randomize. You can set how many items you would like.
		 * @param {any[]} array The array to take values from.
		 * @param {number} [count=array.length - 1] The amount of items in the new randomized array.
		 */
		static randomizeArray<ArrayType>(array: ArrayType, count?: number): ArrayType;
	
		/**
		 * Transforms 1 by 1 keys into an object. Requires the Repl.it Database and the user's ID
		 * @param {Database} db The Repl.it Database
		 * @param {string} maid The ID of the user that instantiated this
		 * @param {boolean} [remove=false] Remove keys on object creation
		 * @param {string[]} [exclude=[]] Keys to be excluded from deletion when deleting keys
		 */
		static keysToObj(db: Database<any>, maid: string, remove?: boolean, exclude?: string[]): Promise<RawUserObj>
	
		/**
		 * Parses seconds to a days, hours, minutes, seconds format. Stripped from Dank Memer
		 * @see https://github.com/DankMemer/CommunityBot/blob/main/src/utils/misc.js#L102_L125
		 * @param {number} time 
		 * @returns {string}
		 */
		static parseTime(time: number): string
	
		/**
		 * Adds an item to a specific index in the array. If index is not supplied, the array's length will be used instead.
		 * @param {any[]} array The array to modify
		 * @param {any} item The item to add
		 * @param {number} index The index in the array this item will be added to. Defaults to the index of the last element in the array
		 * @returns {any[]}
		 */
		static addArrayElement<ArrayType, ItemType>(array: ArrayType, item: ItemType, index?: number): void;
	
		/**
		 * An easier way to remove an item to a specific index in an array.
		 * @param {any[]} array The array to modify
		 * @param {any} item The item to remove
		 * @returns {any[]}
		 */
		static removeArrayElement<ArrayType, ItemType>(array: ArrayType, item: ItemType): void
	
		/**
		 * Cleans a user id, ready to be used in searching for a user.
		 * @param {string} userId A Snowflake or MessageMention
		 */
		static cleanUserId(userId: string): Snowflake
	
		/**
		 * Resolves a UserResolvable into a User object. If the User doesn't exist, undefined will be returned.
		 * @param {UserResolvable} user The UserResolvable you want to resolve into a User object. 
		 * @param {client} client The Client object
		 */
		static resolveUser(user: UserResolvable, client: Client<boolean>): User
	
		/**
		 * Resolves a GuildMemberResolvable into a GuildMember object. If the GuildMember doesn't exist, undefined will be returned.
		 * @param {GuildMemberResolvable} guildMember The GuildMemberResolvable you want to resolve into a User object.
		 * @param {Guild} guild The Guild object to use in resolving the GuildMemberResolvable.
		 */
		static resolveGuildMember(guildMember: GuildMemberResolvable, guild: Guild): GuildMember
	
		/**
		 * Gets a random number starting from `min` to `max`.
		 * @param {number} min The lowest number this random number generator can return
		 * @param {number} max The highest number this random number generator can return
		 */
		static getRandomNumber(min: number, max: number): number
	
		/**
		 * Checks if the user has a specific "Active Item". Added to `Functions` to prevent "Code Duplication"
		 * @param {RawUserObj} maidObj 
		 * @param {string} item 
		 */
		static checkActiveItem(maidObj: RawUserObj, item: string): boolean
	
		/**
		 * Check if the `Four_Leaf_Clover` item helped the user
		 * @param {boolean} clover The clover status effect.
		 * @param {number} rng The random number generator
		 * @param {number} oldValue The value before adding the clover. This refers to the value in the RNG.
		 * @param {number} newValue The value after adding the clover. This refers to the value in the RNG.
		 */
		static cloverHelped(clover: boolean, rng: number, oldValue: number, newValue: number): boolean
	
		/**
		 * Initiates the leaderboard.
		 * @param {Database} db 
		 * @param {Collection<string, SkybotCurrencyProfile>} leaderboard 
		 * @param {Client} client 
		 */
		static initLeaderboard(db: Database<RawUserObj>, leaderboard: Collection<string, SkybotCurrencyProfile>, client: Client, excludedKeys?: string[]): Promise<void>
	
		/**
		 * This handy function overwrites existing properties. If the property in `objectToOverwrite` doesn't exist in `objectFromOverwrite`, it will be kept, otherwise, it will be overwritten
		 * @param {OldData} objectOverwriteTo The object to overwrite properties of
		 * @param {OverwriteData} objectOverwriteFrom The object to overwrite properties from
		 * @param {string[]} excludeOverwrite Items to exclude from overwriting
		 */
		static keepOldObjectProperty<OldData, OverwriteData>(objectOverwriteTo: OldData, objectOverwriteFrom: OverwriteData, excludeOverwrite?: string[]): OldData | OverwriteData
	
		/**
		 * Add a number to an object that you think is undefined. This safely adds the number to the object even if its null, and it wont return "NaN" unlike when you use the `+=` operator. 
		 * @param {any} object The object that you want to add numbers to.
		 * @param {number} number 
		 * 
		 * @example
		 * // If index is `null` instead, it will return 1, so don't worry about null values.
		 * let index = undefined;
		 * 
		 * index += 1;
		 * 
		 * console.log(index); // NaN
		 * 
		 * @example
		 * let index = undefined;
		 * 
		 * index = add(index, 1);
		 * 
		 * console.log(index); // 1
		 * 
		 * @example
		 * let index = 1;
		 * 
		 * index = add(index,  1);
		 * 
		 * console.log(index) // 2
		 */
		static add(object: any, number: number): number
	
		/**
		 * Sends a notification to a user. If the user has DM's off, this will send a message saying that they can't be DM'ed 
		 * @param {EmbedBuilder} notification
		 * @param {ChatInputCommandInteraction} interaction
		 * @param {string | MessageOptions | MessagePayload} failMessage
		 */
		static sendNotification(notification: EmbedBuilder, interaction: ChatInputCommandInteraction, failMessage?: string | MessageOptions | MessagePayload): Promise<void>;
	
		/**
		 * Checks if a flag exists in a given array. If a flag exists, returns the flag and its argument. Otherwise, returns just the flag and an empty array.
		 * @param {string} flag The flag to check for
		 * @param {number} length The length of arguments for the flag
		 * @param {ArrayType[]} array The array to check the flag in
		 * @param {?boolean} removeFromArray If the flag and arguments should be removed.
		 * @returns {FlagReturn<ArrayType>}
		 */
		static checkForFlag<ArrayType>(array: ArrayType[], flag: string, length: number, removeFromArray?: boolean | null): FlagReturn<ArrayType>;
	
		/**
		 * Converts an object's "property: value" structure into a Map.
		 * @param {{}} obj 
		 * @param {Map} mapToUse 
		 * @returns {void}
		 */
		static objToMap<MapType>(obj: {}, mapToUse: MapType): MapType;
	
		/**
		 * Converts an Map's "key: value" structure into an Object. Note that all keys will be turned into strings.
		 * @param {Map} map 
		 * @param {{}} objToUse 
		 * @returns {void}
		 */
		static mapToObj<MapType>(map: MapType, objToUse: {}): {};
	
		/**
		 * This handy function returns a or an whether `word` starts with "a", "e", "i", "o", "u". This is very handy for those persons who don't want to have a big ternary expression just for 'a' and 'an'.
		 * @param {string} word 
		 */
		static aoran(word: string): 'a' | 'an';
	
		static getSettingValue(maidObj: RawUserObj, setting: keyof ValidSettingStrings): boolean;
	
		/**
		 * Sets permissions for a guild slash command.
		 * @param {Guild} guild The guild you want to edit slash commands in
		 * @param {string} commandName The name of the slash command you want to edit
		 * @param {import('discord.js').ApplicationCommandPermissionData[]} permissions The permissions you want to set for the slash command
		 * @param {'set' | 'add'} editType The type of edit you want to do with this slash command. If you pick 'set', this will use `ApplicationCommandPermissionsManager#set()`, otherwise, if you pick 'add', this will use `ApplicationCommandPermissionsManager#add()`. Defaults to "add"
		 */
		static editGuildCommandPermissions(guild: Guild, commandName: string, permissions: ApplicationCommandPermissionData[], editType: 'set' | 'add'): Promise<void>
	
		/**
		 * Sets permissions for a global slash command.
		 * @param {Client} client The client you want to edit slash commands in
		 * @param {string} commandName The name of the slash command you want to edit
		 * @param {import('discord.js').ApplicationCommandPermissionData[]} permissions The permissions you want to set for the slash command
		 * @param {'set' | 'add'} editType The type of edit you want to do with this slash command. If you pick 'set', this will use `ApplicationCommandPermissionsManager#set()`, otherwise, if you pick 'add', this will use `ApplicationCommandPermissionsManager#add()`. Defaults to "add"
		 */
		static editClientCommandPermissions(client: Client, commandName: string, permissions: ApplicationCommandPermissionData[], editType: 'set' | 'add'): Promise<void>
		 
		/**
		 * Fetches an application command from the parentResolvable. If `parentResolvable` is a guild, the command will be fetched from the Guild, otherwise if `parentResolvable` is a client, the command will be fetched from the Client.
		 * @param {Guild | Client} parentResolvable The parent to use in fetching the slash command
		 * @param {string} commandName The name of the slash command you want to fetch.
		 */
		static fetchApplicationCommand(parentResolvable: Guild | Client, commandName: string): Promise<ApplicationCommand>;
	
		/**
		 * Creates a progress bar!
		 * @param percentage The percent complete. Has to be a number from 0 to 100.
		 * @param maxTiles The max amount of "tiles" this progress bar should return. 
		 * @param options Options for creating a progress bar.
		 */
		static createProgressBar(percentage: number, maxTiles?: number, options?: CreateProgressBarOptions): string;
	}
	
	

	/**
	 * Contains various Discord-specific functions for formatting messages.
	 */
	export class Formatters extends null {
	    /**
	     * Formats the content into a block quote. This needs to be at the start of the line for Discord to format it.
	     * @param {string} content The content to wrap.
	     * @returns {string}
	     */
	    static blockQuote(content: string): string;
	
	    /**
	     * Formats the content into bold text.
	     * @param {string} content The content to wrap.
	     * @returns {string}
	     */
	    static bold(content: string): string;
	    /**
	     * Formats a channel id into a channel mention.
	     * @param {string} channelId The channel id to format.
	     * @returns {string}
	     */
	    static channelMention(channelId: string): string;
	    /**
	     * Wraps the content inside a code block with an optional language.
	     * @param {string} contentOrLanguage The language to use, content if a second parameter isn't provided.
	     * @param {string} [content] The content to wrap.
	     * @returns {string}
	     */
	    static codeBlock(contentOrLanguage: string, content?: string): string;
	    /**
	     * Formats an emoji id into a fully qualified emoji identifier
	     * @param {string} emojiId The emoji id to format.
	     * @param {boolean} [animated=false] Whether the emoji is animated or not. Defaults to `false`
	     * @returns {string}
	     */
	    static formatEmoji(emojiId: string, animated?: boolean): string;
	    /**
	     * Wraps the URL into `<>`, which stops it from embedding.
	     * @param {string} content The content to wrap.
	     * @returns {string}
	     */
	    static hideLinkEmbed(content: string): string;
	    /**
	     * Formats the content and the URL into a masked URL with an optional title.
	     * @param {string} content The content to display.
	     * @param {string} url The URL the content links to.
	     * @param {string} [title=''] The title shown when hovering on the masked link.
	     * @returns {string}
	     */
	    static hyperlink(content: string, url: string, title?: string): string;
	    /**
	     * Wraps the content inside \`backticks\`, which formats it as inline code.
	     * @param {string} content The content to wrap.
	     * @returns {string}
	     */
	    static inlineCode(content: string): string;
	    /**
	     * Formats the content into italic text.
	     * @param {string} content The content to wrap.
	     * @returns {string}
	     */
	    static italic(content: string): string;
	    /**
	     * Formats a user id into a member-nickname mention.
	     * @param {string} memberId The user id to format.
	     * @returns {string}
	     */
	    static memberNicknameMention(memberId: string): string;
	    /**
	     * Formats the content into a quote. This needs to be at the start of the line for Discord to format it.
	     * @param {string} content The content to wrap.
	     * @returns {string}
	     */
	    static quote(content: string): string;
	    /**
	     * Formats a role id into a role mention.
	     * @param {string} roleId The role id to format.
	     * @returns {string}
	     */
	    static roleMention(roleId: string): string;
	    /**
	     * Formats the content into spoiler text.
	     * @param {string} content The content to spoiler.
	     * @returns {string}
	     */
	    static spoiler(content: string): string;
	    /**
	     * Formats the content into strike-through text.
	     * @param {string} content The content to wrap.
	     * @returns {string}
	     */
	    static strikethrough(content: string): string;
	    /**
	     * Formats a date into a short date-time string.
	     * @param {number|Date} [date] The date to format.
	     * @param {TimestampStyles} [style] The style to use.
	     * @returns {string}
	     */
	    static time<K extends keyof TimestampStyles>(date?: number | Date, style?: TimestampStyles[K]): string;
	    /**
	     * Formats the content into underscored text.
	     * @param {string} content The content to wrap.
	     * @returns {string}
	     */
	    static underscore(content: string): string;
	    /**
	     * Formats a user id into a user mention.
	     * @param {string} userId The user id to format.
	     * @returns {string}
	     */
	    static userMention(userId: string): string;
	}

	export class CategoryPaginatorGroup {
		public constructor()
		private normalizeMessages(): void;
	
		public messages: (string | MessagePayload | MessageOptions)[];
		public default?: boolean;
		public description?: string;
		public emoji: EmojiIdentifierResolvable;
		public label?: string;
			
		public addMessages(...messages: (string | MessagePayload | MessageOptions)[]): this;
		public setMessages(...messages: (string | MessagePayload | MessageOptions)[]): this;
		public setDefault(boolean: boolean): this;
		public setLabel(label: string): this;
		public setDescription(description): this;
		public setEmoji(emoji: EmojiIdentifierResolvable): this;
	}
	
	/**
	 * Creates pages seperated by categories! This will paginate every single message on a `CategoryPaginatorGroup`, and will separate groups using the `SelectMenuBuilder` class.
	 */
	export class CategoryPaginator {
		public constructor()
		public messageInstance: Message
		public groups: CategoryPaginatorGroup[];
		public collectorTimeout?: number
	
		public setMessageInstance(message: Message): this;
		public addGroup(group: CategoryPaginatorGroup): this;
		public addGroups(...groups: CategoryPaginatorGroup[] | CategoryPaginatorGroup[][]): this;
		public setGroups(...groups: CategoryPaginatorGroup[] | CategoryPaginatorGroup[][]): this;
		public setCollectorTimeout(idle: number): this;
		public runCategoryPaginator(): Promise<void>
	}


	/**
	 * Creates button confirmations on a message! This class has 3 events: `check`, `cross` and `error`. You can hook up anything you want to do when it happens.
	 * @param {Message} message The message of the user that instantiated this. 
	 * @param {MessagePayload | MessageOptions} question The question you want to ask the user.
	 * @param {Function} onStart A function to execute before executing the message component collector.
	 * @param {boolean} [removeButtons=true] Whether to remove buttons when the events have been emitted. If set to `true` or `undefined`, it will remove buttons when the event has been emitted, and if `false`, it will disable buttons when the event has been emitted.
	 */
	export class Confirmation extends EventEmitter {
		constructor(message: Message<boolean>, question: MessagePayload | MessageOptions, fn?: (message: Message) => void)
		public on<K extends keyof ConfirmationEvents>(event: K, listener: (...args: ConfirmationEvents[K]) => Awaitable<void>): this;
		public once<K extends keyof ConfirmationEvents>(event: K, listener: (...args: ConfirmationEvents[K]) => Awaitable<void>): this;
		public emit<K extends keyof ConfirmationEvents>(event: K, ...args: ConfirmationEvents[K]): boolean;
		public off<K extends keyof ConfirmationEvents>(event: K, listener: (...args: ConfirmationEvents[K]) => Awaitable<void>): this;
		public removeAllListeners<K extends keyof ConfirmationEvents>(event?: K): this;
	}

	/**
	 * Creates a reaction confirmation on a message! If you are using v13, its highly suggested to use the `Confirmation` class instead.
	 * @param {Message} message The message of the user that instantiated this. 
	 * @param {string} version The version of `discord.js` to use. Defaults to `12` if you dont specify.
	 * @param {(string | EmbedBuilder | MessageOptions) | (string | MessagePayload | MessageOptions)} question The question you want to ask the user.
	 * @param {string | GuildEmoji} [checkEmoji='✅'] The reaction that will fire the check event. Defaults to ✅ if you dont specify. For custom emojis, use the `GuildEmoji` class and not the custom ID.
	 * @param {string | GuildEmoji} [crossEmoji='❌'] The reaction that will fire the cross event. Defaults to ❌ if you dont specify. For custom emojis, use the `GuildEmoji` class and not the custom ID.
	 * @param {number} [time=15000] The amount of time for awaiting a response. If the time ends, fire's the error event.
	 * @deprecated Since v5.0.0 - Use `Confirmation` instead.
	 */
	export class ReactionConfirmation<QuestionTypes extends keyof VersionReturnsTypes> extends EventEmitter {
		constructor(message: Message, version: QuestionTypes, question: VersionReturnsTypes[QuestionTypes], checkEmoji?: string | GuildEmoji, crossEmoji?: string | GuildEmoji, time?: number)
		public on<K extends keyof ReactionConfirmationEvents>(event: K, listener: (...args: ReactionConfirmationEvents[K]) => Awaitable<void>): this;
		public on<K extends keyof ReactionConfirmationEvents>(event: K, listener: (...args: ReactionConfirmationEvents[K]) => Awaitable<void>): this;
	}

	/**
	 * Creates an event users can join!
	 * @param {Message} message The message of the user that instantiated this
	 * @param {MessageEmbedResolvable} eventEmbed A `MessageEmbedResolvable`. This will be the embed for your event.
	 * @param {ActionRowBuilder} [eventRow=ActionRowBuilder] A `ActionRowBuilder` to be sent as the buttons for your event. If you don't specify this, SkyblockHelper will automatically use a preset ActionRowBuilder, with the button's custom ID as `join`. 
	 * @param {number} [maxTime=10000] The max time for this event. This should be in milliseconds, and not in seconds.
	 */
	export class Event extends EventEmitter {
		constructor(message: Message<boolean>, eventEmbed: MessageEmbedResolvable, eventRow?: ActionRowBuilder, maxTime?: number)
		public on<K extends keyof BotEventEvents>(event: K, listener: (...args: BotEventEvents[K]) => Awaitable<void>): this;
		public once<K extends keyof BotEventEvents>(event: K, listener: (...args: BotEventEvents[K]) => Awaitable<void>): this;
		public emit<K extends keyof BotEventEvents>(event: K, ...args: BotEventEvents[K]): boolean;
		public off<K extends keyof BotEventEvents>(event: K, listener: (...args: BotEventEvents[K]) => Awaitable<void>): this;
		public removeAllListeners<K extends keyof BotEventEvents>(event?: K): this;
	}

	/*
	export class SkybotClient extends Client {
		public textCommands: Collection<string, TextCommand>
		public slashCommands: Collection<string, SlashCommand>;
		public readonly cooldowns: Collection<string, Collection<string, number>>
		public readonly confirmations: Collection<string, boolean>
		public readonly assetMap: Collection<string, any>;
		public readonly bugMap: Collection<string, (string | Error)[]>
		public readonly console: string[]
		public readonly errorMap: Collection<string, "🟩" | "🟨" | "🟥">
	}
	*/

	/**
	 * Creates a SelectMenuBuilder confirmation on a Message! This class has 2 events: `confirmed` and `expired`. The `confirmed` event fires when the user confirms their selection, and the `expired` event fires when the user's time runs out. 
	 */
	export class SelectMenuConfirmation extends EventEmitter {
		public collectorTimeout?: number;
		public maxValues?: number;
		public menuMessage: string | MessageOptions | MessagePayload;
		public message: Message;
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
		 * Sets the instance of `Message` the `SelectMenuConfirmation` is going to use.
		 */
		public setMessageInstance(message: Message): this;
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

	export class AdventureOutcome<Type extends keyof AdventureOutcomeTypes> {
		public weight: number;
		public message: string;
		public readonly type: Type;
		public readonly reward?: AdventureOutcomeTypeChecker<Type, 'REWARD', BaseItemData, null>;
		public readonly itemTakenMessage?: AdventureOutcomeTypeChecker<Type, 'ITEM_LOSS', string, null>;
	   
		/**
		 * Set the message for this Outcomes. This will be used as the embed's description.
		 * @param {string} message
		 */
		public setMessage(message: string): this;
		
		/**
		 * Sets the weight of this outcome. The sum of all weights must be equal to 100.
		 * @param {number} weight
		 */
		public setWeight(weight: number): this;
		
		/**
		 * Sets the type of this AdventureOutcome
		 * @param {'DEATH' | 'FATAL_DEATH' | 'ITEM_LOSS' | 'NOTHING' | 'REWARD'} type
		 */
		public setType<AdventureOutcomeType extends keyof AdventureOutcomeTypes>(type: AdventureOutcomeType): AdventureOutcome<AdventureOutcomeType>;
		
		/**
		 * Sets the reward that will be given to the user.
		 * @param {BaseItemDataType} reward The reward that will be given to the user.
		 */
		public setReward(reward: BaseItemDataType): this;
	
		/**
		 * Sets the message that will display when an item has been taken from the user.
		 * @param {string} message A string that the AdventureEvent will use when saying that the user's item has been taken. You can use \${itemToTake.name} to display the name of the item taken.
		 */
		public setItemTakenMessage(message: string): this
	}
	
	export class AdventureOutcomeGroup {
		private normalizeOutcomes(): void;
		
		public readonly outcomes: AdventureOutcome<AnyAdventureOutcome>[];
		public readonly button: ButtonBuilder;
	
		public setOutcomes(...outcomes: AdventureOutcome<AnyAdventureOutcome>[] | AdventureOutcome<AnyAdventureOutcome>[][]): AdventureOutcomeGroup;
		public addOutcomes(...outcomes: AdventureOutcome<AnyAdventureOutcome>[] | AdventureOutcome<AnyAdventureOutcome>[][]): AdventureOutcomeGroup;
		public addOutcome(outcome: AdventureOutcome<AnyAdventureOutcome>): AdventureOutcomeGroup;
		public setButton(button: ButtonBuilder): AdventureOutcomeGroup
	}
	
	export class AdventureEvent<Type extends keyof AdventureEventTypes> {
		private validateOutcomes(): void;
		private normalizeOutcomes(): void;
		private createAdventureProgressBar(interactions: number, middle: string): string;
		private performAdventureItemLoss(maidObj: RawUserObj, sent: Message, outcome: AdventureOutcome<'ITEM_LOSS'>): Promise<void>;
		private performAdventureDeath(maidObj: RawUserObj, sent: Message, outcome: AdventureOutcome<'DEATH'>): Promise<void>;
		private performAdventureFatalDeath(maidObj: RawUserObj, sent: Message, outcome: AdventureOutcome<'FATAL_DEATH'>): Promise<void>;
		private performAdventureReward(maidObj: RawUserObj, sent: Message, outcome: AdventureOutcome<'REWARD'>): Promise<void>;
		private performAdventureNothing(maidObj: RawUserObj, sent: Message, outcome: AdventureOutcome<'NOTHING'>): Promise<void>;
		private addAdventureLuck(items: BaseItemData);
	
	
	
		public db: any;
		public message: Message;
		public content: string;
		public outcomeGroups: AdventureOutcomeGroup[];
		public readonly type: Type;
		public readonly debug: boolean;
	
		/**
		 * Set the database instance for this `AdventureEvent`
		 * @param {any} database
		 */
		public setDatabaseInstance(database: any): this;
	
		/**
		 * Set the message instance for this `AdventureEvent`
		 * @param {Message} message
		 */
		public setMessageInstance(message: Message): this;
	
		/**
		 * Set the intial content for this `AdventureEvent`
		 * @param {string} content
		 */
		public setContent(content: string): this;
	
		/**
		 * Set the type of this `AdventureEvent`
		 * @param {Type} type
		 */
		public setType<Type extends keyof AdventureEventTypes>(type: Type): AdventureEvent<Type>;
	
		/**
		 * Sets the outcomeGroups for this AdventureEvent
		 * @param {AdventureOutcome[] | AdventureOutcome[][]} outcomeGroups
		 */
		public setOutcomeGroups(...outcomeGroups: AdventureOutcome<AnyAdventureOutcome>[] | AdventureOutcome<AnyAdventureOutcome>[][]): this;
	
		/**
		 * Sets "debug" mode to true. This will console.log() important stuff thats happening.
		 * @param {boolean} debugMode
		 */
		public setDebugMode(debugMode: boolean): this;
	
		/**
		 * Adds outcomeGroups to this AdventureEvent
		 * @param {AdventureOutcome[] | AdventureOutcome[][]} outcomeGroups
		 * @returns
		 */
		public addOutcomeGroups(...outcomeGroups: AdventureOutcome<AnyAdventureOutcome>[] | AdventureOutcome<AnyAdventureOutcome>[][]): this;
	
		/**
		 * Add an outcome to this AdventureEvent
		 * @param  {AdventureOutcome} outcome
		 * @returns
		 */
		public addOutcomeGroup(outcome: AdventureOutcome<AnyAdventureOutcome>): this;
	
		/**
		 * This function is VERY important. Your adventure event **CANNOT** run without this function being executed. This function allows you to parse all the outcomeGroups into one adventure event without writing a gigaheap of code.
		 * @returns {Promise<void>}
		 */
		public runAdventureEvent(): Promise<void>;
	}
	
	class BaseItem {
		public constructor(data: BaseItemData);
	
		public search: string[];
		public group: string;
		public name: string;
		public keyName: string;
		public description?: string;
		public rarity: keyof ItemRarities;
		public emoji: any;
		public NPC: NPCData;
		public sellall: SellallData;
		public smeltable: SmeltData;
		public crafting?: CraftingData;
		public levelReq?: LevelRequirement;
		public enchanted?: BaseItem;
		public fuel?: FuelData;
		public includeInParsing: false;
		
		public displayEmojiName(minionEmojiType?: 'placed' | 'inventory'): string;
		public displayEmojiURL(minionEmojiType?: 'placed' | 'inventory'): string;
	}

	class EquipableItem extends BaseItem {
		constructor(data: EquippableItemData)
		
		/** @deprecated Use `EquippableItemData#onEquip()` instead */
		public equipData: EquippableItemEquipData;
		public emoji: ItemEmojiData;
		public onEquip(interaction: ChatInputCommandInteraction, maidObj: RawUserObj): RawUserObj;
	}

	export class Armor extends EquipableItem {
		constructor(data: ArmorData);
	
		public readonly group: `Armor`;
		public armor: ArmorInfoData;
	}

	/**
	 * A Normal Skybot Item, except the Emoji is different.
	 */
	export class Item extends BaseItem {
		public constructor(data: ItemData);

		public readonly group: 'Item';
		public emoji: ItemEmojiData
	}

	export class LootBox extends BaseItem {
		constructor(data: LootBoxData)
	
		public readonly group: 'Loot Box';
		public coins: LootBoxCoinData;
		public loot: Chancemaker<ChancemakerDatatype>;
	}

	export class Minion extends BaseItem {
		constructor(data: MinionData);
	
		public readonly group: 'Minion';
		public produces: MinionProduceData;
		public emoji: MinionEmojiData;
		public tiers: MinionTierData;
	}

	export class MinionFuel extends BaseItem {
		constructor(data: MinionFuelData)
		
		public readonly group: 'Minion Fuel';
		public emoji: ItemEmojiData;
		public minionFuel: MinionFuelInfoData;
	}

	export class MinionUpgrade extends BaseItem {
		constructor(data: MinionUpgradeData)
	
		public readonly group: `Minion Upgrade`;
		public emoji: ItemEmojiData;
		public minionUpgrade: MinionUpgradeInfoData;
	}

	export class PowerUp extends EquipableItem {
		public constructor(data: PowerUpData);
		
		public readonly group: 'Power-up';
		public emoji: ItemEmojiData;
		public requireTarget: boolean;
		public key?: string;
	}

	export class Sword extends EquipableItem {
		constructor(data: SwordData);
	
		public readonly group: `Sword`;
		public emoji: ItemEmojiData;
		public sword: SwordInfoData;
		public swordFunc: SwordFunctions;
	}

	export class Tool extends EquipableItem {
		public constructor(data: ToolData);
		
		public readonly group: 'Tool';
		public emoji: ItemEmojiData;
		public tool: ToolInfoData;
	}

	/**
	 * Utility class for creating Ender Dragon fights.
	 * 
	 * Contains built in functions that change once a certain event happens.	
	 */
	export class DragonFight<Type = `DORMANT`> extends EventEmitter {
		public constructor();

		public readonly cooldown?: DragonTypeReducer<Type, null, null, number>
		public readonly dragonDamage?: DragonTypeReducer<Type, null, Collection<string, DragonFightUser>>;
		public readonly dragonHealth?: DragonTypeReducer<Type, null, number>;
		public readonly dragonVariant?: DragonTypeReducer<Type, null, DragonVariants>;
		public readonly eyes?: DragonTypeReducer<Type, Collection<string, number>>;
		public readonly type: Type;
		public readonly guild: Guild

		public addSummoningEye?: DragonTypeReducer<Type, (user: string) => void>;
		public remSummoningEye?: DragonTypeReducer<Type, (user: string) => boolean>;
		public addDragonDamage?: DragonTypeReducer<Type, null, (user: string, damage: number) => void>;
		public isDormantFight(): this is DragonFight<`DORMANT`>;
		public isOngoingFight(): this is DragonFight<`ONGOING`>;
		public isCooldownFight(): this is DragonFight<`COOLDOWN`>;

		public on<K extends keyof DragonFightEvents>(event: K, listener: (...args: DragonFightEvents[K]) => Awaitable<void>): this;
	}

	/* FUNCTIONS */

	/**
	 * @param {CraftingOptions} options The options for crafting this item.
	 * @returns {Promise<CraftingResults>}
	 * @example 
	 * await Crafting(
	 * 	{
	 * 		// ...
	 * 		items: [
	 * 			['planks', 'planks', ':Planks:', 2], 
	 * 			['stick', 'stick', ':Stick:', 1]
	 * 		],
	 * 		craftType: 'one-to-one'
	 * 	}
	 * )
	 * 
	 * // If they were to craft this item, all of these items will be consumed to make that item
	 */
	export function Crafting(options: CraftingOptions): Promise<CraftingResults>

	/**
	 * Adds various utility functions to native Javascript classes.
	 * 
	 * Object.prototype.toString(); Now returns a string instead of [object Object]
	 * 
	 * Array.prototype.tap()
	 * 
	 * Array.prototype.random()
	 * 
	 * Array.prototype.partition()
	 * 
	 * Array.prototype.first()
	 * 
	 * Array.prototype.last()
	 */
	export function extendNativeClasses(): void;

	/* INTERFACES */

	interface CreateProgressBarOptions {
		bar1?: BarOptions;
		bar2?: BarOptions;
		bar3?: BarOptions;
	}
	
	interface BarOptions {
		full?: string;
		empty?: string;
	}

	interface BotEventEvents {
		userJoined: [button: ButtonInteraction, sent: Message<boolean>]
		eventEnded: [collected: Collection<string, ButtonInteraction>, reason: string, sent: Message<boolean>]
	}

	interface ConfirmationEvents {
		check: [button: ButtonInteraction, sent: Message];
		cross: [button: ButtonInteraction, sent: Message];
		error: [error: Error, sent: Message];
	}

	interface ReactionConfirmationEvents {
		check: [MessageReaction, Message];
		cross: [MessageReaction, Message];
		error: [Error, Message];
	}

	interface SkillCollections {
		foraging: string;
		mining: string;
		fishing: string;
		combat: string;
	}

	interface DragonFightUser {
		damage: number;
		health: number;
	}

	interface DragonFightEvents {
		eyePlaced: [user: GuildMember, totalEyes: number];
		eyeRemove: [user: GuildMember];
		dragonSummon: [type: string];
		dragonAttack: [attackType: string, targetUsers: DragonAttackObj[]];
		playerDeaths: [users: GuildMember[], attackType: string];
		dragonFlee: [];
		dragonDeath: [type: string, damageDealt: Collection<string, DragonFightUser>, lastHit: GuildMember];
	}

	interface DragonAttackObj {
		user: GuildMember;
		damage: number;
	}
	

	interface TimestampStyles {
		/**
	     * Short time format, consisting of hours and minutes, e.g. 16:20.
	     */
		ShortTime: 't',
		 /**
		  * Long time format, consisting of hours, minutes, and seconds, e.g. 16:20:30.
		  */
		LongTime: 'T',
		 /**
		  * Short date format, consisting of day, month, and year, e.g. 20/04/2021.
		  */
		ShortDate: 'd',
		 /**
		  * Long date format, consisting of day, month, and year, e.g. 20 April 2021.
		  */
		LongDate: 'D',
		 /**
		  * Short date-time format, consisting of short date and short time formats, e.g. 20 April 2021 16:20.
		  */
		ShortDateTime: 'f',
		 /**
		  * Long date-time format, consisting of long date and short time formats, e.g. Tuesday, 20 April 2021 16:20.
		  */
		LongDateTime: 'F',
		 /**
		  * Relative time format, consisting of a relative uration format, e.g. 2 months ago.
		  */
		RelativeTime: 'R',
	}

	interface ToolRequirements {
		wooden_pickaxe: string
		stone_pickaxe: string
		iron_pickaxe: string
		gold_pickaxe: string
		diamond_pickaxe: string
		wooden_axe: string
		stone_axe: string
		iron_axe: string
		gold_axe: string
		diamond_axe: string
	}

	interface VersionReturnsTypes {
		v12: string | EmbedBuilder | MessageOptions
		v13: string | MessagePayload | MessageOptions
	}

	interface GetReturns {
		true: null
		false: undefined
	}

	interface SelectMenuConfirmationEvents {
		confirmed: [message: Message<boolean>, selected: string[]]
		expired: [message: Message<boolean>, error: Error]
	}

	interface BaseItemData {
		search: string[];
		group: string;
		name: string;
		keyName: string;
		description?: string;
		rarity: keyof ItemRarities;
		emoji: any;
		NPC: NPCData;
		sellall: SellallData
		crafting?: CraftingData;
		levelReq?: LevelRequirement;
		enchanted?: BaseItem;
		fuel?: FuelData;
		includeInParsing: false;
	}
	
	interface FuelData {
		time: number;
	}

	interface ItemData extends BaseItemData {
		group: 'Item';
		emoji: ItemEmojiData;
	}

	interface MinionData extends BaseItemData {
		group: 'Minion';
		produces: MinionProduceData;
		emoji: MinionEmojiData;
		tiers: MinionTierData;
	}

	interface MinionFuelData extends BaseItemData {
		group: 'Minion Fuel';
		emoji: ItemEmojiData;
		minionFuel: MinionFuelInfoData;
	}

	interface MinionUpgradeData extends BaseItemData {
		group: `Minion Upgrade`;
		emoji: ItemEmojiData;
		minionUpgrade: MinionUpgradeInfoData
	}

	interface EquippableItemData extends BaseItemData {
		/** @deprecated Use `EquippableItemData#onEquip()` instead */
		equipData: EquippableItemEquipData;
		emoji: ItemEmojiData;
		requireTarget: boolean;
		key?: string;
		/**
		 * This function must contain everything in order for the item to be used. Things like deducting and adding items is handled by the `equip` command.   
		 */
		onEquip(interaction: ChatInputCommandInteraction, maidObj: RawUserObj): RawUserObj;
	}

	interface PowerUpData extends EquippableItemData {
		group: `Power-up`;
	}

	interface SwordData extends EquippableItemData {
		group: `Sword`;
		sword: SwordInfoData;
		swordFunc: SwordFunctions;
	}

		
	interface ToolData extends EquippableItemData {
		group: `Tool`;
		tool: ToolInfoData;
	}
	
	interface AdventureEventTypes {
		NORMAL: string;
		NOTHING: string;
	}

	interface AdventureOutcomeTypes {
		DEATH: string;
		FATAL_DEATH: string;
		ITEM_LOSS: string;
		NOTHING: string;
		REWARD: string;
	}

	interface ItemRarities {
		Common: string;
		Uncommon: string;
		Rare: string;
		Epic: string;
		Legendary: string;
		Mythic: string;
		Divine: string;
		Special: string;
		'Very Special': string;
	}

	interface LootBoxData extends BaseItemData {
		coins: LootBoxCoinData;
		loot: Chancemaker<ChancemakerDatatype>
	}

	interface ArmorData extends EquippableItemData {
		group: `Armor`;
		armor: ArmorInfoData;
	}

	interface ArmorStatisticData {
		health?: number;
		defense?: number;
		strength?: number;
		speed?: number;
		critChance?: number;
		critDamage?: number;
		inteligence?: number;
	}

	/* TYPES */

	type BaseItemDataType = (import ('discord.js').BaseItemData)	
	
	type ArmorInfoData = {
		stats: ArmorStatisticData;
		helmet: string;
		chestplate: string;
		leggings: string;
		boots: string;
	}

	type ToolInfoData = {
		type: string;
		breakingPower: number;
	}

	type MessageEmbedResolvable = EmbedBuilder | EmbedBuilder[]

	type SkybotTimeOptions = {
		newLine: boolean
	}

	type TextCommand = {
		name: string;
		group?: string;
		aliases?: string[];
		description?: string;
		cooldown?: number;
		args?: boolean;
		argsRequired?: number;
		usage?: string;
		guildOnly?: boolean;
		confirmation?: boolean;
		developerOnly?: boolean;
		tutorial?: TextCommandTutorial;
		require: TextCommandRequire;
		execute: (message: Message, args: string[], db: any, maid: string) => Promise<void>;
	} 
	
	type SlashCommand = {
		data: SlashCommandBuilder;
		execute(interaction: ChatInputCommandInteraction, db: any, maid: string): Promise<void>;
	}
	
	type TextCommandRequire = {
		start?: boolean;
		update?: string;
	}
	
	type TextCommandTutorial = {
		embeds: EmbedBuilder[];
		key: string;
	}

	type SelectMenuConfirmationOptions = {
		default: boolean;
		description: string;
		disabled: boolean;
		emoji: EmojiIdentifierResolvable;
		label: string;
		value: string;
	}

	type ChancemakerEntryData<Item> = {
		item: Item;
		minAmount?: number;
		maxAmount?: number;
		chance?: number;
	};
	
	type ChancemakerData = {
		entries: ChancemakerEntryData<unknown>[];
		rolls?: number;
		minRolls?: number;
		maxRolls?: number;
		noRepeatingRes?: boolean;
	};
	
	type ChancemakerReturnData<Item> = {
		item: Item;
		amount: number;
	}

	type ChancemakerPossibleItems<Item> = {
		item: Item;
		maxAmount: number;
		minAmount: number;
	}
	
	type ChancemakerItemChances<Item> = {
		chance: number;
		item: Item;
		maxAmount: number;
		minAmount: number;
	}

	type CraftingOptions = {
		maid: string;
		items: (string | number)[][];
		db: any;
		amount?: number;
		craftType?: "oneItem" | "multiItem";
	}

	type CraftingResults = {
		enoughItems: boolean;
		itemsNeeded?: string[];
		itemReq: string[];
		itemsConsumed: (string | number)[][];
	}

	/**
	 * If T2 (the type you want to unify with T1) is `undefined`, this returns just T1, otherwise, it returns T1 | T2
	 */
	type UnifyRealTypes<T1, T2> = T2 extends undefined 
		? T1
		: T1 | T2

	type ItemEmojiData = {
		name: string;
		url: string;
	}

	type SellNPCData = {
		sellable: boolean; 
		price: number;
	}

	type BuyNPCData = {
		buyable: boolean; 
		price: number;
	}

	type NPCData = {
		sell: SellNPCData;
		buy: BuyNPCData;
	}

	type CraftingData = {
		type: `oneItem`,
		materials?: [string, string, string, number][],
		outputs?: number;
		repair?: RepairData;
	}
	
	type RepairData = {
		materials: [string, string, string, number][];
		outputs: [string, string, string, number];
	}

	type SellallData = {
		included: boolean; 
		filterGroup?: string;
	}

	type MinionProduceData = {
		keyName: string;
		displayName: string;
		emoji: string;
	}
	
	type MinionEmojiData = {
		name: InnerMinionEmojiData;
		url: InnerMinionEmojiData;
	}
	
	type InnerMinionEmojiData = {
		placed: string;
		inventory: string;
	}
	
	type MinionTierData = {
		i: LowerMinionTierData;
		ii: LowerMinionTierData;
		iii: LowerMinionTierData;
		iv: LowerMinionTierData;
		v: LowerMinionTierData;
		vi: LowerMinionTierData;
		vii: LowerMinionTierData;
		viii: LowerMinionTierData;
		ix: LowerMinionTierData;
		x: HigherMinionTierData;
	}
	
	type LowerMinionTierData = {
		timeBetweenActions: number;
		maxStorage: number;
		upgradeAmount: number;
		itemKeyName: string;
	}
	
	type HigherMinionTierData = {
		timeBetweenActions: number;
		maxStorage: number;
	}

	type MinionFuelInfoData = {
		duration: number;
		multiplier: number;
		speed: number;
		reclaimable: boolean;
	}
		
	type MinionUpgradeInfoData = {
		compactLevel: number;
		speed: number;
		autoSmelt: boolean;
	}
	
	type EquippableItemEquipData = {
		key: string;
		value: any;
	}

		
	type SwordInfoData = {
		baseDamage?: number;
		itemAbility?: string;
	}
	
	type SwordFunctions = {
		/**
		 * A function that can amplify damage.
		 * @param {InventorySwordObj} sword The sword object
		 * @param {number} index The index. This is how many times the user and mob traded hits.
		 */
		onHit?(sword: InventorySwordObj, index: number): number
		/**
		 * A function that does something with the sword when it kills a mob.
		 * @param {Message} message The Message object.
		 * @param {InventorySwordObj} sword The sword object. 
		 */
		onKill?(message: Message, sword: InventorySwordObj): void;
		/**
		 * A function that takes in the sword object, and returns the base damage the sword will deal.
		 * @param {InventorySwordObj} sword 
		 */
		getBaseDamage(sword: InventorySwordObj): number;
		getSwordStats(sword: InventorySwordObj): string;
		getExamineStats(): string;
	}

	type SmeltData = {
		output: Item;
		amount: number;
	}

	type LevelRequirement = {
		skill: `Foraging` | `Mining` | `Fishing` | `Combat`;
		level: number;
	}

	type LootBoxCoinData = {
		min: number;
		max: number;
	}
	
	type ChancemakerDatatype = {
		name: string;
		keyName: string;
		emoji: string;
	}

	type UserResolvable = string | Message<boolean> | Interaction<CacheType> | User | GuildMember | ThreadMember;

	type GuildMemberResolvable = string | GuildMember | ThreadMember | Message<true> | Interaction<"cached">;

	type SkybotCurrencyProfile = {
		money: number;
		netWorth: number;
		username: string;
		id: string;
	}

	type AnyAdventureOutcome = 'DEATH' | 'FATAL_DEATH' | 'ITEM_LOSS' | 'NOTHING' | 'REWARD';
	
	type AdventureOutcomeTypeChecker<
		State,
		WantedType,
		TrueType,
		FalseType
	> = [State] extends [WantedType] 
		? TrueType
		: FalseType

	
	type DragonTypeReducer<
		Type, 
		onDormant = null, 
		onOngoing = null,
		onCooldown = null,
		onFallback = null
	> = [Type] extends ['DORMANT'] 
		? onDormant 
		: [Type] extends ['ONGOING']
		? onOngoing
		: [Type] extends ['COOLDOWN']
		? onCooldown
		: onFallback;
	
	type DragonTypes = `DORMANT` | `ONGOING` | `COOLDOWN`;
	
	type DragonVariants = 
		| `Protector`
		| `Old`
		| `Wise`
		| `Unstable`
		| `Young`
		| `Strong`
		| `Superior`
}