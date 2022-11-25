/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { Functions: { commafy } } = require('../../SkyblockHelper/src/index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`daily`)
		.setDescription(`Log in daily for some sweet coins.`),
	group: `Currency`,
	require: {
		start: true,
		update: ">=v9.0.0"
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		/** @type {(import 'discord.js').RawUserObj} */
		const maidObj = await db.get(maid);

		const { lastClaimed } = maidObj.daily;

		const claimAvailableDate = new Date(lastClaimed);

		/**
		 * This is the timestamp of the **NEXT** UTC day. This is when the user can claim their next daily.
		 */
		const claimAvailableAt = Date.UTC(
			claimAvailableDate.getUTCFullYear(),
			claimAvailableDate.getUTCMonth(),
			claimAvailableDate.getUTCDate() + 1
		);

		/**
		 * This is the timestamp of 2 days after the user last claimed. This is when their daily streak expires.
		 */
		const expireAt = Date.UTC(
			claimAvailableDate.getUTCFullYear(),
			claimAvailableDate.getUTCMonth(),
			claimAvailableDate.getUTCDate() + 2
		);

		// This means that the next UTC day has not yet passed, and the user is trying to claim their daily.
		if (claimAvailableAt > Date.now() && lastClaimed !== 0) {
			const dailyReadyAt = getDailyReadyAt(claimAvailableAt - Date.now());

			const alreadyClaimedEmbed = new EmbedBuilder()
				.setTitle(`You've already claimed your daily today`)
				.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ&')
				.setDescription(`Your next daily is ready in:\n**${dailyReadyAt}**`)
				.setFooter({ text: 'Daily resets at 00:00 UTC | Inspired by Dank Memer' });

			return interaction.reply({ embeds: [alreadyClaimedEmbed] });
		} else if (Date.now() > claimAvailableAt || lastClaimed === 0) {
			const dateNow = new Date();
			const data = { ephemeral: true };
			const nextClaimAvailableAt = Date.UTC(
				dateNow.getUTCFullYear(),
				dateNow.getUTCMonth(),
				dateNow.getUTCDate() + 1
			);

			const nextDailyReadyAt = getDailyReadyAt(nextClaimAvailableAt - Date.now());

			// If last claimed is 0, that always means that they are new. I'd want to target ACTUAL players who lost their streak.
			if (expireAt < Date.now() && lastClaimed !== 0) {
				data.content = `aw man you forgot to do your daily so you lost your ${maidObj.daily.streak} day streak. You last did your daily <t:${Math.floor(lastClaimed / 1000)}:R>`;

				maidObj.daily.streak = 0;
			}

			const addedCoins = returnAddedCoins(maidObj.daily.streak);

			const claimedDailyEmbed = new EmbedBuilder()
				.setTitle(`${interaction.user.username}'s Daily Coins`)
				.setURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ&')
				.setDescription(`<:Coins:885677584749318154> **${commafy(10_000 + addedCoins)}** was placed in your wallet!\n\nYou can get more rewards by voting! (Feature to be added...)\n\nYour next daily is ready in:\n**${nextDailyReadyAt}**`)
				.setFooter({ text: `Streak: ${maidObj.daily.streak} (+ ${commafy(addedCoins)}) | Inspired by Dank Memer` });

			
			data.embeds = [claimedDailyEmbed];

			await interaction.reply(data);

			maidObj.daily.streak += 1;
			maidObj.daily.lastClaimed = Date.now();
			maidObj.coins += (10_000 + addedCoins);

			await db.set(maid, maidObj);
		} 
	}
};

function getDailyReadyAt(ms) {
	const s = Math.floor(ms / 1000);

	if (s === 0) {
		return `Right now!`;
	}

	const methods = [
		{ name: ' hour', count: 3600 },
		{ name: ' minute', count: 60 },
		{ name: ' second', count: 1 }
	];

	const timeStr = [];

	const time = Math.floor(s / methods[0].count).toString();

	timeStr.push(
		time + methods[0].name + (parseInt(time) > 1 ? `s` : ``)
	);

	for (let i = 0; i < 2; i += 1) {
		const time = Math.floor(
			(s % methods[i].count) / methods[i + 1].count
		).toString();
		
		timeStr.push(
			time + methods[i + 1].name + (parseInt(time) > 1 ? `s` : ``)
		);
	}

	return timeStr.filter(t => !t.startsWith('0')).join(', ');
}

function returnAddedCoins(streak) {
	if (streak === 0) return 0;
	
	if (streak <= 100) {
		return streak * 200;
	} else if (streak <= 200) {
		// No function can reassign streak, so I have to duplicate code.
		const x200 = streak - 100;
		streak -= 100;

		const x400 = streak;

		return (x200 * 200) + (x400 * 400);
	} else if (streak <= 300) {
		const x200 = streak - 100;
		streak -= 100;

		const x400 = streak - 100;
		streak -= 100;

		const x600 = streak;

		return (x200 * 200) + (x400 * 400) + (x600 * 600);
	} else if (streak <= 400) {
		const x200 = streak - 100;
		streak -= 100;

		const x400 = streak - 100;
		streak -= 100;

		const x600 = streak - 100;
		streak -= 100;

		const x800 = streak;

		return (x200 * 200) + (x400 * 400) + (x600 * 600) + (x800 * 800);
	} else if (streak <= 500) {
		const x200 = streak - 100;
		streak -= 100;

		const x400 = streak - 100;
		streak -= 100;

		const x600 = streak - 100;
		streak -= 100;

		const x800 = streak - 100;
		streak -= 100;

		const x1000 = streak;

		return (x200 * 200) + (x400 * 400) + (x600 * 600) + (x800 * 800) + (x1000 * 1000);
	} else if (streak <= 1000) {
		const x200 = streak - 100;
		streak -= 100;

		const x400 = streak - 100;
		streak -= 100;

		const x600 = streak - 100;
		streak -= 100;

		const x800 = streak - 100;
		streak -= 100;

		const x1000 = streak - 500;
		streak -= 500;

		const x2000 = streak;

		return (x200 * 200) + (x400 * 400) + (x600 * 600) + (x800 * 800) + (x1000 * 1000) + (x2000 * 2000);
	}
}