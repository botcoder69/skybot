
/* eslint-disable no-await-in-loop, no-console, no-unused-vars */
/* Require all the necessary stuff from the libraries */
const timeCodeStarted = Date.now();

const CodeHandler = require('./Handlers');
const fs = require('fs');
const Util = require('./Util');
const { Client, Collection, version: DiscordJSVersion, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ActivityType, PresenceUpdateStatus } = require('discord.js');
const { CachedDatabase, Functions, SkyblockTypes, SkybotDatabase, SkybotDatabaseHandler, extendNativeClasses, version: SkyblockHelperVersion } = require('./SkyblockHelper/src/index');

// const wait = require('util').promisify(setTimeout);
const deployCommands = require('./deploy-commands');
const { getUTCTime, msToHMSMs, makeid, calcTime, getRandomNumber, commafy, objToMap, mapToObj, parseTime } = Functions;

const chalk = require('chalk');
const maidObj_v12 = require('./maidObj').v12;
const mineUnlocks = new Map();
const chopUnlocks = new Map();
const achievements = require('./achievements');
const userCmdInfos = new Collection();
const { updates, levelReq, betaToken } = require('./config.json');




// Make a custom client exclusive for Skybot
class SkybotClient extends Client {
	/**
	 * 
	 * @param {import ('discord.js').ClientOptions} options 
	 */
	constructor(options) {
		super(options);

		/**
		 * @type {Collection<string, import ('discord.js').SkybotAchievementData}
		 */
		this.achievements = new Collection();

		/**
		 * @type {Collection<string, import ('discord.js').AssetMapValues>}
		 */
		this.textCommands = new Collection();

		/**
		 * @type {Collection<string, import ('discord.js').SlashCommand>}
		 */
		this.slashCommands = new Collection();

		/**
		 * @type {Collection<string, Collection<string, number>}
		 */
		this.cooldowns = new Collection();

		/**
		 * @type {Collection<string, boolean>}
		 */
		this.confirmations = new Collection();

		/**
		 * @type {Collection<string, (import 'discord.js').AssetMapValues>}
		 */
		this.assetMap = new Collection();

		/**
		 * @type {Collection<string, import('discord.js').UserErrorObject>}
		 */
		this.bugMap = new Collection();

		/**
		 * @type {string[]}
		 */
		this.console = [`**Logs for ${calcTime('+8')}**`];

		/**
		 * @type {Collection<string, "🟩" | "🟨" | "🟥">}
		 */
		this.errorMap = new Collection();

		/**
		 * @type {Collection<number, number>}
		 */
		this.levelReq = new Collection(levelReq);

		/**
		 * @type {Collection<string, number>}
		 */
		this.updateMap = new Collection(updates);

		/**
		 * @type {Collection<string, import('discord.js').SkybotCurrencyProfile>}
		 */
		this.leaderboard = new Collection();

		this.achievements = new Collection(achievements);

		/**
		 * @type {Collection<string, any>}
		 */
		this.dragonFights = new Collection();
	}
}

/*
console.log = (...data) => {
	console.warn(data);

	try {
		throw new Error();
	} catch (error) {
		console.error(error);
	}
};
*/

/* Initiate some classes from the libraries */
const db = new CachedDatabase(`https://kv.replit.com/v0/eyJhbGciOiJIUzUxMiIsImlzcyI6ImNvbm1hbiIsImtpZCI6InByb2Q6MSIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25tYW4iLCJleHAiOjE2NzE2NTQ3MTYsImlhdCI6MTY3MTU0MzExNiwiZGF0YWJhc2VfaWQiOiI0YzBjNmNmNC02YTFhLTQwNDAtYjZlNC1lM2QzMDQ3ZGQzYzgiLCJ1c2VyIjoiQm90Q29kZXI2OSIsInNsdWciOiJTa3lib3REYXRhYmFzZTEifQ.ulyYjdhZ69zAx1BBDjtuyMksfdeivbXdvLDVCwAI7A1IUmLKCeF5I9carfIvlEanXtiCFsnbd-BPHkl0WODghg`);
/*
const db = new SkybotDatabaseHandler()
	.setDebugMode(false)
	.setRequestRetries(Infinity)
	.setKeyTreshold(2500)
	.setDatabases(
		new SkybotDatabase()
			.setAuthorization(`SKYBOTDBAUTHurieyt834ytp34gi47ty3p4hi45gg7te34oput394ht94bvow`)
			.setDatabaseURL(`https://SkybotDatabase1.botcoder69.repl.co`)
			.setFriendlyName(`Skybot Database 1`),
		new SkybotDatabase()
			.setAuthorization(`SKYBOTDBAUTHw4iuuyu9tg4y83gv3gvb34ghh349gnifb24ijgh3i4ughevef`)
			.setDatabaseURL(`https://SkybotDatabase2.botcoder69.repl.co`)
			.setFriendlyName(`Skybot Database 2`),
		new SkybotDatabase()
			.setAuthorization(`SKYBOTDBAUTH93284fqwg9u8q30q80werg9ufwe2892qeft08f2e08t29r328`)
			.setDatabaseURL(`https://SkybotDatabase3.botcoder69.repl.co`)
			.setFriendlyName(`Skybot Database 3`),
		new SkybotDatabase()
			.setAuthorization(`SKYBOTDBAUTHrw3879jqwr89035ntiu3ou2ef89324tknfvqqwoiur92353i0`)
			.setDatabaseURL(`https://SkybotDatabase4.botcoder69.repl.co`)
			.setFriendlyName(`Skybot Database 4`),
	)
	.setInitFailFn(() => {
		process.exit();
		// The ping should be able to unlock this in 5 minutes.
	})
	.setFormatKeyValueFn(async (userObj, iteration, mapSize) => {
		Util.fillUndefinedProperties(userObj, maidObj_v12, [`update`, `settings`]);



		// Flatten Mines
		const mineResolver = {
			starter_mine: SkyblockTypes.SkyblockMines.StarterMine,
			iron_mine: SkyblockTypes.SkyblockMines.IronMine,
			gold_mine: SkyblockTypes.SkyblockMines.GoldMine,
			lapis_quarry: SkyblockTypes.SkyblockMines.LapisQuarry,
			redstone_mine: SkyblockTypes.SkyblockMines.RedstoneMine,
			diamond_sanctuary: SkyblockTypes.SkyblockMines.DiamondSanctuary,
			the_end: SkyblockTypes.SkyblockMines.TheEnd,
			dragons_nest: SkyblockTypes.SkyblockMines.DragonsNest
		};

		userObj.mine = mineResolver[userObj.mine];


		
		// Flatten Forests
		if (userObj.forest) {
			userObj.forest = SkyblockTypes.SkyblockForests.Forest;
		} else if (userObj.roofedForest) {
			userObj.forest = SkyblockTypes.SkyblockForests.RoofedForest;
		} else if (userObj.taiga) {
			userObj.forest = SkyblockTypes.SkyblockForests.Taiga;
		} else if (userObj.savannah) {
			userObj.forest = SkyblockTypes.SkyblockForests.Savannah;
		} else if (userObj.jungle) {
			userObj.forest = SkyblockTypes.SkyblockForests.Jungle;
		}



		// Flatten Minions
		userObj.placedMinions = userObj.placedMinions
			.map(minion => {
				const minionFuelFile = client.assetMap.find(asset => asset.name.toLowerCase() === minion[8]?.toLowerCase());
				const minionUpgrade1File = client.assetMap.find(asset => asset.name.toLowerCase() === minion[4]?.toLowerCase());
				const minionUpgrade2File = client.assetMap.find(asset => asset.name.toLowerCase() === minion[6]?.toLowerCase());
				const minionAutomatedShippingFile = client.assetMap.find(asset => asset.name.toLowerCase() === minion[11]?.toLowerCase());

				return [
					minion[1],
					minion[2],
					minionUpgrade1File?.keyName ?? null,
					minionUpgrade2File?.keyName ?? null,
					minionFuelFile?.keyName ?? null,
					minion[10],
					minionAutomatedShippingFile?.keyName ?? null,
					minion[13],
				];
			});

		db.debug(`init() | User Values Transformed: ${iteration}/${mapSize}.`);

		return userObj;
	});

extendNativeClasses(
	{
		extendArray: true,
		extendObject: false
	}
);
*/

