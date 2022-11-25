/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, Collection, ComponentType } = require('discord.js');
const { Functions: { add, checkActiveItem, cloverHelped, getRandomNumber } } = require('../../SkyblockHelper/src/index');

const labels = [
	"I'm coming for you!",
	"RUN FISH RUNNN!",
	"swim fast as you can",
	"that fish big brein",
	"glub glub glub",
	"get the camera bruh"
];


module.exports = {
	data: new SlashCommandBuilder()
		.setName('fish')
		.setDescription('Go fishing for square fish in the fishery.'),
	group: `Islands`,
	cooldown: 5,
	cooldownMessage: `All the fish swam away, try again in **{secondsLeft}**\n`,
	require: {
		start: true,
		update: ">=v1.0.0"
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const newArray = [];

		const includedNumbers = [];

		while (newArray.length !== 4) {
			const arrayIndex = Math.floor(Math.random() * labels.length);
  
			if (!includedNumbers.includes(arrayIndex)) {
				newArray.push(labels[arrayIndex]);
				includedNumbers.push(arrayIndex);
			}
		}

		const noDisableRow = new ActionRowBuilder();
		const isDisableRow = new ActionRowBuilder();

		for (const label of newArray) {
			noDisableRow.addComponents(
				new ButtonBuilder()
					.setCustomId(label)
					.setLabel(label)
					.setStyle(ButtonStyle.Secondary)
			);

			isDisableRow.addComponents(
				new ButtonBuilder()
					.setCustomId(label)
					.setLabel(label)
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(true));
		}

		const maidObj = await db.get(maid);
		const clover = checkActiveItem(maidObj, 'fourLeafClover');

		// "Rig" the fishRandomizer to only give commons when they start. This is to avoid any complications with legendary fish and lootboxes.
		const fishRandomizer = maidObj.tutorial === 5 
			? 1
			: getRandomNumber(1, 1000);
			
		if (fishRandomizer <= (clover ? 400 : 500)) {
			await interaction.reply({ content: `You cast out your line and brought back one Common Fish ⬜.\n**+5x <:Fishing:885390554450501632> Fishing XP <:ExperienceOrb:900572424381272064>**`, allowedMentions: { repliedUser: false }});
			
			maidObj.commonFish += 1;
			maidObj.fishXp += 5;

			if (maidObj.tutorial === 5) {
				console.log(`[TutorialHandler]${require('chalk').greenBright(`[Logging]`)} | Completed tutorial step: fish`);
	
				maidObj.tutorial = 6;
			}
		} else if (fishRandomizer <= (clover ? 600 : 750)) {
			await interaction.reply({ content: `You cast out your line and brought back one Uncommon Fish 🟩.\n**+10x <:Fishing:885390554450501632> Fishing XP <:ExperienceOrb:900572424381272064>**`, allowedMentions: { repliedUser: false }});
			
			maidObj.uncommonFish += 1;
			maidObj.fishXp += 10;
		} else if (fishRandomizer <= (clover ? 800 : 900)) {
			await interaction.reply({ content: `You cast out your line and brought back one Rare Fish 🟦. ${clover && cloverHelped(clover, fishRandomizer, 750, 600) ? ` <:Four_Leaf_Clover:948095805619859537>` : ``}\n**+25x <:Fishing:885390554450501632> Fishing XP** <:ExperienceOrb:900572424381272064>`, allowedMentions: { repliedUser: false }});
			
			maidObj.rareFish += 1;
			maidObj.fishXp += 25;
		} else if (fishRandomizer <= (clover ? 950 : 990)) {
			await interaction.reply({ content: `You cast out your line and brought back one Ultra Rare Fish 🟥. ${clover && cloverHelped(clover, fishRandomizer, 900, 800) ? ` <:Four_Leaf_Clover:948095805619859537>` : ``}\n**+50x <:Fishing:885390554450501632> Fishing XP** <:ExperienceOrb:900572424381272064>`, allowedMentions: { repliedUser: false }});
			
			maidObj.ultraRareFish += 1;
			maidObj.fishXp += 50;
		} else if (fishRandomizer <= (clover ? 980 : 998)) {
			const eventRNG = Math.floor(Math.random() * 100) + 1;
			
			if (eventRNG >= 50) {
				const label = newArray[Math.floor(Math.random() * newArray.length)];

				const filter = i => {
					i.deferUpdate();
					return i.user.id === interaction.user.id;
				};
				
				const sent = await interaction.reply({ content: `${interaction.user}, ahhhhh the fish is too strong and your line is at risk to break! quick, click the button that says \`${label}\` in the next 5 seconds`, components: [new ActionRowBuilder(noDisableRow)], allowedMentions: { repliedUser: false }, fetchReply: true });
	
				const collector = sent.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 5000, max: 1 });
	
				let answerState = false;
	
				collector.on('collect', async i => {
					answerState = true;
					if (i.customId === label) {
						sent.reply(`You cast out your line and brought back one Legendary Fish 🟨, nice catch! ${clover && cloverHelped(clover, fishRandomizer, 990, 950) ? ` <:Four_Leaf_Clover:948095805619859537>` : ``}\n**+100x** <:Fishing:885390554450501632> Fishing XP <:ExperienceOrb:900572424381272064>.`);
	
						if (Math.floor(Math.random() * 100) + 1 >= 96) interaction.channel.send(`||deym your aim and reaction time must be good!||`);

						const rightButton = isDisableRow.components.indexOf(isDisableRow.components.find(button => button.customId === label));

						isDisableRow.components[rightButton].setStyle(ButtonStyle.Success);
	
						sent.edit({ components: [isDisableRow] });
					
						maidObj.legendaryFish += 1;
						maidObj.fishXp += 100;
						
						await db.set(maid, maidObj);
					} else {
						const rightButton = isDisableRow.components.indexOf(isDisableRow.components.find(button => button.customId === label)),
							wrongButton = isDisableRow.components.indexOf(isDisableRow.components.find(button => button.customId === i.customId));

						isDisableRow.components[rightButton].setStyle(ButtonStyle.Success);
						isDisableRow.components[wrongButton].setStyle(ButtonStyle.Danger);

						sent.reply(`oh snap, the legendary fish escaped bc the force of it was too much for your weak little macaroni arms!`);
						sent.edit({ components: [isDisableRow] });
					}
				});
	
				collector.on('end', collected => {
					sent.edit({ components: [isDisableRow] });

					if (!answerState) return interaction.channel.send(`the massive fish got away, you suck at this lmfao`);
				});
			} else {
				const isAttackRow = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId(`EventButton`)
							.setLabel(`get bonked`)
							.setStyle(ButtonStyle.Danger)
					);
				const noAttackRow = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId(`EventButton`)
							.setLabel(`get bonked`)
							.setStyle(ButtonStyle.Danger)
							.setDisabled(true)
					);

				const filter = i => {
					if (i.user.id !== interaction.user.id) i.reply({ content: `You aren't lucky enough to catch this fish yourself, don't try to yoink someone else's fish.`, ephemeral: true });
					
					i.deferUpdate();
					return i.user.id === interaction.user.id;
				};

				const eventEmbed = new EmbedBuilder()
					.setAuthor({ name: `UH OH A SHARK!` })
					.setDescription(`You cast out your line and you see an angry SHARK coming for you! Quick, use your trusty fishing pole and bonk it!`);

				const eventsSent = await interaction.channel.send({ embeds: [eventEmbed] });
				const buttonSent = await interaction.channel.send({ content: `Attach the boss by clicking \`get bonked\`\n🦈\n\n**0 hits** — 200/200 HP`, components: [isAttackRow] });

				const collector = buttonSent.createMessageComponentCollector({ filter, componentType: ComponentType.Button, max: 8, time: 11000 });

				let hits = 0;

				/**
				 * @type {Collection<string, number>}
				 */
				const usersHits = new Collection();

				collector.on(`collect`, async button => {
					hits += 1;

					const userHits = usersHits.get(button.user.id) ?? 0;
					usersHits.set(button.user.id, userHits + 1);

					buttonSent.edit({ content: `Attach the boss by clicking \`get bonked\`\n🦈\n\n**${hits} hits** — ${200 - (hits * 25)}/200 HP` });
				});

				collector.on(`end`, async (collected, reason) => {
					buttonSent.edit({ components: [noAttackRow] });

					if (hits === 8) {
						buttonSent.reply(`You cast out your line and brought back one Legendary Fish 🟨, nice catch!${clover && cloverHelped(clover, fishRandomizer, 990, 950) ? ` <:Four_Leaf_Clover:948095805619859537>` : ``}\n**+100x** <:Fishing:885390554450501632> Fishing XP <:ExperienceOrb:900572424381272064>.`);

						maidObj.legendaryFish += 1;
						maidObj.fishXp += 100;

						await db.set(maid, maidObj);
					} else if (hits > 1) {
						buttonSent.reply(`oh snap, the legendary fish escaped bc the force of it was too much for your weak little macaroni arms!`);
					} else {
						buttonSent.reply(`Either you didn't answer, or you didn't get the correct answer. Better luck next time scrub`);	
					}
				});
			}
		} else if (fishRandomizer <= (clover ? 990 : 999)) {
			// eslint-disable-next-line no-nested-ternary
			const userGets = getRandomNumber(1, 3) === 1
				? `hiltOfTheSeas`
				: getRandomNumber(1, 2) === 1
					? `firstFragmentOfTheSeas`
					: `secondFragmentOfTheSeas`;

			const itemFile = interaction.client.assetMap.find(asset => asset.keyName === userGets);

			const foundEmbed = new EmbedBuilder()
				.setTitle(`${interaction.user.username} fished`)
				.setDescription(`You didn't get any fish.\nBut hey, at least you found 1 ${itemFile.displayEmojiName()} **${itemFile.name}**!${clover && cloverHelped(clover, fishRandomizer, 750, 600) ? ` <:Four_Leaf_Clover:948095805619859537>` : ``}`)
				.setFooter({ text: `Lucky you! | Inspired by Dank Memer` });

			maidObj[userGets] = add(maidObj[userGets], 1);

			await interaction.reply({ embeds: [foundEmbed] });
		} else {
			const label = newArray[Math.floor(Math.random() * newArray.length)];

			const filter = i => {
				i.deferUpdate();
				return i.user.id === interaction.user.id;
			};
			
			const sent = await interaction.reply({ content: `${interaction.user}, ahhhhh the fish is too strong and your line is at risk to break! quick, click the button that says \`${label}\` in the next 5 seconds`, components: [new ActionRowBuilder(noDisableRow)], allowedMentions: { repliedUser: false }, fetchReply: true});

			const collector = sent.createMessageComponentCollector({ filter, componentType: ComponentType.Button, time: 5000, max: 1 });

			let answerState = false;

			collector.on('collect', async i => {
				answerState = true;
				if (i.customId === label) {
					const lootBox = getLootBox(clover);

					const cloverHelpEmbed = new EmbedBuilder()
						.setDescription(`You cast out your line and brought back one ${lootBox.emoji} ${lootBox.name}, nice catch!\n**+200x** <:Fishing:885390554450501632> Fishing XP <:ExperienceOrb:900572424381272064>\n\n`);
					
					if (clover && lootBox?.cloverHelped) cloverHelpEmbed.data.description += `\` - \` <:Four_Leaf_Clover:948095805619859537> **Four Leaf Clover** increased your luck in getting a ${lootBox.emoji} ${lootBox.name}`;
					
					if (clover && cloverHelped(clover, fishRandomizer, 1000, 980)) cloverHelpEmbed.data.description += `${cloverHelpEmbed.data.description.endsWith('\n') ? `` : `\n`}\` - \` <:Four_Leaf_Clover:948095805619859537> **Four Leaf Clover** increased your luck in getting a lootBox`;

					sent.reply({ embeds: [cloverHelpEmbed] });

					if (Math.floor(Math.random() * 100) + 1 >= 96) interaction.channel.send(`||deym your aim and reaction time must be good!||`);

					const rightButton = isDisableRow.components.indexOf(isDisableRow.components.find(button => button.customId === label));

					isDisableRow.components[rightButton].setStyle(ButtonStyle.Success);

					sent.edit({ components: [isDisableRow] });
				
					maidObj[lootBox.keyName] += 1;
					maidObj.fishXp += 100;
					
					await db.set(maid, maidObj);
				} else {
					const rightButton = isDisableRow.components.indexOf(isDisableRow.components.find(button => button.customId === label)),
						wrongButton = isDisableRow.components.indexOf(isDisableRow.components.find(button => button.customId === i.customId));

					isDisableRow.components[rightButton].setStyle(ButtonStyle.Success);
					isDisableRow.components[wrongButton].setStyle(ButtonStyle.Danger);

					sent.reply(`oh snap, the lootBox escaped bc the force of it was too much for your weak little macaroni arms!`);
					sent.edit({ components: [isDisableRow] });
				}
			});

			collector.on('end', collected => {
				sent.edit({ components: [isDisableRow] });

				if (!collected.size === 0) return interaction.channel.send(`the massive lootBox got away, you suck at this lmfao`);
			});
		}

		await db.set(maid, maidObj);
	},
};

