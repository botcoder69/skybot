/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { Confirmation, Functions: { commafy }, FuzzySearchUtil } = require('../../SkyblockHelper/src/index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`sell`)
		.setDescription(`Sells items in your inventory`)
		.addSubcommand(subcommand => subcommand
			.setName(`all`)
			.setDescription(`Sells all sellable items in your inventory`)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`filter`)
			.setDescription(`Sells all sellable items in your inventory matching the given filter.`)
			.addStringOption(option => option
				.setName('filter')
				.setDescription('The filter to match')
				.setRequired(true)
				.addChoices(
					{ name: `is:fish`, value: `is:fish` },
					{ name: `is:meat`, value: `is:meat` },
					{ name: `is:minerals`, value: `is:minerals` },
					{ name: `is:rickroll`, value: `is:rickroll` },
					{ name: `is:woodworking`, value: `is:woodworking` },
				)
			)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`item`)
			.setDescription(`Sells all or an amount of a specific item in your inventory`)
			.addStringOption(option => option
				.setName('item')
				.setDescription('The item to sell')
				.setRequired(true)	
			)
			.addIntegerOption(option => option
				.setName('amount')
				.setDescription('The amount of the item to sell. If left blank, this will default to all')
				.setRequired(false)	
			)
		),
	group: `Currency`,
	require: {
		start: true,
		update: `>=v2.0.0`
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const maidObj = await db.get(maid);
		const command = interaction.options.getSubcommand();

		if (command === 'all') {
			const sellMap = interaction.client.assetMap
				.filter(asset => `sellall` in asset && asset.sellall.included);

			const data = sellMap
				.map(item => {
					return {
						id: item.keyName, 
						amount: (parseInt(maidObj[item.keyName]) || 0),
						value: (parseInt(maidObj[item.keyName]) || 0) * item.NPC.sell.price
					};
				})
				.filter(data => data.amount > 0);

			const totalMoney = data.reduce((a, data) => a + data.value, 0);

			if (isNaN(totalMoney)) {
				const NaNEmbed = new EmbedBuilder()
					.addFields(
						{ name: `Command`, value: `\`\`\`\nsell\`\`\`` },
						{ name: `Steps to Reproduce the Bug`, value: `\`\`\`\nN/A\`\`\`` },
						{ name: `Any other notes`, value: `\`\`\`\n400 Bad Request: Recieved resource is NaN. Expected integer.\`\`\`` }
					);

				interaction.client.channels.cache.get('889752463404593163').send({ embeds: [NaNEmbed] });

				return interaction.reply({ content: `**uh oh...**\nAn internal error occured that made this command unusable for you. The developer has been already notified`, ephemeral: true });
			}

			const soldItems = data
				.map(item => {
					const { id, amount, value } = item;

					const asset = FuzzySearchUtil.searchAndReturn(
						interaction.client.assetMap,
						id 
					);

					return `\` ${commafy(amount)}x \` ${asset.displayEmojiName('placed')} ${asset.name} (<:Coins:885677584749318154> ${commafy(value)})`;
				})
				.join('\n');

			const soldItemsEmbed = new EmbedBuilder()
				.setColor(`Yellow`)
				.setTitle(`Pending Confirmation`)
				.setDescription(`Would you like to sell all your **Sellable** type items? The complete list and subtotal are:\n\n${soldItems}\n\n**Total:** <:Coins:885677584749318154> ${commafy(totalMoney)}`);

			const confirmation = new Confirmation(interaction, { embeds: [soldItemsEmbed] });

			confirmation.on('check', async (button, sent) => {
				soldItemsEmbed
					.setColor(`Green`)
					.setTitle('Action Confirmed');

				await sent.edit({ embeds: [soldItemsEmbed] });

				maidObj.coins += totalMoney;
				for (const { id, amount } of data) maidObj[id] -= amount;

				await db.set(maid, maidObj);
			});

			confirmation.on('cross', async (button, sent) => {
				soldItemsEmbed
					.setColor(`Red`)
					.setTitle('Action Cancelled');

				await sent.edit({ embeds: [soldItemsEmbed] });
			});

			confirmation.on('error', async (error, sent) => {
				console.error(error);

				soldItemsEmbed
					.setColor(`Red`)
					.setTitle('Action Cancelled');

				await sent.edit({ embeds: [soldItemsEmbed] });
			});
		} else if (command === 'filter') {
			const filter = interaction.options.getString('filter', true);
			const sellMap = interaction.client.assetMap
				.filter(asset => `sellall` in asset && asset.sellall.included)
				.filter(asset => `is:` + asset.sellall?.filterGroup === filter);

			if (filter.includes('is:') && filter.includes('rick')) return interaction.reply({ content: `https://www.youtube.com/watch?v=dQw4w9WgXcQ&` });

			if (sellMap.size === 0) return interaction.reply({ content: `that filter does not exist what are you doing` });

			const data = sellMap
				.map(item => {
					return {
						id: item.keyName, 
						amount: (parseInt(maidObj[item.keyName]) || 0),
						value: (parseInt(maidObj[item.keyName]) || 0) * item.NPC.sell.price
					};
				})
				.filter(data => data.amount > 0);

			const totalMoney = data.reduce((a, data) => a + data.value, 0);

			if (isNaN(totalMoney)) {
				const NaNEmbed = new EmbedBuilder()
					.addFields(
						{ name: `Command`, value: `\`\`\`\nsell\`\`\`` },
						{ name: `Steps to Reproduce the Bug`, value: `\`\`\`\nN/A\`\`\`` },
						{ name: `Any other notes`, value: `\`\`\`\n400 Bad Request: Recieved resource is NaN. Expected integer.\`\`\`` }
					);

				interaction.client.channels.cache.get('889752463404593163').send({ embeds: [NaNEmbed] });

				return interaction.reply({ content: `**uh oh...**\nAn internal error occured that made this command unusable for you. The developer has been already notified`, ephemeral: true });
			}

			const soldItems = data
				.map(item => {
					const { id, amount, value } = item;

					const asset = FuzzySearchUtil.searchAndReturn(
						interaction.client.assetMap,
						id 
					);

					return `\` ${commafy(amount)}x \` ${asset.displayEmojiName('placed')} ${asset.name} (<:Coins:885677584749318154> ${commafy(value)})`;
				})
				.join('\n');

			const soldItemsEmbed = new EmbedBuilder()
				.setColor(`Yellow`)
				.setTitle(`Pending Confirmation`)
				.setDescription(`Would you like to sell all your **Sellable** type items passing the filter **${filter}**? The complete list and subtotal are:\n\n${soldItems}\n\n**Total:** <:Coins:885677584749318154> ${commafy(totalMoney)}`);

			const confirmation = new Confirmation(interaction, { embeds: [soldItemsEmbed] });

			confirmation.on('check', async (button, sent) => {
				soldItemsEmbed
					.setColor(`Green`)
					.setTitle('Action Confirmed');

				await sent.edit({ embeds: [soldItemsEmbed] });

				maidObj.coins += totalMoney;
				for (const { id, amount } of data) maidObj[id] -= amount;

				await db.set(maid, maidObj);
			});

			confirmation.on('cross', (button, sent) => {
				soldItemsEmbed
					.setColor(`Red`)
					.setTitle('Action Cancelled');

				sent.edit({ embeds: [soldItemsEmbed] });
			});

			confirmation.on('error', (error, sent) => {
				console.error(error);

				soldItemsEmbed
					.setColor(`Red`)
					.setTitle('Action Cancelled');

				sent.edit({ embeds: [soldItemsEmbed] });
			});
		} else if (command === 'item') {
			const asset = FuzzySearchUtil.searchAndReturn(
				interaction.client.assetMap.filter(asset => asset.NPC.sell.sellable), 
				interaction.options.getString('item', true)
			);

			if (!asset) return interaction.reply(`what are you thinking that item doesnt exist or is not sellable`);

			const amount = interaction.options.getInteger('amount', false) || maidObj[asset.keyName];

			const allItems = amount;
			const totalMoney = allItems * asset.NPC.sell.price || 0;

			const confirmation = new Confirmation(interaction, { content: `📤 ${interaction.user}, are you sure you want to sell **${commafy(allItems)}x** ${asset.emoji.name} \`${asset.name}\` for <:Coins:885677584749318154> **${commafy((totalMoney).toFixed(1))}**?` });

			confirmation.on('check', async (button, sent) => {
				maidObj.coins += totalMoney;
				maidObj[asset.keyName] = 0;

				sent.reactions.removeAll();
				sent.edit(`<:check:885408207097462786> You sold **${commafy(allItems)}** ${asset.emoji.name} \`${asset.name.toLowerCase()}\` for <:Coins:885677584749318154> **${commafy((totalMoney).toFixed(1))}**! You now have <:Coins:885677584749318154> **${commafy((maidObj.coins).toFixed(1))}**`);

				await db.set(maid, maidObj);
			});
			
			confirmation.on('cross', (button, sent) => {
				sent.edit(`<:cross:885408206959046678> Sell cancelled!`);
			});
			
			confirmation.on('error', (error, sent) => {
				console.error(error);

				sent.edit(`<:cross:885408206959046678> Sell cancelled!`);
			});
		}
	}
};