const client = new SkybotClient(
	{ 
		intents: [
			GatewayIntentBits.Guilds, 
			GatewayIntentBits.GuildMembers, 
			GatewayIntentBits.GuildMessages, 
			GatewayIntentBits.GuildEmojisAndStickers, 
			GatewayIntentBits.GuildIntegrations, 
			GatewayIntentBits.DirectMessages, 
			GatewayIntentBits.DirectMessageReactions,
			32767
		],
		allowedMentions: { 
			repliedUser: false 
		},
		presence: {
			activities: [
				{ 
					name: '/tutorial | Starting up!',
					type: 'PLAYING'
				}
			], 
			status: PresenceUpdateStatus.Idle
		},
		shards: 'auto'
	}
);



// Rejection and Error Handling
process.on('unhandledRejection', unhandledRejection => {
	console.error(`An unhandledRejection occured!`);
	console.error(unhandledRejection);
});





/* Initializing slash commands. */
const slashCommandFolders = fs.readdirSync(`./slash-commands`);
const slashStartMs = Date.now();
let slashCommandsLoaded = 0;

for (const folder of slashCommandFolders) {
	const slashCommandFiles = fs.readdirSync(`./slash-commands/${folder}`).filter(file => file.endsWith('.js'));

	for (const file of slashCommandFiles) {
		const command = require(`./slash-commands/${folder}/${file}`);
		client.slashCommands.set(command.data.name, command);

		slashCommandsLoaded += 1;
	}
}

client.console.push(`${getUTCTime()} [SlashCommand][Logging] | Successfully loaded ${slashCommandsLoaded} slash commands in ${msToHMSMs(Date.now() - slashStartMs)}`);
console.log(`${getUTCTime()} [SlashCommand]${chalk.greenBright(`[Logging]`)} | Successfully loaded ${slashCommandsLoaded} slash commands in ${msToHMSMs(Date.now() - slashStartMs)}`);




/* Initializing assets. */
const assetFolders = fs.readdirSync(`./assets`),
	assetStartMs = Date.now();
let assetsLoadedSuccess = 0,
	assetsLoadedFailure = 0;

for (const folder of assetFolders) {
	const assetFiles = fs.readdirSync(`./assets/${folder}`).filter(file => file.endsWith('.js'));
	
	for (const file of assetFiles) {
		const asset = require(`./assets/${folder}/${file}`);

		try {
			if ('includeInParsing' in asset) {
				if (asset.includeInParsing) {
					client.assetMap.set(asset.keyName, asset);
					
					assetsLoadedSuccess += 1;
				} else {
					client.console.push(`${getUTCTime()} [Asset][Warning] | "${asset?.name}" | ./assets/${folder}/${file} | Your asset had the property "includeInParsing" set to false. This means that your asset will not be included in the assetMap. If this was not intentional, please set the "includeInParsing" property to true and restart the code or use the \`reload-items\` command.`);
					console.warn(`${getUTCTime()} [Asset]${chalk.yellowBright(`[Warning]`)} | "${asset?.name}" | ./assets/${folder}/${file} | Your asset had the property "includeInParsing" set to false. This means that your asset will not be included in the assetMap. If this was not intentional, please set the "includeInParsing" property to true and restart the code or use the \`reload-items\` command.`);
					
					assetsLoadedFailure += 1;
				}
			} else {
				client.console.push(`${getUTCTime()} [Asset][Warning] | "${asset?.name}" | ./assets/${folder}/${file} | Your asset didn't have the property "includeInParsing". It will be regarded as false and will not be included in the assetMap. If this was not intentional, please include the "includeInParsing" property and set it to true, then restart the code or use the \`reload-items\` command.`);
				console.warn(`${getUTCTime()} [Asset]${chalk.redBright(`[Warning]`)} | "${asset?.name}" | ./assets/${folder}/${file} | Your asset didn't have the property "includeInParsing". It will be regarded as false and will not be included in the assetMap. If this was not intentional, please include the "includeInParsing" property and set it to true, then restart the code or use the \`reload-items\` command.`);
				
				assetsLoadedFailure += 1;
			}
		} catch (error) {
			client.console.push(`${getUTCTime()} [Asset][Error] | "${asset?.name}" | ./assets/${folder}/${file} | ${error}`);
			console.error(`${getUTCTime()} [Asset]${chalk.redBright(`[Warning]`)} | ${'name' in asset ? `"${asset.name}"` : `""`} | ./assets/${folder}/${file} | ${error}`);
			
			assetsLoadedFailure += 1;
		}
	}
}

