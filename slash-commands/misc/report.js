// @ts-nocheck
/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { Functions } = require('../../SkyblockHelper/src/index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`report`)
		.setDescription(`Reports something to the developer.`)
		.addSubcommand(subcommand => subcommand
			.setName(`bug`)
			.setDescription(`Submits a bug you encountered to the developer!`)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`error`)
			.setDescription(`Submits an error you encountered to the developer!`)
		),
	group: `Misc`,
	require: {
		start: true,
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const maidObj = await db.get(maid);
		const command = interaction.options.getSubcommand();

		if (command === `bug`) {
			const maidObj = await db.get(maid);
			const cdTimestamp = maidObj?.cooldowns?.bugReport ?? 0;
	
			if (maidObj?.bugRepBanned) return interaction.reply({ content: `You have been banned from using \`/bug-report\``, ephemeral: true });
	
			if (cdTimestamp > Date.now()) return interaction.reply({ content: `You recently just submitted a bug-report! You can submit another one in ${Functions.parseTime((cdTimestamp - Date.now()) / 1000)}`, ephemeral: true });

			const modal = new ModalBuilder()
				.setCustomId('bugReportModal')
				.setTitle(`Send a bug-report!`)
				.addComponents(
					new ActionRowBuilder()
						.addComponents(
							new TextInputBuilder()
								.setCustomId(`commandInput`)
								.setLabel(`What command did you encounter this bug in?`)
								.setStyle(TextInputStyle.Short)
								.setRequired(true)
								.setMaxLength(100)
						),
					new ActionRowBuilder()
						.addComponents(
							new TextInputBuilder()
								.setCustomId(`reproduceInput`)
								.setLabel(`Exact steps to reproduce the bug?`)
								.setStyle(TextInputStyle.Paragraph)
								.setRequired(true)
								.setMaxLength(1024)
						),
					new ActionRowBuilder()
						.addComponents(
							new TextInputBuilder()
								.setCustomId(`commentInput`)
								.setLabel(`Other comments you'd like to give?`)
								.setStyle(TextInputStyle.Paragraph)
								.setRequired(false)
								.setMaxLength(1024)
						)
				);

			await interaction.showModal(modal);

			try {
				const collected = await interaction.awaitModalSubmit({ time: 600_000 });

				const command = collected.fields.getTextInputValue('commandInput');
				const reproduce = collected.fields.getTextInputValue('reproduceInput');
				const comments = collected.fields.getTextInputValue('commentInput');
	
				const bugReportEmbed = new EmbedBuilder()
					.setTitle(`${interaction.user.username}'s Bug-Report`)
					.addFields(
						{ name: `What command did you encounter this bug in?`, value: command },
						{ name: `Exact steps to reproduce the bug?`, value: reproduce },
						{ name: `Other comments you'd like to give?`, value: comments }
					);
	
				if (!maidObj?.cooldowns) {
					maidObj.cooldowns = { bugReport: Date.now() + 3_600_000 };
				} else {
					maidObj.cooldowns.bugReport = Date.now() + 3_600_000;
				}
	
				const logChannel = interaction.client.guilds.cache.get('819836411217444895').channels.cache.get('946297046674071623');
	
				const reportActionRow1 = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId(`report${maid}_resolve`)
							.setEmoji('<:check:885408207097462786>')
							.setLabel('Resolve')
							.setStyle(ButtonStyle.Success),
						new ButtonBuilder()
							.setCustomId(`report${maid}_ignore`)
							.setLabel('Ignore')
							.setStyle(ButtonStyle.Secondary),
						new ButtonBuilder()
							.setCustomId(`report${maid}_reject`)
							.setEmoji('<:cross:885408206959046678>')
							.setLabel('Reject')
							.setStyle(ButtonStyle.Danger)
					);
			
				const reportActionRow2 = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId(`report${maid}_banUser`)
							.setEmoji('<:Ban_Hammer:950630478841540629>')
							.setLabel('Ban User')
							.setStyle(ButtonStyle.Danger)
					);
	
				logChannel.send({ content: `<@518736428721635338>\nA bug that occured on \`${command}\` was reported by ${interaction.user.username}`, embeds: [bugReportEmbed], allowedMentions: { users: ['518736428721635338'] }, components: [reportActionRow1, reportActionRow2] });

				await collected.reply({ content: `Your bug-report has been sent!`, embeds: [bugReportEmbed], ephemeral: true });

				await db.set(maid, maidObj);
			} catch {
				// An error is expected when the user presses the "Cancel" button.
			}
		} else if (command === `error`) {
			const report = interaction.client.bugMap.get(maid);
	
			if (!report) return interaction.reply({ content: `what are you doing you haven't recieved an error`, ephemeral: true });
	
			await interaction.client.channels.cache.get(`889775182649098240`).send({ content: `<@518736428721635338>\nAn error that occured on \`${command}\` was reported by ${report.user.username}\nError Reference Code: **${report.refCode}**\n\`\`\`${report.error.stack}\`\`\``, allowedMentions: { users: ["518736428721635338"] } });
	
			await interaction.reply(`<:check:885408207097462786> ${interaction.user}, your error report has been sent!`);
	
			interaction.client.bugMap.delete(maid);
		}
	}
};