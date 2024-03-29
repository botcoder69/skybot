import Database from '@replit/database';
import { 
	ApplicationCommand,
	Collection,
	Client,
	GuildMember,
	If,
	Interaction,
	Message,
	EmbedBuilder,
	MessageOptions,
	MessagePayload,
	Snowflake,
	ThreadMember,
	User,
	Guild,
	ChatInputCommandInteraction
} from 'discord.js';
import { Request } from 'node-fetch'
import Armor from '../structures/Armor';

declare module Functions {
	function calcTime(offset: string): string
	/**
	 * Insert's commas in your number. A better way to read large numbers
	 * @param {number} number
	 */
	function commafy(number: number): string
	function getUTCTime(): string
	/**
	 * Makes a random ID with a set length
	 * @param {number} length
	 * @param {string} characters
	 */
	function makeid(length: number, characters?: string): string
	function msToHMSMs(ms: number): string
	function secondsToHMS(seconds: number): string
	/**
	 * Splits an array into even chunks. Good for pages and your 2048 embed description character limit
	 * @param {any[]} array
	 * @param {number} chunkSize
	 */
	function sliceIntoChunks<ArrayType>(array: ArrayType, chunkSize: number): ArrayType[]
	/**
	 * Returns a roman numeral of a number
	 * @param {number} num 
	 */
	function toRomanNumeral(num: number): string
	/**
	 * Checks if the last element in an array is a number in a string.
	 * @param {string[]} args 
	 */
	function arrayValidNumber(args: string[]): boolean
	/**
	 * @param {number} SkybotTimeMs The number of milliseconds since the Day-Night Update epoch. ~~`October 25, 2021. 00:00:00`~~
	 * @param {SkybotTimeOptions} options
	 */
	function formatSkybotTime(SkybotTimeMs: number, options?: SkybotTimeOptions): string
	/**
	 * Syncs an old Repl.it Database, with a new Repl.it Database. Perfect for transferring important data from one repl to another.
	 * @param {string} dbUrlToSyncTo The URL of the Repl.it Database that you want to add the values from the old database to. Basically, this is the database you are copying all the data to.
	 * @param {string} dbUrlToSyncFrom The URL of the Repl.it Database that you want to extract the values from the old database to. Basically, this is the database you are copying all the data from. 
	 * @param {boolean} [logResults=false] If you would like to log results of adding keys to the database, simply enable this. Automatically sets to `false` when undefined.
	 */
	function databaseResync(dbUrlToSyncTo: string, dbUrlToSyncFrom: string, logResults?: boolean): Promise<void>
	/**
	 * An array that you want to randomize. You can set how many items you would like.
	 * @param {any[]} array The array to take values from.
	 * @param {number} [count=array.length - 1] The amount of items in the new randomized array.
	 */
	function randomizeArray<ArrayType>(array: ArrayType, count?: number): ArrayType;

	/**
	 * Transforms 1 by 1 keys into an object. Requires the Repl.it Database and the user's ID
	 * @param {Database} db The Repl.it Database
	 * @param {string} uid The ID of the user that instantiated this
	 * @param {boolean} [remove=false] Remove keys on object creation
	 * @param {string[]} [exclude=[]] Keys to be excluded from deletion when deleting keys
	 */
	function keysToObj(db: Database<any>, maid: string, remove?: boolean, exclude?: string[]): Promise<RawUserObj>

	/**
	 * Parses seconds to a days, hours, minutes, seconds format. Stripped from Dank Memer
	 * @see https://github.com/DankMemer/CommunityBot/blob/main/src/utils/misc.js#L102_L125
	 * @param {number} time 
	 * @returns {string}
	 */
	function parseTime(time: number): string

	/**
	 * Adds an item to a specific index in the array. If index is not supplied, the array's length will be used instead.
	 * @param {any[]} array The array to modify
	 * @param {any} item The item to add
	 * @param {number} index The index in the array this item will be added to. Defaults to the index of the last element in the array
	 * @returns {any[]}
	 */
	function addArrayElement<ArrayType, ItemType>(array: ArrayType, item: ItemType, index?: number): void;