client.console.push(`${getUTCTime()} [Asset][Logging] | Successfully loaded ${assetsLoadedSuccess} assets; failed to load ${assetsLoadedFailure} assets. Total of ${assetsLoadedFailure + assetsLoadedSuccess} assets handled in ${msToHMSMs(Date.now() - assetStartMs)}`);
console.log(`${getUTCTime()} [Asset]${chalk.greenBright(`[Logging]`)} | Successfully loaded ${assetsLoadedSuccess} assets; failed to load ${assetsLoadedFailure} assets. Total of ${assetsLoadedFailure + assetsLoadedSuccess} assets handled in ${msToHMSMs(Date.now() - assetStartMs)}`);






// Deploys Slash Commands
deployCommands('851616135592935425', `756000684733759611`, betaToken);





// client.on('warn', console.log).on('debug', console.log);

client.on('error', error => {
	console.error(`Emitted 'error' event on SkybotClient instance:`, error);
});

client.once('ready', async () => {
	client.user.setPresence({
		activities: [
			{ 
				name: '/tutorial | Initializing...',
				type: ActivityType.Playing
			}
		], 
		status: PresenceUpdateStatus.Idle
	});

	let GuildIterator = 0,
		MemberIterator = 0;
	const timeLoopStarted = Date.now();
	for (const guild of client.guilds.cache.values()) {
		try {
			// eslint-disable-next-line no-await-in-loop
			await guild.members.fetch();
		
			GuildIterator += 1;
			MemberIterator += guild.members.cache.size;
		} catch (error) {
			console.error(error);
		}
	}
	
	const timeClientTookToLoad = msToHMSMs(Date.now() - timeCodeStarted);

	client.console.push(`${getUTCTime()} [Client][Logging] | Successfully iterated over ${GuildIterator} guilds, and cached a total of ${MemberIterator} members in ${msToHMSMs(Date.now() - timeLoopStarted)}`);
	console.log(`${getUTCTime()} [Client]${chalk.greenBright(`[Logging]`)} | Successfully iterated over ${GuildIterator} guilds, and cached a total of ${MemberIterator} members in ${Date.now() - timeLoopStarted} milliseconds.`);

	client.console.push(`${getUTCTime()} [Client][Logging] | Ready!`);
	console.log(`${getUTCTime()} [Client]${chalk.greenBright(`[Logging]`)} | Ready!`);

	client.console.push(`${getUTCTime()} [Client][Logging] | Logged in as ${client.user.username}.`);
	console.log(`${getUTCTime()} [Client]${chalk.greenBright(`[Logging]`)} | Logged in as ${client.user.username}.`);

	client.console.push(`${getUTCTime()} [Client][Logging] | Client is currently using SkyblockHelper v${SkyblockHelperVersion}, discord.js v${DiscordJSVersion}, and Node.js ${process.version}`);
	console.log(`${getUTCTime()} [Client]${chalk.greenBright(`[Logging]`)} | Client is currently using SkyblockHelper v${SkyblockHelperVersion}, discord.js v${DiscordJSVersion}, and Node.js ${process.version}`);

	client.console.push(`${getUTCTime()} [Client][Logging] | Took the client ${timeClientTookToLoad} to get ready.`);
	console.log(`${getUTCTime()} [Client]${chalk.greenBright(`[Logging]`)} | Took the client ${timeClientTookToLoad} to get ready.`);


	const initializeDatabaseTimestamp = Date.now();

	client.console.push(`${getUTCTime()} [Database][Logging] | Initializing Database...`);
	console.log(`${getUTCTime()} [Database]${chalk.greenBright(`[Logging]`)} | Initializing Database...`);

	await db.fetchDatabaseEntries([`518736428721635338`]);
	// await db.init();

	client.console.push(`${getUTCTime()} [Database][Logging] | Database operations have completed in ${msToHMSMs(Date.now() - initializeDatabaseTimestamp)}!`);
	console.log(`${getUTCTime()} [Database]${chalk.greenBright(`[Logging]`)} | Database operations have completed in ${msToHMSMs(Date.now() - initializeDatabaseTimestamp)}!`);

	

	const noob = await client.users.fetch(`714828907966365747`);

	client.assetMap
		.filter(asset => asset.description?.includes(`<@714828907966365747>`))
		.forEach(asset => {
			asset.description = asset.description.replace(`<@714828907966365747>.username`, `${noob.toString()} (${noob.username}#${noob.discriminator})`);
		});


	client.console.push(`${getUTCTime()} [Client][Logging] | All Complete!`);
	console.log(`${getUTCTime()} [Client]${chalk.greenBright(`[Logging]`)} | All Complete!`);





	client.user.setPresence({
		activities: [
			{ 
				name: '/tutorial | v12.0.0-betaTest',
				type: ActivityType.Playing
			}
		], 
		status: PresenceUpdateStatus.Online
	});
});





client.rest.on("rateLimited", () => {
	console.log(`${getUTCTime()} [Client]${chalk.yellowBright(`[Warning]`)} | Client is getting ratelimited!`);
});



