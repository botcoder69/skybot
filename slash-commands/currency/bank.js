/* eslint-disable no-unused-vars, no-nested-ternary */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { Confirmation, Functions: { commafy } } = require('../../SkyblockHelper/src/index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`bank`)
		.setDescription(`Interacts with your Skybot bank account.`)
		.addSubcommand(subcommand => subcommand
			.setName('upgrade')
			.setDescription('Upgrades your Skybot bank account to the next level.')
		)
		.addSubcommand(subcommand => subcommand
			.setName('deposit')
			.setDescription(`Deposits coins in your Skybot bank account.`)
			.addIntegerOption(option => option
				.setName('coins')
				.setDescription(`How many coins would you like to deposit?`)
				.setRequired(true)
			)
		)
		.addSubcommand(subcommand => subcommand
			.setName('withdraw')
			.setDescription(`Withdraws coins from your Skybot bank account.`)
			.addIntegerOption(option => option
				.setName('coins')
				.setDescription(`How many coins would you like to withdraw?`)
				.setRequired(true)	
			)
		),
	group: `Currency`,
	require: {
		start: true,
		update: ">=v3.0.0"
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const maidObj = await db.get(maid);
		const command = interaction.options.getSubcommand();

		if (command === 'upgrade') {
			const { bankTier, enchantedGoldBlock, coins } = maidObj;
	
			let reqMoney, reqGB;
			switch (bankTier) {
			case 1:
				reqMoney = 5000000;
				reqGB = 1;
				break;
			case 2:
				reqMoney = 10000000;
				reqGB = 5;
				break;
			case 3:
				reqMoney = 25000000;
				reqGB = 20;
				break;
			case 4:
				reqMoney = 50000000;
				reqGB = 50;
				break;
			case 5:
				return interaction.reply(`You have maxed your bank account and cannot upgrade it anymore!`);
			default:
				break;
			}
	
			const enchantedGB = enchantedGoldBlock;
			const money = coins;
	
			const listOfItems = [], 
				requiredItems = []; 
	
			if (enchantedGB < reqGB) {
				requiredItems.push(`**${reqGB - enchantedGB}x** <:Enchanted_Gold_Block:885715177713057802> \`enchanted gold block\``);
			}
			listOfItems.push(`${enchantedGB >= reqGB ? "<:check:885408207097462786>" : "<:cross:885408206959046678>"} **${enchantedGB}**/**${reqGB}x** <:Enchanted_Gold_Block:885715177713057802> \`enchanted gold block\``);
			if (money < reqMoney) {
				requiredItems.push(`**${commafy(reqMoney - money)}** <:Coins:885677584749318154> \`coins\``);
			}
			listOfItems.push(`${money >= reqMoney ? "<:check:885408207097462786>" : "<:cross:885408206959046678>"} **${commafy(money)}**/**${commafy(reqMoney)}** <:Coins:885677584749318154> \`coins\``);
	
			const upgradeEmbed = new EmbedBuilder()
				.setTitle(`🔨 Upgrade - \`Bank\``)
				.setDescription(`Materials required:\n${listOfItems.join('\n')}\n\n${requiredItems.length === 0 ? `${interaction.user}, do you want to consume these materials to upgrade your bank account to a ${bankTier + 1 === 2 ? "<:BankTier2:885677583394558002> `Gold Account`" : bankTier + 1 === 3 ? "<:BankTier3:885677583335825478> `Deluxe Account`" : bankTier + 1 === 4 ? "<:BankTier4:885677583411339305> `Super Deluxe Account`" : "<:BankTier5:885677583528767570> `Premier Account`"}?` : `${interaction.user}, you need ${requiredItems.join(', ')} to upgrade your bank.`}`);
					
			if (requiredItems.length > 0) return interaction.reply({ embeds: [upgradeEmbed] });

			const confirmation = new Confirmation(interaction, { embeds: [upgradeEmbed] });
	
			confirmation.on('check', async (button, sent) => {
				maidObj.coins -= reqMoney;
				maidObj.enchantedGoldBlock -= reqGB;				
				maidObj.bankTier += 1;	
	
				await db.set(maid, maidObj);
					
				const yesUpgradeEmbed = new EmbedBuilder()
					.setTitle(`🔨 Upgrade - \`Bank\``)
					.setDescription(`<:check:885408207097462786> You upgraded your bank account to a ${bankTier + 1 === 2 ? "<:BankTier2:885677583394558002> `Gold Account`" : bankTier + 1 === 3 ? "<:BankTier3:885677583335825478> `Deluxe Account`" : bankTier + 1 === 4 ? "<:BankTier4:885677583411339305> `Super Deluxe Account`" : "<:BankTier5:885677583528767570> `Premier Account`"}!`);

				sent.edit({ embeds: [yesUpgradeEmbed] });
			});
	
			confirmation.on('cross', (button, sent) => {
				const noUpgradeEmbed = new EmbedBuilder()
					.setTitle(`🔨 Upgrade - \`Bank\``)
					.setDescription(`<:cross:885408206959046678> Bank upgrade cancelled!`);

				sent.edit({ embeds: [noUpgradeEmbed] });
			});
	
			confirmation.on('error', (error, sent) => {	
				const noUpgradeEmbed = new EmbedBuilder()
					.setTitle(`🔨 Upgrade - \`Bank\``)
					.setDescription(`<:cross:885408206959046678> Bank upgrade cancelled!`);

				sent.edit({ embeds: [noUpgradeEmbed] });
			});
		} else if (command === 'deposit') {
			const { update, bank, coins, bankTier } = maidObj;
			
			let bankCapacity = Infinity;
			if (interaction.client.updateMap.get(update) >= 5) {
				if (bankTier === 1) {
					bankCapacity = 50000000;
				} else if (bankTier === 2) {
					bankCapacity = 100000000;
				} else if (bankTier === 3) {
					bankCapacity = 250000000;
				} else if (bankTier === 4) {
					bankCapacity = 500000000;
				} else {
					bankCapacity = 1000000000;
				}
			}
						
			const desiredAmount = interaction.options.getInteger('coins', true);

			if (desiredAmount <= 0) return interaction.reply(`Yeah, you need to withdraw something. Why did you come to the bank just to withdraw ${desiredAmount} coins lol`);

			if (desiredAmount > coins) return interaction.reply(`❗ You dont have enough <:Coins:885677584749318154> \`coins\`!`);
	
			if ((bank + desiredAmount) > bankCapacity) return interaction.reply(`❗ You dont have enough capacity on your bank to deposit this much! Consider upgrading your bank account if you really need to deposit!`);
						
			const confirmation = new Confirmation(interaction, { content: `<:Deposit:850344557853409280> ${interaction.user}, are you sure you want to deposit <:Coins:885677584749318154> **${commafy(desiredAmount)}** \`coins\` from your purse?` });

			confirmation.on('check', async (button, sent) => {
				const nowBankMoney = bank + desiredAmount;
				const nowPurseMoney = coins - desiredAmount;
				
				maidObj.bank += desiredAmount;
				maidObj.coins -= desiredAmount;
		
				await db.set(maid, maidObj);
	
				sent.edit(`<:check:885408207097462786> You deposited <:Coins:885677584749318154> **${commafy(desiredAmount)}** \`coins\` from your purse! Your purse now has <:Coins:885677584749318154> **${commafy(nowPurseMoney)}** \`coins\` and your bank now has <:Bank_Coins:850344679751811093> **${commafy(nowBankMoney)}** \`bank coins\`.`);
			});
	
			confirmation.on('cross', (button, sent) => {
				sent.edit(`<:cross:885408206959046678> Deposit cancelled!`);
			});
	
			confirmation.on('error', (error, sent) => {
				sent.edit(`<:cross:885408206959046678> Deposit cancelled!`);
			});
		} else if (command === 'withdraw') {
			const { bank, coins } = maidObj;
	
			const desiredAmount = interaction.options.getInteger('coins', true);
	
			if (desiredAmount <= 0) return interaction.reply(`Yeah, you need to withdraw something. Why did you come to the bank just to withdraw ${desiredAmount} coins lol`);

			if (desiredAmount > bank) return interaction.reply(`❗ You dont have enough <:Bank_Coins:850344679751811093> \`bank coins\`!`);

			const confirmation = new Confirmation(interaction, { content: `<:Withdraw:850344557903478814> ${interaction.user}, are you sure you want to withdraw <:Bank_Coins:850344679751811093> **${commafy(desiredAmount)}** \`bank coins\` from your bank?` });
	
			confirmation.on('check', async (button, sent) => {
				maidObj.bank -= desiredAmount;
				maidObj.coins += desiredAmount;
				
				await db.set(maid, maidObj);

				sent.edit(`<:check:885408207097462786> You withdrew <:Bank_Coins:850344679751811093> **${commafy(desiredAmount)}** \`bank coins\` from your bank! Your bank now has <:Bank_Coins:850344679751811093> **${commafy(maidObj.bank)}** \`bank coins\` and your purse now has <:Coins:885677584749318154> **${commafy(maidObj.coins)}** \`coins\`.`);
			});
	
			confirmation.on('cross', (button, sent) => {
				sent.edit(`<:cross:885408206959046678> Withdraw cancelled!`);
			});
	
			confirmation.on('error', (error, sent) => {
				sent.edit(`<:cross:885408206959046678> Withdraw cancelled!`);
			});
		}
	}
};