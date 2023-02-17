// @ts-nocheck
/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { Functions: { checkActiveItem, getRandomNumber, cloverHelped }, MessageError, SkyblockTypes } = require('../../SkyblockHelper/src/index');
const chalk = require('chalk');
const xpGains = {
	cobblestone: 1,
	coal: 5,
	ironOre: 5,
	goldOre: 5,
	lapis: 7,
	redstone: 1,
	diamond: 10,
	pureDiamond: 100
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mine')
		.setDescription('Go mining for ores in the deepmines.'),	
	group: `Islands`,
	cooldown: 5,
	cooldownMessage: `You already mined all the ores around you! Try mining again in **{secondsLeft}**\n`,
	require: {
		start: true
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const startTime = Date.now();		
		const maidObj = await db.get(maid);
		const { startMine, ironMine, goldMine, lapisQua, redsMine, diaSanct, theEnd, mine, pickaxe } = maidObj;

		/**
		 * @type {import ('SkyblockHelper').Tool}
		 */
		const pickaxeFile = interaction.client.assetMap
			.filter(asset => asset.group === "Tool")
			.find(asset => asset.displayEmojiName() === pickaxe);
		const breakPower = pickaxeFile.tool.breakingPower;
		const clover = checkActiveItem(maidObj, `fourLeafClover`);

		

		let cloverHelp = false;

		const gainedOres = {
			cobblestone: 0,
			coal: 0,
			ironOre: 0,
			goldOre: 0,
			lapis: 0,
			redstone: 0,
			diamond: 0,
			pureDiamond: 0,
			endstone: 0,
			obsidian: 0
		};

		for (let i = 0; i < 10; i++) {
			const rng = Math.floor(Math.random() * 100) + 1;

			if (mine === SkyblockTypes.SkyblockMines.StarterMine) {
				if (rng <= (clover ? 50 : 75)) {
					gainedOres.cobblestone += getRandomNumber(6, 10);
				} else {
					gainedOres.coal += getRandomNumber(6, 9);

					cloverHelp = cloverHelp || cloverHelped(clover, rng, 75, 50);
				}
			} else if (mine === SkyblockTypes.SkyblockMines.IronMine) {
				if (breakPower >= 2) {
					if (rng <= (clover ? 50 : 60)) {
						gainedOres.cobblestone += getRandomNumber(6, 10);
					} else if (rng <= (clover ? 70 : 90)) {
						gainedOres.coal += getRandomNumber(6, 9);
					} else {
						gainedOres.ironOre += getRandomNumber(3, 6);

						cloverHelp = cloverHelp || cloverHelped(clover, rng, 90, 70);
					}
				} else {
					if (rng <= (clover ? 50 : 60)) {
						gainedOres.cobblestone += getRandomNumber(6, 10);
					} else {
						gainedOres.coal += getRandomNumber(6, 9);
					}
				}
			} else if (mine === SkyblockTypes.SkyblockMines.GoldMine) {
				if (breakPower >= 3) {
					if (rng <= (clover ? 40 : 50)) {
						gainedOres.cobblestone += getRandomNumber(6, 10);
					} else if (rng <= (clover ? 60 : 80)) {
						gainedOres.coal += getRandomNumber(6, 9);
					} else if (rng <= (clover ? 80 : 90)) {
						gainedOres.ironOre += getRandomNumber(3, 6);

						cloverHelp = cloverHelp || cloverHelped(clover, rng, 80, 60);
					} else {
						gainedOres.goldOre += getRandomNumber(3, 6);

						cloverHelp = cloverHelp || cloverHelped(clover, rng, 90, 80);
					}
				} else {
					if (rng <= (clover ? 50 : 60)) {
						gainedOres.cobblestone += getRandomNumber(6, 10);
					} else {
						gainedOres.coal += getRandomNumber(6, 9);
					}
				}
			} else if (mine === SkyblockTypes.SkyblockMines.LapisQuarry) {
				if (breakPower >= 3) {
					if (rng <= (clover ? 60 : 80)) {
						gainedOres.cobblestone += getRandomNumber(6, 10);
					} else {
						gainedOres.lapis += getRandomNumber(4, 6);

						cloverHelp = cloverHelp || cloverHelped(clover, rng, 80, 60);
					}
				} else {
					gainedOres.cobblestone += getRandomNumber(6, 10);
				}
			} else if (mine === SkyblockTypes.SkyblockMines.RedstoneMine) {
				if (breakPower >= 3) {
					if (rng <= (clover ? 60 : 80)) {
						gainedOres.cobblestone += getRandomNumber(6, 10);
					} else {
						gainedOres.redstone += getRandomNumber(4, 9);

						cloverHelp = cloverHelp || cloverHelped(clover, rng, 80, 60);
					}
				} else {
					gainedOres.cobblestone += getRandomNumber(6, 10);
				}
			} else if (mine === SkyblockTypes.SkyblockMines.DiamondSanctuary) {
				if (breakPower >= 4) {
					if (rng <= (clover ? 60 : 80)) {
						gainedOres.cobblestone += getRandomNumber(6, 10);
					} else if (rng <= (clover ? 80 : 90)) {
						gainedOres.diamond += getRandomNumber(1, 3);

						cloverHelp = cloverHelp || cloverHelped(clover, rng, 80, 60);
					} else if (rng <= (clover ? 95 : 99)) {
						gainedOres.diamond += getRandomNumber(1, 3) * 9;

						cloverHelp = cloverHelp || cloverHelped(clover, rng, 90, 80);
					} else {
						gainedOres.pureDiamond += getRandomNumber(1, 3);

						cloverHelp = cloverHelp || cloverHelped(clover, rng, 99, 95);
					}
				} else if (breakPower >= 3) {
					if (rng <= (clover ? 60 : 80)) {
						gainedOres.cobblestone += getRandomNumber(6, 10);
					} else if (rng <= (clover ? 80 : 90)) {
						gainedOres.diamond += getRandomNumber(1, 3);

						cloverHelp = cloverHelp || cloverHelped(clover, rng, 80, 60);
					} else {
						gainedOres.cobblestone += getRandomNumber(6, 10);

						cloverHelp = cloverHelp || cloverHelped(clover, rng, 90, 80);
					}
				} else {
					gainedOres.cobblestone += getRandomNumber(6, 10);
				}
			} else if (mine === SkyblockTypes.SkyblockMines.TheEnd) {
				if (breakPower >= 4) {
					if (rng <= (clover ? 50 : 70)) {
						gainedOres.endstone += getRandomNumber(7, 16);
					} else {
						gainedOres.obsidian += getRandomNumber(1, 2);

						cloverHelp = cloverHelp || cloverHelped(clover, rng, 70, 50);
					}
				} else if (breakPower >= 1) {
					gainedOres.endstone += getRandomNumber(7, 16);
				}
			} else if (mine === SkyblockTypes.SkyblockMines.DragonsNest) {
				// Delete the user's cooldown.
				interaction.client.cooldowns.get('mine').delete(interaction.user);

				return interaction.reply({ content: `You are currently in the \`Dragon's Nest\`. You can't mine anything here! Try switching to \`The End\` instead!`, ephemeral: true });
			} else {
				throw new MessageError(`You are not able to mine any items because of a database error!`);
			}
		}

		let gainedMineXp = 0;

		for (const key in gainedOres) {
			if (gainedOres[key]) gainedMineXp += (gainedOres[key] * xpGains[key]);
		}

		const itemsArray = [];
		// eslint-disable-next-line guard-for-in
		for (const key in gainedOres) {
			const value = gainedOres[key];

			if (value) {
				const itemFile = interaction.client.assetMap.get(key) || 
					interaction.client.assetMap.find(item => item.search && item.search.includes(key)) ||
					interaction.client.assetMap.find(item => item.keyName === key);

				if (!itemFile) {
					itemsArray.push(`**${value}x** item.emoji.name \`${key.toLowerCase()}\``);
				} else {
					itemsArray.push(`**${value}x** ${itemFile.emoji.name} \`${itemFile.name.toLowerCase()}\``);
				}

				maidObj[key] += value;
				maidObj.mineXp += gainedMineXp;
			}
		}

		await interaction.reply({ content: `${pickaxe} ${interaction.user}, you mined ${itemsArray.join(', ')}. ${cloverHelp ? ` <:Four_Leaf_Clover:948095805619859537>` : ``}\n**+${gainedMineXp} <:Mining:885390554198868020> Mining XP** <:ExperienceOrb:900572424381272064>` });

		const spiritButterflyRNG = getRandomNumber(1, 10000);
		const spiritButterfly = spiritButterflyRNG > (clover ? 9995 : 9999);

		if (diaSanct && spiritButterfly) {
			if (!maidObj?.spiritButterfly) {
				maidObj.spiritButterfly = 1;
			} else {
				maidObj.spiritButterfly += 1;
			}

			await interaction.channel.send(`And you lucky ducky, you also found a <:Spirit_Butterfly:942633700485632071> **Spirit Butterfly** ${clover && cloverHelped(clover, spiritButterflyRNG, 10000, 9995) ? ` <:Four_Leaf_Clover:948095805619859537>` : ``}!`);

			const spiritButterflyEmbed = new EmbedBuilder()
				.setColor(`#91ddf7`)
				.setTitle('Spirit Butterfly Found!')
				.setThumbnail('https://cdn.discordapp.com/emojis/942633700485632071.png?size=44')
				.setDescription(`${interaction.user} **(${interaction.user.username})** found a spirit butterfly! GG + How lucky!`);

			const spiritLogChannel = interaction.client.channels.cache.get('947774689579765820');

			spiritLogChannel.send({ embeds: [spiritButterflyEmbed] });
		}

		if (maidObj.tutorial === 2) {
			console.log(`[TutorialHandler]${chalk.greenBright(`[Logging]`)} | Completed tutorial step: mine`);

			maidObj.tutorial = 3;
		}

		await db.set(maid, maidObj);
	},
};