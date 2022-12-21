
/* eslint-disable no-unused-vars */
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder } = require('discord.js');
const Functions = require('../utils/Functions');
const SelectMenuConfirmation = require('../actions/SelectMenuConfirmation.js');
const SkybotAdventureData = require('./SkybotAdventureData');

class SkybotAdventureSelection {
	constructor() {
		/** @type {SkybotAdventureData[]} */
		this.adventureSelections = [];

		/** @type {import ('discord.js').ChatInputCommandInteraction} */
		this.interaction = null;

		this.db = null;
	}

	/** @private */
	normalizeOutcomes() {
		const res = this.adventureSelections.flat(Infinity);
		this.adventureSelections = res;
	}

	setInteractionInstance(interaction) {
		this.interaction = interaction;

		return this;
	}

	setDatabaseInstance(db) {
		this.db = db;

		return this;
	}

	setSkybotAdventures(...adventureSelections) {
		this.adventureSelections = adventureSelections;
		this.normalizeOutcomes();

		return this;
	}

	addSkybotAdventure(adventureSelection) {
		this.adventureSelections.push(adventureSelection);
		this.normalizeOutcomes();

		return this;
	}

	addSkybotAdventures(...adventureSelections) {
		this.adventureSelections.push(adventureSelections);
		this.normalizeOutcomes();

		return this;
	}