	/**
	 * An easier way to remove an item from an array.
	 * @param {any[]} array The array to modify
	 * @param {any} item The item to remove
	 * @returns {any[]}
	 */
	function removeArrayElement<ArrayType, ItemType>(array: ArrayType, item: ItemType): void

	/**
	 * Cleans a user id, ready to be used in searching for a user.
	 * @param {string} userId A Snowflake or MessageMention
	 */
	function cleanUserId(userId: string): Snowflake

	/**
	 * Resolves a UserResolvable into a User object. If the User doesn't exist, undefined will be returned.
	 * @param {UserResolvable} user The UserResolvable you want to resolve into a User object. 
	 * @param {client} client The Client object
	 */
	function resolveUser(user: UserResolvable, client: Client<boolean>): User

	/**
	 * Resolves a GuildMemberResolvable into a GuildMember object. If the GuildMember doesn't exist, undefined will be returned.
	 * @param {GuildMemberResolvable} guildMember The GuildMemberResolvable you want to resolve into a User object.
	 * @param {Guild} guild The Guild object to use in resolving the GuildMemberResolvable.
	 */
	function resolveGuildMember(guildMember: GuildMemberResolvable, guild: Guild): GuildMember;

	/**
	 * Gets a random number starting from `min` to `max`.
	 * @param {number} min The lowest number this random number generator can return
	 * @param {number} max The highest number this random number generator can return
	 */
	function getRandomNumber(min: number, max: number): number;

	/**
	 * Gets a chosen random number starting from `min` to `max`.
	 * @param {number} min The lowest number this random number generator can return.
	 * @param {number} max The highest number this random number generator can return.
	 * @param {number[]} exclude The specific numbers this random number generator can't return. If you want all the numbers from `min` to `max`, use `Functions#getRandomNumber()` instead.
	 */
	function getSpecifiedRandomNumber(min: number, max: number, exclude: number[]): number;

	/**
	 * Checks if the user has a specific "Active Item". Added to `Functions` to prevent "Code Duplication"
	 * @param {RawUserObj} maidObj 
	 * @param {string} item 
	 */
	function checkActiveItem(maidObj: RawUserObj, item: string): boolean

	/**
	 * Check if the `Four_Leaf_Clover` item helped the user
	 * @param {boolean} clover The clover status effect.
	 * @param {number} rng The random number generator
	 * @param {number} oldValue The value before adding the clover. This refers to the value in the RNG.
	 * @param {number} newValue The value after adding the clover. This refers to the value in the RNG.
	 */
	function cloverHelped(clover: boolean, rng: number, oldValue: number, newValue: number): boolean

	/**
	 * Initiates the leaderboard.
	 * @param {Database} db 
	 * @param {Collection<string, SkybotCurrencyProfile>} leaderboard 
	 * @param {Client} client 
	 */
	function initLeaderboard(db: Database<RawUserObj>, leaderboard: Collection<string, SkybotCurrencyProfile>, client: Client, excludedKeys?: string[]): Promise<void>

	/**
	 * This handy function overwrites existing properties. If the property in `objectToOverwrite` doesn't exist in `objectFromOverwrite`, it will be kept, otherwise, it will be overwritten
	 * @param {OldData} objectOverwriteTo The object to overwrite properties of
	 * @param {OverwriteData} objectOverwriteFrom The object to overwrite properties from
	 * @param {string[]} excludeOverwrite Items to exclude from overwriting
	 */
	function keepOldObjectProperty<OldData, OverwriteData>(objectOverwriteTo: OldData, objectOverwriteFrom: OverwriteData, excludeOverwrite?: string[]): OldData | OverwriteData

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
	function add(object: any, number: number): number

