/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { Crafting, Confirmation, Functions: { commafy }, FuzzySearchUtil } = require('../../SkyblockHelper/src/index');

const tutorialEmbed = new EmbedBuilder()
	.setColor(`#2f3136`)	
	.setTitle(`Crafting`)
	.setDescription(`Crafting is one of those mechanics in Skybot that allows you to progress. Instead of the usual "sell stuff for buying better pickaxes gameplay", here in Skybot, we CRAFT them. It's pretty simple to go craft items. `)
	.addFields(
		{ name: `How do I know if an item is craftable?`, value: `There are 2 ways you can do this:\n\nOne is by using \`/craft <item>\`. If I respond with "❗ The item you wanted to craft **cannot be crafted!**", then that means the item can't be crafted. If I respond with an embed, that means it is craftable.\n\nAnother way to check is by using \`/examine <item>\`. Simply use the command and check for "You can craft this item using the following materials: ". That means that the item is craftable.` },
		{ name: `When to use --repair`, value: `The repair flag can be used for *repairing* broken items. To determine a repairable item, simply use \`/examine\` on the item you want to repair, and look for "This item can be repaired".` }
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`craft`)
		.setDescription(`Craft an item using other items!`)
		.addStringOption(option => option
			.setName(`item`)
			.setDescription(`The item you want to craft.`)
			.setRequired(true)
		)
		.addIntegerOption(option => option
			.setName(`amount`)
			.setDescription(`The amount of the item you want to craft`)
			.setRequired(true)
		)
		.addBooleanOption(option => option
			.setName(`--repair`)
			.setDescription(`Use repair mode for this item?`)
			.setRequired(false)
		),
	group: `Player`,
	tutorial: {
		embeds: [tutorialEmbed],
		key: `craft`
	},
	require: {
		start: true,
		update: `>=v10.0.0`
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const maidObj = await db.get(maid);
	
		const item = interaction.options.getString(`item`, true);
		const amount = interaction.options.getInteger(`amount`, true);
		const repair = interaction.options.getBoolean(`--repair`, false);

		if (item === "planks") {
			const { oakWood, birchWood, spruceWood, jungleWood, acaciaWood, darkOakWood, planks } = maidObj;

			if (amount > (oakWood + birchWood + spruceWood + jungleWood + acaciaWood + darkOakWood)) return interaction.reply({ content: `❗ You don't have **${amount}x** wood to craft **${amount * 4}x** planks!`, ephemeral: true });

			let woodDeducted = amount, 
				oakWoodDeducted = 0, 
				birchWoodDeducted = 0, 
				spruceWoodDeducted = 0, 
				jungleWoodDeducted = 0, 
				acaciaWoodDeducted = 0, 
				darkOakWoodDeducted = 0;
						
			const woodArray = [];

			

			// Oak wood
			if (woodDeducted >= oakWood) {
				oakWoodDeducted = oakWood;
				woodDeducted = woodDeducted - oakWood;
				// Birch wood
				if (woodDeducted >= birchWood) {
					birchWoodDeducted = birchWood;
					woodDeducted = woodDeducted - birchWood;
					// Dark Oak wood
					if (woodDeducted >= darkOakWood) {
						darkOakWoodDeducted = darkOakWood;
						woodDeducted = woodDeducted - darkOakWood;
						// Spruce wood
						if (woodDeducted >= spruceWood) {
							spruceWoodDeducted = spruceWood;
							woodDeducted = woodDeducted - spruceWood;
							// Acacia wood
							if (woodDeducted >= acaciaWood) {
								acaciaWoodDeducted = spruceWood;
								woodDeducted = woodDeducted - spruceWood;
								// Jungle wood
								if (woodDeducted >= jungleWood) {
									jungleWoodDeducted = jungleWood;
									woodDeducted = woodDeducted - jungleWood;
								} else {
									jungleWoodDeducted = woodDeducted;
									woodDeducted = woodDeducted - jungleWoodDeducted;
								}
							} else {
								acaciaWoodDeducted = woodDeducted;
								woodDeducted = woodDeducted - acaciaWoodDeducted;
							}
						} else {
							spruceWoodDeducted = woodDeducted;
							woodDeducted = woodDeducted - spruceWoodDeducted;
						}
					} else {
						darkOakWoodDeducted = woodDeducted;
						woodDeducted = woodDeducted - darkOakWoodDeducted;
					}
				} else {
					birchWoodDeducted = woodDeducted;
					woodDeducted = woodDeducted - birchWoodDeducted;
				}
			} else {
				oakWoodDeducted = woodDeducted;
				woodDeducted = woodDeducted - oakWoodDeducted;
			}

			let oakWoodGone = 0, 
				birchWoodGone = 0,
				darkOakWoodGone = 0,
				spruceWoodGone = 0,
				acaciaWoodGone = 0,
				jungleWoodGone = 0;

			if (oakWoodDeducted != undefined) {
				if (oakWoodDeducted != 0) woodArray.push(`<:Oak_Log:885390554005897237>  **${commafy(oakWoodDeducted)}x** \`oak wood\``);
				oakWoodGone = oakWoodDeducted;
			}
			if (birchWoodDeducted != undefined) {
				if (birchWoodDeducted != 0) woodArray.push(`<:Birch_Log:885390554400165938> **${commafy(birchWoodDeducted)}x** \`birch wood\``);
				birchWoodGone = birchWoodDeducted;
			}
			if (darkOakWoodDeducted != undefined) {
				if (darkOakWoodDeducted != 0) woodArray.push(`<:Dark_Oak_Log:885390554362433587> **${commafy(darkOakWoodDeducted)}x** \`dark oak wood\``);
				darkOakWoodGone = darkOakWoodDeducted;
			}
								
			if (spruceWoodDeducted != undefined) {
				if (spruceWoodDeducted != 0) woodArray.push(`<:Spruce_Log:885390554404380693> **${commafy(spruceWoodDeducted)}x** \`spruce wood\``);
				spruceWoodGone = spruceWoodDeducted;
			}
								
			if (acaciaWoodDeducted != undefined) {
				if (acaciaWoodDeducted != 0) woodArray.push(`<:Acacia_Log:885390554471485480> **${commafy(acaciaWoodDeducted)}x** \`acacia wood\``); 
				acaciaWoodGone = acaciaWoodDeducted;
			}
			if (jungleWoodDeducted != undefined) {
				if (jungleWoodDeducted != 0) woodArray.push(`<:Jungle_Log:885390554240802817> **${commafy(jungleWoodDeducted)}x** \`jungle wood\``);
				jungleWoodGone = jungleWoodDeducted;
			}
			
			const confirmation = new Confirmation(interaction, { content: `<:Crafting_Table:849562894236123136> ${interaction.user}, are you sure to craft <:Oak_Planks:817261928212463616> **${amount * 4}x** \`planks\` using ${woodArray.join(', ')}` });

			confirmation.on('check', async (button, sent) => {
				sent.reactions.removeAll();
				sent.edit(`<:check:885408207097462786> You crafted <:Oak_Planks:817261928212463616> **${commafy(amount * 4)}x** \`planks\` using ${woodArray.join(', ')}`);
		
				maidObj.oakWood -= oakWoodGone;
				maidObj.birchWood -= birchWoodGone;
				maidObj.spruceWood -= spruceWoodGone;
				maidObj.jungleWood -= jungleWoodGone;
				maidObj.acaciaWood -= acaciaWoodGone;
				maidObj.darkOakWood -= darkOakWoodGone;
				maidObj.planks += (amount * 4);

				await db.set(maid, maidObj);

				interaction.client.confirmations.set(interaction.user.id, false);
			});

			confirmation.on('cross', (button, sent) => {
				sent.reactions.removeAll();
				sent.edit(`<:cross:885408206959046678> Craft cancelled!`);

				interaction.client.confirmations.set(interaction.user.id, false);
			});

			confirmation.on('error', (error, sent) => {
				sent.reactions.removeAll();
				sent.edit(`<:cross:885408206959046678> Craft cancelled!`);

				interaction.client.confirmations.set(interaction.user.id, false);
			});
		} else {
			const itemToCraft = FuzzySearchUtil.searchAndReturn(
				interaction.client.assetMap, 
				item
			);

			if (!itemToCraft) return interaction.reply({ content: `❗ The item you are trying to craft **does not exist**!`, ephemeral: true });

			if (!itemToCraft?.crafting) return interaction.reply({ content: `❗ The item you are trying to craft **cannot be crafted**!`, ephemeral: true });

			if (itemToCraft.levelReq) {
				const skillResolver = {
					Foraging: `chopLevel`,
					Mining: `mineLevel`,
					Fishing: `fishLevel`,
					Combat: `combatLevel`
				};

				const skillEmojiResolver = {
					Foraging: `<:Foraging:885390554291122206>`,
					Mining: `<:Mining:885390554198868020>`,
					Fishing: `<:Fishing:885390554450501632>`,
					Combat: `<:Combat:946253940863942687>`
				};

				if (maidObj[skillResolver[itemToCraft.levelReq.skill]] < itemToCraft.levelReq.level) return interaction.reply({ content: `❗ You need ${skillEmojiResolver[itemToCraft.levelReq.skill]} **${itemToCraft.levelReq.skill} Level ${itemToCraft.levelReq.level}** to craft this item!`, ephemeral: true });
			}

			if (repair) {
				if (!itemToCraft.crafting?.repair) return interaction.reply({ content: `❗ The item you are trying to repair **can't be repaired**!`, ephemeral: true });

				const craftResults = await Crafting(
					{
						maid,
						items: itemToCraft.crafting.repair.materials,
						db,
						amount
					}
				);

				/**
				 * This is how much the user will get after crafting the item.
				 */
				const totalItemAmount = amount * (itemToCraft?.crafting?.repair.outputs[3] ?? 1);

				const url = interaction.client.assetMap
					.find(item => item.displayEmojiName() === itemToCraft.crafting.repair.outputs[2]).displayEmojiURL();

				const craftingEmbed = new EmbedBuilder()
					.setTitle(`Crafting - ${commafy(totalItemAmount)}x \`${startToUppercase(itemToCraft.crafting.repair.outputs[0])}\``)
					.setThumbnail(url)
					.setDescription(`Materials Required:\n${craftResults.itemReq.join("\n")}\n\n${interaction.user}, `);
			
				if (craftResults.enoughItems) {
					craftingEmbed.setColor(`Yellow`);
					craftingEmbed.description += `do you want to consume these materials and craft **${commafy(totalItemAmount)}x** ${itemToCraft.crafting.repair.outputs[2]} \`${itemToCraft.crafting.repair.outputs[0].toLowerCase()}\`?`;
				} else {
					craftingEmbed.setColor(`Red`);
					craftingEmbed.description += `you still need ${craftResults.itemsNeeded.join(", ")} to craft **${commafy(totalItemAmount)}x** ${itemToCraft.crafting.repair.outputs[2]} \`${itemToCraft.crafting.repair.outputs[0].toLowerCase()}\``;
				}


				if (craftResults.enoughItems) {
					const confirmation = new Confirmation(interaction, { embeds: [craftingEmbed] });
			
					confirmation.on('check', async (button, sent) => {
						const confirmedCraftEmbed = new EmbedBuilder()
							.setColor(`Green`)
							.setTitle(`Crafting - ${commafy(totalItemAmount)}x \`${itemToCraft.name}\``)
							.setThumbnail(itemToCraft.displayEmojiURL())
							.setDescription(`<:check:885408207097462786> You crafted **${commafy(totalItemAmount)}x** ${itemToCraft.displayEmojiName()} \`${itemToCraft.name.toLowerCase()}\`!`);
				
						sent.reactions.removeAll();
						sent.edit({ embeds: [confirmedCraftEmbed] });
			
						for (const [keyName, itemAmount] of craftResults.itemsConsumed) {
							maidObj[keyName] -= (itemAmount * amount);
						}
	
						maidObj[itemToCraft.crafting.repair.outputs[1]] += totalItemAmount;
			
						await db.set(maid, maidObj);
				
						interaction.client.confirmations.set(interaction.user.id, false);
					});
			
					confirmation.on('cross', (button, sent) => {
						const cancelledCraftEmbed = new EmbedBuilder()
							.setColor(`Red`)
							.setTitle(`Crafting - ${commafy(totalItemAmount)}x \`${itemToCraft.name}\``)
							.setThumbnail(itemToCraft.displayEmojiURL())
							.setDescription(`<:cross:885408206959046678> Craft cancelled!`);
			
						sent.reactions.removeAll();
						sent.edit({ embeds: [cancelledCraftEmbed] });
			
						interaction.client.confirmations.set(interaction.user.id, false);
					});
			
					confirmation.on('error', (error, sent) => {
						const cancelledCraftEmbed = new EmbedBuilder()
							.setColor(`Red`)
							.setTitle(`Crafting - ${commafy(totalItemAmount)}x \`${itemToCraft.name}\``)
							.setThumbnail(itemToCraft.displayEmojiURL())
							.setDescription(`<:cross:885408206959046678> Craft cancelled!`);
			
						sent.reactions.removeAll();
						sent.edit({ embeds: [cancelledCraftEmbed] });
			
						interaction.client.confirmations.set(interaction.user.id, false);
					});
				} else {
					await interaction.reply({ embeds: [craftingEmbed] });
				}
			} else {
				const craftResults = await Crafting(
					{
						maid,
						items: itemToCraft.crafting.materials,
						db,
						amount
					}
				);
	
				/**
				 * This is how much the user will get after crafting the item.
				 */
				const totalItemAmount = amount * (itemToCraft?.crafting?.outputs ?? 1);
	
				// console.log(craftResults);
	
				const craftingEmbed = new EmbedBuilder()
					.setTitle(`Crafting - ${commafy(totalItemAmount)}x \`${itemToCraft.name}\``)
					.setThumbnail(itemToCraft.displayEmojiURL())
					.setDescription(`Materials Required:\n${craftResults.itemReq.join("\n")}\n\n${interaction.user}, `);
			
				if (craftResults.enoughItems) {
					craftingEmbed.setColor(`Yellow`);
					craftingEmbed.data.description += `do you want to consume these materials and craft **${commafy(totalItemAmount)}x** ${itemToCraft.displayEmojiName()} \`${itemToCraft.name}\`?`;
				} else {
					craftingEmbed.setColor(`Red`);
					craftingEmbed.data.description += `you still need ${craftResults.itemsNeeded.join(", ")} to craft **${commafy(totalItemAmount)}x** ${itemToCraft.displayEmojiName()} \`${itemToCraft.name}\``;
				}
			
				if (craftResults.enoughItems) {
					const confirmation = new Confirmation(interaction, { embeds: [craftingEmbed] });
			
					confirmation.on('check', async (button, sent) => {
						const confirmedCraftEmbed = new EmbedBuilder()
							.setColor(`Green`)
							.setTitle(`Crafting - ${commafy(totalItemAmount)}x \`${itemToCraft.name}\``)
							.setThumbnail(itemToCraft.displayEmojiURL())
							.setDescription(`<:check:885408207097462786> You crafted **${commafy(totalItemAmount)}x** ${itemToCraft.displayEmojiName()} \`${itemToCraft.name.toLowerCase()}\`!`);
				
						sent.reactions.removeAll();
						sent.edit({ embeds: [confirmedCraftEmbed] });
			
						for (const [keyName, itemAmount] of craftResults.itemsConsumed) {
							maidObj[keyName] -= (itemAmount * amount);
						}
	
						maidObj[itemToCraft.keyName] += totalItemAmount;
			
						await db.set(maid, maidObj);
				
						interaction.client.confirmations.set(interaction.user.id, false);
					});
			
					confirmation.on('cross', (button, sent) => {
						const cancelledCraftEmbed = new EmbedBuilder()
							.setColor(`Red`)
							.setTitle(`Crafting - ${commafy(totalItemAmount)}x \`${itemToCraft.name}\``)
							.setThumbnail(itemToCraft.displayEmojiURL())
							.setDescription(`<:cross:885408206959046678> Craft cancelled!`);
			
						sent.reactions.removeAll();
						sent.edit({ embeds: [cancelledCraftEmbed] });
			
						interaction.client.confirmations.set(interaction.user.id, false);
					});
			
					confirmation.on('error', (error, sent) => {
						const cancelledCraftEmbed = new EmbedBuilder()
							.setColor(`Red`)
							.setTitle(`Crafting - ${commafy(totalItemAmount)}x \`${itemToCraft.name}\``)
							.setThumbnail(itemToCraft.displayEmojiURL())
							.setDescription(`<:cross:885408206959046678> Craft cancelled!`);
			
						sent.reactions.removeAll();
						sent.edit({ embeds: [cancelledCraftEmbed] });
			
						interaction.client.confirmations.set(interaction.user.id, false);
					});
				} else {
					await interaction.reply({ embeds: [craftingEmbed] });
				}
			}
		}
	}
};

/**
 * Converts ALL of the starting words to capital letters.
 * @param {string} text
 * 
 * @example
 * startToUppercase('Never gonna give you up')
 * // Expected output: Never Gonna Give You Up
 */
function startToUppercase(text) {
	const texts = text.split(' ');
	const res = [];

	// eslint-disable-next-line no-underscore-dangle
	for (const _text of texts) {
		if (!_text) {
			res.push(_text);
		} else {
			const chars = _text.split('');
			const char = chars.shift();
	
			res.push(
				char.toUpperCase() + chars.join('')
			);
		}
	}

	return res.join(' ');
}