client.on('interactionCreate', async interaction => {
	if (client.user.presence.status !== PresenceUpdateStatus.Online) return;

	const maid = interaction.user.id;
	const maidObj = await db.get(maid) ?? {};

	// const shouldBeNull = await db.get(`${maid}start`) ?? null;
	const { start, update, tutorial } = maidObj;
	
	const commandInteraction = interaction.isChatInputCommand();
	const reportAction = interaction.isButton() && interaction.customId.startsWith('report');

	if (commandInteraction) {
		const slashCommand = client.slashCommands.get(interaction.commandName);
	
		if (!slashCommand) return;

		/* Is now comment since no person in the current SkybotDatabase is proved to be using the legacy key system.
		if (
			shouldBeNull !== null && 
			interaction.commandName !== `misc` && 
			interaction.options.getSubcommandGroup(false) !== `fix` && 
			interaction.options.getSubcommand(false) !== `profile`
		) return interaction.reply(`Hello ${interaction.user}, it seems like you're using the legacy database key system! Please use the \`/fix database\` command in order to update your database keys to the latest version.`);
		*/

		if (!tutorial && !start && (interaction.commandName !== `tutorial` && interaction.commandName !== `dev`)) return interaction.reply(`Hello ${interaction.user}, it seems like you are new! If you want to learn how to play Skybot, you can do so by using \`/tutorial\`!`);

		const handler = new CodeHandler()
			.setClient(client)
			.setDatabase(db)
			.setInteraction(interaction)
			.setMaidObj(maidObj)
			.setSlashCommand(slashCommand)
			.setUser(interaction.user);

		// eslint-disable-next-line no-return-await
		if (typeof tutorial === 'number') return await handler.tutorialHandler();

		await handler.wipeHandler();

		await handler.banHandler();

		await handler.verificationHandler();

		if (!slashCommand?.developerOnly) await Util.countCommandUse(maid, maidObj, slashCommand.data.name.toLowerCase(), db);
	
		if (userCmdInfos.has(maid)) {
			const userCmdInfo = userCmdInfos.get(maid);
	
			if (userCmdInfo.interval) {
				if (userCmdInfo.repeats >= 10) {
					const num1 = getRandomNumber(6, 10);
					const num2 = getRandomNumber(1, 5);
	
					const equation = getRandomNumber(1, 100) >= 50 
						? ' + '
						: ' - ';
	
					const answer = equation === ' + '
						? num1 + num2
						: num1 - num2;
					
					maidObj.verification = {
						question: `${num1}${equation}${num2}`,
						answer: answer,
						ongoing: false
					};
	
					await db.set(maid, maidObj);
	
					userCmdInfos.delete(maid);
				} else {
					const intervalToTest = Date.now() - userCmdInfo.timestamp;
	
					const minTime = Math.floor(userCmdInfo.interval - 1000);
					const maxTime = Math.ceil(userCmdInfo.interval + 1000);
					if (minTime < intervalToTest && intervalToTest < maxTime) {
						userCmdInfo.repeats += 1;
					} else {
						userCmdInfos.delete(maid);
					}
	
					userCmdInfo.timestamp = Date.now();
				}
			} else {
				userCmdInfos.set(maid, {
					id: maid,
					cmd: slashCommand.data.name,
					timestamp: Date.now(),
					repeats: 0,
					interval: Date.now() - userCmdInfo.timestamp
				});
			}
		} else {
			userCmdInfos.set(maid, {
				id: maid,
				cmd: slashCommand.data.name,
				timestamp: Date.now(),
				repeats: 0,
				interval: 0
			});
		}

		if (!interaction.inCachedGuild()) {
			// If there is, we go tell them that we can't execute the command inside direct messages.
			return interaction.reply({ content: `${interaction.user}, I can't execute that command inside DMs!`, ephemeral: true });
		}

		if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])) {
			return interaction.reply({ content: `${interaction.user}, Skybot cannot send messages in this text channel! Please try another text channel.`, ephemeral: true });
		}

		if (slashCommand.tutorial) {
			const tutorialMap = objToMap(maidObj.tutorials ?? {});

			if (!tutorialMap.get(slashCommand.tutorial.key)) {
				tutorialMap.set(slashCommand.tutorial.key, true);
				maidObj.tutorials = mapToObj(tutorialMap);

				slashCommand.tutorial.embeds
					.map(embed => embed.setFooter({ text: `Use the command again for an actual response.` }));
				
				await db.set(maid, maidObj);
				await interaction.reply({ embeds: slashCommand.tutorial.embeds, ephemeral: true });

				return;
			}
		}

		if (slashCommand.cooldown && !Functions.getSettingValue(maidObj, 'developerOverride_cooldown')) {
			const { cooldowns } = client;
	
			if (!cooldowns.has(slashCommand.data.name)) {
				cooldowns.set(slashCommand.data.name, new Collection());
			}
		
			const now = Date.now();
			const timestamps = cooldowns.get(slashCommand.data.name);
			const cooldownAmount = Functions.checkActiveItem(maidObj, 'stopwatch')
				? Math.ceil(((slashCommand.cooldown || 0) * 1000) - (((slashCommand.cooldown || 0) * 1000) * 0.25))
				: (slashCommand.cooldown || 0) * 1000;
			
			if (timestamps.has(interaction.user.id)) {
				const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;
		
				if (now < expirationTime) {
					const titles = [
						"Chill out, man",
						"Heeeyoo lets slow it down",
						"Too spicy, take a breather",
						"Spam isn't cool fam",
						"Is my cooldown done yet?",
						"Bud, you're in cooldown",
						"You're still in cooldown",
						"You're on cooldown man..."
					];
	
					const timeLeft = Math.floor((expirationTime - now) / 1000) === 0 ? 1 : Math.floor((expirationTime - now) / 1000);
	
					const cdMessage = timeLeft >= 60 ? parseTime(timeLeft) : `${timeLeft.toFixed()} second${timeLeft > 1 ? `s` : ``}`;
	
					const cooldownMessage = slashCommand?.cooldownMessage?.replace(`{secondsLeft}`, cdMessage) ?? `You can run this command in **${timeLeft.toFixed()} second${timeLeft > 1 ? `s` : ``}**\n`;
					const cooldownEmbed = new EmbedBuilder()
						.setColor(`Random`)
						.setTitle(`${Functions.randomizeArray(titles, 1)}`)
						.setDescription(cooldownMessage)
						.setFooter({ text: `Inspired by Dank Memer` });
	
					const normalCd = slashCommand.cooldown || 0;
					const stopwatchCd = Math.ceil((slashCommand.cooldown || 0) - ((slashCommand.cooldown || 0) * 0.25));
					
					if (Functions.checkActiveItem(maidObj, 'stopwatch')) {
						cooldownEmbed.data.description += `Since you have a <:Stopwatch:950327115558043679> \`stopwatch\` equipped, you only need to wait \`${parseTime(stopwatchCd)}\``;
					} else {
						cooldownEmbed.data.description += `The default cooldown is \`${parseTime(normalCd)}\`, but a <:Stopwatch:950327115558043679> \`stopwatch\` decreases this to \`${parseTime(stopwatchCd)}\``;
					}
	
					return interaction.reply({ embeds: [cooldownEmbed], ephemeral: true });
				}
			}
		
			timestamps.set(interaction.user.id, now);
			setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
		}



		if (slashCommand.require) {
			if (slashCommand.require.start && !start) {
				return interaction.reply({ content: `❗ Please use \`/start\` to use this command!`, ephemeral: true });
			} else if (slashCommand.require.update) {
				if (slashCommand.require.update) {
					const updateChecker = slashCommand.require.update.slice(3); 
					
					const uidVersionValue = client.updateMap.get(update);
					const cmdVersionValue = client.updateMap.get(updateChecker);

					if (slashCommand.require.update.startsWith(">=")) {
						if (!(uidVersionValue >= cmdVersionValue)) return interaction.reply({ content: `❗ Your Skybot version has not implemented this command!\n\`\`\`json\n\t{\n\t\t"command": "${slashCommand.data.name}",\n\t\t"required": ">=${updateChecker}",\n\t\t"current": "${update}"\n\t}\`\`\``, ephemeral: true });
					} else if (slashCommand.require.update.startsWith("==")) {
						if (!(uidVersionValue === cmdVersionValue)) return interaction.reply({ content: `❗ Your Skybot version has deprecated this command!\n\`\`\`json\n\t{\n\t\t"command": "${slashCommand.data.name}",\n\t\t"required": "==${updateChecker}",\n\t\t"current": "${update}"\n\t}\`\`\``, ephemeral: true });
					} else if (slashCommand.require.update.startsWith("<=")) {
						if (!(uidVersionValue <= cmdVersionValue)) return interaction.reply({ content: `❗ Your Skybot version has deprecated this command!\n\`\`\`json\n\t{\n\t\t"command": "${slashCommand.data.name}",\n\t\t"required": "<=${updateChecker}",\n\t\t"current": "${update}"\n\t}\`\`\``, ephemeral: true });
					}
				}
			}
		}



		try {
			await slashCommand.execute(interaction, db, maid);
		} catch (error) {
			console.error(error);

			const refCode = `${makeid(3)}-${makeid(3)}-${makeid(3)}-${makeid(3)}`;

			client.bugMap.set(maid, {
				command: interaction.commandName,
				error,
				refCode,
				user: interaction.user
			});

			await client.channels.cache.get('889752463404593163').send(`**⚠ A fatal error occured!**\n\nError reference code: **${refCode}**\n\`\`\`\n${error.stack}\`\`\``);

			if (interaction.replied || interaction?.deferred) {	
				await interaction.editReply({ content: `There was an error while executing this command! Error reference code: \`${refCode}\``, ephemeral: true });
			} else {
				await interaction.reply({ content: `There was an error while executing this command! Error reference code: \`${refCode}\``, ephemeral: true });
			}
		}

		if (start) {
			/**
			 * Since we executed a command BEFORE doing this code snippet, there is a 
			 * high chance that the object has been changed, so we requery the object again.
			 * 
			 * @type {RawUserObj}
			 */
			const maidObj = await db.get(maid);
			const userUpdate = client.updateMap.get(update);
		
			maidObj.lastCmdTimestamp = Date.now();
		
			const mineFeatureUnlocks = [];
			let mineXpToSubtract = client.levelReq.get(maidObj.mineLevel) ?? 0,
				mineLevelChanged = false;

			if (maidObj.mineLevel >= 50) {
				maidObj.mineXp = 0;
				maidObj.mineLevel = 50;
			}

			while (maidObj.mineXp >= mineXpToSubtract && maidObj.mineLevel < 50) {
				maidObj.mineXp -= mineXpToSubtract;
				maidObj.mineLevel += 1;	

				mineXpToSubtract = client.levelReq.get(maidObj.mineLevel) ?? 0;
				
				if (mineUnlocks.has(maidObj.level)) mineFeatureUnlocks.push(mineUnlocks.get(maidObj.mineLevel));

				mineLevelChanged = true;
			}

			if (mineLevelChanged) await interaction.channel.send(`${interaction.user} <:Mining:849535876602265630> Mining Level Up 🎉\nYou are now Level ${maidObj.mineLevel}\n\n${mineFeatureUnlocks.length !== 0 ? `You unlocked:\n${mineFeatureUnlocks.join('\n')}` : ``}`);





			// Since these features rely on v1.0.0, we need to make sure the user has an update >= v1.0.0
			if (userUpdate >= 2) {
				// const fishFeatureUnlocks = [];
				let fishXpToSubtract = client.levelReq.get(maidObj.fishLevel) ?? 0,
					fishLevelChanged = false;
				const chopFeatureUnlocks = [];
				let chopXpToSubtract = client.levelReq.get(maidObj.chopLevel) ?? 0,
					chopLevelChanged = false;

				if (maidObj.fishLevel >= 50) {
					maidObj.fishXp = 0;
					maidObj.fishLevel = 50;
				}

				if (maidObj.chopLevel >= 50) {
					maidObj.chopXp = 0;
					maidObj.chopLevel = 50;
				}
				
				while (maidObj.fishXp >= fishXpToSubtract && maidObj.fishLevel < 50) {
					maidObj.fishXp -= fishXpToSubtract;
					maidObj.fishLevel += 1;	

					fishXpToSubtract = client.levelReq.get(maidObj.fishLevel) ?? 0;

					fishLevelChanged = true;
				}

				if (fishLevelChanged) await interaction.channel.send(`${interaction.user} <:Fishing:885390554450501632> Fishing Level Up 🎉\nYou are now Level ${maidObj.fishLevel}`);
							
				while (maidObj.chopXp > chopXpToSubtract && maidObj.chopLevel < 50) {
					maidObj.chopXp -= chopXpToSubtract;
					maidObj.chopLevel += 1;	
					
					chopXpToSubtract = client.levelReq.get(maidObj.chopLevel) ?? 0;

					if (chopUnlocks.has(maidObj.level)) chopFeatureUnlocks.push(chopUnlocks.get(maidObj.chopLevel));

					chopLevelChanged = true;
				}

				if (chopLevelChanged) await interaction.channel.send(`${interaction.user} <:Foraging:849535876357947412> Foraging Level Up 🎉\nYou are now Level ${maidObj.chopLevel}\n\n${chopFeatureUnlocks.length > 0 ? `You unlocked:\n${chopFeatureUnlocks.join('\n')}` : ``}`);
			}
	




			// Since this feature relies on v2.0.0, we need to make sure the user has an update >= v2.0.0
			if (userUpdate >= 3) {
				const { coins, bank } = maidObj;
				const money = coins;
				const moneyNetWorth = (money + bank) || 0;



				const itemMap = client.assetMap.filter(asset => `sellall` in asset && asset.sellall.included);
				const totalNetWorth = itemMap
					.reduce((acc, asset) => {
						const amount = maidObj[asset.keyName] ?? 0;
						const value = (amount * asset.NPC.sell.price);

						return value + acc;
					}, moneyNetWorth);


				// console.log(`Old Net Worth: ${netWorth}\nNew Net Worth: ${totalNetWorth}`);
				maidObj.netWorth = totalNetWorth;



				const profile = { 
					id: interaction.user.id, 
					money: coins, 
					netWorth: maidObj.netWorth, 
					username: interaction.user.username
				};

				client.leaderboard.set(maid, profile);
			}





			if (userUpdate >= 11) {
				let combatXpToSubtract = client.levelReq.get(maidObj.combatLevel) ?? 0,
					combatLevelChanged = false;

				if (maidObj.combatXp > 0) maidObj.combatXp = 0;

				if (maidObj.combatLevel >= 50) {
					maidObj.combatXp = 0;
					maidObj.combatLevel = 50;
				}
	
				while (maidObj.combatXp >= combatXpToSubtract && maidObj.combatLevel < 50) {
					maidObj.combatXp -= combatXpToSubtract;
					maidObj.combatLevel += 1;	
	
					combatXpToSubtract = client.levelReq.get(maidObj.combatLevel) ?? 0;
	
					combatLevelChanged = true;
				}
	
				if (combatLevelChanged) await interaction.channel.send(`${interaction.user} <:Combat:946253940863942687> Combat Level Up 🎉\nYou are now Level ${maidObj.combatLevel}`);



				// This changes floating numbers like .125 to just .1, so that we wouldn't see 100.123456789 in the Leader Board
				const newCoins = Math.floor(maidObj.coins * 10) / 10;

				maidObj.coins = newCoins;
			}

			if (userUpdate >= 12) {
				const { activeItems } = maidObj;
				const newActiveItems = [];
				const newExpiredItems = [];

				for (const activeItem of activeItems) {
					if (activeItem.endTimestamp > Date.now()) {
						newActiveItems.push(activeItem);
					} else {
						newExpiredItems.push(activeItem);
					}
				}

				maidObj.activeItems = newActiveItems;

				if (newExpiredItems.length > 0) {
					const expiredItemsString = newExpiredItems
						.map(item => `> ${item.emoji} ${item.name}`)
						.join('\n');

					const expiredItemsEmbed = new EmbedBuilder()
						.setTitle('Item Expiration')
						.setDescription(`The following active items of yours has expired!\n\nExpired Items:\n${expiredItemsString}`);

					const dmChannel = await interaction.user.createDM();

					dmChannel.send({ embeds: [expiredItemsEmbed] })
						.catch(async () => {
							await interaction.channel.send({ content: `It seems like I can't DM you. Do you have DM's disabled?`, embeds: [expiredItemsEmbed] });
						});
				}
			}

			if (userUpdate >= 13) {
				// This fills achievements that were added sooner, but still don't exist in the maidObj.
				const achievementData = client.achievements.map(data => ({ id: data.id, done: false }));
				const existingAchievementIDs = maidObj.achievements.map(achievement => achievement.id);
				
				for (const achievement of achievementData) {
					if (!existingAchievementIDs.includes(achievement.id)) maidObj.achievements.push(achievement);
				} 

				const completeAchievements = maidObj.achievements
					.filter(achievement => achievement.done)
					.map(achievement => achievement.id);

				const achievementEmbeds = client.achievements
					.filter(achievement => !completeAchievements.includes(achievement.id))
					.filter(achievement => achievement.validator(maidObj))
					.map(achievement => {
						const rewardString = achievement.rewards
							.map((value, index, array) => `${(array.length - 1) === index ? `<:Reply:949105560224157706>` : `<:Reply_Continuous:950690065787539488>`} \`Reward:\` ${commafy(value.amount)}x ${value.emoji} ${value.name}`)
							.join('\n');

						const achievementToEdit = maidObj.achievements.find(item => item.id === achievement.id);

						achievementToEdit.done = true;

						return new EmbedBuilder()
							.setColor(`DarkGold`)
							.setTitle(`✨ NEW ACHIEVEMENT UNLOCKED ✨`)
							.setDescription(`**${achievement.name}**\n${rewardString}`);
					});

				if (achievementEmbeds.length > 0) await interaction.channel.send({ embeds: achievementEmbeds });
			}

			// Setting the changes to the maid object after doing everything above
			await db.set(maid, maidObj);
		}
	} else if (reportAction) {
		const userId = interaction.customId.slice(6, 24);
		const user = client.users.cache.get(userId);
		const userObj = await db.get(userId); 

		if (!('bugReport' in userObj)) {
			userObj.bugReport = {
				resolved: 0,
				rejected: 0,
				ignored: 0
			};
		}

		const reportActionRow1 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`report${userId}_resolve`)
					.setEmoji('<:check:885408207097462786>')
					.setLabel('Resolve')
					.setStyle(ButtonStyle.Success)
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId(`report${userId}_ignore`)
					.setLabel('Ignore')
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true),
				new ButtonBuilder()
					.setCustomId(`report${userId}_reject`)
					.setEmoji('<:cross:885408206959046678>')
					.setLabel('Reject')
					.setStyle(ButtonStyle.Danger)
					.setDisabled(true)
			);

		const reportActionRow2 = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId(`report${userId}_banUser`)
					.setEmoji('<:Ban_Hammer:950630478841540629>')
					.setLabel('Ban User')
					.setStyle(ButtonStyle.Danger)
					.setDisabled(true)
			);

		if (interaction.customId.endsWith('resolve')) {
			await user.send({ content: `Your bug-report has been resolved by the developer!` });

			await interaction.reply({ content: `Successfully changed bug-report status to \`RESOLVED\`!` });
			await interaction.message.edit({ components: [reportActionRow1, reportActionRow2] });

			userObj.bugReport.resolved += 1;
		} else if (interaction.customId.endsWith('ignore')) {
			await interaction.reply({ content: `Please describe why ${user.username}'s bug-report is ignored.` });
			
			const reason = await interaction.channel.awaitMessages({ filter: msg => msg.author.id === interaction.user.id, max: 1 });
			await user.send({ content: `Your bug-report has been ignored by the developer.\n\nReason:\n${reason.first().content}` });

			await interaction.followUp({ content: `Successfully changed bug-report status to \`IGNORED\`!` });
			await interaction.message.edit({ components: [reportActionRow1, reportActionRow2] });

			userObj.bugReport.ignored += 1;
		} else if (interaction.customId.endsWith('reject')) {
			await interaction.reply({ content: `Please describe why ${user.username}'s bug-report is rejected.` });

			const reason = await interaction.channel.awaitMessages({ filter: msg => msg.author.id === interaction.user.id, max: 1 });
			await user.send({ content: `Your bug-report has been rejected by the developer.\n\nReason:\n${reason.first().content}` });

			await interaction.followUp({ content: `Successfully changed bug-report status to \`REJECTED\`!` });
			await interaction.message.edit({ components: [reportActionRow1, reportActionRow2] });

			userObj.bugReport.rejected += 1;
		} else {
			await interaction.reply({ content: `Please describe why ${user.username} is banned from using bug-report.` });

			const reason = await interaction.channel.awaitMessages({ filter: msg => msg.author.id === interaction.user.id, max: 1 });
			await user.send({ content: `You have been banned from using \`/bug-report\`.\n\nReason:\n${reason.first().content}` });

			await interaction.followUp({ content: `Successfully changed bug-report status to \`REJECTED\`!` });
			await interaction.message.edit({ components: [reportActionRow1, reportActionRow2] });

			userObj.bugRepBanned = true;
			userObj.bugReport.rejected += 1;
		}

		await db.set(userId, userObj);
	}
});