	/**
	 * Sends a notification to a user. If the user has DM's off, this will send a message saying that they can't be DM'ed 
	 * @param {EmbedBuilder} notification
	 * @param {ChatInputCommandInteraction} interaction
	 * @param {string | MessageOptions | MessagePayload} failMessage
	 */
	function sendNotification(notification: EmbedBuilder, interaction: ChatInputCommandInteraction, failMessage?: string | MessageOptions | MessagePayload): Promise<void>;

	/**
	 * Checks if a flag exists in a given array. If a flag exists, returns the flag and its argument. Otherwise, returns just the flag and an empty array.
	 * @param {string} flag The flag to check for
	 * @param {number} length The length of arguments for the flag
	 * @param {ArrayType[]} array The array to check the flag in
	 * @param {?boolean} removeFromArray If the flag and arguments should be removed.
	 * @returns {FlagReturn<ArrayType>}
	 */
	function checkForFlag<ArrayType>(array: ArrayType[], flag: string, length: number, removeFromArray?: boolean | null): FlagReturn<ArrayType>;

	/**
	 * Converts an object's "property: value" structure into a Map.
	 * @param {object} obj 
	 * @param {Map} mapToUse 
	 * @returns {void}
	 */
	function objToMap<MapType>(obj: object, mapToUse: MapType): MapType;

	/**
	 * Converts an Map's "key: value" structure into an Object. Note that all keys will be turned into strings.
	 * @param {Map} map 
	 * @param {object} objToUse 
	 * @returns {void}
	 */
	function mapToObj<MapType>(map: MapType, objToUse: object): object;

	/**
	 * This handy function returns a or an whether `word` starts with "a", "e", "i", "o", "u". This is very handy for those persons who don't want to have a big ternary expression just for 'a' and 'an'.
	 * @param {string} word 
	 */
	function aoran(word: string): 'a' | 'an';

	function getSettingValue(maidObj: RawUserObj, setting: ValidSettingStrings): boolean;

	/**
	 * Sets permissions for a guild slash command.
	 * @param {Guild} guild The guild you want to edit slash commands in
	 * @param {string} commandName The name of the slash command you want to edit
	 * @param {import('discord.js').null[]} permissions The permissions you want to set for the slash command
	 * @param {'set' | 'add'} editType The type of edit you want to do with this slash command. If you pick 'set', this will use `ApplicationCommandPermissionsManager#set()`, otherwise, if you pick 'add', this will use `ApplicationCommandPermissionsManager#add()`. Defaults to "add"
	 * @deprecated Discord API v10 removed the usage of editing guild permissions through the bot. 
	 */
	function editGuildCommandPermissions(guild: Guild, commandName: string, permissions: null[], editType: 'set' | 'add'): Promise<void>

	/**
	 * Sets permissions for a global slash command.
	 * @param {Client} client The client you want to edit slash commands in
	 * @param {string} commandName The name of the slash command you want to edit
	 * @param {import('discord.js').null[]} permissions The permissions you want to set for the slash command
	 * @param {'set' | 'add'} editType The type of edit you want to do with this slash command. If you pick 'set', this will use `ApplicationCommandPermissionsManager#set()`, otherwise, if you pick 'add', this will use `ApplicationCommandPermissionsManager#add()`. Defaults to "add"
	 * @deprecated Discord API v10 removed the usage of editing guild permissions through the bot.
	 */
	function editClientCommandPermissions(client: Client, commandName: string, permissions: null[], editType: 'set' | 'add'): Promise<void>
	 
	/**
	 * Fetches an application command from the parentResolvable. If `parentResolvable` is a guild, the command will be fetched from the Guild, otherwise if `parentResolvable` is a client, the command will be fetched from the Client.
	 * @param {Guild | Client} parentResolvable The parent to use in fetching the slash command
	 * @param {string} commandName The name of the slash command you want to fetch.
	 */
	function fetchApplicationCommand(parentResolvable: Guild | Client, commandName: string): Promise<ApplicationCommand>;

	/**
	 * Creates a progress bar!
	 * @param percentage The percent complete. Has to be a number from 0 to 100.
	 * @param maxTiles The max amount of "tiles" this progress bar should return. 
	 * @param options Options for creating a progress bar.
	 */
	function createProgressBar(percentage: number, maxTiles?: number, options?: CreateProgressBarOptions): string;

