/* eslint-disable require-atomic-updates */
/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, EmbedBuilder, ComponentType, SelectMenuOptionBuilder } = require('discord.js');
const { Functions: { commafy, getSpecifiedRandomNumber, removeArrayElement, add, getSettingValue }, FuzzySearchUtil } = require('../../SkyblockHelper/src/index');

const notDoneEmbed = new EmbedBuilder()
	.setColor(`#2f3136`)
	.setDescription(`This feature is not yet implemented.`);

const tutorialEmbed = new EmbedBuilder()
	.setColor(`#2f3136`)
	.setTitle(`/trade Tutorial`)
	.setDescription(`The trade command will allow you to securely exchange coins or items with other users. It ensures you will not be scammed. Always check the trade details carefully before accepting a trade. You don't have to be online to receive trade requests or offers. You can also accept or deny them right from your DM notifications. Use \`/trade start <user>\` to start editing a request/offer.`);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`trade`)
		.setDescription(`Trade with a user (Inspired by Dank Memer)`)
		.addSubcommand(subcommand => subcommand
			.setName(`start`)
			.setDescription(`Start a trade with a user`)
			.addUserOption(option => option
				.setName(`user`)
				.setDescription(`The user you want to trade with.`)
				.setRequired(true)	
			)
		)
		.addSubcommandGroup(subcommandGroup => subcommandGroup
			.setName(`offer`)
			.setDescription(`Contains commands for this user to offer.`)
			.addSubcommand(subcommand => subcommand
				.setName(`items`)
				.setDescription(`Offer items.`)
				.addIntegerOption(option => option
					.setName(`amount`)
					.setDescription(`The amount of the item to offer to the user.`)
					.setRequired(true)
				)
				.addStringOption(option => option
					.setName(`item`)
					.setDescription(`The item to offer to the user.`)
					.setRequired(true)
				)
			)
			.addSubcommand(subcommand => subcommand
				.setName(`coins`)
				.setDescription(`Offer coins.`)
				.addStringOption(option => option
					.setName(`amount`)
					.setDescription(`The amount of coins to give to the user.`)
					.setRequired(true)
				)
			)
		)
		.addSubcommandGroup(subcommandGroup => subcommandGroup
			.setName(`request`)
			.setDescription(`Contains commands for this user to offer.`)
			.addSubcommand(subcommand => subcommand
				.setName(`items`)
				.setDescription(`Request items.`)
				.addIntegerOption(option => option
					.setName(`amount`)
					.setDescription(`The amount of the item to request from the user.`)
					.setRequired(true)
				)
				.addStringOption(option => option
					.setName(`item`)
					.setDescription(`The item to request from the user.`)
					.setRequired(true)
				)
			)
			.addSubcommand(subcommand => subcommand
				.setName(`coins`)
				.setDescription(`Request coins.`)
				.addStringOption(option => option
					.setName(`amount`)
					.setDescription(`The amount of coins to request from the user.`)
					.setRequired(true)
				),
			)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`view`)
			.setDescription(`View your existing trades.`)
		),
	group: `Currency`,
	tutorial: {
		embeds: [tutorialEmbed],
		key: `trade`
	},
	require: {
		start: true,
		update: `>=v10.0.0`
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		/**
		 * @type {import('discord.js').RawUserObj}
		 */
		const maidObj = await db.get(maid);
		const command = interaction.options.getSubcommand(false);
		const commandGroup = interaction.options.getSubcommandGroup(false);

		if (!maidObj.trades) maidObj.trades = [];

		const noCurrentTradeEmbed = new EmbedBuilder()
			.setColor(`#2f3136`)
			.setDescription(`You don't have any trades to edit. Use \`/trade start\` to start one.`);

		const trade = maidObj.trades.find(trade => trade.type === 'EDITING');
		const existingTrades = maidObj.trades.map(trade => trade.user);

		if (command === 'start') {
			const user = interaction.options.getUser(`user`, true);
			const userObj = await db.get(user.id);

			const blankEmbed = new EmbedBuilder()
				.setColor(`#2f3136`);

			if (!db.get(user.id)) {
				blankEmbed.setDescription(`The user you are trying to trade with does not have a Skybot profile.`);
			} else if (trade) {
				blankEmbed.setDescription(`You already have a pending trade. Send or cancel it to start another one.`);
			} else if (user.bot) {
				blankEmbed.setDescription(`You can't trade with bots.`);
			} else if (user.id === interaction.user.id) {
				blankEmbed.setDescription(`You can't start a trade with yourself.`);
			} else if (existingTrades.includes(user.id)) {
				blankEmbed.setDescription(`You already have a pending trade with this user. Use \`/trade view\` to see it.`);
			} else if (getSettingValue(userObj, `blockTradeIns`)) {
				blankEmbed.setDescription(`This user has the \`blockTradeIns\` setting enabled.`);
			}

			if (blankEmbed.data.description) return interaction.reply({ embeds: [blankEmbed], ephemeral: true });

			const tradeEmbed = new EmbedBuilder()
				.setColor(`#2F3136`)
				.setDescription(`You successfully started a trade with ${user}.\n\nUse \`/trade offer\` commands to offer items/coins.\nUse \`/trade request\` commands to request items/coins.\n\nOnce you are satisfied with your trade, send it to ${user.username} for them to accept or reject.`)
				.setFooter({ text: `Inspired by Dank Memer's OLD Trading System lol` });

			await interaction.reply({ embeds: [tradeEmbed], ephemeral: true });

			maidObj.trades.push(
				{
					offers: [],
					requests: [],
					user: user.id,
					type: `EDITING`,
					id: getSpecifiedRandomNumber(1, 999, maidObj.trades.map(trade => trade.id))
				}
			);

			await db.set(maidObj);
		} else if (command === `view`) {
			const noTradesYet = new EmbedBuilder()
				.setColor(`#2f3136`)
				.setDescription(`You don't have any outgoing or incoming trades.`);

			if (!maidObj.trades?.length) return interaction.reply({ embeds: [noTradesYet], ephemeral: true });

			const formattedTrades = maidObj.trades
				.map((trade, index) => {
					const offers = formatTradeData(trade.offers, interaction.client.assetMap);
					const requests = formatTradeData(trade.requests, interaction.client.assetMap);

					const user = interaction.client.users.cache.get(trade.user);
					const buttonRow = new ActionRowBuilder();
					const tradeEmbed = new EmbedBuilder()
						.setColor(`#2f3136`)
						.setThumbnail(user.displayAvatarURL());
					const selectMenuData = {
						default: !(index > 0),
						description: `Trade with: ${user.username}`,
						emoji: null,
						label: ``,
						value: trade.id.toString()
					};



					if (trade.type === `EDITING`) {
						tradeEmbed
							.setTitle(`Editing Trade`)
							.setDescription(`With: ${user}\n\n**Your**:\n${offers}\n\n**For their**:\n${requests}`);
						selectMenuData.label = `#${trade.id} - Editing Trade`;
						
						if (offers === `\` - \` nothing` && requests === `\` - \` nothing`) {
							buttonRow.addComponents(
								new ButtonBuilder()
									.setCustomId(`EDTING_send`)
									.setLabel(`Send`)
									.setStyle(ButtonStyle.Success)
									.setDisabled(true),
								new ButtonBuilder()
									.setCustomId(`EDTING_discard`)
									.setLabel(`Discard`)
									.setStyle(ButtonStyle.Danger)
							);
						} else {
							buttonRow.addComponents(
								new ButtonBuilder()
									.setCustomId(`EDITING_send`)
									.setLabel(`Send`)
									.setStyle(ButtonStyle.Success),
								new ButtonBuilder()
									.setCustomId(`EDITING_discard`)
									.setLabel(`Discard`)
									.setStyle(ButtonStyle.Danger)
							);
						}
					} else {
						tradeEmbed
							.setDescription(`With: ${user}\nSent: <t:${trade.sent}:R>\n\n**Your**:\n${offers}\n\n**For their**:\n${requests}`);

						if (trade.type === 'INCOMING') {
							tradeEmbed
								.setTitle(`Incoming Trade`)
								.setDescription(`With: ${user}\nSent: <t:${trade.sent}:R>\n\n**Your**:\n${requests}\n\n**For their**:\n${offers}`);
							selectMenuData.label = `#${trade.id} - Incoming Trade`;
							buttonRow.addComponents(
								new ButtonBuilder()
									.setCustomId(`INCOMING_accept`)
									.setLabel(`Accept`)
									.setStyle(ButtonStyle.Success),
								new ButtonBuilder()
									.setCustomId(`INCOMING_reject`)
									.setLabel(`Reject`)
									.setStyle(ButtonStyle.Danger)
							);
						} else {
							tradeEmbed.setTitle(`Outgoing Trade`);
							selectMenuData.label = `#${trade.id} - Outgoing Trade`;
							buttonRow.addComponents(
								new ButtonBuilder()
									.setCustomId(`OUTGOING_cancel`)
									.setLabel(`Cancel`)
									.setStyle(ButtonStyle.Danger)
							);
						}
					}

					return {
						embed: tradeEmbed,
						options: selectMenuData,
						buttons: buttonRow,
						id: trade.id.toString()
					};
				});

			const tradeRow1 = new ActionRowBuilder()
				.addComponents(
					new SelectMenuBuilder()
						.setCustomId(`tradeMenu`)
						.setOptions(
							formattedTrades.map(trade => new SelectMenuOptionBuilder()
								.setDefault(trade.options.default)
								.setDescription(trade.options.description)
								.setLabel(trade.options.label)
								.setValue(trade.options.value)
							)
						)
				);

			const tradeRow2 = formattedTrades.find(trade => trade.options.default).buttons;

			const tradeEmbed = formattedTrades.find(trade => trade.options.default).embed;

			/** @type {(import 'discord.js').Message<true>} */
			const sent = await interaction.reply({ embeds: [tradeEmbed], components: [tradeRow1, tradeRow2], ephemeral: true, fetchReply: true });

			const collector = sent.createMessageComponentCollector(
				{
					idle: 15_000,
					filter: i => i.user.id === interaction.user.id
				}
			);

			collector.on('collect', async component => {
				const defaultTrade = formattedTrades.find(trade => trade.options.default);
				let trade = maidObj.trades.find(trade => trade.id.toString() === defaultTrade.id);

				if (component.isButton()) {
					const disabledTradeRow1 = new ActionRowBuilder()
						.addComponents(
							new SelectMenuBuilder()
								.setCustomId(`tradeMenu`)
								.setOptions(
									formattedTrades.map(trade => new SelectMenuOptionBuilder()
										.setDefault(trade.options.default)
										.setDescription(trade.options.description)
										.setLabel(trade.options.label)
										.setValue(trade.options.value)
									)
								)
								.setDisabled(true)
						);
					
					const disabledTradeRow2 = formattedTrades.find(trade => trade.options.default).buttons;

					disabledTradeRow2.components.forEach(component => component.setDisabled(true));

					await component.update({ components: [disabledTradeRow1, disabledTradeRow2] });

					if (component.customId === `EDITING_send`) {
						const member = interaction.guild.members.cache.get(trade.user);
						const tradeSentEmbed = new EmbedBuilder()
							.setColor(`#2f3136`)
							.setTitle(`Trade Sent`)
							.setDescription(`${member} got a notification about your trade offer.\n\nIf you ever change you mind, you can always cancel your trade offer in /trade view command.`);

						await component.followUp({ embeds: [tradeSentEmbed], ephemeral: true });

						trade.type = `OUTGOING`;

						const offers = formatTradeData(trade.offers, interaction.client.assetMap);
						const requests = formatTradeData(trade.requests, interaction.client.assetMap);

						const tradeOfferEmbed = new EmbedBuilder()
							.setColor(`DarkGreen`)
							.setTitle(`You have a new trade offer!`)
							.setDescription(`${interaction.user} wants to trade with you!\n\nTheir:\n${offers}\n\nFor Your:\n${requests}\n\nUse \`/trade view\` to accept/reject this trade.`)
							.setTimestamp()
							.setFooter({ text: `Inspired by Dank Memer` });

						await member.send({ embeds: [tradeOfferEmbed] });

						/**
						 * @type {import('discord.js').RawUserObj}
						 */
						const memberObj = await db.get(member.id);
						
						if (!memberObj.trades) memberObj.trades = [];

						memberObj.trades.push(
							{
								offers: trade.offers,
								requests: trade.requests,
								user: interaction.user.id,
								type: `INCOMING`,
								id: getSpecifiedRandomNumber(1, 999, memberObj.trades.map(trade => trade.id)),
								sent: Math.floor(Date.now() / 1000)
							}
						);
						
						trade.sent = Math.floor(Date.now() / 1000);

						await db.set(member.id, memberObj);
						await db.set(maid, maidObj);
					} else if (component.customId === `EDITING_discard`) {
						const tradeDiscardedEmbed = new EmbedBuilder()
							.setColor(`#2f3136`)
							.setDescription(`Trade Discarded!`);

						trade.offers.forEach(offer => {
							maidObj[offer.id] = add(maidObj[offer.id], offer.amount);
						});
							
						await db.set(maid, maidObj);

						await component.followUp({ embeds: [tradeDiscardedEmbed], ephemeral: true });

						removeArrayElement(maidObj.trades, trade);
					} else if (component.customId === `INCOMING_accept`) {
						const maidObj = await db.get(maid);
						const userObj = await db.get(trade.user);

						const notEnough = trade.requests.find(request => maidObj[request.id] < request.amount || !maidObj.requestId);

						if (notEnough) {
							const item = FuzzySearchUtil.searchAndReturn(
								interaction.client.assetMap,
								notEnough.id
							);

							const notEnoughItemEmbed = new EmbedBuilder()
								.setColor(`#2f3136`)
								.setDescription(`You don't have the requested amount of ${item.displayEmojiName()} ${item.name}.`);

							return interaction.followUp({ embeds: [notEnoughItemEmbed], ephemeral: true });
						}

						for (const offer of trade.offers) {
							maidObj[offer.id] = add(maidObj[offer.id], offer.amount);
						}

						for (const request of trade.requests) {
							maidObj[request.id] -= request.amount;
							userObj[request.id] = add(userObj[request.id], request.amount);
						}

						const tradeAcceptedEmbed = new EmbedBuilder()
							.setColor(`#2f3136`)
							.setDescription(`Trade Accepted!`);

						await component.followUp({ embeds: [tradeAcceptedEmbed], ephemeral: true });

						const maidObjTradeElement = maidObj.trades.find(tradeData => tradeData.offers === trade.offers && tradeData.requests === trade.requests);
						const userObjTradeElement = userObj.trades.find(tradeData => tradeData.offers === trade.offers && tradeData.requests === trade.requests);

						removeArrayElement(maidObj.trades, maidObjTradeElement);
						removeArrayElement(userObj.trades, userObjTradeElement);

						await db.set(maid, maidObj);
						await db.set(trade.user, userObj);
					} else if (component.customId === `INCOMING_reject`) {
						const maidObj = await db.get(maid);
						const userObj = await db.get(trade.user);
						
						trade.offers.forEach(offer => {
							userObj[offer.id] = add(userObj[offer.id], offer.amount);
						});

						const maidObjTradeElement = maidObj.trades.find(tradeData => tradeData.offers === trade.offers && tradeData.requests === trade.requests);
						const userObjTradeElement = userObj.trades.find(tradeData => tradeData.offers === trade.offers && tradeData.requests === trade.requests);

						removeArrayElement(maidObj.trades, maidObjTradeElement);
						removeArrayElement(userObj.trades, userObjTradeElement);

						const tradeAcceptedEmbed = new EmbedBuilder()
							.setColor(`#2f3136`)
							.setDescription(`Trade Rejected!`);

						await component.followUp({ embeds: [tradeAcceptedEmbed], ephemeral: true });

						await db.set(maid, maidObj);
						await db.set(trade.user, userObj);
					} else if (component.customId === `OUTGOING_cancel`) {
						const maidObj = await db.get(maid);
						const userObj = await db.get(trade.user);
						
						trade.offers.forEach(offer => {
							maidObj[offer.id] = add(maidObj[offer.id], offer.amount);
						});

						const tradeCancelledEmbed = new EmbedBuilder()
							.setColor(`#2f3136`)
							.setDescription(`Trade Cancelled!`);

						await component.followUp({ embeds: [tradeCancelledEmbed], ephemeral: true });

						const tradeCancelledEmbed4DM = new EmbedBuilder()
							.setColor(`Red`)
							.setTitle(`${interaction.user.username} canceled their trade offer`)
							.setDescription(`Turns out they changed their mind! You can use /trade view to see rest of your pending trades.`)
							.setTimestamp()
							.setFooter({ text: `Inspired by Dank Memer.` });

						try {
							interaction.client.users.cache
								.get(trade.user)
								.send({ embeds: [tradeCancelledEmbed4DM] });
						} catch (error) {
							console.error(error);
						}
						
						const maidObjTradeElement = maidObj.trades.find(tradeData => tradeData.offers === trade.offers && tradeData.requests === trade.requests);
						const userObjTradeElement = userObj.trades.find(tradeData => tradeData.offers === trade.offers && tradeData.requests === trade.requests);

						removeArrayElement(maidObj.trades, maidObjTradeElement);
						removeArrayElement(userObj.trades, userObjTradeElement);

						await db.set(maid, maidObj);
						await db.set(trade.user, userObj);
					}
				} else if (component.isSelectMenu()) {
					const tradeData = formattedTrades.find(tradeData => tradeData.id === component.values[0]);

					formattedTrades.forEach(tradeData => {
						tradeData.options.default = (tradeData.id === component.values[0]);
					});

					const newTradeRow1 = new ActionRowBuilder()
						.addComponents(
							new SelectMenuBuilder()
								.setCustomId(`tradeMenu`)
								.setOptions(formattedTrades.map(trade => trade.options))
						);
						
					const newTradeRow2 = tradeData.buttons;

					const newTradeEmbed = tradeData.embed;

					trade = maidObj.trades.find(trade => trade.id.toString() === tradeData.id);

					await component.update({ embeds: [newTradeEmbed], components: [newTradeRow1, newTradeRow2] });
				}
			});

			collector.on(`end`, async () => {
				const msg = await interaction.fetchReply();

				const newSelectMenu = SelectMenuBuilder.from(msg.components[0].components[0])
					.setDisabled(true);
				const newButtons = msg.components[1].components.map(button => ButtonBuilder.from(button).setDisabled(true));

				const newActionRow1 = new ActionRowBuilder()
					.addComponents(newSelectMenu);
				const newActionRow2 = new ActionRowBuilder()
					.addComponents(newButtons);

				await interaction.editReply({ components: [newActionRow1, newActionRow2] });
			});
		} else if (commandGroup === `offer`) {
			const tooManyOffers = new EmbedBuilder()
				.setColor(`#2f3136`)
				.setDescription(`You can't offer over 20 different items.`);

			const tooManyRequests = new EmbedBuilder()
				.setColor(`#2f3136`)
				.setDescription(`You can't request over 20 different items.`);
			
			if (!trade) return interaction.reply({ embeds: [noCurrentTradeEmbed], ephemeral: true });

			const offers = trade.offers.filter(offer => offer.id !== `coins`);
			const requests = trade.requests.filter(request => request.id !== `coins`);

			if (offers.length > 20) return interaction.reply({ embeds: [tooManyOffers], ephemeral: true });

			if (requests.length > 20) return interaction.reply({ embeds: [tooManyRequests], ephemeral: true });

			if (command === `items`) {
				const item = interaction.options.getString('item', true);
				const amount = interaction.options.getInteger('amount', true);
	
				const itemFile = FuzzySearchUtil.searchAndReturn(
					interaction.client.assetMap
						.filter(asset => asset.keyName !== 'coins'), 
					item
				);

				if (!itemFile) {
					const itemDoesntExistEmbed = new EmbedBuilder()
						.setColor(`#2f3136`)
						.setDescription(`This item does not exist.`);

					return interaction.reply({ embeds: [itemDoesntExistEmbed], ephemeral: true });
				}
				
				if (amount > maidObj[itemFile.keyName]) {
					const tooLittleItemsEmbed = new EmbedBuilder()
						.setColor(`#2f3136`)
						.setDescription(`You can't offer \`${commafy(amount)}x\` ${itemFile.displayEmojiName()} ${itemFile.name}. You only have \`${maidObj[itemFile.keyName]}\`.`);

					return interaction.reply({ embeds: [tooLittleItemsEmbed], ephemeral: true });
				}

				const existingItem = trade.offers.find(offer => offer.id === itemFile.keyName);

				if (existingItem) {
					// Return the amount we took from the user
					maidObj[itemFile.keyName] += existingItem.amount;
					// Deduct the amount the user wants
					maidObj[itemFile.keyName] -= amount;

					existingItem.amount = amount;
				} else {
					maidObj[itemFile.keyName] -= amount;

					trade.offers.push(
						{
							id: itemFile.keyName,
							amount
						}
					);
				}

				const offers = formatTradeData(trade.offers, interaction.client.assetMap);
				const requests = formatTradeData(trade.requests, interaction.client.assetMap);
	
				const tradeEmbed = new EmbedBuilder()
					.setColor(`#2F3136`)
					.setDescription(`You successfully added **\`${commafy(amount)}\` ${itemFile.displayEmojiName('inventory')} ${itemFile.name}** to your offer.\n\n**Your**:\n${offers}\n\n**For Their**:\n${requests}\n\nUse \`/trade offer | request\` to add items to this trade.\nIf you are satisfied with this trade, press \`Send\`\nIf you want to discard this trade, press \`Discard\``);
	
				const tradeRow = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('tradeSend')
							.setLabel('Send')
							.setStyle(ButtonStyle.Success),
						new ButtonBuilder()
							.setCustomId('tradeDiscard')
							.setLabel('Discard')
							.setStyle(ButtonStyle.Danger)
					);
	
				/** @type {(import 'discord.js').Message} */
				const sent = await interaction.reply({ embeds: [tradeEmbed], ephemeral: true, components: [tradeRow], fetchReply: true });
	
				const collector = sent.createMessageComponentCollector(
					{
						filter: i => i.user.id === interaction.user.id,
						componentType: ComponentType.Button,
						max: 1,
						time: 60_000
					}
				);

				collector.on(`collect`, async button => {
					tradeRow.components.forEach(button => button.setDisabled(true));

					if (button.customId === `tradeSend`) {
						const member = interaction.guild.members.cache.get(trade.user);
						const tradeSentEmbed = new EmbedBuilder()
							.setColor(`#2f3136`)
							.setTitle(`Trade Sent`)
							.setDescription(`${member} got a notification about your trade offer.\n\nIf you ever change you mind, you can always cancel your trade offer in /trade view command.`);

						await button.reply({ embeds: [tradeSentEmbed], ephemeral: true });
						await interaction.editReply({ components: [tradeRow] });

						trade.type = `OUTGOING`;

						const offers = formatTradeData(trade.offers, interaction.client.assetMap);
						const requests = formatTradeData(trade.requests, interaction.client.assetMap);

						const tradeOfferEmbed = new EmbedBuilder()
							.setColor(`DarkGreen`)
							.setTitle(`You have a new trade offer!`)
							.setDescription(`${interaction.user} wants to trade with you!\n\nTheir:\n${offers}\n\nFor Your:\n${requests}\n\nUse \`/trade view\` to accept/reject this trade.`)
							.setTimestamp()
							.setFooter({ text: `Inspired by Dank Memer` });

						await member.send({ embeds: [tradeOfferEmbed] });

						/**
						 * @type {import('discord.js').RawUserObj}
						 */
						const memberObj = await db.get(member.id);
						
						if (!memberObj.trades) memberObj.trades = [];

						memberObj.trades.push(
							{
								offers: trade.offers,
								requests: trade.requests,
								user: interaction.user.id,
								type: `INCOMING`,
								id: getSpecifiedRandomNumber(1, 999, memberObj.trades.map(trade => trade.id)),
								sent: Math.floor(Date.now() / 1000)
							}
						);
						
						trade.sent = Math.floor(Date.now() / 1000);

						await db.set(member.id, memberObj);
						await db.set(maid, maidObj);
					} else if (button.customId === `tradeDiscard`) {
						const tradeDiscardedEmbed = new EmbedBuilder()
							.setColor(`#2f3136`)
							.setDescription(`Trade Discarded!`);

						trade.offers.forEach(offer => {
							maidObj[offer.id] = add(maidObj[offer.id], offer.amount);
						});
						
						await db.set(maid, maidObj);
						

						await button.reply({ embeds: [tradeDiscardedEmbed], ephemeral: true });
						await interaction.editReply({ components: [tradeRow] });

						removeArrayElement(maidObj.trades, trade);
					}
					
					await db.set(maid, maidObj);
				});

				collector.on('end', async () => {
					tradeRow.components.forEach(button => button.setDisabled(true));

					await interaction.editReply({ components: [tradeRow] });
				});
			} else {
				const amount = interaction.options.getString('amount', true);
				const coinOffer = trade.offers.find(offers => offers.id === `coins`);

				const coinAmount = resolveNumber(amount, maidObj.coins);

				if (coinAmount === 0 && amount !== '0') {
					const whatTheHeckDidYouJustGiveMeEmbed = new EmbedBuilder()
						.setColor(`#2f3136`)
						.setDescription(`I can't resolve that.`);

					return interaction.reply({ embeds: [whatTheHeckDidYouJustGiveMeEmbed], ephemeral: true });
				}

				if (coinAmount === 0 && amount === '0') {
					const zeroCoinsSeriouslyEmbed = new EmbedBuilder()
						.setColor(`#2f3136`)
						.setDescription(`Why would you offer \`0\` <:Coins:885677584749318154> Coins?`);

					return interaction.reply({ embeds: [zeroCoinsSeriouslyEmbed] });
				}

				if (coinAmount > 50_000_000_000) {
					const tooMuchCoinsBruhEmbed = new EmbedBuilder()
						.setColor(`#2f3136`)
						.setDescription(`You can't offer more than 50 Billion coins.`);

					return interaction.reply({ embeds: [tooMuchCoinsBruhEmbed] });
				}

				if (coinAmount > maidObj.coins) {
					const insufficientCoinsEmbed = new EmbedBuilder()
						.setColor(`#2f3136`)
						.setDescription(`You can't offer this many coins. You only have <:Coins:885677584749318154> ${commafy(maidObj.coins)}`);

					return interaction.reply({ embeds: [insufficientCoinsEmbed] });
				}

				if (maidObj.coins <= 0 || !maidObj.coins) {
					const youAreBrokeEmbed = new EmbedBuilder()
						.setColor(`#2f3136`)
						.setDescription(`You can't offer ${commafy(coinAmount)} <:Coins:885677584749318154> Coins, because you have \`0\` <:Coins:885677584749318154> Coins`);

					return interaction.reply({ embeds: [youAreBrokeEmbed] });
				}

				if (coinOffer) {
					maidObj.coins += coinOffer.amount;
					maidObj.coins -= coinAmount;

					coinOffer.amount = coinAmount;
				} else {
					maidObj.coins -= coinAmount;

					trade.offers.push(
						{
							id: `coins`,
							amount: coinAmount
						}
					);
				}

				const offers = formatTradeData(trade.offers, interaction.client.assetMap);
				const requests = formatTradeData(trade.requests, interaction.client.assetMap);
	
				const tradeEmbed = new EmbedBuilder()
					.setColor(`#2F3136`)
					.setDescription(`You successfully added <:Coins:885677584749318154> \`${commafy(coinAmount)}\` to your offer.\n\n**Your**:\n${offers}\n\n**For Their**:\n${requests}\n\nUse \`/trade offer | request\` to add items to this trade.\nIf you are satisfied with this trade, press \`Send\`\nIf you want to discard this trade, press \`Discard\``);
	
				const tradeRow = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('tradeSend')
							.setLabel('Send')
							.setStyle(ButtonStyle.Success),
						new ButtonBuilder()
							.setCustomId('tradeDiscard')
							.setLabel('Discard')
							.setStyle(ButtonStyle.Danger)
					);
	
				/** @type {(import 'discord.js').Message} */
				const sent = await interaction.reply({ embeds: [tradeEmbed], ephemeral: true, components: [tradeRow], fetchReply: true });
	
				const collector = sent.createMessageComponentCollector(
					{
						filter: i => i.user.id === interaction.user.id,
						componentType: ComponentType.Button,
						max: 1,
						time: 60_000
					}
				);

				collector.on(`collect`, async button => {
					tradeRow.components.forEach(button => button.setDisabled(true));

					if (button.customId === `tradeSend`) {
						const member = interaction.guild.members.cache.get(trade.user);
						const tradeSentEmbed = new EmbedBuilder()
							.setColor(`#2f3136`)
							.setTitle(`Trade Sent`)
							.setDescription(`${member} got a notification about your trade offer.\n\nIf you ever change you mind, you can always cancel your trade offer in /trade view command.`);

						await button.reply({ embeds: [tradeSentEmbed], ephemeral: true });
						await interaction.editReply({ components: [tradeRow] });

						trade.type = `OUTGOING`;

						const offers = formatTradeData(trade.offers, interaction.client.assetMap);
						const requests = formatTradeData(trade.requests, interaction.client.assetMap);

						const tradeOfferEmbed = new EmbedBuilder()
							.setColor(`DarkGreen`)
							.setTitle(`You have a new trade offer!`)
							.setDescription(`${interaction.user} wants to trade with you!\n\nTheir:\n${offers}\n\nFor Your:\n${requests}\n\nUse \`/trade view\` to accept/reject this trade.`)
							.setTimestamp()
							.setFooter({ text: `Inspired by Dank Memer` });

						await member.send({ embeds: [tradeOfferEmbed] });

						/**
						 * @type {import('discord.js').RawUserObj}
						 */
						const memberObj = await db.get(member.id);
						
						if (!memberObj.trades) memberObj.trades = [];

						memberObj.trades.push(
							{
								offers: trade.offers,
								requests: trade.requests,
								user: interaction.user.id,
								type: `INCOMING`,
								id: getSpecifiedRandomNumber(1, 999, memberObj.trades.map(trade => trade.id)),
								sent: Math.floor(Date.now() / 1000)
							}
						);
						
						trade.sent = Math.floor(Date.now() / 1000);

						await db.set(member.id, memberObj);
						await db.set(maid, maidObj);
					} else if (button.customId === `tradeDiscard`) {
						const tradeDiscardedEmbed = new EmbedBuilder()
							.setColor(`#2f3136`)
							.setDescription(`Trade Discarded!`);

						trade.offers.forEach(offer => {
							maidObj[offer.id] = add(maidObj[offer.id], offer.amount);
						});
							
						await db.set(maid, maidObj);

						await button.reply({ embeds: [tradeDiscardedEmbed], ephemeral: true });
						await interaction.editReply({ components: [tradeRow] });

						removeArrayElement(maidObj.trades, trade);
					}
					
					await db.set(maid, maidObj);
				});

				collector.on('end', async () => {
					tradeRow.components.forEach(button => button.setDisabled(true));

					await interaction.editReply({ components: [tradeRow] });
				});
			}
		} else if (commandGroup === `request`) {
			const tooManyOffers = new EmbedBuilder()
				.setColor(`#2f3136`)
				.setDescription(`You can't offer over 20 different items.`);
			
			const tooManyRequests = new EmbedBuilder()
				.setColor(`#2f3136`)
				.setDescription(`You can't request over 20 different items.`);
				
			if (!trade) return interaction.reply({ embeds: [noCurrentTradeEmbed], ephemeral: true });
			
			const offers = trade.offers.filter(offer => offer.id !== `coins`);
			const requests = trade.requests.filter(request => request.id !== `coins`);
			
			if (offers.length > 20) return interaction.reply({ embeds: [tooManyOffers], ephemeral: true });
			
			if (requests.length > 20) return interaction.reply({ embeds: [tooManyRequests], ephemeral: true });
			
			if (command === `items`) {
				const item = interaction.options.getString('item', true);
				const amount = interaction.options.getInteger('amount', true);
			
				const itemFile = FuzzySearchUtil.searchAndReturn(
					interaction.client.assetMap
						.filter(asset => asset.keyName !== 'coins'), 
					item
				);
			
				if (!itemFile) {
					const itemDoesntExistEmbed = new EmbedBuilder()
						.setColor(`#2f3136`)
						.setDescription(`This item does not exist.`);
			
					return interaction.reply({ embeds: [itemDoesntExistEmbed], ephemeral: true });
				}
			
				const existingItem = trade.requests.find(offer => offer.id === itemFile.keyName);
			
				if (existingItem) {
					existingItem.amount = amount;
				} else {			
					trade.requests.push(
						{
							id: itemFile.keyName,
							amount
						}
					);
				}
			
				const offers = formatTradeData(trade.offers, interaction.client.assetMap);
				const requests = formatTradeData(trade.requests, interaction.client.assetMap);
			
				const tradeEmbed = new EmbedBuilder()
					.setColor(`#2F3136`)
					.setDescription(`You successfully requested **\`${amount}\` ${itemFile.displayEmojiName('inventory')} ${itemFile.name}**\n\n**Your**:\n${offers}\n\n**For Their**:\n${requests}\n\nUse \`/trade offer | request\` to add items to this trade.\nIf you are satisfied with this trade, press \`Send\`\nIf you want to discard this trade, press \`Discard\``);
			
				const tradeRow = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('tradeSend')
							.setLabel('Send')
							.setStyle(ButtonStyle.Success),
						new ButtonBuilder()
							.setCustomId('tradeDiscard')
							.setLabel('Discard')
							.setStyle(ButtonStyle.Danger)
					);
			
				/** @type {(import 'discord.js').Message} */
				const sent = await interaction.reply({ embeds: [tradeEmbed], ephemeral: true, components: [tradeRow], fetchReply: true });
			
				const collector = sent.createMessageComponentCollector(
					{
						filter: i => i.user.id === interaction.user.id,
						componentType: ComponentType.Button,
						max: 1,
						timee: 60_000
					}
				);
			
				collector.on(`collect`, async button => {
					tradeRow.components.forEach(button => button.setDisabled(true));
			
					if (button.customId === `tradeSend`) {
						const member = interaction.guild.members.cache.get(trade.user);
						const tradeSentEmbed = new EmbedBuilder()
							.setColor(`#2f3136`)
							.setTitle(`Trade Sent`)
							.setDescription(`${member} got a notification about your trade offer.\n\nIf you ever change you mind, you can always cancel your trade offer in /trade view command.`);
			
						await button.reply({ embeds: [tradeSentEmbed], ephemeral: true });
						await interaction.editReply({ components: [tradeRow] });
			
						trade.type = `OUTGOING`;
			
						const offers = formatTradeData(trade.offers, interaction.client.assetMap);
						const requests = formatTradeData(trade.requests, interaction.client.assetMap);
			
						const tradeOfferEmbed = new EmbedBuilder()
							.setColor(`DarkGreen`)
							.setTitle(`You have a new trade offer!`)
							.setDescription(`${interaction.user} wants to trade with you!\n\nTheir:\n${offers}\n\nFor Your:\n${requests}\n\nUse \`/trade view\` to accept/reject this trade.`)
							.setTimestamp()
							.setFooter({ text: `Inspired by Dank Memer` });
			
						await member.send({ embeds: [tradeOfferEmbed] });
			
						/**
						 * @type {import('discord.js').RawUserObj}
						 */
						const memberObj = await db.get(member.id);
							
						if (!memberObj.trades) memberObj.trades = [];
			
						memberObj.trades.push(
							{
								offers: trade.offers,
								requests: trade.requests,
								user: interaction.user.id,
								type: `INCOMING`,
								id: getSpecifiedRandomNumber(1, 999, memberObj.trades.map(trade => trade.id)),
								sent: Math.floor(Date.now() / 1000)
							}
						);
							
						trade.sent = Math.floor(Date.now() / 1000);
			
						await db.set(member.id, memberObj);
						await db.set(maid, maidObj);
					} else if (button.customId === `tradeDiscard`) {
						const tradeDiscardedEmbed = new EmbedBuilder()
							.setColor(`#2f3136`)
							.setDescription(`Trade Discarded!`);
			
						trade.offers.forEach(offer => {
							maidObj[offer.id] = add(maidObj[offer.id], offer.amount);
						});
							
						await db.set(maid, maidObj);
							
			
						await button.reply({ embeds: [tradeDiscardedEmbed], ephemeral: true });
						await interaction.editReply({ components: [tradeRow] });
			
						removeArrayElement(maidObj.trades, trade);
					}
						
					await db.set(maid, maidObj);
				});

				collector.on('end', async () => {
					tradeRow.components.forEach(button => button.setDisabled(true));

					await interaction.editReply({ components: [tradeRow] });
				});
			} else {
				const amount = interaction.options.getString('amount', true);
				const coinOffer = trade.requests.find(offers => offers.id === `coins`);
				const userObj = await db.get(trade.user);
		
				const coinAmount = resolveNumber(amount, userObj.coins);
			
				if (coinAmount === 0 && amount !== '0') {
					const whatTheHeckDidYouJustGiveMeEmbed = new EmbedBuilder()
						.setColor(`#2f3136`)
						.setDescription(`I can't resolve that.`);
			
					return interaction.reply({ embeds: [whatTheHeckDidYouJustGiveMeEmbed] });
				}
			
				if (coinAmount === 0 && amount === '0') {
					const zeroCoinsSeriouslyEmbed = new EmbedBuilder()
						.setColor(`#2f3136`)
						.setDescription(`Why would you request \`0\` <:Coins:885677584749318154> Coins?`);
			
					return interaction.reply({ embeds: [zeroCoinsSeriouslyEmbed] });
				}
			
				if (coinAmount > 50_000_000_000) {
					const tooMuchCoinsBruhEmbed = new EmbedBuilder()
						.setColor(`#2f3136`)
						.setDescription(`You can't request more than 50 Billion coins.`);
			
					return interaction.reply({ embeds: [tooMuchCoinsBruhEmbed] });
				}
			
				if (userObj.coins <= 0) {
					const youAreBrokeEmbed = new EmbedBuilder()
						.setColor(`#2f3136`)
						.setDescription(`You can't request ${commafy(coinAmount)} <:Coins:885677584749318154> Coins, because they have <:Coins:885677584749318154> \`0\` Coins`);
			
					return interaction.reply({ embeds: [youAreBrokeEmbed] });
				}
			
				if (coinOffer) {			
					coinOffer.amount = coinAmount;
				} else {			
					trade.requests.push(
						{
							id: `coins`,
							amount: coinAmount
						}
					);
				}
			
				const offers = formatTradeData(trade.offers, interaction.client.assetMap);
				const requests = formatTradeData(trade.requests, interaction.client.assetMap);
			
				const tradeEmbed = new EmbedBuilder()
					.setColor(`#2F3136`)
					.setDescription(`You successfully requested <:Coins:885677584749318154> \`${commafy(coinAmount)}\`\n\n**Your**:\n${offers}\n\n**For Their**:\n${requests}\n\nUse \`/trade offer | request\` to add items to this trade.\nIf you are satisfied with this trade, press \`Send\`\nIf you want to discard this trade, press \`Discard\``);
			
				const tradeRow = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('tradeSend')
							.setLabel('Send')
							.setStyle(ButtonStyle.Success),
						new ButtonBuilder()
							.setCustomId('tradeDiscard')
							.setLabel('Discard')
							.setStyle(ButtonStyle.Danger)
					);
			
				/** @type {(import 'discord.js').Message} */
				const sent = await interaction.reply({ embeds: [tradeEmbed], ephemeral: true, components: [tradeRow], fetchReply: true });
			
				const collector = sent.createMessageComponentCollector(
					{
						filter: i => i.user.id === interaction.user.id,
						componentType: ComponentType.Button,
						max: 1,
						time: 60_000
					}
				);
			
				collector.on(`collect`, async button => {
					tradeRow.components.forEach(button => button.setDisabled(true));
			
					if (button.customId === `tradeSend`) {
						const member = interaction.guild.members.cache.get(trade.user);
						const tradeSentEmbed = new EmbedBuilder()
							.setColor(`#2f3136`)
							.setTitle(`Trade Sent`)
							.setDescription(`${member} got a notification about your trade offer.\n\nIf you ever change you mind, you can always cancel your trade offer in /trade view command.`);
			
						await button.reply({ embeds: [tradeSentEmbed], ephemeral: true });
						await interaction.editReply({ components: [tradeRow] });
			
						trade.type = `OUTGOING`;
			
						const offers = formatTradeData(trade.offers, interaction.client.assetMap);
						const requests = formatTradeData(trade.requests, interaction.client.assetMap);
			
						const tradeOfferEmbed = new EmbedBuilder()
							.setColor(`DarkGreen`)
							.setTitle(`You have a new trade offer!`)
							.setDescription(`${interaction.user} wants to trade with you!\n\nTheir:\n${offers}\n\nFor Your:\n${requests}\n\nUse \`/trade view\` to accept/reject this trade.`)
							.setTimestamp()
							.setFooter({ text: `Inspired by Dank Memer` });
			
						await member.send({ embeds: [tradeOfferEmbed] });
			
						/**
							 * @type {import('discord.js').RawUserObj}
							 */
						const memberObj = await db.get(member.id);
							
						if (!memberObj.trades) memberObj.trades = [];
			
						memberObj.trades.push(
							{
								offers: trade.offers,
								requests: trade.requests,
								user: interaction.user.id,
								type: `INCOMING`,
								id: getSpecifiedRandomNumber(1, 999, memberObj.trades.map(trade => trade.id)),
								sent: Math.floor(Date.now() / 1000)
							}
						);
							
						trade.sent = Math.floor(Date.now() / 1000);
			
						await db.set(member.id, memberObj);
						await db.set(maid, maidObj);
					} else if (button.customId === `tradeDiscard`) {
						const tradeDiscardedEmbed = new EmbedBuilder()
							.setColor(`#2f3136`)
							.setDescription(`Trade Discarded!`);
			
						trade.offers.forEach(offer => {
							maidObj[offer.id] = add(maidObj[offer.id], offer.amount);
						});
								
						await db.set(maid, maidObj);
			
						await button.reply({ embeds: [tradeDiscardedEmbed], ephemeral: true });
						await interaction.editReply({ components: [tradeRow] });
			
						removeArrayElement(maidObj.trades, trade);
					}
						
					await db.set(maid, maidObj);
				});
			
				collector.on('end', async () => {
					tradeRow.components.forEach(button => button.setDisabled(true));
			
					await interaction.editReply({ components: [tradeRow] });
				});
			}
		}
	}
};

