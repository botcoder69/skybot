/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { Confirmation, Functions: { commafy, toRomanNumeral }, FuzzySearchUtil, Minions, Paginator } = require('../../SkyblockHelper/src/index');

const tutorialEmbed = new EmbedBuilder()
	.setColor(`#2f3136`)
	.setTitle('Minions')
	.setDescription('This is a Skybot feature that lets you have idle workers that work for FREE. This feature lets you gain tons of materials, all while being idle.\n\nHere are the basic mechanics you need to know about minions:')
	.addFields(
		{ name: 'Minions', value: 'These little minions are capable of producing tons of resources while you go do something else. Minions have a **capacity**, which means you can\'t leave a minion for a whole week, thinking you can gain millions of items when you collect them. You can use `/minion collect all` command to collect all the items your minions have produced.' },
		{ name: 'Minion Basics', value: 'There are tons of basic commands you can do with minions. To get the list of all your placed minions, you can use the `/minion inventory` command. To add a minion to your placed minion collection, simply use the `/minion add <minion>` command. ' },
		{ name: 'Minion Number', value: 'This feature heavily relies on Minion Numbers to tell what minion should the bot edit for you. Lets say, you got 2 <:Placed_Lapis_Minion:887166927636684901> `lapis minions`, and you want to fuel one of them. It would be impossible for the bot to tell what lapis minion you want to fuel if you just say `/minion fuel add lapis minion enchanted lava bucket`. To get a minions "Minion Number", you can use the `/minion inventory` command to get a detailed list of all your minions, including their minion numbers.' },
		{ name: 'Minion Fuel', value: 'In Skybot, we also have Minion Fuel. If you play Hypixel, this will definitely sound familiar. You can use Minion Fuel to speed up the production rate of your minion. Some minion fuels decrease the time between actions, while some minion fuels multiply the output items. You can use the `/minion fuel add <minion number> <minion fuel>` command to add fuel to a minion.' },
		{ name: 'Minion Tier', value: 'In Skybot, we also have Minion Tier. A Minion\'s tier can be anything from I to X, and each tier gives you bonuses for your minion. These bonuses can be either a "Capacity Upgrade", which increases your minions holding capacity, or a "Speed Upgrade", which decreases the minion\'s time between actions. Each upgrade requires an item related to the minion. To upgrade your minion, you can use the `/minion tierUpgrade <minionNumber>` command.' },
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('minion')
		.setDescription('Interact with your minions!')
		.addSubcommand(subcommand => subcommand
			.setName('inventory')
			.setDescription(`Gets your minion inventory.`)
		)
		.addSubcommand(subcommand => subcommand
			.setName('collect')
			.setDescription(`Collects the items your minions have been producing.`)
			.addStringOption(option => option
				.setRequired(true)
				.setName('collect')
				.setDescription('The minion you want to collect resources from. This could be a "all" or "max"')
				.addChoices(
					{ name: 'all', value: 'all' },
					{ name: 'max', value: 'max' }
				)
			)
		)	
		.addSubcommand(subcommand => subcommand
			.setName('place')
			.setDescription(`Place a minion into your minion inventory.`)
			.addStringOption(option => option
				.setRequired(true)
				.setName('minion')
				.setDescription('The minion you want to place.')
				.addChoices(
					{ name: 'Cobblestone Minion', value: 'invCobblestoneMinion' },
					{ name: 'Coal Minion', value: 'invCoalMinion' },
					{ name: 'Iron Minion', value: 'invIronMinion' },
					{ name: 'Gold Minion', value: 'invGoldMinion' },
					{ name: 'Lapis Minion', value: 'invLapisMinion' },
					{ name: 'Redstone Minion', value: 'invRedstoneMinion' },
					{ name: 'Diamond Minion', value: 'invDiamondMinion' },
					{ name: 'Oak Minion', value: 'invOakWoodMinion' },
					{ name: 'Birch Minion', value: 'invBirchWoodMinion' },
					{ name: 'Dark Oak Minion', value: 'invDarkOakWoodMinion' },
					{ name: 'Spruce Minion', value: 'invSpruceWoodMinion' },
					{ name: 'Acacia Minion', value: 'invAcaciaWoodMinion' },
					{ name: 'Jungle Minion', value: 'invJungleWoodMinion' }
				)
			)
		)
		.addSubcommand(subcommand => subcommand
			.setName('take')
			.setDescription(`Take a minion out from your minion inventory.`)
			.addIntegerOption(option => option
				.setRequired(true)
				.setName('minion')
				.setDescription('The minion number of the minion you want to take.')
			)
		)
		.addSubcommand(subcommand => subcommand
			.setName('fix')
			.setDescription(`Fixes your minion inventory.`)
		)
		.addSubcommand(subcommand => subcommand
			.setName('fuel-add')
			.setDescription(`Add a minion fuel to one of your minions.`)
			.addIntegerOption(option => option
				.setName(`minion`)
				.setDescription(`The minion number of the minion you are trying to add fuel to.`)
				.setRequired(true)
			)
			.addStringOption(option => option
				.setName(`fuel`)
				.setDescription(`The fuel you want to add to this minion.`)
				.setRequired(true)
				.addChoices(
					{ name: 'Coal', value: 'coal' },
					{ name: 'Block Of Coal', value: 'blockOfCoal' },
					{ name: 'Enchanted Bread', value: 'enchantedBread' },
					{ name: 'Enchanted Charcoal', value: 'enchantedCharcoal' },
					{ name: 'Enchanted Coal', value: 'enchantedCoal' },
					{ name: 'Enchanted Lava Bucket', value: 'enchantedLavaBucket' },
					{ name: 'Magma Bucket', value: 'magmaBucket' },
					{ name: 'Plasma Bucket', value: 'plasmaBucket' }
				)
			)
		)
		.addSubcommand(subcommand => subcommand
			.setName('fuel-remove')
			.setDescription(`Remove a minion fuel from one of your minions.`)
			.addIntegerOption(option => option
				.setName(`minion`)
				.setDescription(`The minion number of the minion you are trying to add fuel to.`)
				.setRequired(true)
			)
		)
		.addSubcommand(subcommand => subcommand
			.setName('upgrade-tier')
			.setDescription(`Upgrade a minion's tier to the next level.`)
			.addIntegerOption(option => option
				.setName(`minion`)
				.setDescription(`The minion number of the minion you are trying to add fuel to.`)
				.setRequired(true)
			)
		),
	group: `Player`,
	tutorial: {
		embeds: [tutorialEmbed],
		key: `minion`
	},
	require: {
		start: true,
		update: ">=v3.0.0"
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction, db, maid) {
		const maidObj = await db.get(maid);
		const { placedMinions } = maidObj;
		const { assetMap } = interaction.client;

		const minionCommand = interaction.options.getSubcommand();
		
		if (!placedMinions) {
			maidObj.placedMinions = [
				[
					"invCobblestoneMinion",
					"i",
					null,
					null,
					null,
					Date.now(),
					null,
					Date.now(),
				]
			];

			await db.set(maid, maidObj);
		}

		if (minionCommand !== `place` && placedMinions.length <= 0) return interaction.reply({ content: `❗ ${interaction.user}, you need to have a minion to use this command. Please use the \`/minion place <minion>\` command to place a minion.`, ephemeral: true });

		if (placedMinions[0].length !== 8 && minionCommand !== "fix") return interaction.reply({ content: `❗ ${interaction.user}, your minions are **outdated**! Please use the \`/minion fix\` command to fix them and prevent data loss.`, ephemeral: true });

		if (minionCommand === `inventory`) {
			const inventoryEmbeds = await Minions.inventory(db, interaction.user, assetMap, Date.now());

			await Paginator(interaction, inventoryEmbeds);

			if (maidObj.tutorial === 8) {
				const sendThis = maidObj.invOakWoodMinion > 0 
					? `🤨 Hmm, you didn't place that minion I gave you, guess you don't mind if I just take that back...\n\nAnyway, this is your minion inventory. You can look at your minions here!`
					: `🙂 This is your minion inventory. You can look at your minions here!`;

				// If the user placed a minion, this would do nothing. If the user never placed the minion, this would remove it.
				maidObj.invOakWoodMinion = 0;	
			
				await interaction.channel.send(sendThis);
				await require('util').promisify(setTimeout)(2000);
				await interaction.channel.send(`😥 Wow, you reached the end of this tutorial so quickly! Well, its time to say goodbye... You now know the basic fundamentals of Skybot! If you ever get stuck, you can check if the command you are trying to use has a tutorial! Goodbye ${interaction.user}!\n\nSkybot is now fully unlocked!`);

				// eslint-disable-next-line require-atomic-updates
				maidObj.tutorial = true;

				await db.set(maid, maidObj);
			}
		} else if (minionCommand === `collect`) {
			const option = interaction.options.getString('collect', true);

			if (option === 'all' || option === 'max') {
				const outputResources = await Minions.allResources(db, maid, assetMap, Date.now());
				const resourceArray = outputResources
					.filter(output => output.amount > 0)
					.map(minionOutput => {
						const { name, keyName, amount } = minionOutput;
						
						maidObj[keyName] += amount;

						const itemFile = assetMap.find(item => item.keyName === keyName);
						if (itemFile !== undefined) {
							return `| **${commafy(amount)}x** ${itemFile.emoji.name} \`${name}\``;
						} else {
							return `| **${commafy(amount)}x** \${resource.emoji.name} \`${name}\``;
						}
					});

				if (resourceArray.length === 0) {
					resourceArray.push(`Your minions haven't made any resources yet!`);
				}

				const collectedStuffEmbed = new EmbedBuilder()
					.setColor(`#2f3136`)
					.setAuthor({ name: `${interaction.user.username} - Minions`, iconURL: interaction.user.displayAvatarURL() })
					.setDescription(`Your minions have produced:\n${resourceArray.join('\n')}`)
					.setFooter({ text: `Page 1/1` });

				await interaction.reply({ embeds: [collectedStuffEmbed] });

				if (maidObj.tutorial === 6) {
					// eslint-disable-next-line no-console
					console.log(`[TutorialHandler]${require('chalk').greenBright(`[Logging]`)} | Completed tutorial step: minion collect`);
		
					const maidObj = await db.get(maid);
					maidObj.tutorial = 7;
					maidObj.invOakWoodMinion = 1;
				
					await db.set(maid, maidObj);
				}
			} else {
				const minionNumber = parseInt(option);

				if (placedMinions.length < minionNumber || minionNumber <= 0) return interaction.reply({ content: `❗ The minion you wanted to collect resources from **does not exist**!`, ephemeral: true });

				const outputResource = await Minions.minion(minionNumber, db, maid, assetMap, Date.now());
				const resourceArray = outputResource
					?.map?.(minionOutput => {
						const [resource, keyName, amount, minionKeyName] = minionOutput;
					
						maidObj[keyName] += amount;

						const itemFile = assetMap.find(item => item.keyName === keyName);
						if (itemFile !== undefined) {
							return `| **${commafy(amount)}x** ${itemFile.emoji.name} \`${resource}\``;
						} else {
							return `| **${commafy(amount)}x** \${resource.emoji.name} \`${resource}\``;
						}
					}) ?? [`Your minion hasn't made any resources yet!`];

				await db.set(maid, maidObj);

				const collectedStuffEmbed = new EmbedBuilder()
					.setColor(`#2f3136`)
					.setAuthor({ name: `${interaction.user.username} - Minion`, iconURL: interaction.user.displayAvatarURL() })
					.setDescription(`Your minion has produced:\n${resourceArray.join('\n')}`)
					.setFooter({ text: `Page 1/1` });

				await interaction.reply({ embeds: [collectedStuffEmbed] });
			}
		} else if (minionCommand === 'place') {
			const minionKeyName = interaction.options.getString('minion', true);
			const minionMap = assetMap.filter(asset => asset.group === "Minion");

			const minionFile = minionMap.find(asset => asset.keyName === minionKeyName) ?? FuzzySearchUtil.searchAndReturn(minionMap, minionKeyName);

			if (!minionFile) return interaction.reply({ content: `❗ The **minion** you are trying to place **does not exist**!`, ephemeral: true });

			if (placedMinions.length >= 15) return interaction.reply({ content: `❗ Due to Database limitations, you can only have up to 15 minions. This will be expanded as soon as I find a way to compress minions.`, ephemeral: true });

			const minionAmount = maidObj[minionFile.keyName];

			if (minionAmount === 0) return interaction.reply({ content: `❗ You dont have the ${minionFile.emoji.name.placed} \`${minionFile.name}\` you are trying to place!`, ephemeral: true });

			const confirmation = new Confirmation(interaction, { content: `${minionFile.emoji.name.placed} ${interaction.user}, are you sure you want to place a ${minionFile.emoji.name.inventory} \`${minionFile.name.toLowerCase()}\`?` });

			confirmation.on('check', async (button, sent) => {
				sent.reactions.removeAll();
				
				maidObj.placedMinions.push([minionFile.keyName, "i", null, null, null, null, null, Date.now()]);
				maidObj[minionFile.keyName] -= 1;

				await db.set(maid, maidObj);

				sent.edit(`<:check:885408207097462786> You placed a ${minionFile.emoji.name.inventory} \`${minionFile.name.toLowerCase()}\`!`);

				if (maidObj.tutorial === 7) {
					// eslint-disable-next-line no-console
					console.log(`[TutorialHandler]${require('chalk').greenBright(`[Logging]`)} | Completed tutorial step: minion place (confirmed)`);

					const maidObj = await db.get(maid);
					maidObj.tutorial = 8;
				
					await db.set(maid, maidObj);
				}
			});
			
			confirmation.on('cross', async (button, sent) => {
				sent.reactions.removeAll();
				sent.edit(`<:cross:885408206959046678> Minion Place cancelled!`);

				if (maidObj.tutorial === 7) {
					// eslint-disable-next-line no-console
					console.log(`[TutorialHandler]${require('chalk').greenBright(`[Logging]`)} | Completed tutorial step: minion place (cancelled)`);

					const maidObj = await db.get(maid);
					maidObj.tutorial = 8;
				
					await db.set(maid, maidObj);
				}
			});
			
			confirmation.on('error', async (error, sent) => {
				console.error(error);
				
				sent.reactions.removeAll();
				sent.edit(`<:cross:885408206959046678> Minion Place cancelled!`);

				if (maidObj.tutorial === 7) {
					// eslint-disable-next-line no-console
					console.log(`[TutorialHandler]${require('chalk').greenBright(`[Logging]`)} | Completed tutorial step: minion place (err)`);

					const maidObj = await db.get(maid);
					maidObj.tutorial = 8;
				
					await db.set(maid, maidObj);
				}
			});
		} else if (minionCommand === 'take') {
			const minionNumber = interaction.options.getInteger('minion', true);
			const minionData = placedMinions[minionNumber - 1];

			const minionFile = assetMap.find(asset => asset.keyName === minionData[0]);

			if (placedMinions.length < minionNumber || minionNumber <= 0) return interaction.reply({ content: `❗ The minion you wanted to take out **does not exist**!`, ephemeral: true });

			const confirmation = new Confirmation(interaction, { content: `${minionFile.displayEmojiName('inventory')} ${interaction.user}, are you sure you want to take your ${minionFile.displayEmojiName('placed')} \`${minionFile.name.toLowerCase()}\`?` });

			confirmation.on('check', async (_button, sent) => {
				const newPlacedMinions = placedMinions.filter((_placedMinion, index) => index !== minionNumber - 1);

				const tier = toNumber(minionData[1]);
				const gainedItems = {};
				const gainedItemsString = [];

				for (let i = 1; i < tier; i++) {
					const tier = toRomanNumeral(i);

					const tierInfo = minionFile.tiers[tier.toLowerCase()];
					if (tierInfo.itemKeyName in gainedItems) {
						gainedItems[tierInfo.itemKeyName] += (tierInfo.upgradeAmount || 0);
					} else {
						gainedItems[tierInfo.itemKeyName] = (tierInfo.upgradeAmount || 0);
					}
				}

				// eslint-disable-next-line guard-for-in
				for (const item in gainedItems) {
					maidObj[item] += gainedItems[item];
					
					const itemFile = assetMap.find(asset => asset.keyName === item);

					gainedItemsString.push(`**${commafy(gainedItems[item])}x** ${itemFile.displayEmojiName()} \`${itemFile.name}\``);
				}

				const content = gainedItems 
					? `<:check:885408207097462786> You removed your ${minionFile.displayEmojiName('inventory')} \`${minionFile.name} ${minionData[2]?.toUpperCase()}\`!\n\nYou retrieved:\n${gainedItemsString.join('\n')}`
					: `<:check:885408207097462786> You removed your ${minionFile.displayEmojiName('inventory')} \`${minionFile.name} ${minionData[2]?.toUpperCase()}\`!`;

				await interaction.editReply({ content });

				maidObj[minionFile.keyName] += 1;
				maidObj.placedMinions = newPlacedMinions;

				await db.set(maid, maidObj);
			});
			
			confirmation.on('cross', (button, sent) => {
				sent.reactions.removeAll();
				sent.edit(`<:cross:885408206959046678> Minion Take cancelled!`);
			});
			
			confirmation.on('error', (error, sent) => {
				console.error(error);
				
				sent.reactions.removeAll();
				sent.edit(`<:cross:885408206959046678> Minion Take cancelled!`);
			});
		} else if (minionCommand === 'fix') {
			const { placedMinions } = maidObj;

			if (placedMinions[0].length === 8) return interaction.reply({ content: `Your minion array is up to date!`, ephemeral: true });

			const newPlacedMinions = placedMinions
				.map(placedMinion => {
					if (placedMinion.length === 14) {
						const [name, keyName, tier, placedEmoji, upgrade1, upgrade1Emoji, upgrade2, upgrade2Emoji, fuel, fuelEmoji, automatedShipping, automatedShippingEmoji, timeLastCollected, searchTerm] = placedMinion;
	
						return [keyName, tier, upgrade1, upgrade2, fuel, null, automatedShipping, timeLastCollected];
					} else if (placedMinion.length === 15) {
						const [name, keyName, tier, placedEmoji, upgrade1, upgrade1Emoji, upgrade2, upgrade2Emoji, fuel, fuelEmoji, fuelLastPlaced, automatedShipping, automatedShippingEmoji, timeLastCollected, searchTerm] = placedMinion;
					
						return [keyName, tier, upgrade1, upgrade2, fuel, fuelLastPlaced, automatedShipping, timeLastCollected];
					} else {
						return placedMinion;
					}
				});

			maidObj.placedMinions = newPlacedMinions;

			await interaction.reply({ content: `<:check:885408207097462786> Your minion array has been successfully fixed!`, ephemeral: true });
			
			await db.set(maid, maidObj);
		} else if (minionCommand === 'fuel-add') {
			const minionNumber = interaction.options.getInteger('minion', true);
			const minionFuel = interaction.options.getString('fuel', true);

			if (maidObj.placedMinions.length < minionNumber || minionNumber <= 0) return interaction.reply({ content: `❗ The minion you wanted to fuel **does not exist**!`, ephemeral: true });

			const minionToFuel = maidObj.placedMinions[minionNumber - 1];
			const minionFuelFile = interaction.client.assetMap.find(asset => asset.keyName === minionFuel);

			const [name, keyName, tier, placedEmoji, upgrade1, upgrade1Emoji, upgrade2, upgrade2Emoji, fuel, fuelEmoji, fuelLastPlaced, automatedShipping, automatedShippingEmoji, timeLastCollected, searchTerm] = minionToFuel;

			if (fuel !== null) return interaction.reply({ content: `❗ The minion you are trying to fuel **already has existing fuel**!`, ephemeral: true });

			const confirmation = new Confirmation(interaction, `<:Coal:816982880802439178> Are you sure you want to fuel your ${placedEmoji} \`${name} ${tier}\` with **1x** ${minionFuelFile.emoji.name} \`${minionFuelFile.name.toLowerCase()}\``);

			confirmation.on('check', async (button, sent) => {
				maidObj.placedMinions[minionNumber - 1] = [name, keyName, tier, placedEmoji, upgrade1, upgrade1Emoji, upgrade2, upgrade2Emoji, minionFuelFile.name, minionFuelFile.emoji.name, Date.now(), automatedShipping, automatedShippingEmoji, timeLastCollected, searchTerm];
				maidObj[minionFuelFile.keyName] -= 1;

				await db.set(maid, maidObj);

				sent.reactions.removeAll();
				sent.edit(`<:check:885408207097462786> You added **1x** ${minionFuelFile.emoji.name} \`${minionFuelFile.name.toLowerCase()}\` to your ${placedEmoji} \`${name} ${tier}\`!`);
			});

			confirmation.on('cross', (button, sent) => {
				sent.reactions.removeAll();
				sent.edit(`<:cross:885408206959046678> Minion fuel add cancelled!`);
			});

			confirmation.on('error', (error, sent) => {
				console.error(error);
				sent.reactions.removeAll();
				sent.edit(`<:cross:885408206959046678> Minion fuel add cancelled!`);
			});
		} else if (minionCommand === 'fuel-remove') {
			const minionNumber = interaction.options.getInteger('minion', true);

			if (maidObj.placedMinions.length < minionNumber || minionNumber <= 0) return interaction.reply({ content: `❗ The minion you wanted to collect resources from **does not exist**!`, ephemeral: true });

			const { placedMinions } = maidObj;
			const minionToEdit = placedMinions[minionNumber - 1];

			const [name, keyName, tier, placedEmoji, upgrade1, upgrade1Emoji, upgrade2, upgrade2Emoji, fuel, fuelEmoji, fuelLastPlaced, automatedShipping, automatedShippingEmoji, timeLastCollected, searchTerm] = minionToEdit;

			if (!fuel) return interaction.reply({ content: `❗ The minion you are trying to select **already has no fuel**!`, ephemeral: true });

			const confirmation = new Confirmation(interaction, { content: `<:Coal:816982880802439178> Are you sure you want to remove your ${fuelEmoji} \`${fuel}\` from your ${placedEmoji} \`${name} ${tier}\`?` });

			confirmation.on('check', async (button, sent) => {
				const minionFuelFile = interaction.client.assetMap.get(fuel.toLowerCase()) ||
					interaction.client.assetMap.find(asset => asset.search && asset.search.includes(fuel.toLowerCase()));
				
				sent.edit(`<:check:885408207097462786> You removed **1x** ${fuelEmoji} \`${fuel.toLowerCase()}\` from your ${placedEmoji} \`${name} ${tier}\`!`);

				if (minionFuelFile.minionFuel.reclaimable) maidObj[minionFuelFile.keyName] += 1;
				maidObj.placedMinions[minionNumber - 1] = [name, keyName, tier, placedEmoji, upgrade1, upgrade1Emoji, upgrade2, upgrade2Emoji, null, null, null, automatedShipping, automatedShippingEmoji, timeLastCollected, searchTerm];

				await db.set(maid, maidObj);
			});

			confirmation.on('cross', (button, sent) => {
				sent.reactions.removeAll();
				sent.edit(`<:cross:885408206959046678> Minion Fuel remove cancelled!`);
			});

			confirmation.on('error', (error, sent) => {
				sent.reactions.removeAll();
				sent.edit(`<:cross:885408206959046678> Minion Fuel remove cancelled!`);
			});
		} else if (minionCommand === 'upgrade-tier') {
			const minionNumber = interaction.options.getInteger('minion', true);

			if (maidObj.placedMinions.length < minionNumber || minionNumber <= 0) return interaction.reply({ content: `❗ The minion you wanted to collect resources from **does not exist**!`, ephemeral: true });

			/**
			 * @type {Collection<string, (import 'SkyblockHelper').Minion}
			 */
			const minionMap = interaction.client.assetMap.filter(asset => 'tiers' in asset && asset.group === "Minion");
			const minionToUpgrade = placedMinions[minionNumber - 1];
			const minionFile = minionMap.find(minion => minion.keyName === minionToUpgrade[1]);
			const minionTier = minionFile.tiers[minionToUpgrade[2]];
			const currentAmount = maidObj[minionTier.itemKeyName];
			const itemFile = interaction.client.assetMap.find(asset => asset.keyName === minionTier.itemKeyName);

			if (!minionTier.upgradeAmount) return interaction.reply({ content: `❗ The minion you are trying to upgrade **is already at max tier**!`, ephemeral: true });

			if (currentAmount < minionTier.upgradeAmount) return interaction.reply({ content: `❗ You don't have enough ${itemFile.emoji.name || `item.emoji.name`} \`${itemFile.name.toLowerCase() || `item.name.toLowerCase()`}\` to upgrade your minion to the next tier! Required: ${itemFile.emoji.name} **${minionTier.upgradeAmount}x** ${itemFile.name.toLowerCase()}`, ephemeral: true });

			try {
				const yesMessage = `You successfully upgraded your ${minionToUpgrade[3]} \`${minionToUpgrade[0]} ${minionToUpgrade[2]}\` to a ${minionToUpgrade[3]} \`${minionToUpgrade[0]} ${toRomanNumeral(toNumber(minionToUpgrade[2]) + 1).toLowerCase()}\`!`;

				const confirmation = new Confirmation(interaction, { content: `<:Coal:816982880802439178> Are you sure you want to upgrade your ${minionToUpgrade[3]} \`${minionToUpgrade[0]} ${minionToUpgrade[2]}\` to a ${minionToUpgrade[3]} \`${minionToUpgrade[0]} ${toRomanNumeral(toNumber(minionToUpgrade[2]) + 1).toLowerCase()}\`, consuming **${minionTier.upgradeAmount || `minionTier.upgradeAmount`}x** ${itemFile.emoji.name} \`${itemFile.name.toLowerCase()}\`?` });

				confirmation.on('check', async (button, sent) => {
					const minion = placedMinions[minionNumber - 1];

					minion[2] = toRomanNumeral(toNumber(minion[2]) + 1).toLowerCase();

					maidObj.placedMinions = placedMinions;
					maidObj[itemFile.keyName] -= minionTier.upgradeAmount;
					
					await db.set(maid, maidObj);

					sent.reactions.removeAll();
					sent.edit(`<:check:885408207097462786> ${yesMessage}`);
				});

				confirmation.on('cross', (button, sent) => {
					sent.reactions.removeAll();
					sent.edit(`<:cross:885408206959046678> Minion Tier Upgrade cancelled!`);
				});

				confirmation.on('error', async (error, sent) => {
					maidObj.placedMinions = placedMinions;
					await db.set(maid, maidObj);

					console.error(error);

					sent.reactions.removeAll();
					sent.edit(`<:cross:885408206959046678> Minion Tier upgrade cancelled!`);
				});
			} catch (error) {
				console.error(error);
			}
		}
	},
};

function toNumber(romanNumeral) {
	let returnValue;
	if (romanNumeral === "i") {
		returnValue = 1;
	} else if (romanNumeral === "ii") {
		returnValue = 2;
	} else if (romanNumeral === "iii") {
		returnValue = 3;
	} else if (romanNumeral === "iv") {
		returnValue = 4;
	} else if (romanNumeral === "v") {
		returnValue = 5;
	} else if (romanNumeral === "vi") {
		returnValue = 6;
	} else if (romanNumeral === "vii") {
		returnValue = 7;
	} else if (romanNumeral === "viii") {
		returnValue = 8;
	} else if (romanNumeral === "ix") {
		returnValue = 9;
	} else if (romanNumeral === "x") {
		returnValue = 10;
	} else {
		returnValue = NaN;
	}

	return returnValue;
}