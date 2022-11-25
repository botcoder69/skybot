/* eslint-disable no-unused-vars, no-nested-ternary */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');
const { Functions: { commafy, secondsToHMS, resolveArmorStats }, FuzzySearchUtil } = require('../../SkyblockHelper/src/index');

const colorValues = {
	common: "#FFFFFF",
	uncommon: "#55FF55",
	rare: "#5555FF",
	epic: "#AA00AA",
	legendary: "#FFAA00",
	mythic: "#FF55FF",
	divine: "#55FFFF",
	special: "#FF5555",
	'very special': "#FF5555"
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('examine')
		.setDescription('Replies with information on a given item!')
		.addStringOption(option => 
			// eslint-disable-next-line implicit-arrow-linebreak
			option.setName(`query`)
				.setDescription(`The asset/item to examine`)
				.setRequired(true)
		)
		.addBooleanOption(option => 
			// eslint-disable-next-line implicit-arrow-linebreak
			option.setName(`use-fuzzy`)
				.setDescription(`Whether to use fuzzy search or not.`)
				.setRequired(false)
		),
	group: `Misc`,
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 */
	async execute(interaction) {
		const { assetMap } = interaction.client;
								
		const itemSearch = interaction.options.getString('query', true);
		const noFuzzy = interaction.options.getBoolean('use-fuzzy', false) ?? false;
											
		const asset = !noFuzzy 
			? FuzzySearchUtil.searchAndReturn(assetMap, itemSearch)
			: assetMap.get(itemSearch) || assetMap.find(item => item.search?.includes?.(itemSearch)) || assetMap.find(item => item.keyName === itemSearch);
						
		if (!asset) return interaction.reply({ content: `❗ The **asset** you are trying to examine **does not exist**!`, ephemeral: true });

		const examinedEmbed = new EmbedBuilder();
		const itemsToCraft = [];
		const itemsToRepair = {
			inputs: [],
			output: null
		};

		if (asset?.crafting) {
			if (asset.crafting.materials?.length) {
				for (const [displayName, , emoji, amount] of (asset?.crafting?.materials ?? [])) {
					itemsToCraft.push(`> **${commafy(amount)}x** ${emoji} \`${displayName}\``);
				}
			} 
		
			if ('repair' in asset.crafting) {
				for (const [displayName, , emoji, amount] of (asset?.crafting?.repair.materials ?? [])) {
					itemsToRepair.inputs.push(`> **${commafy(amount)}x** ${emoji} \`${displayName}\``);
				}
		
				const [displayName, , emoji, amount] = (asset?.crafting?.repair.outputs ?? []);
		
				itemsToRepair.output = `> **${commafy(amount)}x** ${emoji} \`${displayName}\``;
			}
		}

		const color = colorValues?.[asset.rarity.toLowerCase()] ?? `#2F3136`;
		
		const buyCoin = asset.NPC.buy.price > 1 ? `coins` : `coin`;
		const sellCoin = asset.NPC.sell.price > 1 ? `coins` : `coin`;
		
		const isBuyable = asset.NPC.buy.buyable 
			? `This asset can be bought from NPCs for **${commafy(asset.NPC.buy.price)}** ${buyCoin}.` 
			: `This asset **cannot** be bought from NPCs.`;
		const isSellable = asset.NPC.sell.sellable
			? `This asset can be sold to NPCs for **${commafy(asset.NPC.sell.price)}** ${sellCoin}.` 
			: `This asset **cannot** be sold to NPCs.`;

		examinedEmbed
			.setColor(color)
			.setTitle(asset.name)
			.setDescription(`> `)
			.setThumbnail(asset.emoji.url);
		
		if (asset.group === 'Minion Upgrade') {
			examinedEmbed.data.description += `This item can be used as a minion upgrade. ${asset.description}`;
		} else {
			examinedEmbed.data.description += asset.description || `No description provided.`;
		}
			
		if (asset.group === 'Tool') {
			examinedEmbed.data.description += `\n\nBreaking Power: ${asset.tool.breakingPower}`;
		}
			
		if (asset.group === 'Sword') {
			examinedEmbed.data.description += `\n\n${asset.swordFunc.getExamineStats()}`;

			if (asset.sword.itemAbility) {
				examinedEmbed.data.description += `\n\n${asset.sword.itemAbility}`;
			}

			if (asset.sword.ability) {
				examinedEmbed.data.description += `\n\n${asset.sword.ability}`;
			}
		}

		if (asset.group === 'Armor') {
			const { health, defense, strength, speed, critChance, critDamage, inteligence } = resolveArmorStats(asset);

			examinedEmbed.data.description += `\n`;

			if (health) examinedEmbed.data.description += `\nHealth: +${health} <:Health:944105139944452157>`;
			if (defense) examinedEmbed.data.description += `\nDefense: +${defense} <:Defense:944105126233264158>`;
			if (strength) examinedEmbed.data.description += `\nStrength: +${strength} <:Strength:944105109703512115>`;
			// if (speed) examinedEmbed.data.description += `\nSpeed: +${speed}`;
			if (critChance) examinedEmbed.data.description += `\nCrit Chance: +${critChance} <:Crit_Chance:944105007584784395>`;
			// if (critDamage) examinedEmbed.data.description += `\nCrit Damage: +${critDamage}`;
			// if (inteligence) examinedEmbed.data.description += `\nIntelligence: +${inteligence}`;
		}

		if ('minionFuel' in asset) {
			examinedEmbed.data.description += `\n\nIncreases the speed of your minion by **${asset.minionFuel.speed}%**`;
			
			if (asset.name === "Solar Panel") {
				examinedEmbed.data.description += " during the Day";
			} else if (asset.minionFuel.duration === Infinity) {
				examinedEmbed.data.description += `. Unlimited Duration!`;
			} else {
				examinedEmbed.data.description += ` for ${secondsToHMS(asset.minionFuel.duration)}!`;
			}
		}
			
		examinedEmbed.data.description += `\n\n${isBuyable}\n${isSellable}`;
	
		examinedEmbed
			.addFields(
				{ name: `Rarity`, value: `\`${asset.rarity}\``, inline: true },
				{ name: `Type`, value: `\`${asset.group}\``, inline: true },
				{ name: `ID`, value: `\`${asset.keyName}\``, inline: true }
			);
	
		if (asset.crafting) {
			if (asset.crafting.materials?.length) {
				examinedEmbed.addFields(
					{ name: `You can craft this item using the following materials:`, value: itemsToCraft.join('\n') }
				);
			}
	
			if ('repair' in asset.crafting) {
				examinedEmbed.addFields(
					{ name: `You can repair this item using the following materials:`, value: `**Inputs**:\n${itemsToRepair.inputs.join('\n')}\n\n**Output**:\n${itemsToRepair.output}` }
				);
			}
		}

		if (asset.group === `Loot Box`) {
			const possibleItems = asset.loot.getPossibleItems()
				.map(possibleItem => {
					const { item } = possibleItem;

					if (possibleItem.maxAmount === possibleItem.minAmount) {
						return `${item.emoji} \`${item.name}\` (${possibleItem.maxAmount})`;
					} else {
						return `${item.emoji} \`${item.name}\` (${possibleItem.minAmount}-${possibleItem.maxAmount})`;
					}
				})
				.join('\n');

			const possibleItemsEmbed = new EmbedBuilder()
				.setDescription(`**Possible Items** (Possible Values)\n${possibleItems}`)
				.setFooter({ text: `~~Stolen~~ Inspired by Dank Memer.` });

			const possibleItemsRow = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
						.setCustomId(`possibleItems`)
						.setLabel(`Possible Items`)
						.setStyle(ButtonStyle.Primary)
				);

			/** @type {(import 'discord.js').Message} */
			const sent = await interaction.reply({ embeds: [examinedEmbed], components: [possibleItemsRow], fetchReply: true });

			const collector = sent.createMessageComponentCollector(
				{ 
					componentType: ComponentType.Button, 
					idle: 7_000
				}
			);

			collector.on('collect', async button => {
				if (button.user.id !== interaction.user.id) {
					await button.reply({ content: `This is not for you`, ephemeral: true });
				} else {
					await button.reply({ embeds: [possibleItemsEmbed], ephemeral: true });
				}
			});

			collector.on('end', async () => {
				possibleItemsRow.components[0]
					.setDisabled(true)
					.setStyle(ButtonStyle.Secondary);

				await interaction.editReply({ components: [possibleItemsRow] });
			});
		} else {
			await interaction.reply({ embeds: [examinedEmbed] });
		}
	},
};

/**
 * @param {string} description 
 */
function formatDescription(description) {
	const sentences = description.split('\n');

	return sentences
		.map(sentence => `> ${sentence}`)
		.join('\n');
}