client.console.push(`${getUTCTime()} [Client][Logging] | Preparing to connect to gateway...`);
console.log(`${getUTCTime()} [Client]${chalk.greenBright(`[Logging]`)} | Preparing to connect to gateway...`);

try {
	client.login(betaToken);
} catch (error) {
	console.log(error);
}

client.console.push(`${getUTCTime()} [Client][Logging] | Successfully connected to gateway!`);
console.log(`${getUTCTime()} [Client]${chalk.greenBright(`[Logging]`)} | Successfully connected to gateway!`);



mineUnlocks.set(4, `<:Mine:816908527670001686> Iron Mine
<:Iron_Ore:816983943584022539> Iron Ore
<:Iron:885454182474215434> Iron
<:Iron_Pickaxe:817216520828092436> Iron Pickaxe
<:Iron_Axe:817216753062510633> Iron Axe
<:Steel_Rod:816598224349298689> Steel Rod
<:Inventory_Iron_Minion:887166924117655553> Iron Minion`);

mineUnlocks.set(6, `<:Mine:816908527670001686> Gold Mine
<:Gold_Ore:816983943794524221> Gold Ore
<:Gold:849181721203179551> Gold
<:Gold_Pickaxe:817216581859409971> Gold Pickaxe
<:Gold_Axe:817216806845677568> Gold Axe
<:Platinum_Steel_Rod:816598224042721332> Platinum Steel Rod
<:Inventory_Gold_Minion:887166924138635294> Gold Minion`);

