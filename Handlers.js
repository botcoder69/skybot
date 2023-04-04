/* eslint-disable require-atomic-updates */

const Database = require('@replit/database');
const { Client, ChatInputCommandInteraction, EmbedBuilder, User } = require('discord.js');
const { SkybotDatabaseHandler } = require('./SkyblockHelper/src');

const wait = require('util').promisify(setTimeout);

class CodeHandler {
	constructor() {
		/**
		 * @type {User}
		 */
		this.user = null;

		/**
		 * @type {import ('discord.js').RawUserObj}
		 */
		this.maidObj = null;

		/**
		 * @type {Client}
		 */
		this.client = null;

		/**
		 * @type {ChatInputCommandInteraction}
		 */
		this.interaction = null;

		/**
		 * @type {Database | Map}
		 */
		this.db = null;

		/**
		 * @type {import('discord.js').SlashCommand}
		 */
		this.slashCommand = null;
	}

	/**
	 * @private
	 */
	checkSuppliedValues() {
		if (typeof this.maidObj !== 'object') throw new RangeError(`The "maidObj" property of a "CodeHandler" must be an object!`);
		if (!(this.client instanceof Client)) throw new RangeError(`The "client" property of a "CodeHandler" must be a proper instance of Client!`);
		if (!(this.interaction instanceof ChatInputCommandInteraction)) throw new RangeError(`The "interaction" property of a "CodeHandler" must be a proper instance of ChatInputCommandInteraction!`);
		if (!(this.user instanceof User)) throw new RangeError(`The "user" property of a "CodeHandler" must be a proper instance of User!`);
		if (!(this.db instanceof Database) && !(this.db instanceof Map) && !(this.db instanceof SkybotDatabaseHandler)) throw new RangeError(`The "db" property of a "CodeHandler" must be a proper instance of Database | Map | SkybotDatabaseHandler!`);
	}

	setUser(user) {
		this.user = user;

		return this;
	}

	setMaidObj(maidObj) {
		this.maidObj = maidObj;

		return this;
	}

	setClient(client) {
		this.client = client;

		return this;
	}

	setInteraction(interaction) {
		this.interaction = interaction;

		return this;
	}

	setDatabase(db) {
		this.db = db;

		return this;
	}

	setSlashCommand(slashCommand) {
		this.slashCommand = slashCommand;

		return this;
	}

	async banHandler() {
		this.checkSuppliedValues();

		const maid = this.user.id;

		if ('banned' in this.maidObj) {
			const { timestamp, performer, reason } = this.maidObj.banned;

			if (Date.now() < timestamp) {
				const wipedEmbed = new EmbedBuilder()
					.setTitle(`You have been banned!`)
					.setDescription(`Hello ${this.interaction.user}, you have been banned.\n\nPerformed by: ${performer.display} (${performer.mention})\nReason of ban: ${reason}\n\nYour ban expires in: <t:${timestamp}:R> (<t:${timestamp}:F>)\n\n||Just kidding, your ban ACTUALLY expires in <t:${Math.ceil(timestamp / 1000)}:R> (<t:${Math.ceil(timestamp / 1000)}:F>)||`);
	
				return this.interaction.reply({ embeds: [wipedEmbed] });
			} else {
				Reflect.deleteProperty(this.maidObj, 'banned');

				await this.db.set(maid, this.maidObj);
			}
		}
	}

	async wipeHandler() {
		this.checkSuppliedValues();

		if ('wiped' in this.maidObj) {
			const maid = this.user.id;
			const wipedEmbed = new EmbedBuilder()
				.setTitle(`You have been wiped!`)
				.setDescription(`Hello ${this.interaction.user}, your Skybot profile has been wiped.\n\nPerformed by: ${this.maidObj.wiped.performer.username}#${this.maidObj.wiped.performer.discriminator} (<@${this.maidObj.wiped.performer.id}>)\nReason of wipe: ${this.maidObj.wiped.reason}`);


			Reflect.deleteProperty(this.maidObj, `wiped`);

			await this.db.set(maid, this.maidObj);

			return this.interaction.reply({ embeds: [wipedEmbed] });
		}
	}

	async verificationHandler() {
		this.checkSuppliedValues();
		
		if ('verification' in this.maidObj) {
			const maid = this.user.id;
			const { maidObj, interaction, db } = this;
		
		
			if (this.maidObj.verification.ongoing && interaction.commandName !== 'verify') {
				maidObj.verification.chances -= 1;

				if (maidObj.verification.chances === 0) {
					Reflect.deleteProperty(maidObj, 'verification');

					maidObj.banned = {
						timestamp: Date.now() + 86_400_000,
						performer: {
							display: `WATCHDOG`,
							mention: `WATCHDOG`
						},
						reason: `Botting. If you didn't bot, please send a screenshoot to the owner.`
					};
					
				}

				await db.set(maid, maidObj);
	
				return interaction.reply({ content: `${interaction.user}, please complete the verification (**${maidObj.verification.chances}** chance${maidObj.verification.chances > 1 ? `s` : ``} left)!`, ephemeral: true });
			}

			if (this.maidObj.verification.ongoing && interaction.commandName === 'verify') return this.client.slashCommands.get('verify').execute(interaction, db, maid);



			await interaction.reply({ content: `**Skybot User Verification**.\nI smell something *unusual* going on with your account.\nTo verify that you are human, please answer this simple math equation:\n\`${maidObj.verification.question}\`.\n\n||To answer the equation, simply use the \`/verify\` command.||` });

			maidObj.verification.ongoing = true;
			maidObj.verification.chances = 5;

			await db.set(maid, maidObj);
		}

		return;
	}