	/**
	 * This collects all the userObjs of all users in `guild` that is registered to Skybot.
	 * @param {any} db
	 * @param {Guild} guild
	 */
	function collectAllGuildUserObjs(db: any, guild: Guild): Promise<Collection<string, object>>;

	/**
	 * This resolves an armor's "statistics" into an object with filled properties.
	 * @param {Armor} armor 
	 */
	function resolveArmorStats(armor: Armor): FilledArmorStatisticData;

	/**
	 * Splits a string into multiple chunks at a designated character that do not exceed a specific length. Since `discord.js` will remove this useful function on `v14`, I have added it here.
	 * @param {string} text The content to split.
	 * @param {SplitOptions} [options] The options controlling the behavior of the split function.
	 * @returns {string[]}
	 */
	function splitMessage(text: string, options?: SplitOptions): string[];

	/**
	 * Verifies the provided data is a string, otherwise throws provided error. Since Functions#splitMessage() requires this function to work and `discord.js` will remove this function on `v14`, I have added `it here.
	 * @param {string} data The string resolvable to resolve
	 * @param {Function} [error] The Error constructor to instantiate. Defaults to Error
	 * @param {string} [errorMessage] The error message to throw with. Defaults to "Expected string, got <data> instead."
	 * @param {boolean} [allowEmpty=true] Whether an empty string should be allowed
	 * @returns {string}
	 */
	function verifyString(data: string, error?: typeof Error, errorMessage?: string, allowEmpty?: boolean): string;

	/**
	 * Makes a request to the given URL.
	 * @param url The URL you want to make a request to.
	 * @param requestData The data of the request you want to create.
	 * @param retries The amount of times the request will be resent until the method gives up.
	 */
	function request(url: string, requestData: RequestOptions, retries?: number): Promise<Request>;

	/**
	 * Makes a request to the URL of a Skybot Database. This returns the value of the `value` property from `Request#json()` instead of the `Request` itself. If you want the request, use `Functions#request()` instead.
	 * @param url The URL of the Skybot Database you want to make a request to.
	 * @param requestData The data of the request you want to create.
	 * @param retries The amount of times the request will be resent until the method gives up.
	 */
	function requestToSkybotDatabase(url: string, requestData: RequestOptions, retries?: number): Promise<any>;

	
	/**
	 * Gets the path of a command file. This supports getting files where the name of the command isn't the same as the file name. (Filename: `test.js`; Command: `/dev`);
	 * @param {Client} client The instance of `Client` to reload the command from.
	 * @param {string} commandName The command name you want to reload.
	 * @param {string} commandFolderPath The path for the command folders your bot is using. This has to be the FULL directory path, therefore `path.join()` and `__dirname` are required.
	 * @returns {string}
	 */
	function getCommandFilePath(client: Client, commandName: string, commandFolderPath: string): string;

	/**
	 * Reloads a slash command
	 * @param {string} commandName The command name you want to reload.
	 * @param {string} commandFolderPath The path for the command folders your bot is using. This has to be the FULL directory path, therefore `path.join()` and `__dirname` are required.
	 * @param {Client} client The instance of `Client` to reload the command from.
	 * @param {string} token The token for your bot.
	 * @param {boolean} [apiRequest=false] Whether or not the command should request to the API. If you want to reload the code for the command, this should be set to `false` for convienence, but if the command parameters are included, set this to `true`
	 * @param {string} [guildId=''] The id of the `Guild` you want to reload the command in. If left blank, this will treat the command as a **Client** `ApplicationCommand`, otherwise, it will treat the command as a **Guild** `ApplicationCommand`
	 * @returns {Promise<void>}
	 */
	function reloadCommand(commandName: string, commandFolderPath: string, client: Client, token: string, apiRequest?: boolean, guildId?: string): Promise<void>
}

export = Functions;



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