mineUnlocks.set(8, `<:Mine:816908527670001686> Lapis Reserve
<:Lapis:816988928372375603> Lapis
<:Inventory_Lapis_Minion:887166926449676328> Lapis Minion`);

mineUnlocks.set(15, `<:Mine:816908527670001686> Diamond Sanctuary
<:Diamond:902764556697341952> Diamond
<:Enchanted_Diamond:902764556865142835> Enchanted Diamond
<:Diamond_Pickaxe:817216616084930602> Diamond Pickaxe
<:Diamond_Axe:817216864626802771> Diamond Axe
<:Diamond_Battleaxe:817222368916144188> Diamond Battleaxe
<:Diamond_Cross:817225151854149632> Diamond Cross
<:Gilded_Diamond_Cross:817246283302436884> Gilded Diamond Cross
<:Inventory_Diamond_Minion:887166924147007528> Diamond Minion`);



chopUnlocks.set(8, `:Island: Roofed Forest
<:Dark_Oak_Log:885390554362433587> Dark Oak Wood
<:Inventory_Dark_Oak_Minion:887166923689828372> Dark Oak Minion`);

chopUnlocks.set(12, `:Island: Snowy Taiga
<:Spruce_Log:885390554404380693> Spruce Wood
<:Inventory_Spruce_Minion:887166927049486416> Spruce Minion`);

