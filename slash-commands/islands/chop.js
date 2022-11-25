/* eslint-disable no-unused-vars */
const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');
const { DeveloperTypeError, Functions: { getRandomNumber }, SkyblockTypes } = require('../../SkyblockHelper/src/index');

// These are the breaking powers for each axe
const toolMap = new Map();
toolMap.set(`<:Wooden_Axe:817217337261424650>`, 1);
toolMap.set(`<:Gold_Axe:817216806845677568>`, 1);
toolMap.set(`<:Stone_Axe:817216694837706793>`, 2);
toolMap.set(`<:Iron_Axe:817216753062510633>`, 3);
toolMap.set(`<:Diamond_Axe:817216864626802771>`, 4);


module.exports = {
	data: new SlashCommandBuilder()
		.setName('chop')
		.setDescription('Goes chopping for wood in the floating islands.'),
	group: `Islands`,
	cooldown: 5,
	cooldownMessage: `All of the trees around you are gone, wait **{secondsLeft}** for the saplings to grow\n`,
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
		const maidObj = await db.get(maid);
		const { forest, axe } = maidObj;
		const breakPower = toolMap.get(axe);

		// Just for initialization
		const gainedWood = {
			oakWood: 0,
			birchWood: 0,
			spruceWood: 0,
			jungleWood: 0,
			acaciaWood: 0,
			darkOakWood: 0
		};

		// foraging xp per wood 6 all lmfao
		for (let i = 0; i < 10; i++) {
			const rng = getRandomNumber(1, 100);
			
			if (forest === SkyblockTypes.SkyblockForests.Forest) {
				if (rng <= 50) {
					gainedWood.oakWood += getRandomNumber(5, 7);
				} else {
					gainedWood.birchWood += getRandomNumber(5, 16);
				}
			} else if (forest === SkyblockTypes.SkyblockForests.RoofedForest) {
				if (breakPower >= 2) {
					gainedWood.darkOakWood += getRandomNumber(16, 48);
				} else {
					return interaction.reply('You need to have a <:Stone_Axe:817216694837706793> `stone axe` or better to chop <:Dark_Oak_Log:885390554362433587> `dark oak wood`!');
				}
			} else if (forest === SkyblockTypes.SkyblockForests.Taiga) {
				if (breakPower >= 3) {
					gainedWood.spruceWood += getRandomNumber(7, 100);
				} else {
					return interaction.reply(`You need to have an <:Iron_Axe:817216753062510633> \`iron axe\` or better to chop <:Spruce_Log:885390554404380693> \`spruce wood\`!`);
				}
			} else if (forest === SkyblockTypes.SkyblockForests.Savannah) {
				if (breakPower >= 3) {
					gainedWood.acaciaWood += getRandomNumber(7, 14);
				} else {
					return interaction.reply(`You need to have an <:Iron_Axe:817216753062510633> \`iron axe\` or better to chop <:Acacia_Log:885390554471485480> \`acacia wood\`!`);
				}
			} else if (forest === SkyblockTypes.SkyblockForests.Jungle) {
				if (breakPower >= 4) {
					gainedWood.jungleWood += getRandomNumber(7, 120);
				} else {
					return interaction.reply(`You need to have an <:Diamond_Axe:817216864626802771> \`diamond axe\` or better to chop <:Jungle_Log:885390554240802817> \`jungle wood\`!`);
				}
			} else {
				throw new DeveloperTypeError(`You have set all ${interaction.user.username}'s islands to false!`);
			}
		}

		let gainedChopXp = 0;

		for (const key in gainedWood) {
			if (gainedWood[key]) gainedChopXp += (gainedWood[key] * 6);
		}

		const itemsArray = [];
		// eslint-disable-next-line guard-for-in
		for (const key in gainedWood) {
			const value = gainedWood[key];

			if (value) {
				if (typeof key !== "string") return;

				const itemFile = interaction.client.assetMap.get(key) || 
					interaction.client.assetMap.find(item => item.search && item.search.includes(key)) ||
					interaction.client.assetMap.find(item => item.keyName === key);

				if (!itemFile) {
					itemsArray.push(`**${value}x** item.emoji.name \`${key.toLowerCase()}\``);
				} else {
					itemsArray.push(`**${value}x** ${itemFile.emoji.name} \`${itemFile.name.toLowerCase()}\``);
				}
				
				maidObj[key] += value;
				maidObj.chopXp += gainedChopXp;
			}
		}

		if (maidObj.tutorial === 4) {
			// eslint-disable-next-line no-console
			console.log(`[TutorialHandler]${require('chalk').greenBright(`[Logging]`)} | Completed tutorial step: start`);

			maidObj.tutorial = 5;
		}

		await interaction.reply(`${axe} ${interaction.user}, you chopped ${itemsArray.join(', ')}.\n**+${gainedChopXp} <:Foraging:885390554291122206> Foraging XP** <:ExperienceOrb:900572424381272064>`);

		await db.set(maid, maidObj);
	},
};