	async tutorialHandler() {
		this.checkSuppliedValues();
		
		const maid = this.user.id;
		const { maidObj, interaction, db, slashCommand } = this;

		const { tutorial } = maidObj;
		const { commandName } = interaction;

		if (typeof tutorial === "number") {
			if (tutorial === 1 && commandName === "start") {
				await slashCommand.execute(interaction, db, maid);
				
				await interaction.channel.send(`😎 Now that you made an account, you should go mining for ores! Try using \`/mine\``);
			
			} else if (tutorial === 2 && commandName === "mine") {

				await slashCommand.execute(interaction, db, maid);
				
				await interaction.channel.send(`👍 Nice! You mined some ores, but this isn't a mining simulator...`);
				await wait(5000);
				await interaction.channel.send(`😄 We should check how many items we have! Use \`/inventory\``);

			} else if (tutorial === 3 && commandName === "inventory") {

				if (interaction.options.getUser('user', false)) {
					return interaction.reply({ content: `The ability for you to see other users inventories will be unlocked once you finish the tutorial!`, ephemeral: true });
				}

				await slashCommand.execute(interaction, db, maid);

				await wait(3000);
				await interaction.channel.send(`😅 Don't be upset with your inventory! It will grow the more you play Skybot!`);
				await wait(2000);
				await interaction.channel.send(`😁 Now let's go chop some wood. Use \`/chop\` to do so!`);
				
			} else if (tutorial === 4 && commandName === "chop") {

				await slashCommand.execute(interaction, db, maid);

				await interaction.channel.send(`🙂 Good job! Now lets go fishing for ~~square~~ fish! Use \`/fish\` to go fishing!`);
							
				const maidObj = await db.get(maid);
				maidObj.tutorial = 5;

				await db.set(maid, maidObj);

			} else if (tutorial === 5 && commandName === "fish") {

				await slashCommand.execute(interaction, db, maid);
				
				await interaction.channel.send(`👍 Of course, you wouldn't like to grind for ores and wood all the time, that's why we have minions! Use \`/minion collect all\``);
	
				const maidObj = await db.get(maid);
				maidObj.tutorial = 6;

				await db.set(maid, maidObj);

			} else if (tutorial === 6 && commandName === `minion`) {
				const subcommand = interaction.options.getSubcommand(false);
				
				if (subcommand === `collect`) {
					await slashCommand.execute(interaction, db, maid);
				
					await interaction.channel.send(`📦 The minion will fill up with items overtime, but I think you should have a chopping minion as well. Here, take this <:Inventory_Oak_Minion:887166926508404767> \`oak minion\`, then use \`/minion place Oak Minion\``);
				} else {
					await interaction.reply({ content: `You can't use this subcommand yet! Once you finish the tutorial, you will gain full access to Skybot.`, ephemeral: true });
				}
			} else if (tutorial === 7 && commandName === `minion`) {
				const subcommand = interaction.options.getSubcommand(false);
				
				if (subcommand === `place`) {
					await slashCommand.execute(interaction, db, maid);
					
					await wait(5000);

					await interaction.channel.send(`📦 You should go look at your minions! Use \`/minion inventory\``);

					await wait(5000);
		
					const maidObj = await db.get(maid);
					maidObj.tutorial = 8;

					await db.set(maid, maidObj);
				} else {
					await interaction.reply({ content: `You can't use this subcommand yet! Once you finish the tutorial, you will gain full access to Skybot.`, ephemeral: true });
				}
			} else if (tutorial === 8 && commandName === `minion`) {
				const subcommand = interaction.options.getSubcommand(false);

				if (subcommand === `inventory`) {
					await slashCommand.execute(interaction, db, maid);

					const otherInfoEmbed = new EmbedBuilder()
						.setTitle(`Other Skybot Information`)
						.addFields(
							{ name: `Level-locked Features`, value: `Some Skybot features like the Deepmines and Floating Islands have features that you can only unlock once you reach a certain skill level. The \`Roofed Forest\` in the Floating Islands requires you to have Foraging Level 8. This means you need to have Foraging Level 8 or higher to enter that area.`, inline: false },
							{ name: `Skill Progression`, value: `Skill Levels measure the experience you have for a specific skill. The higher your Skill Level is, the more experienced you are in that particular skill. Skills also give boosts on specific mechanics, dependent on your level. The higher your level is, the more significant the boost. As you level up, that particular skill would require increasing XP for a level up.` },
							{ name: `Command Tutorials`, value: `Some confusing Skybot commands have tutorials. These tutorials may help you understand the mechanic better instead of having you experiment with the command for hours until you decide to give up.` },
							{ name: `Skybot Combat`, value: `Since Skybot has limited choices due to it being a bot, combat is quite tweaked as well. You unlock fighting mobs once you switch to the Redstone Mine, which requires Mining Level 10. The combat system here is that you and the thing you are fighting trade hits. You attack first and then the mob. If your attack has led to your opponents' death, you will no longer take damage from the "trading-hits system."` }

						);

					await interaction.channel.send({ embeds: [otherInfoEmbed] });
				} else {
					await interaction.reply({ content: `You can't use this subcommand yet! Once you finish the tutorial, you will gain full access to Skybot.`, ephemeral: true });
				}
			} else {
				await interaction.reply({ content: `You can't use this command yet! Once you finish the tutorial, you will gain full access to Skybot.`, ephemeral: true });
			}
		}

		return;
	}
}

module.exports = CodeHandler;