chopUnlocks.set(16, `:Island: Savanna Woodlands
<:Acacia_Log:885390554471485480> Acacia Wood
<:Inventory_Acacia_Minion:887166923245252669> Acacia Minion`);

chopUnlocks.set(20, `:Island: Bamboo Jungle
<:Jungle_Log:885390554240802817> Jungle Wood
<:Inventory_Jungle_Minion:887166924205735976> Jungle Minion`);

/* TYPE DEFINITONS */

/**
 * @typedef {Object} ImageOptions
 * @property {'placed' | 'inventory'} [minionEmojiType='inventory']
 */

/**
 * @typedef RawUserObj
 * @property {string} [axe]
 * @property {string} [pickaxe]
 * @property {string} [rod]
 * @property {number} [cobblestone]
 * @property {number} [coal]
 * @property {number} [ironOre]
 * @property {number} [iron]
 * @property {number} [goldOre]
 * @property {number} [gold]
 * @property {number} [lapis]
 * @property {number} [diamond]
 * @property {number} [pureDiamond]
 * @property {boolean} [startMine]
 * @property {boolean} [ironMine]
 * @property {boolean} [goldMine]
 * @property {boolean} [lapisQua]
 * @property {boolean} [diaSanct]
 * @property {boolean} [redsMine]
 * @property {number} [mineLevel]
 * @property {number} [mineXp]
 * @property {number} [fishLevel]
 * @property {number} [fishXp]
 * @property {number} [chopLevel]
 * @property {number} [chopXp]
 * @property {number} [oakWood]
 * @property {number} [birchWood]
 * @property {number} [darkOakWood]
 * @property {number} [spruceWood]
 * @property {number} [acaciaWood]
 * @property {number} [jungleWood]
 * @property {number} [planks]
 * @property {number} [stick]
 * @property {boolean} [forest]
 * @property {boolean} [roofedForest]
 * @property {boolean} [taiga]
 * @property {boolean} [savannah]
 * @property {boolean} [jungle]
 * @property {number} [commonFish]
 * @property {number} [uncommonFish]
 * @property {number} [rareFish]
 * @property {number} [ultraRareFish]
 * @property {number} [legendaryFish]
 * @property {number} [coins]
 * @property {number} [bank]
 * @property {number} [netWorth]
 * @property {number} [invOakWoodMinion]
 * @property {number} [invBirchWoodMinion]
 * @property {number} [invDarkOakWoodMinion]
 * @property {number} [invSpruceWoodMinion]
 * @property {number} [invAcaciaWoodMinion]
 * @property {number} [invJungleWoodMinion]
 * @property {number} [invCobblestoneMinion]
 * @property {number} [invCoalMinion]
 * @property {number} [invIronMinion]
 * @property {number} [invGoldMinion]
 * @property {number} [invDiamondMinion]
 * @property {number} [invLapisMinion]
 * @property {(string | number)[][]} [placedMinions]
 * @property {number} [bankTier]
 * @property {number} [enchantedGold]
 * @property {number} [enchantedGoldBlock]
 * @property {number} [blockOfCoal]
 * @property {number} [enchantedBread]
 * @property {number} [enchantedCharcoal]
 * @property {number} [enchantedCoal]
 * @property {number} [enchantedLavaBucket]
 * @property {number} [enchantedCobblestone]
 * @property {number} [enchantedIron]
 * @property {number} [enchantedLapis]
 * @property {number} [enchantedDiamond]
 * @property {number} [enchantedOakWood]
 * @property {number} [enchantedBirchWood]
 * @property {number} [enchantedDarkOakWood]
 * @property {number} [enchantedSpruceWood]
 * @property {number} [enchantedAcaciaWood]
 * @property {number} [enchantedJungleWood]
 * @property {number} [redstone]
 * @property {number} [enchantedRedstone]
 * @property {number} [compactor]
 * @property {number} [superCompactor]
 * @property {number} [invRedstoneMinion]
 * @property {TutorialObj} [tutorials]
 * @property {GambleStatsObj} [gambleStats]
 * @property {SwordObj} [sword]
 * @property {number} [woodenSword]
 * @property {number} [stoneSword]
 * @property {number} [ironSword]
 * @property {number} [goldSword]
 * @property {number} [diamondSword]
 * @property {number} [aspectOfTheSpiritButterfly]
 * @property {number} [spiritButterfly]
 * @property {number} [woodenPickaxe]
 * @property {number} [stonePickaxe]
 * @property {number} [ironPickaxe]
 * @property {number} [goldPickaxe]
 * @property {number} [diamondPickaxe]
 * @property {number} [woodenAxe]
 * @property {number} [stoneAxe]
 * @property {number} [ironAxe]
 * @property {number} [goldAxe]
 * @property {number} [diamondAxe]
 * @property {number} [combatLevel]
 * @property {number} [combatXp]
 * @property {boolean} [start]
 * @property {string} [update]
 * @property {ActiveItemObj[]} [activeItems]
 * @property {number} [fourLeafClover]
 * @property {number} [stopwatch]
 * @property {{}} [commandUses]
 * @property {import('discord.js').InventoryAchievementObj[]} [achievements]
 */