	async runSkybotAdventureSelection() {
		const { adventureSelections, db, interaction } = this;
		const maidObj = await db.get(interaction.user.id);
		


		const adventureOptions = adventureSelections
			.map(adventure => ({ 
				label: adventure.label,
				description: adventure.description,
				value: adventure.value,
				default: adventure.default,
				// Since this is currently set to it being unlocked, we reverse it to lock it.
				disabled: !adventure.requirements,
				message: {
					embeds: [
						new EmbedBuilder()
							.setTitle('Skybot Adventure Selection')
							.addFields(
								{ name: `Name`, value: adventure.info.name, inline: true },
								{ name: `Description`, value: adventure.info.description, inline: true },
								{ 
									name: `Allowed Items`, 
									value: adventure.info.allowedItems
										.map(id => interaction.client.assetMap.get(id))
										.map(item => item.displayEmojiName())
										.partition((_item, index) => index < 5)
										.map(item => item.join(' '))
										.join('\n'), 
									inline: true 
								}
							)
							.setFooter({ text: `Inspired by Dank Memer.` })
					]
				}
			}));
			
		
		const selectConfirmation = new SelectMenuConfirmation()
			.setCollectorTimeout(10_000)
			.setMenuMessage(adventureOptions[0].message)
			.setMenuOptions(adventureOptions)
			.setInteractionInstance(interaction);

		selectConfirmation.on('confirmed', async (sent, selected) => {
			const [adventureId] = selected;

			const adventure = adventureSelections.find(option => option.value === adventureId);

			const itemButtons = adventure.info.allowedItems
				.map(id => interaction.client.assetMap.get(id))
				.map(item => new ButtonBuilder()
					.setCustomId(item.keyName)
					.setEmoji(item.displayEmojiName())
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(!userHasItem(maidObj, item.keyName))
				);

			const buttons = Functions.sliceIntoChunks(itemButtons, 5);

			const row1 = new ActionRowBuilder()
				.addComponents(buttons[0]);
			const row2 = new ActionRowBuilder()
				.addComponents(buttons[1]);
			const row3 = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId('start')
						.setStyle(ButtonStyle.Success)
						.setLabel('Start')
						.setEmoji('<:Ticket:955745457181716480>'),
					new ButtonBuilder()
						.setCustomId(`equipAll`)
						.setStyle(ButtonStyle.Secondary)
						.setLabel(`Equip All`),
					new ButtonBuilder()
						.setCustomId(`end`)
						.setStyle(ButtonStyle.Secondary)
						.setLabel(`End Interaction`)
				);

			const confirmedButtons = [];

			const selectEmbed = new EmbedBuilder()
				.setAuthor({ name: `Choose items you want to take with you` })
				.setDescription(`They can turn out very useful! Be careful though, you might lose them....`)
				.setFooter({ text: `Inspired by Dank Memer` });

			await sent.edit({ embeds: [selectEmbed], components: [row1, row2, row3] });

			const collector = sent.createMessageComponentCollector(
				{
					filter: i => i.user.id === interaction.user.id,
					componentType: ComponentType.Button,
					idle: 20_000
				}
			);

			collector.on('collect', async button => {
				const itemButton = itemButtons.find(itemButton => itemButton.data.custom_id === button.customId);
				const itemButtonIndex = itemButtons.indexOf(itemButton);

				if (itemButton) {
					const style = confirmedButtons.includes(itemButton.customId)
						? ButtonStyle.Secondary
						: ButtonStyle.Primary;

					itemButtons[itemButtonIndex].setStyle(style);

					const newButtons = Functions.sliceIntoChunks(itemButtons, 5);

					const newRow1 = new ActionRowBuilder()
						.addComponents(newButtons[0]);
					const newRow2 = new ActionRowBuilder()
						.addComponents(newButtons[1]);

					await button.update({ components: [newRow1, newRow2, row3] });

					if (style === ButtonStyle.Primary) {
						confirmedButtons.push(itemButton.data.custom_id);
					} else {
						Functions.removeArrayElement(confirmedButtons, itemButton.data.custom_id);							
					}
				} else if (button.customId === 'start') {
					if (userHasItem(maidObj, 'adventureTicket')) {
						await button.deferUpdate();
					
						collector.stop('User confirmed selection');
					} else {
						await button.reply({ content: `You need at least **1x** <:Ticket:955745457181716480> \`Adventure Ticket\` to start an adventure, nice try buddy.`, ephemeral: true });
					
						collector.stop('User has no ticket');
					}
				} else if (button.customId === 'equipAll') {
					itemButtons
						.filter(button => !button.data.disabled)
						.forEach(button => {
							confirmedButtons.push(button.data.custom_id);

							button.setStyle(ButtonStyle.Primary);
						});

					const newButtons = Functions.sliceIntoChunks(itemButtons, 5);

					const newRow1 = new ActionRowBuilder()
						.addComponents(newButtons[0]);
					const newRow2 = new ActionRowBuilder()
						.addComponents(newButtons[1]);

					await button.update({ components: [newRow1, newRow2, row3] });
				} else {
					await button.deferUpdate();

					collector.stop('User End Interaction');
				}
			});
		
			collector.on('end', async (_collected, reason) => {
				const newButtons = Functions.sliceIntoChunks(
					itemButtons.map(button => button.setDisabled(true)), 
					5
				);

				const newRow1 = new ActionRowBuilder()
					.addComponents(newButtons[0]);
				const newRow2 = new ActionRowBuilder()
					.addComponents(newButtons[1]);
				const newRow3 = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId('start')
							.setStyle(ButtonStyle.Success)
							.setLabel('Start')
							.setEmoji('<:Ticket:955745457181716480>')
							.setDisabled(true),
						new ButtonBuilder()
							.setCustomId(`equipAll`)
							.setStyle(ButtonStyle.Secondary)
							.setLabel(`Equip All`)
							.setDisabled(true),
						new ButtonBuilder()
							.setCustomId(`end`)
							.setStyle(ButtonStyle.Secondary)
							.setLabel(`End Interaction`)
							.setDisabled(true)
					);

				await sent.edit({ components: [newRow1, newRow2, newRow3] });

				if (reason !== 'User confirmed selection') return;

				const itemDatas = confirmedButtons
					.map(id => interaction.client.assetMap.get(id) || interaction.client.assetMap.find(asset => asset.keyName === id))
					.map(asset => {
						maidObj[asset.keyName] -= 1;

						return {
							name: asset.name,
							keyName: asset.keyName,
							emoji: asset.displayEmojiName()
						};
					});

				maidObj.adventure = {
					name: adventure.label,
					coins: 0,
					items: itemDatas,
					exists: true,
					rewards: [],
					description: adventure.description ?? `No description provided`,
					interactions: 0,
					expInteractions: 0,
					nextInteraction: 0
				};

				await db.set(interaction.user.id, maidObj);

				const slashCommand = interaction.client.slashCommands.get(`adventure`);
				await slashCommand.execute(interaction, db, interaction.user.id);
			});
		});

		/*
		selectConfirmation.on('expired', async sent => {
			await sent.delete();
		});
		*/

		await selectConfirmation.runConfirmationMenu();
	}
}

/**
 * Check if a user has 1 or more of a specific item.
 * @param {(import 'discord.js').RawUserObj} maidObj
 * @param {string} keyName 
 */
function userHasItem(maidObj, keyName) {
	return (maidObj?.[keyName] || 0) > 0;
}

module.exports = SkybotAdventureSelection;	