/**
 * Formats either an offer or request into a string.
 * @param {import('discord.js').CompressedItemIndexingData} offersOrRequests
 * @param {import('discord.js').Collection<string, import('discord.js').AssetMapValues>} assetMap
 */
function formatTradeData(offersOrRequests, assetMap) {
	return offersOrRequests
		.map(offer => {
			const { id, amount } = offer;
			const file = FuzzySearchUtil.searchAndReturn(assetMap, id);
		
			if (id === `coins`) {
				return `\` - \` ${file.displayEmojiName()} ${commafy(amount)}`;
			} else {
				return `\` - \` ${commafy(amount)}x ${file.displayEmojiName('inventory')} ${file.name}`;
			}
		})
		.join('\n') || `\` - \` nothing`;
}

/**
 * Resolves a "keyword" that can result to a number.
 * @param {string} amount The amount to resolve.
 * @param {number} amountToGet The amount in correlation to the amount to resolve. This will be used for relative keywords like "10%"", "all", and "max"
 */
function resolveNumber(amount, amountToGet) {
	// This means it's a percentage
	if (amount.endsWith('%')) {
		const [percent] = amount.split('%');

		if (!percent || percent === 0) return 0;

		return (parseInt(percent) / 100) * amountToGet;
	} else if (amount.endsWith('k') || amount.endsWith('m') || amount.endsWith('b')) {
		amount = amount.replace('k', '000');
		amount = amount.replace('m', '000000');
		amount = amount.replace('b', '000000000');

		return parseInt(amount);
	} else if (!isNaN(amount) && amount !== '0' && amount !== 'Infinity') {
		return parseInt(amount);
	} else if (amount === 'all' || amount === 'max') {
		return amountToGet;
	} else if (amount === 'half') {
		return amountToGet / 2;
	} else {
		return 0;
	}
}