/**
 * @typedef TutorialObj
 * @property {boolean} [minion]
 * @property {boolean} [dices]
 * @property {boolean} [highlow]
 * @property {boolean} [scratchoff]
 */

/**
 * @typedef GambleStatsObj
 * @property {GambleInfoObj} dices
 * @property {GambleInfoObj} scratchoff
 */

/**
 * @typedef GambleInfoObj
 * @property {number} [moneyWon]
 * @property {number} [moneyLost]
 * @property {number} [totalWins]
 * @property {number} [totalLoses]
 */

/**
 * @typedef SwordObj
 * @property {string} name
 * @property {string} keyName
 * @property {string} emoji
 * @property {number} baseDamage
 * @property {number} [strength=0]
 * @property {number} [critChance=0]
 * @property {string[]} enchantments
 * @property {number} [spiritButterfly=null]
 */

/**
 * @typedef ActiveItemObj
 * @property {number} endTimestamp
 * @property {string} name
 * @property {string} keyName
 * @property {string} emoji
 */

/**
 * @typedef AchievementData
 * @property {string} name
 * @property {number} status
 * @property {BaseItemData[]} rewards
 * @property {boolean} completed 
 */

/**
 * @typedef BaseItemData 
 * @property {string} name
 * @property {string} keyName
 * @property {string} emoji
 * @property {number} amount
 */