function getLootBox(clover) {
	const lootBoxRng = getRandomNumber(1, 100);

	if (lootBoxRng <= (clover ? 40 : 50)) {
		return {
			name: `Wooden Box`,
			keyName: `woodenBox`,
			emoji: `<a:Wooden_Box:956735312162349096>`,
		};
	} else if (lootBoxRng <= (clover ? 60 : 75)) {
		return {
			name: `Iron Box`,
			keyName: `ironBox`,
			emoji: `<a:Iron_Box:956735320852922408>`,
		};
	} else if (lootBoxRng <= (clover ? 80 : 90)) {
		return {
			name: `Golden Box`,
			keyName: `goldenBox`,
			emoji: `<a:Golden_Box:956735326800478258>`,
			cloverHelped: clover && cloverHelped(clover, lootBoxRng, 75, 60)
		};
	} else if (lootBoxRng <= (clover ? 95 : 99)) {
		return {
			name: `Diamond Box`,
			keyName: `diamondBox`,
			emoji: `<a:Diamond_Box:956735439480422430>`,
			cloverHelped: clover && cloverHelped(clover, lootBoxRng, 90, 80)
		};
	} else {
		return {
			name: `Emerald Box`,
			keyName: `emeraldBox`,
			emoji: `<a:Emerald_Box:956735451622940693>`,
			cloverHelped: clover && cloverHelped(clover, lootBoxRng, 99, 95)
		};
	}
}