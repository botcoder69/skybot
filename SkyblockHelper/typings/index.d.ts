
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
		static calcTime(offset: string): string
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
		 * An easier way to remove an item from an array.
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
		static resolveGuildMember(guildMember: GuildMemberResolvable, guild: Guild): GuildMember;
	
		/**
		 * Gets a random number starting from `min` to `max`.
		 * @param {number} min The lowest number this random number generator can return
		 * @param {number} max The highest number this random number generator can return
		 */
		static getRandomNumber(min: number, max: number): number;
	
		/**
		 * Gets a chosen random number starting from `min` to `max`.
		 * @param {number} min The lowest number this random number generator can return.
		 * @param {number} max The highest number this random number generator can return.
		 * @param {number[]} exclude The specific numbers this random number generator can't return. If you want all the numbers from `min` to `max`, use `Functions#getRandomNumber()` instead.
		 */
		static getSpecifiedRandomNumber(min: number, max: number, exclude: number[]): number;
	
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
		 * This handy static overwrites existing properties. If the property in `objectToOverwrite` doesn't exist in `objectFromOverwrite`, it will be kept, otherwise, it will be overwritten
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
		 * This handy static returns a or an whether `word` starts with "a", "e", "i", "o", "u". This is very handy for those persons who don't want to have a big ternary expression just for 'a' and 'an'.
		 * @param {string} word 
		 */
		static aoran(word: string): 'a' | 'an';
	
		static getSettingValue(maidObj: RawUserObj, setting: ValidSettingStrings): boolean;
		 
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
	
		/**
		 * This collects all the userObjs of all users in `guild` that is registered to Skybot.
		 * @param {any} db
		 * @param {Guild} guild
		 */
		static collectAllGuildUserObjs(db: any, guild: Guild): Promise<Collection<string, object>>;
	
		/**
		 * This resolves an armor's "statistics" into an object with filled properties.
		 * @param {Armor} armor 
		 */
		static resolveArmorStats(armor: Armor): FilledArmorStatisticData;
	
		/**
		 * Splits a string into multiple chunks at a designated character that do not exceed a specific length. Since `discord.js` will remove this useful static on `v14`, I have added it here.
		 * @param {string} text The content to split.
		 * @param {SplitOptions} [options] The options controlling the behavior of the split static.
		 * @returns {string[]}
		 */
		static splitMessage(text: string, options?: SplitOptions): string[];
	
		/**
		 * Verifies the provided data is a string, otherwise throws provided error. Since Functions#splitMessage() requires this static to work and `discord.js` will remove this static on `v14`, I have added `it here.
		 * @param {string} data The string resolvable to resolve
		 * @param {Function} [error] The Error constructor to instantiate. Defaults to Error
		 * @param {string} [errorMessage] The error message to throw with. Defaults to "Expected string, got <data> instead."
		 * @param {boolean} [allowEmpty=true] Whether an empty string should be allowed
		 * @returns {string}
		 */
		static verifyString(data: string, error?: typeof Error, errorMessage?: string, allowEmpty?: boolean): string;
	
		/**
		 * Makes a request to the given URL.
		 * @param url The URL you want to make a request to.
		 * @param requestData The data of the request you want to create.
		 * @param retries The amount of times the request will be resent until the method gives up.
		 */
		static request(url: string, requestData: RequestOptions, retries?: number): Promise<Response>;
	
		/**
		 * Makes a request to the URL of a Skybot Database. This returns the value of the `value` property from `Request#json()` instead of the `Request` itself. If you want the request, use `Functions#request()` instead.
		 * @param url The URL of the Skybot Database you want to make a request to.
		 * @param requestData The data of the request you want to create.
		 * @param retries The amount of times the request will be resent until the method gives up.
		 */
		static requestToSkybotDatabase(url: string, requestData: RequestOptions, retries?: number): Promise<any>;
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

		
	
	
	interface RequestOptions {
		/** Request type. */
		method: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'PATCH',
		/** Request body. can be null, or a Node.js Readable stream */
		body: string | ReadableStream | null,
		/** Request headers. format is the identical to that accepted by the Headers constructor. */
		headers: RequestHeadersOptions;
		/** Set to `manual` to extract redirect headers, `error` to reject redirect, `follow` is default. */
		redirect: 'follow' | 'manual' | 'error',
		/** Pass an instance of AbortSignal to optionally abort requests */
		signal: AbortSignal | null,
	}
	
	interface RequestHeadersOptions {
		Accept: string;
		'Accept-Encoding': 'gzip' | 'compress' | 'deflate' | 'br' | 'identity' | '*';
		'Accept-Language': string;
		'Access-Control-Request-Method': 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'PATCH';
		'Access-Control-Request-Headers': string;
		Authorization: string;
		'Cache-Control': string;
		Connection: string;
		'Content-Length': string;
		'Content-Type': RequestHeadersContentTypes;
		Cookie: string;
		Expect: string;
		Forwarded: string;
		From: string;
		Host: string;
		'If-Match': string;
		'If-Modified-Since': string;
		'If-None-Match': string;
		'If-Range': string;
		'If-Unmodified-Since': string;
		'Max-Forwards': string;
		Origin: string;
		'Proxy-Authorization': string;
		Range: string;
		Referer: string;
		TE: string;
		'User-Agent': string;
		Via: string;
	}
	
	interface CreateProgressBarOptions {
		bar1?: BarOptions;
		bar2?: BarOptions;
		bar3?: BarOptions;
	}
	
	interface BarOptions {
		full?: string;
		empty?: string;
	}
	
	interface ToolRequirements {
		wooden_pickaxe: string;
		stone_pickaxe: string;
		iron_pickaxe: string;
		gold_pickaxe: string;
		diamond_pickaxe: string;
		wooden_axe: string;
		stone_axe: string;
		iron_axe: string;
		gold_axe: string;
		diamond_axe: string;
	}
	
	interface SkillCollections {
		foraging: string;
		mining: string;
		fishing: string;
	}
	
	type ValidSettingStrings = 
		| `hideFromLb`
		| `fightNerd`
		| `voteReady`
		| `blockTradeIns`
		| `avoidRestart`
		| `developerOverride_Cooldown`
		| `developerOverride_Safeguard`
		| `developerOverride_Advantage`	
	
	interface SplitOptions {
		maxLength?: number;
		char?: string | string[] | RegExp | RegExp[];
		prepend?: string;
		append?: string;
	  }
	
	type RawUserObj = {
		axe?: string;
		pickaxe?: string;
		rod?: string;
		cobblestone?: number;
		coal?: number;
		ironOre?: number;
		iron?: number;
		goldOre?: number;
		gold?: number;
		lapis?: number;
		diamond?: number;
		pureDiamond?: number;
		startMine?: boolean;
		ironMine?: boolean;
		goldMine?: boolean;
		lapisQua?: boolean;
		diaSanct?: boolean;
		redsMine?: boolean;
		mineLevel?: number;
		mineXp?: number;
		fishLevel?: number;
		fishXp?: number;
		chopLevel?: number;
		chopXp?: number;
		oakWood?: number;
		birchWood?: number;
		darkOakWood?: number;
		spruceWood?: number;
		acaciaWood?: number;
		jungleWood?: number;
		planks?: number;
		stick?: number;
		forest?: boolean;
		roofedForest?: boolean;
		taiga?: boolean;
		savannah?: boolean;
		jungle?: boolean;
		commonFish?: number;
		uncommonFish?: number;
		rareFish?: number;
		ultraRareFish?: number;
		legendaryFish?: number;
		coins?: number;
		bank?: number;
		netWorth?: number;
		invOakWoodMinion?: number;
		invBirchWoodMinion?: number;
		invDarkOakWoodMinion?: number;
		invSpruceWoodMinion?: number;
		invAcaciaWoodMinion?: number;
		invJungleWoodMinion?: number;
		invCobblestoneMinion?: number;
		invCoalMinion?: number;
		invIronMinion?: number;
		invGoldMinion?: number;
		invDiamondMinion?: number;
		invLapisMinion?: number;
		placedMinions?: (string | number)[][];
		bankTier?: number;
		enchantedGold?: number;
		enchantedGoldBlock?: number;
		blockOfCoal?: number;
		enchantedBread?: number;
		enchantedCharcoal?: number;
		enchantedCoal?: number;
		enchantedLavaBucket?: number;
		enchantedCobblestone?: number;
		enchantedIron?: number;
		enchantedLapis?: number;
		enchantedDiamond?: number;
		enchantedOakWood?: number;
		enchantedBirchWood?: number;
		enchantedDarkOakWood?: number;
		enchantedSpruceWood?: number;
		enchantedAcaciaWood?: number;
		enchantedJungleWood?: number;
		redstone?: number;
		enchantedRedstone?: number;
		compactor?: number;
		superCompactor?: number;
		invRedstoneMinion?: number;
		tutorials?: TutorialObj;
		gambleStats?: GambleStatsObj;
		sword?: SwordObj;
		woodenSword?: number;
		stoneSword?: number;
		ironSword?: number;
		goldSword?: number;
		diamondSword?: number;
		aspectOfTheSpiritButterfly?: number;
		spiritButterfly?: number;
		woodenPickaxe?: number;
		stonePickaxe?: number;
		ironPickaxe?: number;
		goldPickaxe?: number;
		diamondPickaxe?: number;
		woodenAxe?: number;
		stoneAxe?: number;
		ironAxe?: number;
		goldAxe?: number;
		diamondAxe?: number;
		combatLevel?: number;
		combatXp?: number;
		start?: boolean;
		update?: string;
		activeItems?: ActiveItemObj[];
	};
	
	interface FilledArmorStatisticData {
		health: number;
		defense: number;
		strength: number;
		speed: number;
		critChance: number;
		critDamage: number;
		inteligence: number;
	}
	
	type TutorialObj = {
		minion?: boolean;
		dices?: boolean;
		highlow?: boolean;
		scratchoff?: boolean;
	};
	
	type GambleStatsObj = {
		dices: GambleInfoObj;
		scratchoff: GambleInfoObj;
	};
	
	type GambleInfoObj = {
		moneyWon?: number;
		moneyLost?: number;
		totalWins?: number;
		totalLoses?: number;
	};
	
	type SwordObj = {
		name: string;
		keyName: string;
		emoji: string;
		baseDamage: number;
		strength?: number;
		critChance?: number;
		enchantments: string[];
		spiritButterfly?: number;
	};
	
	type ActiveItemObj = {
		name: string;
		keyName: string;
		emoji: string;
		endTimestamp: number;
	};
	
	type SkybotTimeOptions = {
		newLine?: boolean;
	}
	
	type UserResolvable = string | Snowflake | Message | Interaction | User | GuildMember | ThreadMember;
	
	type GuildMemberResolvable = string | Snowflake | Message<true> | Interaction<'cached'> | GuildMember | ThreadMember
	
	type SkybotCurrencyProfile = {
		money: number;
		netWorth: number;
		username: string;
		id: string;
	}
	
	type FlagReturn<ArrayType extends unknown> = {
		exists: boolean
		arguments: ArrayType[];
		flag: string;
	}
	
	type RequestHeadersContentTypes = 
	 | `application/1d-interleaved-parityfec`
	 | `application/3gpdash-qoe-report+xml`
	 | `application/3gppHal+json`
	 | `application/3gppHalForms+json`
	 | `application/3gpp-ims+xml`
	 | `application/A2L`
	 | `application/ace+cbor`
	 | `application/ace+json`
	 | `application/activemessage`
	 | `application/activity+json`
	 | `application/aif+cbor`
	 | `application/aif+json`
	 | `application/alto-cdni+json`
	 | `application/alto-cdnifilter+json`
	 | `application/alto-costmap+json`
	 | `application/alto-costmapfilter+json`
	 | `application/alto-directory+json`
	 | `application/alto-endpointprop+json`
	 | `application/alto-endpointpropparams+json`
	 | `application/alto-endpointcost+json`
	 | `application/alto-endpointcostparams+json`
	 | `application/alto-error+json`
	 | `application/alto-networkmapfilter+json`
	 | `application/alto-networkmap+json`
	 | `application/alto-propmap+json`
	 | `application/alto-propmapparams+json`
	 | `application/alto-updatestreamcontrol+json`
	 | `application/alto-updatestreamparams+json`
	 | `application/AML`
	 | `application/andrew-inset`
	 | `application/applefile`
	 | `application/at+jwt`
	 | `application/ATF`
	 | `application/ATFX`
	 | `application/atom+xml`
	 | `application/atomcat+xml`
	 | `application/atomdeleted+xml`
	 | `application/atomicmail`
	 | `application/atomsvc+xml`
	 | `application/atsc-dwd+xml`
	 | `application/atsc-dynamic-event-message`
	 | `application/atsc-held+xml`
	 | `application/atsc-rdt+json`
	 | `application/atsc-rsat+xml`
	 | `application/ATXML`
	 | `application/auth-policy+xml`
	 | `application/automationml-aml+xml`
	 | `application/automationml-amlx+zip`
	 | `application/bacnet-xdd+zip`
	 | `application/batch-SMTP`
	 | `application/beep+xml`
	 | `application/calendar+json`
	 | `application/calendar+xml`
	 | `application/call-completion`
	 | `application/CALS-1840`
	 | `application/captive+json`
	 | `application/cbor`
	 | `application/cbor-seq`
	 | `application/cccex`
	 | `application/ccmp+xml`
	 | `application/ccxml+xml`
	 | `application/cda+xml`
	 | `application/CDFX+XML`
	 | `application/cdmi-capability`
	 | `application/cdmi-container`
	 | `application/cdmi-domain`
	 | `application/cdmi-object`
	 | `application/cdmi-queue`
	 | `application/cdni`
	 | `application/CEA`
	 | `application/cea-2018+xml`
	 | `application/cellml+xml`
	 | `application/cfw`
	 | `application/city+json`
	 | `application/clr`
	 | `application/clue_info+xml`
	 | `application/clue+xml`
	 | `application/cms`
	 | `application/cnrp+xml`
	 | `application/coap-group+json`
	 | `application/coap-payload`
	 | `application/commonground`
	 | `application/concise-problem-details+cbor`
	 | `application/conference-info+xml`
	 | `application/cpl+xml`
	 | `application/cose`
	 | `application/cose-key`
	 | `application/cose-key-set`
	 | `application/csrattrs`
	 | `application/csta+xml`
	 | `application/CSTAdata+xml`
	 | `application/csvm+json`
	 | `application/cwl`
	 | `application/cwl+json`
	 | `application/cwt`
	 | `application/cybercash`
	 | `application/dash+xml`
	 | `application/dash-patch+xml`
	 | `application/dashdelta`
	 | `application/davmount+xml`
	 | `application/dca-rft`
	 | `application/DCD`
	 | `application/dec-dx`
	 | `application/dialog-info+xml`
	 | `application/dicom`
	 | `application/dicom+json`
	 | `application/dicom+xml`
	 | `application/DII`
	 | `application/DIT`
	 | `application/dns`
	 | `application/dns+json`
	 | `application/dns-message`
	 | `application/dots+cbor`
	 | `application/dskpp+xml`
	 | `application/dssc+der`
	 | `application/dssc+xml`
	 | `application/dvcs`
	 | `application/ecmascript`
	 | `application/EDI-consent`
	 | `application/EDIFACT`
	 | `application/EDI-X12`
	 | `application/efi`
	 | `application/elm+json`
	 | `application/elm+xml`
	 | `application/EmergencyCallData.cap+xml`
	 | `application/EmergencyCallData.Comment+xml`
	 | `application/EmergencyCallData.Control+xml`
	 | `application/EmergencyCallData.DeviceInfo+xml`
	 | `application/EmergencyCallData.eCall.MSD`
	 | `application/EmergencyCallData.ProviderInfo+xml`
	 | `application/EmergencyCallData.ServiceInfo+xml`
	 | `application/EmergencyCallData.SubscriberInfo+xml`
	 | `application/EmergencyCallData.VEDS+xml`
	 | `application/emma+xml`
	 | `application/emotionml+xml`
	 | `application/encaprtp`
	 | `application/epp+xml`
	 | `application/epub+zip`
	 | `application/eshop`
	 | `application/example`
	 | `application/exi`
	 | `application/expect-ct-report+json`
	 | `application/express`
	 | `application/fastinfoset`
	 | `application/fastsoap`
	 | `application/fdf`
	 | `application/fdt+xml`
	 | `application/fhir+json`
	 | `application/fhir+xml`
	 | `application/fits`
	 | `application/flexfec`
	 | `application/font-sfnt`
	 | `application/font-tdpfr`
	 | `application/font-woff`
	 | `application/framework-attributes+xml`
	 | `application/geo+json`
	 | `application/geo+json-seq`
	 | `application/geopackage+sqlite3`
	 | `application/geoxacml+xml`
	 | `application/gltf-buffer`
	 | `application/gml+xml`
	 | `application/gzip`
	 | `application/H224`
	 | `application/held+xml`
	 | `application/hl7v2+xml`
	 | `application/http`
	 | `application/hyperstudio`
	 | `application/ibe-key-request+xml`
	 | `application/ibe-pkg-reply+xml`
	 | `application/ibe-pp-data`
	 | `application/iges`
	 | `application/im-iscomposing+xml`
	 | `application/index`
	 | `application/index.cmd`
	 | `application/index.obj`
	 | `application/index.response`
	 | `application/index.vnd`
	 | `application/inkml+xml`
	 | `application/IOTP`
	 | `application/ipfix`
	 | `application/ipp`
	 | `application/ISUP`
	 | `application/its+xml`
	 | `application/javascript`
	 | `application/jf2feed+json`
	 | `application/jose`
	 | `application/jose+json`
	 | `application/jrd+json`
	 | `application/jscalendar+json`
	 | `application/json`
	 | `application/json-patch+json`
	 | `application/json-seq`
	 | `application/jwk+json`
	 | `application/jwk-set+json`
	 | `application/jwt`
	 | `application/kpml-request+xml`
	 | `application/kpml-response+xml`
	 | `application/ld+json`
	 | `application/lgr+xml`
	 | `application/link-format`
	 | `application/linkset`
	 | `application/linkset+json`
	 | `application/load-control+xml`
	 | `application/lost+xml`
	 | `application/lostsync+xml`
	 | `application/lpf+zip`
	 | `application/LXF`
	 | `application/mac-binhex40`
	 | `application/macwriteii`
	 | `application/mads+xml`
	 | `application/manifest+json`
	 | `application/marc`
	 | `application/marcxml+xml`
	 | `application/mathematica`
	 | `application/mathml+xml`
	 | `application/mathml-content+xml`
	 | `application/mathml-presentation+xml`
	 | `application/mbms-associated-procedure-description+xml`
	 | `application/mbms-deregister+xml`
	 | `application/mbms-envelope+xml`
	 | `application/mbms-msk-response+xml`
	 | `application/mbms-msk+xml`
	 | `application/mbms-protection-description+xml`
	 | `application/mbms-reception-report+xml`
	 | `application/mbms-register-response+xml`
	 | `application/mbms-register+xml`
	 | `application/mbms-schedule+xml`
	 | `application/mbms-user-service-description+xml`
	 | `application/mbox`
	 | `application/media_control+xml`
	 | `application/media-policy-dataset+xml`
	 | `application/mediaservercontrol+xml`
	 | `application/merge-patch+json`
	 | `application/metalink4+xml`
	 | `application/mets+xml`
	 | `application/MF4`
	 | `application/mikey`
	 | `application/mipc`
	 | `application/missing-blocks+cbor-seq`
	 | `application/mmt-aei+xml`
	 | `application/mmt-usd+xml`
	 | `application/mods+xml`
	 | `application/moss-keys`
	 | `application/moss-signature`
	 | `application/mosskey-data`
	 | `application/mosskey-request`
	 | `application/mp21`
	 | `application/mp4`
	 | `application/mpeg4-generic`
	 | `application/mpeg4-iod`
	 | `application/mpeg4-iod-xmt`
	 | `application/mrb-consumer+xml`
	 | `application/mrb-publish+xml`
	 | `application/msc-ivr+xml`
	 | `application/msc-mixer+xml`
	 | `application/msword`
	 | `application/mud+json`
	 | `application/multipart-core`
	 | `application/mxf`
	 | `application/n-quads`
	 | `application/n-triples`
	 | `application/nasdata`
	 | `application/news-checkgroups`
	 | `application/news-groupinfo`
	 | `application/news-transmission`
	 | `application/nlsml+xml`
	 | `application/node`
	 | `application/nss`
	 | `application/oauth-authz-req+jwt`
	 | `application/oblivious-dns-message`
	 | `application/ocsp-request`
	 | `application/ocsp-response`
	 | `application/octet-stream`
	 | `application/ODA`
	 | `application/odm+xml`
	 | `application/ODX`
	 | `application/oebps-package+xml`
	 | `application/ogg`
	 | `application/opc-nodeset+xml`
	 | `application/oscore`
	 | `application/oxps`
	 | `application/p21`
	 | `application/p21+zip`
	 | `application/p2p-overlay+xml`
	 | `application/parityfec`
	 | `application/passport`
	 | `application/patch-ops-error+xml`
	 | `application/pdf`
	 | `application/PDX`
	 | `application/pem-certificate-chain`
	 | `application/pgp-encrypted`
	 | `application/pgp-keys`
	 | `application/pgp-signature`
	 | `application/pidf-diff+xml`
	 | `application/pidf+xml`
	 | `application/pkcs10`
	 | `application/pkcs7-mime`
	 | `application/pkcs7-signature`
	 | `application/pkcs8`
	 | `application/pkcs8-encrypted`
	 | `application/pkcs12`
	 | `application/pkix-attr-cert`
	 | `application/pkix-cert`
	 | `application/pkix-crl`
	 | `application/pkix-pkipath`
	 | `application/pkixcmp`
	 | `application/pls+xml`
	 | `application/poc-settings+xml`
	 | `application/postscript`
	 | `application/ppsp-tracker+json`
	 | `application/problem+json`
	 | `application/problem+xml`
	 | `application/provenance+xml`
	 | `application/prs.alvestrand.titrax-sheet`
	 | `application/prs.cww`
	 | `application/prs.cyn`
	 | `application/prs.hpub+zip`
	 | `application/prs.nprend`
	 | `application/prs.plucker`
	 | `application/prs.rdf-xml-crypt`
	 | `application/prs.xsf+xml`
	 | `application/pskc+xml`
	 | `application/pvd+json`
	 | `application/rdf+xml`
	 | `application/route-apd+xml`
	 | `application/route-s-tsid+xml`
	 | `application/route-usd+xml`
	 | `application/QSIG`
	 | `application/raptorfec`
	 | `application/rdap+json`
	 | `application/reginfo+xml`
	 | `application/relax-ng-compact-syntax`
	 | `application/remote-printing`
	 | `application/reputon+json`
	 | `application/resource-lists-diff+xml`
	 | `application/resource-lists+xml`
	 | `application/rfc+xml`
	 | `application/riscos`
	 | `application/rlmi+xml`
	 | `application/rls-services+xml`
	 | `application/rpki-checklist`
	 | `application/rpki-ghostbusters`
	 | `application/rpki-manifest`
	 | `application/rpki-publication`
	 | `application/rpki-roa`
	 | `application/rpki-updown`
	 | `application/rtf`
	 | `application/rtploopback`
	 | `application/rtx`
	 | `application/samlassertion+xml`
	 | `application/samlmetadata+xml`
	 | `application/sarif-external-properties+json`
	 | `application/sarif+json`
	 | `application/sbe`
	 | `application/sbml+xml`
	 | `application/scaip+xml`
	 | `application/scim+json`
	 | `application/scvp-cv-request`
	 | `application/scvp-cv-response`
	 | `application/scvp-vp-request`
	 | `application/scvp-vp-response`
	 | `application/sdp`
	 | `application/secevent+jwt`
	 | `application/senml-etch+cbor`
	 | `application/senml-etch+json`
	 | `application/senml-exi`
	 | `application/senml+cbor`
	 | `application/senml+json`
	 | `application/senml+xml`
	 | `application/sensml-exi`
	 | `application/sensml+cbor`
	 | `application/sensml+json`
	 | `application/sensml+xml`
	 | `application/sep-exi`
	 | `application/sep+xml`
	 | `application/session-info`
	 | `application/set-payment`
	 | `application/set-payment-initiation`
	 | `application/set-registration`
	 | `application/set-registration-initiation`
	 | `application/SGML`
	 | `application/sgml-open-catalog`
	 | `application/shf+xml`
	 | `application/sieve`
	 | `application/simple-filter+xml`
	 | `application/simple-message-summary`
	 | `application/simpleSymbolContainer`
	 | `application/sipc`
	 | `application/slate`
	 | `application/smil`
	 | `application/smil+xml`
	 | `application/smpte336m`
	 | `application/soap+fastinfoset`
	 | `application/soap+xml`
	 | `application/sparql-query`
	 | `application/spdx+json`
	 | `application/sparql-results+xml`
	 | `application/spirits-event+xml`
	 | `application/sql`
	 | `application/srgs`
	 | `application/srgs+xml`
	 | `application/sru+xml`
	 | `application/ssml+xml`
	 | `application/stix+json`
	 | `application/swid+cbor`
	 | `application/swid+xml`
	 | `application/tamp-apex-update`
	 | `application/tamp-apex-update-confirm`
	 | `application/tamp-community-update`
	 | `application/tamp-community-update-confirm`
	 | `application/tamp-error`
	 | `application/tamp-sequence-adjust`
	 | `application/tamp-sequence-adjust-confirm`
	 | `application/tamp-status-query`
	 | `application/tamp-status-response`
	 | `application/tamp-update`
	 | `application/tamp-update-confirm`
	 | `application/taxii+json`
	 | `application/td+json`
	 | `application/tei+xml`
	 | `application/TETRA_ISI`
	 | `application/thraud+xml`
	 | `application/timestamp-query`
	 | `application/timestamp-reply`
	 | `application/timestamped-data`
	 | `application/tlsrpt+gzip`
	 | `application/tlsrpt+json`
	 | `application/tm+json`
	 | `application/tnauthlist`
	 | `application/token-introspection+jwt`
	 | `application/trickle-ice-sdpfrag`
	 | `application/trig`
	 | `application/ttml+xml`
	 | `application/tve-trigger`
	 | `application/tzif`
	 | `application/tzif-leap`
	 | `application/ulpfec`
	 | `application/urc-grpsheet+xml`
	 | `application/urc-ressheet+xml`
	 | `application/urc-targetdesc+xml`
	 | `application/urc-uisocketdesc+xml`
	 | `application/vcard+json`
	 | `application/vcard+xml`
	 | `application/vemmi`
	 | `application/vnd.1000minds.decision-model+xml`
	 | `application/vnd.3gpp.5gnas`
	 | `application/vnd.3gpp.access-transfer-events+xml`
	 | `application/vnd.3gpp.bsf+xml`
	 | `application/vnd.3gpp.GMOP+xml`
	 | `application/vnd.3gpp.gtpc`
	 | `application/vnd.3gpp.interworking-data`
	 | `application/vnd.3gpp.lpp`
	 | `application/vnd.3gpp.mc-signalling-ear`
	 | `application/vnd.3gpp.mcdata-affiliation-command+xml`
	 | `application/vnd.3gpp.mcdata-info+xml`
	 | `application/vnd.3gpp.mcdata-msgstore-ctrl-request+xml`
	 | `application/vnd.3gpp.mcdata-payload`
	 | `application/vnd.3gpp.mcdata-regroup+xml`
	 | `application/vnd.3gpp.mcdata-service-config+xml`
	 | `application/vnd.3gpp.mcdata-signalling`
	 | `application/vnd.3gpp.mcdata-ue-config+xml`
	 | `application/vnd.3gpp.mcdata-user-profile+xml`
	 | `application/vnd.3gpp.mcptt-affiliation-command+xml`
	 | `application/vnd.3gpp.mcptt-floor-request+xml`
	 | `application/vnd.3gpp.mcptt-info+xml`
	 | `application/vnd.3gpp.mcptt-location-info+xml`
	 | `application/vnd.3gpp.mcptt-mbms-usage-info+xml`
	 | `application/vnd.3gpp.mcptt-service-config+xml`
	 | `application/vnd.3gpp.mcptt-signed+xml`
	 | `application/vnd.3gpp.mcptt-ue-config+xml`
	 | `application/vnd.3gpp.mcptt-ue-init-config+xml`
	 | `application/vnd.3gpp.mcptt-user-profile+xml`
	 | `application/vnd.3gpp.mcvideo-affiliation-command+xml`
	 | `application/vnd.3gpp.mcvideo-affiliation-info+xml`
	 | `application/vnd.3gpp.mcvideo-info+xml`
	 | `application/vnd.3gpp.mcvideo-location-info+xml`
	 | `application/vnd.3gpp.mcvideo-mbms-usage-info+xml`
	 | `application/vnd.3gpp.mcvideo-service-config+xml`
	 | `application/vnd.3gpp.mcvideo-transmission-request+xml`
	 | `application/vnd.3gpp.mcvideo-ue-config+xml`
	 | `application/vnd.3gpp.mcvideo-user-profile+xml`
	 | `application/vnd.3gpp.mid-call+xml`
	 | `application/vnd.3gpp.ngap`
	 | `application/vnd.3gpp.pfcp`
	 | `application/vnd.3gpp.pic-bw-large`
	 | `application/vnd.3gpp.pic-bw-small`
	 | `application/vnd.3gpp.pic-bw-var`
	 | `application/vnd.3gpp-prose-pc3a+xml`
	 | `application/vnd.3gpp-prose-pc3ach+xml`
	 | `application/vnd.3gpp-prose-pc3ch+xml`
	 | `application/vnd.3gpp-prose-pc8+xml`
	 | `application/vnd.3gpp-prose+xml`
	 | `application/vnd.3gpp.s1ap`
	 | `application/vnd.3gpp.sms`
	 | `application/vnd.3gpp.sms+xml`
	 | `application/vnd.3gpp.srvcc-ext+xml`
	 | `application/vnd.3gpp.SRVCC-info+xml`
	 | `application/vnd.3gpp.state-and-event-info+xml`
	 | `application/vnd.3gpp.ussd+xml`
	 | `application/vnd.3gpp-v2x-local-service-information`
	 | `application/vnd.3gpp2.bcmcsinfo+xml`
	 | `application/vnd.3gpp2.sms`
	 | `application/vnd.3gpp2.tcap`
	 | `application/vnd.3lightssoftware.imagescal`
	 | `application/vnd.3M.Post-it-Notes`
	 | `application/vnd.accpac.simply.aso`
	 | `application/vnd.accpac.simply.imp`
	 | `application/vnd.acucobol`
	 | `application/vnd.acucorp`
	 | `application/vnd.adobe.flash.movie`
	 | `application/vnd.adobe.formscentral.fcdt`
	 | `application/vnd.adobe.fxp`
	 | `application/vnd.adobe.partial-upload`
	 | `application/vnd.adobe.xdp+xml`
	 | `application/vnd.aether.imp`
	 | `application/vnd.afpc.afplinedata`
	 | `application/vnd.afpc.afplinedata-pagedef`
	 | `application/vnd.afpc.cmoca-cmresource`
	 | `application/vnd.afpc.foca-charset`
	 | `application/vnd.afpc.foca-codedfont`
	 | `application/vnd.afpc.foca-codepage`
	 | `application/vnd.afpc.modca`
	 | `application/vnd.afpc.modca-cmtable`
	 | `application/vnd.afpc.modca-formdef`
	 | `application/vnd.afpc.modca-mediummap`
	 | `application/vnd.afpc.modca-objectcontainer`
	 | `application/vnd.afpc.modca-overlay`
	 | `application/vnd.afpc.modca-pagesegment`
	 | `application/vnd.age`
	 | `application/vnd.ah-barcode`
	 | `application/vnd.ahead.space`
	 | `application/vnd.airzip.filesecure.azf`
	 | `application/vnd.airzip.filesecure.azs`
	 | `application/vnd.amadeus+json`
	 | `application/vnd.amazon.mobi8-ebook`
	 | `application/vnd.americandynamics.acc`
	 | `application/vnd.amiga.ami`
	 | `application/vnd.amundsen.maze+xml`
	 | `application/vnd.android.ota`
	 | `application/vnd.anki`
	 | `application/vnd.anser-web-certificate-issue-initiation`
	 | `application/vnd.antix.game-component`
	 | `application/vnd.apache.arrow.file`
	 | `application/vnd.apache.arrow.stream`
	 | `application/vnd.apache.thrift.binary`
	 | `application/vnd.apache.thrift.compact`
	 | `application/vnd.apache.thrift.json`
	 | `application/vnd.apexlang`
	 | `application/vnd.api+json`
	 | `application/vnd.aplextor.warrp+json`
	 | `application/vnd.apothekende.reservation+json`
	 | `application/vnd.apple.installer+xml`
	 | `application/vnd.apple.keynote`
	 | `application/vnd.apple.mpegurl`
	 | `application/vnd.apple.numbers`
	 | `application/vnd.apple.pages`
	 | `application/vnd.arastra.swi`
	 | `application/vnd.aristanetworks.swi`
	 | `application/vnd.artisan+json`
	 | `application/vnd.artsquare`
	 | `application/vnd.astraea-software.iota`
	 | `application/vnd.audiograph`
	 | `application/vnd.autopackage`
	 | `application/vnd.avalon+json`
	 | `application/vnd.avistar+xml`
	 | `application/vnd.balsamiq.bmml+xml`
	 | `application/vnd.banana-accounting`
	 | `application/vnd.bbf.usp.error`
	 | `application/vnd.bbf.usp.msg`
	 | `application/vnd.bbf.usp.msg+json`
	 | `application/vnd.balsamiq.bmpr`
	 | `application/vnd.bekitzur-stech+json`
	 | `application/vnd.belightsoft.lhzd+zip`
	 | `application/vnd.belightsoft.lhzl+zip`
	 | `application/vnd.bint.med-content`
	 | `application/vnd.biopax.rdf+xml`
	 | `application/vnd.blink-idb-value-wrapper`
	 | `application/vnd.blueice.multipass`
	 | `application/vnd.bluetooth.ep.oob`
	 | `application/vnd.bluetooth.le.oob`
	 | `application/vnd.bmi`
	 | `application/vnd.bpf`
	 | `application/vnd.bpf3`
	 | `application/vnd.businessobjects`
	 | `application/vnd.byu.uapi+json`
	 | `application/vnd.cab-jscript`
	 | `application/vnd.canon-cpdl`
	 | `application/vnd.canon-lips`
	 | `application/vnd.capasystems-pg+json`
	 | `application/vnd.cendio.thinlinc.clientconf`
	 | `application/vnd.century-systems.tcp_stream`
	 | `application/vnd.chemdraw+xml`
	 | `application/vnd.chess-pgn`
	 | `application/vnd.chipnuts.karaoke-mmd`
	 | `application/vnd.ciedi`
	 | `application/vnd.cinderella`
	 | `application/vnd.cirpack.isdn-ext`
	 | `application/vnd.citationstyles.style+xml`
	 | `application/vnd.claymore`
	 | `application/vnd.cloanto.rp9`
	 | `application/vnd.clonk.c4group`
	 | `application/vnd.cluetrust.cartomobile-config`
	 | `application/vnd.cluetrust.cartomobile-config-pkg`
	 | `application/vnd.cncf.helm.chart.content.v1.tar+gzip`
	 | `application/vnd.cncf.helm.chart.provenance.v1.prov`
	 | `application/vnd.coffeescript`
	 | `application/vnd.collabio.xodocuments.document`
	 | `application/vnd.collabio.xodocuments.document-template`
	 | `application/vnd.collabio.xodocuments.presentation`
	 | `application/vnd.collabio.xodocuments.presentation-template`
	 | `application/vnd.collabio.xodocuments.spreadsheet`
	 | `application/vnd.collabio.xodocuments.spreadsheet-template`
	 | `application/vnd.collection.doc+json`
	 | `application/vnd.collection+json`
	 | `application/vnd.collection.next+json`
	 | `application/vnd.comicbook-rar`
	 | `application/vnd.comicbook+zip`
	 | `application/vnd.commerce-battelle`
	 | `application/vnd.commonspace`
	 | `application/vnd.coreos.ignition+json`
	 | `application/vnd.cosmocaller`
	 | `application/vnd.contact.cmsg`
	 | `application/vnd.crick.clicker`
	 | `application/vnd.crick.clicker.keyboard`
	 | `application/vnd.crick.clicker.palette`
	 | `application/vnd.crick.clicker.template`
	 | `application/vnd.crick.clicker.wordbank`
	 | `application/vnd.criticaltools.wbs+xml`
	 | `application/vnd.cryptii.pipe+json`
	 | `application/vnd.crypto-shade-file`
	 | `application/vnd.cryptomator.encrypted`
	 | `application/vnd.cryptomator.vault`
	 | `application/vnd.ctc-posml`
	 | `application/vnd.ctct.ws+xml`
	 | `application/vnd.cups-pdf`
	 | `application/vnd.cups-postscript`
	 | `application/vnd.cups-ppd`
	 | `application/vnd.cups-raster`
	 | `application/vnd.cups-raw`
	 | `application/vnd.curl`
	 | `application/vnd.cyan.dean.root+xml`
	 | `application/vnd.cybank`
	 | `application/vnd.cyclonedx+json`
	 | `application/vnd.cyclonedx+xml`
	 | `application/vnd.d2l.coursepackage1p0+zip`
	 | `application/vnd.d3m-dataset`
	 | `application/vnd.d3m-problem`
	 | `application/vnd.dart`
	 | `application/vnd.data-vision.rdz`
	 | `application/vnd.datalog`
	 | `application/vnd.datapackage+json`
	 | `application/vnd.dataresource+json`
	 | `application/vnd.dbf`
	 | `application/vnd.debian.binary-package`
	 | `application/vnd.dece.data`
	 | `application/vnd.dece.ttml+xml`
	 | `application/vnd.dece.unspecified`
	 | `application/vnd.dece.zip`
	 | `application/vnd.denovo.fcselayout-link`
	 | `application/vnd.desmume.movie`
	 | `application/vnd.dir-bi.plate-dl-nosuffix`
	 | `application/vnd.dm.delegation+xml`
	 | `application/vnd.dna`
	 | `application/vnd.document+json`
	 | `application/vnd.dolby.mobile.1`
	 | `application/vnd.dolby.mobile.2`
	 | `application/vnd.doremir.scorecloud-binary-document`
	 | `application/vnd.dpgraph`
	 | `application/vnd.dreamfactory`
	 | `application/vnd.drive+json`
	 | `application/vnd.dtg.local`
	 | `application/vnd.dtg.local.flash`
	 | `application/vnd.dtg.local.html`
	 | `application/vnd.dvb.ait`
	 | `application/vnd.dvb.dvbisl+xml`
	 | `application/vnd.dvb.dvbj`
	 | `application/vnd.dvb.esgcontainer`
	 | `application/vnd.dvb.ipdcdftnotifaccess`
	 | `application/vnd.dvb.ipdcesgaccess`
	 | `application/vnd.dvb.ipdcesgaccess2`
	 | `application/vnd.dvb.ipdcesgpdd`
	 | `application/vnd.dvb.ipdcroaming`
	 | `application/vnd.dvb.iptv.alfec-base`
	 | `application/vnd.dvb.iptv.alfec-enhancement`
	 | `application/vnd.dvb.notif-aggregate-root+xml`
	 | `application/vnd.dvb.notif-container+xml`
	 | `application/vnd.dvb.notif-generic+xml`
	 | `application/vnd.dvb.notif-ia-msglist+xml`
	 | `application/vnd.dvb.notif-ia-registration-request+xml`
	 | `application/vnd.dvb.notif-ia-registration-response+xml`
	 | `application/vnd.dvb.notif-init+xml`
	 | `application/vnd.dvb.pfr`
	 | `application/vnd.dvb.service`
	 | `application/vnd.dxr`
	 | `application/vnd.dynageo`
	 | `application/vnd.dzr`
	 | `application/vnd.easykaraoke.cdgdownload`
	 | `application/vnd.ecip.rlp`
	 | `application/vnd.ecdis-update`
	 | `application/vnd.eclipse.ditto+json`
	 | `application/vnd.ecowin.chart`
	 | `application/vnd.ecowin.filerequest`
	 | `application/vnd.ecowin.fileupdate`
	 | `application/vnd.ecowin.series`
	 | `application/vnd.ecowin.seriesrequest`
	 | `application/vnd.ecowin.seriesupdate`
	 | `application/vnd.efi.img`
	 | `application/vnd.efi.iso`
	 | `application/vnd.emclient.accessrequest+xml`
	 | `application/vnd.enliven`
	 | `application/vnd.enphase.envoy`
	 | `application/vnd.eprints.data+xml`
	 | `application/vnd.epson.esf`
	 | `application/vnd.epson.msf`
	 | `application/vnd.epson.quickanime`
	 | `application/vnd.epson.salt`
	 | `application/vnd.epson.ssf`
	 | `application/vnd.ericsson.quickcall`
	 | `application/vnd.espass-espass+zip`
	 | `application/vnd.eszigno3+xml`
	 | `application/vnd.etsi.aoc+xml`
	 | `application/vnd.etsi.asic-s+zip`
	 | `application/vnd.etsi.asic-e+zip`
	 | `application/vnd.etsi.cug+xml`
	 | `application/vnd.etsi.iptvcommand+xml`
	 | `application/vnd.etsi.iptvdiscovery+xml`
	 | `application/vnd.etsi.iptvprofile+xml`
	 | `application/vnd.etsi.iptvsad-bc+xml`
	 | `application/vnd.etsi.iptvsad-cod+xml`
	 | `application/vnd.etsi.iptvsad-npvr+xml`
	 | `application/vnd.etsi.iptvservice+xml`
	 | `application/vnd.etsi.iptvsync+xml`
	 | `application/vnd.etsi.iptvueprofile+xml`
	 | `application/vnd.etsi.mcid+xml`
	 | `application/vnd.etsi.mheg5`
	 | `application/vnd.etsi.overload-control-policy-dataset+xml`
	 | `application/vnd.etsi.pstn+xml`
	 | `application/vnd.etsi.sci+xml`
	 | `application/vnd.etsi.simservs+xml`
	 | `application/vnd.etsi.timestamp-token`
	 | `application/vnd.etsi.tsl+xml`
	 | `application/vnd.etsi.tsl.der`
	 | `application/vnd.eu.kasparian.car+json`
	 | `application/vnd.eudora.data`
	 | `application/vnd.evolv.ecig.profile`
	 | `application/vnd.evolv.ecig.settings`
	 | `application/vnd.evolv.ecig.theme`
	 | `application/vnd.exstream-empower+zip`
	 | `application/vnd.exstream-package`
	 | `application/vnd.ezpix-album`
	 | `application/vnd.ezpix-package`
	 | `application/vnd.f-secure.mobile`
	 | `application/vnd.fastcopy-disk-image`
	 | `application/vnd.familysearch.gedcom+zip`
	 | `application/vnd.fdsn.mseed`
	 | `application/vnd.fdsn.seed`
	 | `application/vnd.ffsns`
	 | `application/vnd.ficlab.flb+zip`
	 | `application/vnd.filmit.zfc`
	 | `application/vnd.fints`
	 | `application/vnd.firemonkeys.cloudcell`
	 | `application/vnd.FloGraphIt`
	 | `application/vnd.fluxtime.clip`
	 | `application/vnd.font-fontforge-sfd`
	 | `application/vnd.framemaker`
	 | `application/vnd.frogans.fnc`
	 | `application/vnd.frogans.ltf`
	 | `application/vnd.fsc.weblaunch`
	 | `application/vnd.fujifilm.fb.docuworks`
	 | `application/vnd.fujifilm.fb.docuworks.binder`
	 | `application/vnd.fujifilm.fb.docuworks.container`
	 | `application/vnd.fujifilm.fb.jfi+xml`
	 | `application/vnd.fujitsu.oasys`
	 | `application/vnd.fujitsu.oasys2`
	 | `application/vnd.fujitsu.oasys3`
	 | `application/vnd.fujitsu.oasysgp`
	 | `application/vnd.fujitsu.oasysprs`
	 | `application/vnd.fujixerox.ART4`
	 | `application/vnd.fujixerox.ART-EX`
	 | `application/vnd.fujixerox.ddd`
	 | `application/vnd.fujixerox.docuworks`
	 | `application/vnd.fujixerox.docuworks.binder`
	 | `application/vnd.fujixerox.docuworks.container`
	 | `application/vnd.fujixerox.HBPL`
	 | `application/vnd.fut-misnet`
	 | `application/vnd.futoin+cbor`
	 | `application/vnd.futoin+json`
	 | `application/vnd.fuzzysheet`
	 | `application/vnd.genomatix.tuxedo`
	 | `application/vnd.genozip`
	 | `application/vnd.gentics.grd+json`
	 | `application/vnd.gentoo.manifest`
	 | `application/vnd.geo+json`
	 | `application/vnd.geocube+xml`
	 | `application/vnd.geogebra.file`
	 | `application/vnd.geogebra.slides`
	 | `application/vnd.geogebra.tool`
	 | `application/vnd.geometry-explorer`
	 | `application/vnd.geonext`
	 | `application/vnd.geoplan`
	 | `application/vnd.geospace`
	 | `application/vnd.gerber`
	 | `application/vnd.globalplatform.card-content-mgt`
	 | `application/vnd.globalplatform.card-content-mgt-response`
	 | `application/vnd.gmx`
	 | `application/vnd.gnu.taler.exchange+json`
	 | `application/vnd.gnu.taler.merchant+json`
	 | `application/vnd.google-earth.kml+xml`
	 | `application/vnd.google-earth.kmz`
	 | `application/vnd.gov.sk.e-form+xml`
	 | `application/vnd.gov.sk.e-form+zip`
	 | `application/vnd.gov.sk.xmldatacontainer+xml`
	 | `application/vnd.grafeq`
	 | `application/vnd.gridmp`
	 | `application/vnd.groove-account`
	 | `application/vnd.groove-help`
	 | `application/vnd.groove-identity-message`
	 | `application/vnd.groove-injector`
	 | `application/vnd.groove-tool-message`
	 | `application/vnd.groove-tool-template`
	 | `application/vnd.groove-vcard`
	 | `application/vnd.hal+json`
	 | `application/vnd.hal+xml`
	 | `application/vnd.HandHeld-Entertainment+xml`
	 | `application/vnd.hbci`
	 | `application/vnd.hc+json`
	 | `application/vnd.hcl-bireports`
	 | `application/vnd.hdt`
	 | `application/vnd.heroku+json`
	 | `application/vnd.hhe.lesson-player`
	 | `application/vnd.hp-HPGL`
	 | `application/vnd.hp-hpid`
	 | `application/vnd.hp-hps`
	 | `application/vnd.hp-jlyt`
	 | `application/vnd.hp-PCL`
	 | `application/vnd.hp-PCLXL`
	 | `application/vnd.httphone`
	 | `application/vnd.hydrostatix.sof-data`
	 | `application/vnd.hyper-item+json`
	 | `application/vnd.hyper+json`
	 | `application/vnd.hyperdrive+json`
	 | `application/vnd.hzn-3d-crossword`
	 | `application/vnd.ibm.afplinedata`
	 | `application/vnd.ibm.electronic-media`
	 | `application/vnd.ibm.MiniPay`
	 | `application/vnd.ibm.modcap`
	 | `application/vnd.ibm.rights-management`
	 | `application/vnd.ibm.secure-container`
	 | `application/vnd.iccprofile`
	 | `application/vnd.ieee.1905`
	 | `application/vnd.igloader`
	 | `application/vnd.imagemeter.folder+zip`
	 | `application/vnd.imagemeter.image+zip`
	 | `application/vnd.immervision-ivp`
	 | `application/vnd.immervision-ivu`
	 | `application/vnd.ims.imsccv1p1`
	 | `application/vnd.ims.imsccv1p2`
	 | `application/vnd.ims.imsccv1p3`
	 | `application/vnd.ims.lis.v2.result+json`
	 | `application/vnd.ims.lti.v2.toolconsumerprofile+json`
	 | `application/vnd.ims.lti.v2.toolproxy.id+json`
	 | `application/vnd.ims.lti.v2.toolproxy+json`
	 | `application/vnd.ims.lti.v2.toolsettings+json`
	 | `application/vnd.ims.lti.v2.toolsettings.simple+json`
	 | `application/vnd.informedcontrol.rms+xml`
	 | `application/vnd.infotech.project`
	 | `application/vnd.infotech.project+xml`
	 | `application/vnd.informix-visionary`
	 | `application/vnd.innopath.wamp.notification`
	 | `application/vnd.insors.igm`
	 | `application/vnd.intercon.formnet`
	 | `application/vnd.intergeo`
	 | `application/vnd.intertrust.digibox`
	 | `application/vnd.intertrust.nncp`
	 | `application/vnd.intu.qbo`
	 | `application/vnd.intu.qfx`
	 | `application/vnd.ipld.car`
	 | `application/vnd.ipld.raw`
	 | `application/vnd.iptc.g2.catalogitem+xml`
	 | `application/vnd.iptc.g2.conceptitem+xml`
	 | `application/vnd.iptc.g2.knowledgeitem+xml`
	 | `application/vnd.iptc.g2.newsitem+xml`
	 | `application/vnd.iptc.g2.newsmessage+xml`
	 | `application/vnd.iptc.g2.packageitem+xml`
	 | `application/vnd.iptc.g2.planningitem+xml`
	 | `application/vnd.ipunplugged.rcprofile`
	 | `application/vnd.irepository.package+xml`
	 | `application/vnd.is-xpr`
	 | `application/vnd.isac.fcs`
	 | `application/vnd.jam`
	 | `application/vnd.iso11783-10+zip`
	 | `application/vnd.japannet-directory-service`
	 | `application/vnd.japannet-jpnstore-wakeup`
	 | `application/vnd.japannet-payment-wakeup`
	 | `application/vnd.japannet-registration`
	 | `application/vnd.japannet-registration-wakeup`
	 | `application/vnd.japannet-setstore-wakeup`
	 | `application/vnd.japannet-verification`
	 | `application/vnd.japannet-verification-wakeup`
	 | `application/vnd.jcp.javame.midlet-rms`
	 | `application/vnd.jisp`
	 | `application/vnd.joost.joda-archive`
	 | `application/vnd.jsk.isdn-ngn`
	 | `application/vnd.kahootz`
	 | `application/vnd.kde.karbon`
	 | `application/vnd.kde.kchart`
	 | `application/vnd.kde.kformula`
	 | `application/vnd.kde.kivio`
	 | `application/vnd.kde.kontour`
	 | `application/vnd.kde.kpresenter`
	 | `application/vnd.kde.kspread`
	 | `application/vnd.kde.kword`
	 | `application/vnd.kenameaapp`
	 | `application/vnd.kidspiration`
	 | `application/vnd.Kinar`
	 | `application/vnd.koan`
	 | `application/vnd.kodak-descriptor`
	 | `application/vnd.las`
	 | `application/vnd.las.las+json`
	 | `application/vnd.las.las+xml`
	 | `application/vnd.laszip`
	 | `application/vnd.leap+json`
	 | `application/vnd.liberty-request+xml`
	 | `application/vnd.llamagraphics.life-balance.desktop`
	 | `application/vnd.llamagraphics.life-balance.exchange+xml`
	 | `application/vnd.logipipe.circuit+zip`
	 | `application/vnd.loom`
	 | `application/vnd.lotus-1-2-3`
	 | `application/vnd.lotus-approach`
	 | `application/vnd.lotus-freelance`
	 | `application/vnd.lotus-notes`
	 | `application/vnd.lotus-organizer`
	 | `application/vnd.lotus-screencam`
	 | `application/vnd.lotus-wordpro`
	 | `application/vnd.macports.portpkg`
	 | `application/vnd.mapbox-vector-tile`
	 | `application/vnd.marlin.drm.actiontoken+xml`
	 | `application/vnd.marlin.drm.conftoken+xml`
	 | `application/vnd.marlin.drm.license+xml`
	 | `application/vnd.marlin.drm.mdcf`
	 | `application/vnd.mason+json`
	 | `application/vnd.maxar.archive.3tz+zip`
	 | `application/vnd.maxmind.maxmind-db`
	 | `application/vnd.mcd`
	 | `application/vnd.medcalcdata`
	 | `application/vnd.mediastation.cdkey`
	 | `application/vnd.meridian-slingshot`
	 | `application/vnd.MFER`
	 | `application/vnd.mfmp`
	 | `application/vnd.micro+json`
	 | `application/vnd.micrografx.flo`
	 | `application/vnd.micrografx.igx`
	 | `application/vnd.microsoft.portable-executable`
	 | `application/vnd.microsoft.windows.thumbnail-cache`
	 | `application/vnd.miele+json`
	 | `application/vnd.mif`
	 | `application/vnd.minisoft-hp3000-save`
	 | `application/vnd.mitsubishi.misty-guard.trustweb`
	 | `application/vnd.Mobius.DAF`
	 | `application/vnd.Mobius.DIS`
	 | `application/vnd.Mobius.MBK`
	 | `application/vnd.Mobius.MQY`
	 | `application/vnd.Mobius.MSL`
	 | `application/vnd.Mobius.PLC`
	 | `application/vnd.Mobius.TXF`
	 | `application/vnd.mophun.application`
	 | `application/vnd.mophun.certificate`
	 | `application/vnd.motorola.flexsuite`
	 | `application/vnd.motorola.flexsuite.adsi`
	 | `application/vnd.motorola.flexsuite.fis`
	 | `application/vnd.motorola.flexsuite.gotap`
	 | `application/vnd.motorola.flexsuite.kmr`
	 | `application/vnd.motorola.flexsuite.ttc`
	 | `application/vnd.motorola.flexsuite.wem`
	 | `application/vnd.motorola.iprm`
	 | `application/vnd.mozilla.xul+xml`
	 | `application/vnd.ms-artgalry`
	 | `application/vnd.ms-asf`
	 | `application/vnd.ms-cab-compressed`
	 | `application/vnd.ms-3mfdocument`
	 | `application/vnd.ms-excel`
	 | `application/vnd.ms-excel.addin.macroEnabled.12`
	 | `application/vnd.ms-excel.sheet.binary.macroEnabled.12`
	 | `application/vnd.ms-excel.sheet.macroEnabled.12`
	 | `application/vnd.ms-excel.template.macroEnabled.12`
	 | `application/vnd.ms-fontobject`
	 | `application/vnd.ms-htmlhelp`
	 | `application/vnd.ms-ims`
	 | `application/vnd.ms-lrm`
	 | `application/vnd.ms-office.activeX+xml`
	 | `application/vnd.ms-officetheme`
	 | `application/vnd.ms-playready.initiator+xml`
	 | `application/vnd.ms-powerpoint`
	 | `application/vnd.ms-powerpoint.addin.macroEnabled.12`
	 | `application/vnd.ms-powerpoint.presentation.macroEnabled.12`
	 | `application/vnd.ms-powerpoint.slide.macroEnabled.12`
	 | `application/vnd.ms-powerpoint.slideshow.macroEnabled.12`
	 | `application/vnd.ms-powerpoint.template.macroEnabled.12`
	 | `application/vnd.ms-PrintDeviceCapabilities+xml`
	 | `application/vnd.ms-PrintSchemaTicket+xml`
	 | `application/vnd.ms-project`
	 | `application/vnd.ms-tnef`
	 | `application/vnd.ms-windows.devicepairing`
	 | `application/vnd.ms-windows.nwprinting.oob`
	 | `application/vnd.ms-windows.printerpairing`
	 | `application/vnd.ms-windows.wsd.oob`
	 | `application/vnd.ms-wmdrm.lic-chlg-req`
	 | `application/vnd.ms-wmdrm.lic-resp`
	 | `application/vnd.ms-wmdrm.meter-chlg-req`
	 | `application/vnd.ms-wmdrm.meter-resp`
	 | `application/vnd.ms-word.document.macroEnabled.12`
	 | `application/vnd.ms-word.template.macroEnabled.12`
	 | `application/vnd.ms-works`
	 | `application/vnd.ms-wpl`
	 | `application/vnd.ms-xpsdocument`
	 | `application/vnd.msa-disk-image`
	 | `application/vnd.mseq`
	 | `application/vnd.msign`
	 | `application/vnd.multiad.creator`
	 | `application/vnd.multiad.creator.cif`
	 | `application/vnd.musician`
	 | `application/vnd.music-niff`
	 | `application/vnd.muvee.style`
	 | `application/vnd.mynfc`
	 | `application/vnd.nacamar.ybrid+json`
	 | `application/vnd.ncd.control`
	 | `application/vnd.ncd.reference`
	 | `application/vnd.nearst.inv+json`
	 | `application/vnd.nebumind.line`
	 | `application/vnd.nervana`
	 | `application/vnd.netfpx`
	 | `application/vnd.neurolanguage.nlu`
	 | `application/vnd.nimn`
	 | `application/vnd.nintendo.snes.rom`
	 | `application/vnd.nintendo.nitro.rom`
	 | `application/vnd.nitf`
	 | `application/vnd.noblenet-directory`
	 | `application/vnd.noblenet-sealer`
	 | `application/vnd.noblenet-web`
	 | `application/vnd.nokia.catalogs`
	 | `application/vnd.nokia.conml+wbxml`
	 | `application/vnd.nokia.conml+xml`
	 | `application/vnd.nokia.iptv.config+xml`
	 | `application/vnd.nokia.iSDS-radio-presets`
	 | `application/vnd.nokia.landmark+wbxml`
	 | `application/vnd.nokia.landmark+xml`
	 | `application/vnd.nokia.landmarkcollection+xml`
	 | `application/vnd.nokia.ncd`
	 | `application/vnd.nokia.n-gage.ac+xml`
	 | `application/vnd.nokia.n-gage.data`
	 | `application/vnd.nokia.n-gage.symbian.install`
	 | `application/vnd.nokia.pcd+wbxml`
	 | `application/vnd.nokia.pcd+xml`
	 | `application/vnd.nokia.radio-preset`
	 | `application/vnd.nokia.radio-presets`
	 | `application/vnd.novadigm.EDM`
	 | `application/vnd.novadigm.EDX`
	 | `application/vnd.novadigm.EXT`
	 | `application/vnd.ntt-local.content-share`
	 | `application/vnd.ntt-local.file-transfer`
	 | `application/vnd.ntt-local.ogw_remote-access`
	 | `application/vnd.ntt-local.sip-ta_remote`
	 | `application/vnd.ntt-local.sip-ta_tcp_stream`
	 | `application/vnd.oasis.opendocument.base`
	 | `application/vnd.oasis.opendocument.chart`
	 | `application/vnd.oasis.opendocument.chart-template`
	 | `application/vnd.oasis.opendocument.database`
	 | `application/vnd.oasis.opendocument.formula`
	 | `application/vnd.oasis.opendocument.formula-template`
	 | `application/vnd.oasis.opendocument.graphics`
	 | `application/vnd.oasis.opendocument.graphics-template`
	 | `application/vnd.oasis.opendocument.image`
	 | `application/vnd.oasis.opendocument.image-template`
	 | `application/vnd.oasis.opendocument.presentation`
	 | `application/vnd.oasis.opendocument.presentation-template`
	 | `application/vnd.oasis.opendocument.spreadsheet`
	 | `application/vnd.oasis.opendocument.spreadsheet-template`
	 | `application/vnd.oasis.opendocument.text`
	 | `application/vnd.oasis.opendocument.text-master`
	 | `application/vnd.oasis.opendocument.text-template`
	 | `application/vnd.oasis.opendocument.text-web`
	 | `application/vnd.obn`
	 | `application/vnd.ocf+cbor`
	 | `application/vnd.oci.image.manifest.v1+json`
	 | `application/vnd.oftn.l10n+json`
	 | `application/vnd.oipf.contentaccessdownload+xml`
	 | `application/vnd.oipf.contentaccessstreaming+xml`
	 | `application/vnd.oipf.cspg-hexbinary`
	 | `application/vnd.oipf.dae.svg+xml`
	 | `application/vnd.oipf.dae.xhtml+xml`
	 | `application/vnd.oipf.mippvcontrolmessage+xml`
	 | `application/vnd.oipf.pae.gem`
	 | `application/vnd.oipf.spdiscovery+xml`
	 | `application/vnd.oipf.spdlist+xml`
	 | `application/vnd.oipf.ueprofile+xml`
	 | `application/vnd.oipf.userprofile+xml`
	 | `application/vnd.olpc-sugar`
	 | `application/vnd.oma.bcast.associated-procedure-parameter+xml`
	 | `application/vnd.oma.bcast.drm-trigger+xml`
	 | `application/vnd.oma.bcast.imd+xml`
	 | `application/vnd.oma.bcast.ltkm`
	 | `application/vnd.oma.bcast.notification+xml`
	 | `application/vnd.oma.bcast.provisioningtrigger`
	 | `application/vnd.oma.bcast.sgboot`
	 | `application/vnd.oma.bcast.sgdd+xml`
	 | `application/vnd.oma.bcast.sgdu`
	 | `application/vnd.oma.bcast.simple-symbol-container`
	 | `application/vnd.oma.bcast.smartcard-trigger+xml`
	 | `application/vnd.oma.bcast.sprov+xml`
	 | `application/vnd.oma.bcast.stkm`
	 | `application/vnd.oma.cab-address-book+xml`
	 | `application/vnd.oma.cab-feature-handler+xml`
	 | `application/vnd.oma.cab-pcc+xml`
	 | `application/vnd.oma.cab-subs-invite+xml`
	 | `application/vnd.oma.cab-user-prefs+xml`
	 | `application/vnd.oma.dcd`
	 | `application/vnd.oma.dcdc`
	 | `application/vnd.oma.dd2+xml`
	 | `application/vnd.oma.drm.risd+xml`
	 | `application/vnd.oma.group-usage-list+xml`
	 | `application/vnd.oma.lwm2m+cbor`
	 | `application/vnd.oma.lwm2m+json`
	 | `application/vnd.oma.lwm2m+tlv`
	 | `application/vnd.oma.pal+xml`
	 | `application/vnd.oma.poc.detailed-progress-report+xml`
	 | `application/vnd.oma.poc.final-report+xml`
	 | `application/vnd.oma.poc.groups+xml`
	 | `application/vnd.oma.poc.invocation-descriptor+xml`
	 | `application/vnd.oma.poc.optimized-progress-report+xml`
	 | `application/vnd.oma.push`
	 | `application/vnd.oma.scidm.messages+xml`
	 | `application/vnd.oma.xcap-directory+xml`
	 | `application/vnd.omads-email+xml`
	 | `application/vnd.omads-file+xml`
	 | `application/vnd.omads-folder+xml`
	 | `application/vnd.omaloc-supl-init`
	 | `application/vnd.oma-scws-config`
	 | `application/vnd.oma-scws-http-request`
	 | `application/vnd.oma-scws-http-response`
	 | `application/vnd.onepager`
	 | `application/vnd.onepagertamp`
	 | `application/vnd.onepagertamx`
	 | `application/vnd.onepagertat`
	 | `application/vnd.onepagertatp`
	 | `application/vnd.onepagertatx`
	 | `application/vnd.onvif.metadata`
	 | `application/vnd.openblox.game-binary`
	 | `application/vnd.openblox.game+xml`
	 | `application/vnd.openeye.oeb`
	 | `application/vnd.openstreetmap.data+xml`
	 | `application/vnd.opentimestamps.ots`
	 | `application/vnd.openxmlformats-officedocument.custom-properties+xml`
	 | `application/vnd.openxmlformats-officedocument.customXmlProperties+xml`
	 | `application/vnd.openxmlformats-officedocument.drawing+xml`
	 | `application/vnd.openxmlformats-officedocument.drawingml.chart+xml`
	 | `application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml`
	 | `application/vnd.openxmlformats-officedocument.drawingml.diagramColors+xml`
	 | `application/vnd.openxmlformats-officedocument.drawingml.diagramData+xml`
	 | `application/vnd.openxmlformats-officedocument.drawingml.diagramLayout+xml`
	 | `application/vnd.openxmlformats-officedocument.drawingml.diagramStyle+xml`
	 | `application/vnd.openxmlformats-officedocument.extended-properties+xml`
	 | `application/vnd.openxmlformats-officedocument.presentationml.commentAuthors+xml`
	 | `application/vnd.openxmlformats-officedocument.presentationml.comments+xml`
	 | `application/vnd.openxmlformats-officedocument.presentationml.handoutMaster+xml`
	 | `application/vnd.openxmlformats-officedocument.presentationml.notesMaster+xml`
	 | `application/vnd.openxmlformats-officedocument.presentationml.notesSlide+xml`
	 | `application/vnd.openxmlformats-officedocument.presentationml.presentation`
	 | `application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml`
	 | `application/vnd.openxmlformats-officedocument.presentationml.presProps+xml`
	 | `application/vnd.openxmlformats-officedocument.presentationml.slide`
	 | `application/vnd.openxmlformats-officedocument.presentationml.slide+xml`
	 | `application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml`
	 | `application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml`
	 | `application/vnd.openxmlformats-officedocument.presentationml.slideshow`
	 | `application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml`
	 | `application/vnd.openxmlformats-officedocument.presentationml.slideUpdateInfo+xml`
	 | `application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml`
	 | `application/vnd.openxmlformats-officedocument.presentationml.tags+xml`
	 | `application/vnd.openxmlformats-officedocument.presentationml.template`
	 | `application/vnd.openxmlformats-officedocument.presentationml.template.main+xml`
	 | `application/vnd.openxmlformats-officedocument.presentationml.viewProps+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.calcChain+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.externalLink+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheDefinition+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.pivotCacheRecords+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.pivotTable+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.queryTable+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.revisionHeaders+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.revisionLog+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheetMetadata+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.tableSingleCells+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.template`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.userNames+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.volatileDependencies+xml`
	 | `application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml`
	 | `application/vnd.openxmlformats-officedocument.theme+xml`
	 | `application/vnd.openxmlformats-officedocument.themeOverride+xml`
	 | `application/vnd.openxmlformats-officedocument.vmlDrawing`
	 | `application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml`
	 | `application/vnd.openxmlformats-officedocument.wordprocessingml.document`
	 | `application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml`
	 | `application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml`
	 | `application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml`
	 | `application/vnd.openxmlformats-officedocument.wordprocessingml.fontTable+xml`
	 | `application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml`
	 | `application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml`
	 | `application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml`
	 | `application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml`
	 | `application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml`
	 | `application/vnd.openxmlformats-officedocument.wordprocessingml.template`
	 | `application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml`
	 | `application/vnd.openxmlformats-officedocument.wordprocessingml.webSettings+xml`
	 | `application/vnd.openxmlformats-package.core-properties+xml`
	 | `application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml`
	 | `application/vnd.openxmlformats-package.relationships+xml`
	 | `application/vnd.oracle.resource+json`
	 | `application/vnd.orange.indata`
	 | `application/vnd.osa.netdeploy`
	 | `application/vnd.osgeo.mapguide.package`
	 | `application/vnd.osgi.bundle`
	 | `application/vnd.osgi.dp`
	 | `application/vnd.osgi.subsystem`
	 | `application/vnd.otps.ct-kip+xml`
	 | `application/vnd.oxli.countgraph`
	 | `application/vnd.pagerduty+json`
	 | `application/vnd.palm`
	 | `application/vnd.panoply`
	 | `application/vnd.paos.xml`
	 | `application/vnd.patentdive`
	 | `application/vnd.patientecommsdoc`
	 | `application/vnd.pawaafile`
	 | `application/vnd.pcos`
	 | `application/vnd.pg.format`
	 | `application/vnd.pg.osasli`
	 | `application/vnd.piaccess.`
	 | `application-licence`
	 | `application/vnd.picsel`
	 | `application/vnd.pmi.widget`
	 | `application/vnd.poc.group-advertisement+xml`
	 | `application/vnd.pocketlearn`
	 | `application/vnd.powerbuilder6`
	 | `application/vnd.powerbuilder6-s`
	 | `application/vnd.powerbuilder7`
	 | `application/vnd.powerbuilder75`
	 | `application/vnd.powerbuilder75-s`
	 | `application/vnd.powerbuilder7-s`
	 | `application/vnd.preminet`
	 | `application/vnd.previewsystems.box`
	 | `application/vnd.proteus.magazine`
	 | `application/vnd.psfs`
	 | `application/vnd.publishare-delta-tree`
	 | `application/vnd.pvi.ptid1`
	 | `application/vnd.pwg-multiplexed`
	 | `application/vnd.pwg-xhtml-print+xml`
	 | `application/vnd.qualcomm.brew-app-res`
	 | `application/vnd.quarantainenet`
	 | `application/vnd.Quark.QuarkXPress`
	 | `application/vnd.quobject-quoxdocument`
	 | `application/vnd.radisys.moml+xml`
	 | `application/vnd.radisys.msml-audit-conf+xml`
	 | `application/vnd.radisys.msml-audit-conn+xml`
	 | `application/vnd.radisys.msml-audit-dialog+xml`
	 | `application/vnd.radisys.msml-audit-stream+xml`
	 | `application/vnd.radisys.msml-audit+xml`
	 | `application/vnd.radisys.msml-conf+xml`
	 | `application/vnd.radisys.msml-dialog-base+xml`
	 | `application/vnd.radisys.msml-dialog-fax-detect+xml`
	 | `application/vnd.radisys.msml-dialog-fax-sendrecv+xml`
	 | `application/vnd.radisys.msml-dialog-group+xml`
	 | `application/vnd.radisys.msml-dialog-speech+xml`
	 | `application/vnd.radisys.msml-dialog-transform+xml`
	 | `application/vnd.radisys.msml-dialog+xml`
	 | `application/vnd.radisys.msml+xml`
	 | `application/vnd.rainstor.data`
	 | `application/vnd.rapid`
	 | `application/vnd.rar`
	 | `application/vnd.realvnc.bed`
	 | `application/vnd.recordare.musicxml`
	 | `application/vnd.recordare.musicxml+xml`
	 | `application/vnd.RenLearn.rlprint`
	 | `application/vnd.resilient.logic`
	 | `application/vnd.restful+json`
	 | `application/vnd.rig.cryptonote`
	 | `application/vnd.route66.link66+xml`
	 | `application/vnd.rs-274x`
	 | `application/vnd.ruckus.download`
	 | `application/vnd.s3sms`
	 | `application/vnd.sailingtracker.track`
	 | `application/vnd.sar`
	 | `application/vnd.sbm.cid`
	 | `application/vnd.sbm.mid2`
	 | `application/vnd.scribus`
	 | `application/vnd.sealed.3df`
	 | `application/vnd.sealed.csf`
	 | `application/vnd.sealed.doc`
	 | `application/vnd.sealed.eml`
	 | `application/vnd.sealed.mht`
	 | `application/vnd.sealed.net`
	 | `application/vnd.sealed.ppt`
	 | `application/vnd.sealed.tiff`
	 | `application/vnd.sealed.xls`
	 | `application/vnd.sealedmedia.softseal.html`
	 | `application/vnd.sealedmedia.softseal.pdf`
	 | `application/vnd.seemail`
	 | `application/vnd.seis+json`
	 | `application/vnd.sema`
	 | `application/vnd.semd`
	 | `application/vnd.semf`
	 | `application/vnd.shade-save-file`
	 | `application/vnd.shana.informed.formdata`
	 | `application/vnd.shana.informed.formtemplate`
	 | `application/vnd.shana.informed.interchange`
	 | `application/vnd.shana.informed.package`
	 | `application/vnd.shootproof+json`
	 | `application/vnd.shopkick+json`
	 | `application/vnd.shp`
	 | `application/vnd.shx`
	 | `application/vnd.sigrok.session`
	 | `application/vnd.SimTech-MindMapper`
	 | `application/vnd.siren+json`
	 | `application/vnd.smaf`
	 | `application/vnd.smart.notebook`
	 | `application/vnd.smart.teacher`
	 | `application/vnd.snesdev-page-table`
	 | `application/vnd.software602.filler.form+xml`
	 | `application/vnd.software602.filler.form-xml-zip`
	 | `application/vnd.solent.sdkm+xml`
	 | `application/vnd.spotfire.dxp`
	 | `application/vnd.spotfire.sfs`
	 | `application/vnd.sqlite3`
	 | `application/vnd.sss-cod`
	 | `application/vnd.sss-dtf`
	 | `application/vnd.sss-ntf`
	 | `application/vnd.stepmania.package`
	 | `application/vnd.stepmania.stepchart`
	 | `application/vnd.street-stream`
	 | `application/vnd.sun.wadl+xml`
	 | `application/vnd.sus-calendar`
	 | `application/vnd.svd`
	 | `application/vnd.swiftview-ics`
	 | `application/vnd.sybyl.mol2`
	 | `application/vnd.sycle+xml`
	 | `application/vnd.syft+json`
	 | `application/vnd.syncml.dm.notification`
	 | `application/vnd.syncml.dmddf+xml`
	 | `application/vnd.syncml.dmtnds+wbxml`
	 | `application/vnd.syncml.dmtnds+xml`
	 | `application/vnd.syncml.dmddf+wbxml`
	 | `application/vnd.syncml.dm+wbxml`
	 | `application/vnd.syncml.dm+xml`
	 | `application/vnd.syncml.ds.notification`
	 | `application/vnd.syncml+xml`
	 | `application/vnd.tableschema+json`
	 | `application/vnd.tao.intent-module-archive`
	 | `application/vnd.tcpdump.pcap`
	 | `application/vnd.think-cell.ppttc+json`
	 | `application/vnd.tml`
	 | `application/vnd.tmd.mediaflex.api+xml`
	 | `application/vnd.tmobile-livetv`
	 | `application/vnd.tri.onesource`
	 | `application/vnd.trid.tpt`
	 | `application/vnd.triscape.mxs`
	 | `application/vnd.trueapp`
	 | `application/vnd.truedoc`
	 | `application/vnd.ubisoft.webplayer`
	 | `application/vnd.ufdl`
	 | `application/vnd.uiq.theme`
	 | `application/vnd.umajin`
	 | `application/vnd.unity`
	 | `application/vnd.uoml+xml`
	 | `application/vnd.uplanet.alert`
	 | `application/vnd.uplanet.alert-wbxml`
	 | `application/vnd.uplanet.bearer-choice`
	 | `application/vnd.uplanet.bearer-choice-wbxml`
	 | `application/vnd.uplanet.cacheop`
	 | `application/vnd.uplanet.cacheop-wbxml`
	 | `application/vnd.uplanet.channel`
	 | `application/vnd.uplanet.channel-wbxml`
	 | `application/vnd.uplanet.list`
	 | `application/vnd.uplanet.listcmd`
	 | `application/vnd.uplanet.listcmd-wbxml`
	 | `application/vnd.uplanet.list-wbxml`
	 | `application/vnd.uri-map`
	 | `application/vnd.uplanet.signal`
	 | `application/vnd.valve.source.material`
	 | `application/vnd.vcx`
	 | `application/vnd.vd-study`
	 | `application/vnd.vectorworks`
	 | `application/vnd.vel+json`
	 | `application/vnd.verimatrix.vcas`
	 | `application/vnd.veritone.aion+json`
	 | `application/vnd.veryant.thin`
	 | `application/vnd.ves.encrypted`
	 | `application/vnd.vidsoft.vidconference`
	 | `application/vnd.visio`
	 | `application/vnd.visionary`
	 | `application/vnd.vividence.scriptfile`
	 | `application/vnd.vsf`
	 | `application/vnd.wap.sic`
	 | `application/vnd.wap.slc`
	 | `application/vnd.wap.wbxml`
	 | `application/vnd.wap.wmlc`
	 | `application/vnd.wap.wmlscriptc`
	 | `application/vnd.wasmflow.wafl`
	 | `application/vnd.webturbo`
	 | `application/vnd.wfa.dpp`
	 | `application/vnd.wfa.p2p`
	 | `application/vnd.wfa.wsc`
	 | `application/vnd.windows.devicepairing`
	 | `application/vnd.wmc`
	 | `application/vnd.wmf.bootstrap`
	 | `application/vnd.wolfram.mathematica`
	 | `application/vnd.wolfram.mathematica.package`
	 | `application/vnd.wolfram.player`
	 | `application/vnd.wordperfect`
	 | `application/vnd.wqd`
	 | `application/vnd.wrq-hp3000-labelled`
	 | `application/vnd.wt.stf`
	 | `application/vnd.wv.csp+xml`
	 | `application/vnd.wv.csp+wbxml`
	 | `application/vnd.wv.ssp+xml`
	 | `application/vnd.xacml+json`
	 | `application/vnd.xara`
	 | `application/vnd.xfdl`
	 | `application/vnd.xfdl.webform`
	 | `application/vnd.xmi+xml`
	 | `application/vnd.xmpie.cpkg`
	 | `application/vnd.xmpie.dpkg`
	 | `application/vnd.xmpie.plan`
	 | `application/vnd.xmpie.ppkg`
	 | `application/vnd.xmpie.xlim`
	 | `application/vnd.yamaha.hv-dic`
	 | `application/vnd.yamaha.hv-script`
	 | `application/vnd.yamaha.hv-voice`
	 | `application/vnd.yamaha.openscoreformat.osfpvg+xml`
	 | `application/vnd.yamaha.openscoreformat`
	 | `application/vnd.yamaha.remote-setup`
	 | `application/vnd.yamaha.smaf-audio`
	 | `application/vnd.yamaha.smaf-phrase`
	 | `application/vnd.yamaha.through-ngn`
	 | `application/vnd.yamaha.tunnel-udpencap`
	 | `application/vnd.yaoweme`
	 | `application/vnd.yellowriver-custom-menu`
	 | `application/vnd.youtube.yt`
	 | `application/vnd.zul`
	 | `application/vnd.zzazz.deck+xml`
	 | `application/voicexml+xml`
	 | `application/voucher-cms+json`
	 | `application/vq-rtcpxr`
	 | `application/wasm`
	 | `application/watcherinfo+xml`
	 | `application/webpush-options+json`
	 | `application/whoispp-query`
	 | `application/whoispp-response`
	 | `application/widget`
	 | `application/wita`
	 | `application/wordperfect5.1`
	 | `application/wsdl+xml`
	 | `application/wspolicy+xml`
	 | `application/x-pki-message`
	 | `application/x-www-form-urlencoded`
	 | `application/x-x509-ca-cert`
	 | `application/x-x509-ca-ra-cert`
	 | `application/x-x509-next-ca-cert`
	 | `application/x400-bp`
	 | `application/xacml+xml`
	 | `application/xcap-att+xml`
	 | `application/xcap-caps+xml`
	 | `application/xcap-diff+xml`
	 | `application/xcap-el+xml`
	 | `application/xcap-error+xml`
	 | `application/xcap-ns+xml`
	 | `application/xcon-conference-info-diff+xml`
	 | `application/xcon-conference-info+xml`
	 | `application/xenc+xml`
	 | `application/xfdf`
	 | `application/xhtml+xml`
	 | `application/xliff+xml`
	 | `application/xml`
	 | `application/xml-dtd`
	 | `application/xml-external-parsed-entity`
	 | `application/xml-patch+xml`
	 | `application/xmpp+xml`
	 | `application/xop+xml`
	 | `application/xslt+xml`
	 | `application/xv+xml`
	 | `application/yang`
	 | `application/yang-data+cbor`
	 | `application/yang-data+json`
	 | `application/yang-data+xml`
	 | `application/yang-patch+json`
	 | `application/yang-patch+xml`
	 | `application/yin+xml`
	 | `application/zip`
	 | `application/zlib`
	 | `application/zstd`
	 | `audio/1d-interleaved-parityfec`
	 | `audio/32kadpcm`
	 | `audio/3gpp`
	 | `audio/3gpp2`
	 | `audio/aac`
	 | `audio/ac3`
	 | `audio/AMR`
	 | `audio/AMR-WB`
	 | `audio/amr-wb+`
	 | `audio/aptx`
	 | `audio/asc`
	 | `audio/ATRAC-ADVANCED-LOSSLESS`
	 | `audio/ATRAC-X`
	 | `audio/ATRAC3`
	 | `audio/basic`
	 | `audio/BV16`
	 | `audio/BV32`
	 | `audio/clearmode`
	 | `audio/CN`
	 | `audio/DAT12`
	 | `audio/dls`
	 | `audio/dsr-es201108`
	 | `audio/dsr-es202050`
	 | `audio/dsr-es202211`
	 | `audio/dsr-es202212`
	 | `audio/DV`
	 | `audio/DVI4`
	 | `audio/eac3`
	 | `audio/encaprtp`
	 | `audio/EVRC`
	 | `audio/EVRC-QCP`
	 | `audio/EVRC0`
	 | `audio/EVRC1`
	 | `audio/EVRCB`
	 | `audio/EVRCB0`
	 | `audio/EVRCB1`
	 | `audio/EVRCNW`
	 | `audio/EVRCNW0`
	 | `audio/EVRCNW1`
	 | `audio/EVRCWB`
	 | `audio/EVRCWB0`
	 | `audio/EVRCWB1`
	 | `audio/EVS`
	 | `audio/example`
	 | `audio/flexfec`
	 | `audio/fwdred`
	 | `audio/G711-0`
	 | `audio/G719`
	 | `audio/G7221`
	 | `audio/G722`
	 | `audio/G723`
	 | `audio/G726-16`
	 | `audio/G726-24`
	 | `audio/G726-32`
	 | `audio/G726-40`
	 | `audio/G728`
	 | `audio/G729`
	 | `audio/G7291`
	 | `audio/G729D`
	 | `audio/G729E`
	 | `audio/GSM`
	 | `audio/GSM-EFR`
	 | `audio/GSM-HR-08`
	 | `audio/iLBC`
	 | `audio/ip-mr_v2.5`
	 | `audio/L8`
	 | `audio/L16`
	 | `audio/L20`
	 | `audio/L24`
	 | `audio/LPC`
	 | `audio/MELP`
	 | `audio/MELP600`
	 | `audio/MELP1200`
	 | `audio/MELP2400`
	 | `audio/mhas`
	 | `audio/mobile-xmf`
	 | `audio/MPA`
	 | `audio/mp4`
	 | `audio/MP4A-LATM`
	 | `audio/mpa-robust`
	 | `audio/mpeg`
	 | `audio/mpeg4-generic`
	 | `audio/ogg`
	 | `audio/opus`
	 | `audio/parityfec`
	 | `audio/PCMA`
	 | `audio/PCMA-WB`
	 | `audio/PCMU`
	 | `audio/PCMU-WB`
	 | `audio/prs.sid`
	 | `audio/QCELP`
	 | `audio/raptorfec`
	 | `audio/RED`
	 | `audio/rtp-enc-aescm128`
	 | `audio/rtploopback`
	 | `audio/rtp-midi`
	 | `audio/rtx`
	 | `audio/scip`
	 | `audio/SMV`
	 | `audio/SMV0`
	 | `audio/SMV-QCP`
	 | `audio/sofa`
	 | `audio/sp-midi`
	 | `audio/speex`
	 | `audio/t140c`
	 | `audio/t38`
	 | `audio/telephone-event`
	 | `audio/TETRA_ACELP`
	 | `audio/TETRA_ACELP_BB`
	 | `audio/tone`
	 | `audio/TSVCIS`
	 | `audio/UEMCLIP`
	 | `audio/ulpfec`
	 | `audio/usac`
	 | `audio/VDVI`
	 | `audio/VMR-WB`
	 | `audio/vnd.3gpp.iufp`
	 | `audio/vnd.4SB`
	 | `audio/vnd.audiokoz`
	 | `audio/vnd.CELP`
	 | `audio/vnd.cisco.nse`
	 | `audio/vnd.cmles.radio-events`
	 | `audio/vnd.cns.anp1`
	 | `audio/vnd.cns.inf1`
	 | `audio/vnd.dece.audio`
	 | `audio/vnd.digital-winds`
	 | `audio/vnd.dlna.adts`
	 | `audio/vnd.dolby.heaac.1`
	 | `audio/vnd.dolby.heaac.2`
	 | `audio/vnd.dolby.mlp`
	 | `audio/vnd.dolby.mps`
	 | `audio/vnd.dolby.pl2`
	 | `audio/vnd.dolby.pl2x`
	 | `audio/vnd.dolby.pl2z`
	 | `audio/vnd.dolby.pulse.1`
	 | `audio/vnd.dra`
	 | `audio/vnd.dts`
	 | `audio/vnd.dts.hd`
	 | `audio/vnd.dts.uhd`
	 | `audio/vnd.dvb.file`
	 | `audio/vnd.everad.plj`
	 | `audio/vnd.hns.audio`
	 | `audio/vnd.lucent.voice`
	 | `audio/vnd.ms-playready.media.pya`
	 | `audio/vnd.nokia.mobile-xmf`
	 | `audio/vnd.nortel.vbk`
	 | `audio/vnd.nuera.ecelp4800`
	 | `audio/vnd.nuera.ecelp7470`
	 | `audio/vnd.nuera.ecelp9600`
	 | `audio/vnd.octel.sbc`
	 | `audio/vnd.presonus.multitrack`
	 | `audio/vnd.qcelp`
	 | `audio/vnd.rhetorex.32kadpcm`
	 | `audio/vnd.rip`
	 | `audio/vnd.sealedmedia.softseal.mpeg`
	 | `audio/vnd.vmx.cvsd`
	 | `audio/vorbis`
	 | `audio/vorbis-config`
	 | `font/collection`
	 | `font/otf`
	 | `font/sfnt`
	 | `font/ttf`
	 | `font/woff`
	 | `font/woff2`
	 | `message/bhttp`
	 | `message/CPIM`
	 | `message/delivery-status`
	 | `message/disposition-notification`
	 | `message/example`
	 | `message/feedback-report`
	 | `message/global`
	 | `message/global-delivery-status`
	 | `message/global-disposition-notification`
	 | `message/global-headers`
	 | `message/http`
	 | `message/imdn+xml`
	 | `message/news`
	 | `message/s-http`
	 | `message/sip`
	 | `message/sipfrag`
	 | `message/tracking-status`
	 | `message/vnd.si.simp`
	 | `message/vnd.wfa.wsc`
	 | `image/aces`
	 | `image/avci`
	 | `image/avcs`
	 | `image/avif`
	 | `image/bmp`
	 | `image/cgm`
	 | `image/dicom-rle`
	 | `image/dpx`
	 | `image/emf`
	 | `image/example`
	 | `image/fits`
	 | `image/g3fax`
	 | `image/heic`
	 | `image/heic-sequence`
	 | `image/heif`
	 | `image/heif-sequence`
	 | `image/hej2k`
	 | `image/hsj2`
	 | `image/jls`
	 | `image/jp2`
	 | `image/jph`
	 | `image/jphc`
	 | `image/jpm`
	 | `image/jpx`
	 | `image/jxr`
	 | `image/jxrA`
	 | `image/jxrS`
	 | `image/jxs`
	 | `image/jxsc`
	 | `image/jxsi`
	 | `image/jxss`
	 | `image/ktx`
	 | `image/ktx2`
	 | `image/naplps`
	 | `image/png`
	 | `image/prs.btif`
	 | `image/prs.pti`
	 | `image/pwg-raster`
	 | `image/svg+xml`
	 | `image/t38`
	 | `image/tiff`
	 | `image/tiff-fx`
	 | `image/vnd.adobe.photoshop`
	 | `image/vnd.airzip.accelerator.azv`
	 | `image/vnd.cns.inf2`
	 | `image/vnd.dece.graphic`
	 | `image/vnd.djvu`
	 | `image/vnd.dwg`
	 | `image/vnd.dxf`
	 | `image/vnd.dvb.subtitle`
	 | `image/vnd.fastbidsheet`
	 | `image/vnd.fpx`
	 | `image/vnd.fst`
	 | `image/vnd.fujixerox.edmics-mmr`
	 | `image/vnd.fujixerox.edmics-rlc`
	 | `image/vnd.globalgraphics.pgb`
	 | `image/vnd.microsoft.icon`
	 | `image/vnd.mix`
	 | `image/vnd.ms-modi`
	 | `image/vnd.mozilla.apng`
	 | `image/vnd.net-fpx`
	 | `image/vnd.pco.b16`
	 | `image/vnd.radiance`
	 | `image/vnd.sealed.png`
	 | `image/vnd.sealedmedia.softseal.gif`
	 | `image/vnd.sealedmedia.softseal.jpg`
	 | `image/vnd.svf`
	 | `image/vnd.tencent.tap`
	 | `image/vnd.valve.source.texture`
	 | `image/vnd.wap.wbmp`
	 | `image/vnd.xiff`
	 | `image/vnd.zbrush.pcx`
	 | `image/wmf`
	 | `image/emf`
	 | `image/wmf`
	 | `model/3mf`
	 | `model/e57`
	 | `model/example`
	 | `model/gltf-binary`
	 | `model/gltf+json`
	 | `model/iges`
	 | `model/mtl`
	 | `model/obj`
	 | `model/prc`
	 | `model/step`
	 | `model/step+xml`
	 | `model/step+zip`
	 | `model/step-xml+zip`
	 | `model/stl`
	 | `model/u3d`
	 | `model/vnd.collada+xml`
	 | `model/vnd.dwf`
	 | `model/vnd.flatland.3dml`
	 | `model/vnd.gdl`
	 | `model/vnd.gs-gdl`
	 | `model/vnd.gtw`
	 | `model/vnd.moml+xml`
	 | `model/vnd.mts`
	 | `model/vnd.opengex`
	 | `model/vnd.parasolid.transmit.binary`
	 | `model/vnd.parasolid.transmit.text`
	 | `model/vnd.pytha.pyox`
	 | `model/vnd.rosette.annotated-data-model`
	 | `model/vnd.sap.vds`
	 | `model/vnd.usda`
	 | `model/vnd.usdz+zip`
	 | `model/vnd.valve.source.compiled-map`
	 | `model/vnd.vtu`
	 | `model/x3d-vrml`
	 | `model/x3d+fastinfoset`
	 | `model/x3d+xml`
	 | `multipart/appledouble`
	 | `multipart/byteranges`
	 | `multipart/encrypted`
	 | `multipart/example`
	 | `multipart/form-data`
	 | `multipart/header-set`
	 | `multipart/multilingual`
	 | `multipart/related`
	 | `multipart/report`
	 | `multipart/signed`
	 | `multipart/vnd.bint.med-plus`
	 | `multipart/voice-message`
	 | `multipart/x-mixed-replace`
	 | `text/1d-interleaved-parityfec`
	 | `text/cache-manifest`
	 | `text/calendar`
	 | `text/cql`
	 | `text/cql-expression`
	 | `text/cql-identifier`
	 | `text/css`
	 | `text/csv`
	 | `text/csv-schema`
	 | `text/directory`
	 | `text/dns`
	 | `text/ecmascript`
	 | `text/encaprtp`
	 | `text/example`
	 | `text/fhirpath`
	 | `text/flexfec`
	 | `text/fwdred`
	 | `text/gff3`
	 | `text/grammar-ref-list`
	 | `text/hl7v2`
	 | `text/html`
	 | `text/javascript`
	 | `text/jcr-cnd`
	 | `text/markdown`
	 | `text/mizar`
	 | `text/n3`
	 | `text/parameters`
	 | `text/parityfec`
	 | `text/provenance-notation`
	 | `text/prs.fallenstein.rst`
	 | `text/prs.lines.tag`
	 | `text/prs.prop.logic`
	 | `text/raptorfec`
	 | `text/RED`
	 | `text/rfc822-headers`
	 | `text/rtf`
	 | `text/rtp-enc-aescm128`
	 | `text/rtploopback`
	 | `text/rtx`
	 | `text/SGML`
	 | `text/shaclc`
	 | `text/shex`
	 | `text/spdx`
	 | `text/strings`
	 | `text/t140`
	 | `text/tab-separated-values`
	 | `text/troff`
	 | `text/turtle`
	 | `text/ulpfec`
	 | `text/uri-list`
	 | `text/vcard`
	 | `text/vnd.a`
	 | `text/vnd.abc`
	 | `text/vnd.ascii-art`
	 | `text/vnd.curl`
	 | `text/vnd.debian.copyright`
	 | `text/vnd.DMClientScript`
	 | `text/vnd.dvb.subtitle`
	 | `text/vnd.esmertec.theme-descriptor`
	 | `text/vnd.exchangeable`
	 | `text/vnd.familysearch.gedcom`
	 | `text/vnd.ficlab.flt`
	 | `text/vnd.fly`
	 | `text/vnd.fmi.flexstor`
	 | `text/vnd.gml`
	 | `text/vnd.graphviz`
	 | `text/vnd.hans`
	 | `text/vnd.hgl`
	 | `text/vnd.in3d.3dml`
	 | `text/vnd.in3d.spot`
	 | `text/vnd.IPTC.NewsML`
	 | `text/vnd.IPTC.NITF`
	 | `text/vnd.latex-z`
	 | `text/vnd.motorola.reflex`
	 | `text/vnd.ms-mediapackage`
	 | `text/vnd.net2phone.commcenter.command`
	 | `text/vnd.radisys.msml-basic-layout`
	 | `text/vnd.senx.warpscript`
	 | `text/vnd.si.uricatalogue`
	 | `text/vnd.sun.j2me.app-descriptor`
	 | `text/vnd.sosi`
	 | `text/vnd.trolltech.linguist`
	 | `text/vnd.wap.si`
	 | `text/vnd.wap.sl`
	 | `text/vnd.wap.wml`
	 | `text/vnd.wap.wmlscript`
	 | `text/vtt`
	 | `text/xml`
	 | `text/xml-external-parsed-entity`
	 | `video/1d-interleaved-parityfec`
	 | `video/3gpp`
	 | `video/3gpp2`
	 | `video/3gpp-tt`
	 | `video/AV1`
	 | `video/BMPEG`
	 | `video/BT656`
	 | `video/CelB`
	 | `video/DV`
	 | `video/encaprtp`
	 | `video/example`
	 | `video/FFV1`
	 | `video/flexfec`
	 | `video/H261`
	 | `video/H263`
	 | `video/H263-1998`
	 | `video/H263-2000`
	 | `video/H264`
	 | `video/H264-RCDO`
	 | `video/H264-SVC`
	 | `video/H265`
	 | `video/H266`
	 | `video/iso.segment`
	 | `video/JPEG`
	 | `video/jpeg2000`
	 | `video/jxsv`
	 | `video/mj2`
	 | `video/MP1S`
	 | `video/MP2P`
	 | `video/MP2T`
	 | `video/mp4`
	 | `video/MP4V-ES`
	 | `video/MPV`
	 | `video/mpeg4-generic`
	 | `video/nv`
	 | `video/ogg`
	 | `video/parityfec`
	 | `video/pointer`
	 | `video/quicktime`
	 | `video/raptorfec`
	 | `video/raw`
	 | `video/rtp-enc-aescm128`
	 | `video/rtploopback`
	 | `video/rtx`
	 | `video/scip`
	 | `video/smpte291`
	 | `video/SMPTE292M`
	 | `video/ulpfec`
	 | `video/vc1`
	 | `video/vc2`
	 | `video/vnd.CCTV`
	 | `video/vnd.dece.hd`
	 | `video/vnd.dece.mobile`
	 | `video/vnd.dece.mp4`
	 | `video/vnd.dece.pd`
	 | `video/vnd.dece.sd`
	 | `video/vnd.dece.video`
	 | `video/vnd.directv.mpeg`
	 | `video/vnd.directv.mpeg-tts`
	 | `video/vnd.dlna.mpeg-tts`
	 | `video/vnd.dvb.file`
	 | `video/vnd.fvt`
	 | `video/vnd.hns.video`
	 | `video/vnd.iptvforum.1dparityfec-1010`
	 | `video/vnd.iptvforum.1dparityfec-2005`
	 | `video/vnd.iptvforum.2dparityfec-1010`
	 | `video/vnd.iptvforum.2dparityfec-2005`
	 | `video/vnd.iptvforum.ttsavc`
	 | `video/vnd.iptvforum.ttsmpeg2`
	 | `video/vnd.motorola.video`
	 | `video/vnd.motorola.videop`
	 | `video/vnd.mpegurl`
	 | `video/vnd.ms-playready.media.pyv`
	 | `video/vnd.nokia.interleaved-multimedia`
	 | `video/vnd.nokia.mp4vr`
	 | `video/vnd.nokia.videovoip`
	 | `video/vnd.objectvideo`
	 | `video/vnd.radgamettools.bink`
	 | `video/vnd.radgamettools.smacker`
	 | `video/vnd.sealed.mpeg1`
	 | `video/vnd.sealed.mpeg4`
	 | `video/vnd.sealed.swf`
	 | `video/vnd.sealedmedia.softseal.mov`
	 | `video/vnd.uvvu.mp4`
	 | `video/vnd.youtube.yt`
	 | `video/vnd.vivo`
	 | `video/VP8`
	 | `video/VP9`
}