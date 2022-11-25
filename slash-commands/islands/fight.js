// @ts-nocheck
/* eslint-disable no-unused-vars, no-await-in-loop */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection, ComponentType, MessageManager } = require('discord.js');
const { Functions, Functions: { getRandomNumber, resolveArmorStats, commafy }, SkyblockMechanicUtil, Sword, Armor, FuzzySearchUtil, SkyblockTypes, SkybotStatusEffect, Mob } = require('../../SkyblockHelper/src/index');

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`fight`)
		.setDescription(`Go fights something`)
		.addSubcommand(subcommand => subcommand
			.setName(`mob`)
			.setDescription(`Fights a monster for their loot. Hope you dont die though!`)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`barn`)
			.setDescription(`Fights an animal. Make sure to cook the meat before you eat it!`)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`dummy`)
			.setDescription(`Fights a dummy. Useful for testing out Sword Abilities.`)
			.addIntegerOption(option => option
				.setName(`health`)
				.setDescription(`The amount of health this dummy will have. Defaults to 1,000 health.`)
				.setRequired(false)
				.addChoices(
					{ name: `1,000`, value: 1_000 },
					{ name: `2,000`, value: 2_000 },
					{ name: `3,000`, value: 3_000 },
					{ name: `4,000`, value: 4_000 },
					{ name: `5,000`, value: 5_000 },
					{ name: `6,000`, value: 6_000 },
					{ name: `7,000`, value: 7_000 },
					{ name: `8,000`, value: 8_000 },
					{ name: `9,000`, value: 9_000 },
					{ name: `10,000`, value: 10_000 },
					{ name: `100,000`, value: 100_000 },
					{ name: `100k`, value: 100_000 },
					{ name: `1,000,000`, value: 1_000_000 },
					{ name: `1m`, value: 1_000_000 },
					{ name: `10,000,000`, value: 10_000_000 },
					{ name: `10m`, value: 10_000_000 },
					{ name: `100,000,000`, value: 100_000_000 },
					{ name: `100m`, value: 100_000_000 },
					{ name: `1,000,000,000`, value: 1_000_000_000 },
					{ name: `1b`, value: 1_000_000_000 }
				)
			)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`dragon`)
			.setDescription(`Fights the Ender Dragon. Are you sure you want to do this?`)
		),
	group: `Islands`,
	// cooldown: 20,
	cooldownMessage: `You need time to plan your next attack and I need time to recover from rate limits! Wait **{secondsLeft}**\n`,
	require: {
		start: true,
		update: `>=v8.0.0`
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		// Initalizers
		const maidObj = await db.get(maid);
		const { assetMap } = interaction.client;
		const { helmet, chestplate, leggings, boots, sword, chopLevel, mine } = maidObj;
		const update = interaction.client.updateMap.get(maidObj.update);
		const command = interaction.options.getSubcommand();



		// Armor Initializers
		const helmetFile = resolveByEmoji(assetMap, helmet);
		const chestplateFile = resolveByEmoji(assetMap, chestplate);
		const leggingsFile = resolveByEmoji(assetMap, leggings);
		const bootsFile = resolveByEmoji(assetMap, boots);

		const { defense: helmet_def, health: helmet_hp, critChance: helmet_critCh, strength: helmet_str } = resolveArmorStats(helmetFile);
		const { defense: chestplate_def, health: chestplate_hp, critChance: chestplate_critCh, strength: chestplate_str } = resolveArmorStats(chestplateFile);
		const { defense: leggings_def, health: leggings_hp, critChance: leggings_critCh, strength: leggings_str } = resolveArmorStats(leggingsFile);
		const { defense: boots_def, health: boots_hp, critChance: boots_critCh, strength: boots_str } = resolveArmorStats(bootsFile);

		const addedDefense = helmet_def + chestplate_def + leggings_def + boots_def;
		const addedHealth = helmet_hp + chestplate_hp + leggings_hp + boots_hp;
		const addedStrength = helmet_str + chestplate_str + leggings_str + boots_str;
		const addedCritCh = helmet_critCh + chestplate_critCh + leggings_critCh + boots_critCh;



		// Sword stuff
		const swordFile = interaction.client.assetMap.find(asset => asset.keyName === sword.keyName);

		if (!(swordFile instanceof Sword)) return;

		// Sword Initalizers
		const enchantments = sword?.enchantments ?? [];
		const critChance = (sword?.critChance ?? 0) + addedCritCh;
		const damage = swordFile?.swordFunc?.getBaseDamage?.(sword) ?? sword.baseDamage;

		// Fight Initalizers
		const strength = SkyblockMechanicUtil.getStrength(chopLevel) + (sword?.strength ?? 0) + addedStrength;
		
		const playerInfo = {
			health: SkyblockMechanicUtil.getHealth(maidObj.fishLevel) + addedHealth,
			defense: SkyblockMechanicUtil.getDefense(maidObj.mineLevel) + addedDefense
		};

		if (command === 'mob') {
			let mob,
				title = ``;

			if (mine === SkyblockTypes.SkyblockMines.StarterMine) {
				return interaction.reply(`You went looking for a monster in the Starter Mine, only to find out that mobs dont spawn there,  because newer players would always be killed.`);
			} else if (mine === SkyblockTypes.SkyblockMines.IronMine) {
				return interaction.reply(`You went looking for a monster in the Iron Mine, only to find out that mobs dont spawn there, because newer players would always be killed.`);
			} else if (mine === SkyblockTypes.SkyblockMines.GoldMine) {
				return interaction.reply(`You went looking for a monster in the Gold Mine, only to find out that mobs dont spawn there, because newer players would always be killed.`);
			} else if (mine === SkyblockTypes.SkyblockMines.LapisQuarry) {
				return interaction.reply(`You went looking for a monster in the Lapis Quarry, only to find out that mobs dont spawn there, because Lapis Zombie damage is unknown.`);
			} else if (mine === SkyblockTypes.SkyblockMines.RedstoneMine) {
				mob = new Mob()
					.setPlayerDmg(75)
					.setMobName(`Redstone Pigman`)
					.setMobEmoji(`<:Redstone_Pigman:945132913060614204>`)
					.setHealth(250)
					.setXpDrop(20)
					.setCoinDrop(12);

				title = `Redstone Mine`;
			} else if (mine === SkyblockTypes.SkyblockMines.DiamondSanctuary) {
				mob = new Mob()
					.setPlayerDmg(180)
					.setMobName(`Miner Zombie`)
					.setMobEmoji(`<:Miner_Zombie_Lvl_15:945132914990010378>`)
					.setHealth(250)
					.setXpDrop(20)
					.setCoinDrop(12);

				title = `Diamond Sanctuary`;
			} else if (mine === SkyblockTypes.SkyblockMines.TheEnd) {
				mob = new Mob()
					.setPlayerDmg(700)
					.setName(`Enderman`)
					.setEmoji(`<:Enderman:976294699843334185>`)
					.setHealth(9_000)
					.setXpDrop(40)
					.setCoinDrop(15);

				title = `The End`;
			} else if (mine === SkyblockTypes.SkyblockMines.DragonsNest) {
				mob = new Mob()
					.setPlayerDmg(1_250)
					.setName(`Zealot`)
					.setEmoji(`<:Zealot:976294710790455306>`)
					.setHealth(13_000)
					.setXpDrop(40)
					.setCoinDrop(15);

				title = `Dragon's Nest`;
			}

			const fightEmbeds = await SkyblockMechanicUtil.fight(
				{
					baseDamage: damage,
					critChance,
					enchantments,
					maidObj,
					interaction,
					mob,
					playerInfo,
					strength,
					swordFile,
					title,
					db
				}
			);

			if (Functions.getSettingValue(maidObj, 'fightNerd')) {
				// eslint-disable-next-line no-await-in-loop
				for (const fightEmbed of fightEmbeds) await interaction.channel.send({ embeds: [fightEmbed] });
			}

			if (mine === SkyblockTypes.SkyblockMines.DragonsNest && getRandomNumber(1, 420) === 420) {
				interaction.channel.send({ content: `And you lucky ducky, you also found a <:Summoning_Eye:976317456463314994> **Summoning Eye**!` });

				maidObj.summoningEye += 1;
			}

			await db.set(maid, maidObj);
		} else if (command === 'barn') {
			if (update < 12) return interaction.reply({ content: `❗ You need to update to Skybot **v9.0.0** to use this argument!`, ephemeral: true });

			const enclosure = maidObj?.enclosure;

			if (enclosure === 'cow') {
				const beefRng = getRandomNumber(1, 3);
				const leatherRng = getRandomNumber(0, 2);

				let content = `${swordFile.displayEmojiName()} ${interaction.user}, you killed a <:Cow:953484829935173652> Cow!\n\n**+3 <:Combat:946253940863942687> Combat XP <:ExperienceOrb:900572424381272064>**\n**+${beefRng} <:Raw_Beef:953470247292244038> Raw Beef**`;

				if (leatherRng) content += `**+${leatherRng} <:Leather:966938933156016158> Leather**`;

				await interaction.reply({ content });

				maidObj.rawBeef += beefRng;
				maidObj.leather += leatherRng;
				maidObj.combatXp += 3;
			} else if (enclosure === 'pig') {
				const porkchopRng = getRandomNumber(1, 3);

				await interaction.reply(`${swordFile.displayEmojiName()} ${interaction.user}, you killed a <:Pig:953484801925578752> Pig!\n\n**+3 <:Combat:946253940863942687> Combat XP <:ExperienceOrb:900572424381272064>**\n**+${porkchopRng} <:Raw_Porkchop:953469999509545000> Raw Porkchop**`);

				maidObj.rawPorkchop += porkchopRng;
				maidObj.combatXp += 3;
			} else if (enclosure === 'sheep') {
				const muttonRng = getRandomNumber(1, 3);

				await interaction.reply(`${swordFile.displayEmojiName()} ${interaction.user}, you killed a <:Sheep:953484839292653578> Sheep!\n\n**+3 <:Combat:946253940863942687> Combat XP <:ExperienceOrb:900572424381272064>**\n**+${muttonRng} <:Raw_Mutton:953484740571299970> Raw Mutton**`);

				maidObj.rawMutton += muttonRng;
				maidObj.combatXp += 3;
			} else if (enclosure === 'chicken') {
				const chickenRng = getRandomNumber(1, 3);

				await interaction.reply(`${swordFile.displayEmojiName()} ${interaction.user}, you killed a <:Chicken:953484815255093318> Chicken!\n\n**+2 <:Combat:946253940863942687> Combat XP <:ExperienceOrb:900572424381272064>**\n**+${chickenRng} <:Raw_Chicken:953470062302474250> Raw Chicken*.`);

				maidObj.rawChicken += chickenRng;
				maidObj.combatXp += 2;
			}

			await db.set(maid, maidObj);
		} else if (command === 'dummy') {
			if (!maidObj?.dummy || maidObj?.dummy < 1) return interaction.reply({ content: `You need at least **1x** <:Dummy:963296810598809631> **Dummy** to use \`/fight dummy\`. You can't test out your sword on the wall.`, ephemeral: true });

			const dummyHP = interaction.options.getInteger('health', false) ?? 1_000;

			const mob = new Mob()
				.setPlayerDmg(0)
				.setMobName(`Dummy`)
				.setMobEmoji(`<:Dummy:963296810598809631>`)
				.setHealth(dummyHP)
				.setXpDrop(0)
				.setCoinDrop(0);

			const fightEmbeds = await SkyblockMechanicUtil.fight(
				{
					baseDamage: damage,
					critChance,
					enchantments,
					maidObj,
					interaction,
					mob,
					playerInfo,
					strength,
					swordFile,
					title: `Dummy`,
					db
				}
			);

			if (fightEmbeds.length > 5) {
				const cantSendEmbed = new EmbedBuilder()
					.setTitle(`Request Control: Ratelimits`)
					.setDescription(`{ code: 0, error: "Too Many Embeds", command: "fight", message: "There are too many events in the embed! Don't use THAT MUCH HP while fighting with ${swordFile.displayEmojiName()} \`${swordFile.name}\`" }`)
					.setFooter({ text: `Request Control has disabled "settings.fightNerd" for this` });

				return interaction.channel.send({ embeds: [cantSendEmbed] });
			}

			if (Functions.getSettingValue(maidObj, 'fightNerd')) {
				for (const fightEmbed of fightEmbeds) {					
					await interaction.channel.send({ embeds: [fightEmbed] });
				}
			}

			if (getRandomNumber(1, 100) >= 100) {
				await interaction.channel.send({ content: `Your dummy couldn't handle any more attacks, so it broke! You now have ${maidObj.dummy - 1} dummy.` });

				maidObj.dummy -= 1;
			}

			await db.set(maid, maidObj);
		} else if (command === 'dragon') {
			if (maidObj.mine !== SkyblockTypes.SkyblockMines.DragonsNest) return interaction.reply({ content: `You need to be in the \`Dragon's Nest\` to fight the Ender Dragon!`, ephemeral: true });

			const existingCheck = interaction.client.dragonFights.has(interaction.guildId);
			const cantEnterCheck = !interaction.client.dragonFights.get(interaction.guildId)?.allowedUsers?.includes(interaction.user.id);
			const fightTypeCheck = interaction.client.dragonFights.get(interaction.guildId)?.dragonFight.isOngoingFight();

			if (existingCheck && cantEnterCheck && fightTypeCheck) return interaction.reply({ content: `You little cheater! Tried to bypass the system by changing to the \`Dragon's Nest\` in another guild? Well, I am one step ahead of you!`, ephemeral: true });



			const { DragonFight } = require('../../SkyblockHelper/src/index');
			let allowSet = true;

			/** @type {DragonFight<'DORMANT' | 'ONGOING' | 'COOLDOWN'>} */
			const dragonFight = interaction.client.dragonFights.get(interaction.guildId)?.dragonFight ?? new DragonFight(interaction.guild);

			if (dragonFight.isCooldownFight()) {
				if (Date.now() >= dragonFight.cooldown) {
					const registeredUsers = await Functions.collectAllGuildUserObjs(db, interaction.guild);

					const allowedUsers = registeredUsers
						.filter(userObj => userObj.mine === SkyblockTypes.SkyblockMines.DragonsNest)
						.map((_userObj, user) => user);

					allowSet = false;
					interaction.client.dragonFights.set(interaction.guildId, { dragonFight: new DragonFight(interaction.guild), allowedUsers: allowedUsers });

					const cooldownEmbed = new EmbedBuilder()
						.setColor(`#2f3136`)
						.setTitle(`Woah there!`)
						.setThumbnail(`https://static.wikia.nocookie.net/hypixel-skyblock/images/0/0a/Ender_Dragon.gif/revision/latest?cb=20220323212900`)
						.setDescription(`This Guild has just challenged the Ender Dragon recently! You can summon it again <t:${Math.floor(dragonFight.cooldown / 1000)}:R>.`);

					interaction.client.cooldowns.get('fight').delete(maid);

					return interaction.reply({ embeds: [cooldownEmbed], ephemeral: true });
				} else {
					const cooldownEmbed = new EmbedBuilder()
						.setColor(`#2f3136`)
						.setTitle(`Woah there!`)
						.setThumbnail(`https://static.wikia.nocookie.net/hypixel-skyblock/images/0/0a/Ender_Dragon.gif/revision/latest?cb=20220323212900`)
						.setDescription(`This Guild has just challenged the Ender Dragon recently! You can summon it again <t:${Math.floor(dragonFight.cooldown / 1000)}:R>.`);

					interaction.client.cooldowns.get('fight').delete(maid);

					return interaction.reply({ embeds: [cooldownEmbed], ephemeral: true });
				}
			}

			const dragonTypeResolver = {
				PROTECTOR: `Protector`,
				OLD: `Old`,
				WISE: `Wise`,
				UNSTABLE: `Unstable`,
				YOUNG: `Young`,
				STRONG: `Strong`,
				SUPERIOR: `Superior`,
			};

			dragonFight.removeAllListeners();

			/*
			interaction.client.on('interactionCreate', i => {
				// console.log(`Command Check: ${i.isCommand()}\nName Check: ${i.commandName === `fight`}\nGuild Check: ${i.guildId === interaction.guildId}\nUser Check: ${i.user.id === interaction.user.id}`);
			
				if (i.isCommand() && i.commandName === `fight` && i.guildId === interaction.guildId && i.user.id === interaction.user.id) {
					dragonFight.removeAllListeners();
				}
			});
			*/

			dragonFight.on(`eyePlaced`, async (guildMember, totalEyes) => {
				dragonFight.addDragonWeight(guildMember.id, 100);

				if (totalEyes < 8) {
					await interaction.channel.send({ content: `${guildMember} placed a <:Summoning_Eye:976317456463314994> **Summoning Eye**! (${totalEyes}/8)` });
				} else {
					await interaction.channel.send({ content: `${guildMember} placed a <:Summoning_Eye:976317456463314994> **Summoning Eye**! Brace yourselves! (8/8)` });

					for (const [user, eyes] of dragonFight.eyes?.entries() ?? []) {
						const userObj = await db.get(user);

						if (!userObj?.remnantOfTheEye) {
							userObj.remnantOfTheEye = eyes;
						} else {
							userObj.remnantOfTheEye += eyes;
						}

						await db.set(user, userObj);
					}
				}

				interaction.client.cooldowns.get('fight').delete(guildMember.id);
			});

			dragonFight.on(`eyeRemove`, async guildMember => {
				dragonFight.addDragonWeight(guildMember.id, -100);

				await interaction.channel.send({ content: `${guildMember} removed their <:Summoning_Eye:976317456463314994> **Summoning Eye**!` });

				interaction.client.cooldowns.get('fight').delete(guildMember.id);
			});

			dragonFight.on(`dragonSummon`, async type => {	
				await interaction.channel.send({ content: `<:Ender_Dragon:976294742381973524> The ${dragonTypeResolver[type]} Dragon has spawned!` });
			});

			dragonFight.on(`dragonAttack`, async (attackType, affectedUsers) => {
				const atkTypeResolver = {
					RUSH: `Rush`,
					FIREBALL: `Fireball`,
					LIGHTNING: `Lightning Strike`
				};

				const damagedUsers = affectedUsers
					.map(atkObj => {
						if (atkObj.blocked > 0) {
							return `${atkObj.user}: -${commafy(atkObj.damage)} <:Health:944105139944452157> (-${commafy(atkObj.original)} <:Health:944105139944452157>, **-${atkObj.blocked}%**)`;
						} else {
							return `${atkObj.user}: -${commafy(atkObj.damage)} <:Health:944105139944452157>`;
						}
					})
					.join('\n');

				const dragonAttackEmbed = new EmbedBuilder()
					.setColor(`#ff5555`)
					.setTitle(`<:Ender_Dragon:976294742381973524> ${dragonTypeResolver[dragonFight?.dragonVariant]} Dragon used \`${atkTypeResolver[attackType]}\` on these players:`)
					.setDescription(damagedUsers);

				await interaction.channel.send({ embeds: [dragonAttackEmbed] });
			});

			dragonFight.on(`playerDeaths`, async (users, atkType) => {
				const realDeadUsers = [];

				for (const user of users) {
					const userObj = await db.get(user.id);

					const deathEnum = await SkyblockMechanicUtil.performDeath(
						user.user, 
						userObj, 
						`You died while trying to fight the ${dragonTypeResolver[dragonFight?.dragonVariant]} Dragon`, 
						db
					);

					// SkyblockMechanicUtil#performDeath() makes a change to userObj, since we want to "save" that change, we get the updated userObj.
					const newUserObj = await db.get(user.id);

					switch (deathEnum) {
					case 2: {
						newUserObj.mine = `dragons_nest`;

						const userDragonFightObj = dragonFight.dragonDamage.get(user.id);
						
						// Revive the user.
						userDragonFightObj.dead = false;
						userDragonFightObj.health.current = userDragonFightObj.health.initial;

						dragonFight.dragonDamage.set(user.id, userDragonFightObj);
						break;
					}
					default:
						newUserObj.mine = `the_end`;

						realDeadUsers.push(user);
						break;
					}

					await db.set(user.id, newUserObj);
				}

				// To allow more "flexible" functionality, the function to filter out alive users is here instead of built-in.
				dragonFight.filterAliveUser();

				realDeadUsers
					.map(user => `${user} was killed by ${dragonTypeResolver[dragonFight?.dragonVariant]} Dragon.`)
					.join('\n');

				const dragonAttackEmbed = new EmbedBuilder()
					.setColor(`#ff5555`)
					.setDescription(
						realDeadUsers
							.map(user => `${user} was killed by ${dragonTypeResolver[dragonFight?.dragonVariant]} Dragon.`)
							.join('\n')
					);

				if (realDeadUsers.length) await interaction.channel.send({ embeds: [dragonAttackEmbed] });
			});

			dragonFight.on(`dragonFlee`, async () => {
				const dragonFleeEmbed = new EmbedBuilder()
					.setColor(`Red`)
					.setTitle(`${dragonTypeResolver[dragonFight?.dragonVariant].toUpperCase()} DRAGON ESCAPED!`)
					.setDescription(`All players fighting the dragon have died, so the dragon made a run for it! Good luck next time!`);

				await interaction.channel.send({ embeds: [dragonFleeEmbed] });

				// eslint-disable-next-line require-atomic-updates
				dragonFight.type = `COOLDOWN`;

				// eslint-disable-next-line require-atomic-updates
				dragonFight.cooldown = Date.now() + 600_000;
			});

			dragonFight.on(`dragonDeath`, async (type, damageDealt, lastHit) => {
				const userObjects = await Functions.collectAllGuildUserObjs(db, interaction.guild);

				const sorted = damageDealt
					.sort((a, b) => b.damage - a.damage);

				const top3Damagers = sorted
					.map((fightInfo, user) => [user, fightInfo])
					// eslint-disable-next-line array-callback-return
					.map((value, index) => {
						if (index < 3) {
							const user = interaction.guild.members.cache.get(value[0]);

							return `${ordinalNumber(index + 1)} Damager: ${user}`;
						}
					})
					.join('\n');

				const sortedDamageDealt = sorted
					.map((fightInfo, user) => [user, fightInfo])
					.map((value, index) => {
						const user = interaction.guild.members.cache.get(value[0]);
						const swordFile = interaction.client.assetMap
							.find(asset => asset.keyName === userObjects.get(user.id).sword.keyName);

						return `**${ordinalNumber(index + 1)}**: ${user}\n${swordFile.displayEmojiName()} **${Functions.commafy(value[1].damage)} damage**`;
					})
					.join('\n');

				sorted
					.map((fightInfo, user) => [user, fightInfo])
					.forEach(([user, fightInfo], index) => {
						if (index === 1) {
							dragonFight.addDragonWeight(user, 300);
						} else if (index === 2) {
							dragonFight.addDragonWeight(user, 250);
						} else if (index === 3) {
							dragonFight.addDragonWeight(user, 200);
						} else if (index === 4) {
							dragonFight.addDragonWeight(user, 125);
						} else if (index === 5) {
							dragonFight.addDragonWeight(user, 110);
						} else if (6 <= index && index <= 8) {
							dragonFight.addDragonWeight(user, 100);
						} else if (9 <= index && index <= 10) {
							dragonFight.addDragonWeight(user, 90);
						} else if (11 <= index && index <= 12) {
							dragonFight.addDragonWeight(user, 80);
						} else if (13 <= index && index <= 25) {
							dragonFight.addDragonWeight(user, 70);
						}

						if (fightInfo.damage >= 1) {
							dragonFight.addDragonWeight(user, 70);
						} else {
							dragonFight.addDragonWeight(user, 10);
						}
					});
				
				
				const dragonDeathEmbed = new EmbedBuilder()
					.setColor(`Green`)
					.setTitle(`${dragonTypeResolver[type].toUpperCase()} DRAGON DOWN!`)
					.setThumbnail(`https://static.wikia.nocookie.net/hypixel-skyblock/images/0/0a/Ender_Dragon.gif/revision/latest?cb=20220323212900`)
					.setDescription(`${lastHit.displayName} dealt the final blow.\n\n${top3Damagers}`);

				const damageDealerEmbed = new EmbedBuilder()
					.setColor(`Green`)
					.setTitle(`Damage Dealers:`)
					.setDescription(sortedDamageDealt);

				const resolvedDragonWeight = dragonFight.dragonWeight
					.map((weight, user) => ({ loot: resolveDragonWeight(weight, dragonFight?.dragonVariant), user }));

				const dragonLootEmbed = new EmbedBuilder()
					.setColor(`Green`)
					.setTitle(`Obtained Dragon Loot:`)
					.addFields(
						resolvedDragonWeight
							.map(weightData => {
								return {
									name: interaction.guild.members.cache.get(weightData.user).displayName,
									value: weightData.loot
										.map((amount, item) => {
											const itemFile = FuzzySearchUtil.searchAndReturn(
												interaction.client.assetMap,
												item
											);
	
											return `+**${commafy(amount)}x** ${itemFile.displayEmojiName()} **${itemFile.name}**`;
										})
										.join('\n')
								};
							})
					);

				for (const { loot, user } of resolvedDragonWeight.values()) {
					const userObj = await db.get(user);

					loot.forEach((amount, key) => { userObj[key] += amount; });
					
					await db.set(user, userObj);
				}

				await interaction.channel.send({ embeds: [dragonDeathEmbed, damageDealerEmbed, dragonLootEmbed] });
			});

			if (dragonFight.isDormantFight()) {
				const row = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
							.setCustomId(`addSummoningEye`)
							.setEmoji(`<:Summoning_Eye:976317456463314994>`)
							.setStyle(maidObj.summoningEye > 0 ? ButtonStyle.Success : ButtonStyle.Secondary)
							.setLabel(maidObj.summoningEye > 0 ? `Add a Summoning Eye!` : `You dont have any Summoning Eyes!`)
							.setDisabled(!(maidObj.summoningEye > 0)),
						new ButtonBuilder()
							.setCustomId(`remSummoningEye`)
							.setEmoji(`<:Summoning_Eye:976317456463314994>`)
							.setStyle(dragonFight?.eyes?.get(maid) > 0 ? ButtonStyle.Danger : ButtonStyle.Secondary)
							.setLabel(dragonFight?.eyes?.get(maid) > 0 ? `Remove a Summoning Eye!` : `You dont have any placed Summoning Eyes!`)
							.setDisabled(!(dragonFight?.eyes?.get(maid) > 0))
					);
		
				/**
				 * @type {import ('discord.js').Message}
				 */
				const sent = await interaction.reply({ content: `There is no ongoing Dragon Fight in this Guild!`, components: [row], ephemeral: true, fetchReply: true });

				const collector = sent.createMessageComponentCollector(
					{
						filter: i => i.user.id === interaction.user.id,
						componentType: ComponentType.Button,
						idle: 15_000,
					}
				);

				collector.on(`collect`, async button => {
					const maidObj = await db.get(maid);

					if (button.customId === `addSummoningEye`) {
						maidObj.summoningEye -= 1;
						dragonFight.addSummoningEye(maid);
	
						await db.set(maid, maidObj);
					} else if (button.customId === `remSummoningEye`) {	
						const res = dragonFight.remSummoningEye(maid);
						if (res) maidObj.summoningEye += 1;
	
						await db.set(maid, maidObj);
					}

					const row = new ActionRowBuilder()
						.addComponents(
							new ButtonBuilder()
								.setCustomId(`addSummoningEye`)
								.setEmoji(`<:Summoning_Eye:976317456463314994>`)
								.setStyle(maidObj.summoningEye > 0 ? ButtonStyle.Success : ButtonStyle.Secondary)
								.setLabel(maidObj.summoningEye > 0 ? `Add a Summoning Eye!` : `You dont have any Summoning Eyes!`)
								.setDisabled(!(maidObj.summoningEye > 0)),
							new ButtonBuilder()
								.setCustomId(`remSummoningEye`)
								.setEmoji(`<:Summoning_Eye:976317456463314994>`)
								.setStyle(dragonFight?.eyes?.get(maid) > 0 ? ButtonStyle.Danger : ButtonStyle.Secondary)
								.setLabel(dragonFight?.eyes?.get(maid) > 0 ? `Remove a Summoning Eye!` : `You dont have any placed Summoning Eyes!`)
								.setDisabled(!(dragonFight?.eyes?.get(maid) > 0))
						);

					await button.update({ components: [row] });

					if (dragonFight?.eyes?.reduce((acc, eyes) => acc + eyes, 0) === 8) {
						collector.stop();
					}
				});

				collector.on(`end`, async () => {
					const row = new ActionRowBuilder()
						.addComponents(
							new ButtonBuilder()
								.setCustomId(`addSummoningEye`)
								.setEmoji(`<:Summoning_Eye:976317456463314994>`)
								.setStyle(maidObj.summoningEye > 0 ? ButtonStyle.Success : ButtonStyle.Secondary)
								.setLabel(maidObj.summoningEye > 0 ? `Add a Summoning Eye!` : `You dont have any Summoning Eyes!`)
								.setDisabled(true),
							new ButtonBuilder()
								.setCustomId(`remSummoningEye`)
								.setEmoji(`<:Summoning_Eye:976317456463314994>`)
								.setStyle(dragonFight?.eyes?.get(maid) > 0 ? ButtonStyle.Danger : ButtonStyle.Secondary)
								.setLabel(dragonFight?.eyes?.get(maid) > 0 ? `Remove a Summoning Eye!` : `You dont have any placed Summoning Eyes!`)
								.setDisabled(true)
						);

					await interaction.editReply({ components: [row] });

					dragonFight.removeAllListeners();
				});
			}

			if (dragonFight.isOngoingFight()) {
				const existingDragonFight = interaction.client.dragonFights
					.filter((_guildDragonFight, guildId) => guildId !== interaction.guild.id)
					.find(guildDragonFight => guildDragonFight.dragonFight?.dragonDamage.has(interaction.user.id));

				const key = interaction.client.dragonFights
					.findKey(value => value.dragonFight === existingDragonFight);

				const existingDragonFightGuild = interaction.client.guilds.cache.get(key);

				if (existingDragonFight) return interaction.reply({ content: `You cannot participate in this Dragon Fight because you have an existing Dragon Fight in **${existingDragonFightGuild.name}**!`, ephemeral: true });



				const dragonHealthResolver = {
					PROTECTOR: 9_000_000,
					OLD: 15_000_000,
					WISE: 9_000_000,
					UNSTABLE: 9_000_000,
					YOUNG: 7_500_000,
					STRONG: 9_000_000,
					SUPERIOR: 12_000_000,
				};

				const damage = SkyblockMechanicUtil.getDamage(
					{
						critChance,
						swordFile,
						mob: {
							isFirstStriked: false,
							health: {
								current: dragonFight?.dragonHealth || 9_000_000,
								initial: dragonHealthResolver[dragonFight.dragonVariant]
							},
						},
						maidObj,
						health: playerInfo.health
					}
				);

				dragonFight.addDragonDamage(
					maid, 
					damage.damage, 
					playerInfo.health, 
					playerInfo.defense
				);

				const userDragonFightObj = dragonFight.dragonDamage.get(maid);
				
				if ((userDragonFightObj.health.current + damage.healing) > userDragonFightObj.health.initial) {
					// To prevent the user from "overhealing"
					userDragonFightObj.health.current = userDragonFightObj.health.initial;
				} else {
					// This means that the heal isn't going to be enough to fill out the users health bar.
					userDragonFightObj.health.current += damage.healing;
				}

				const dragonFightEmbed = new EmbedBuilder()
					.setColor(`#2f3136`)
					.setDescription(`${swordFile.displayEmojiName()} You dealt <:Normal_Hit:968705475677913138> **${Functions.commafy(damage.damage > 500_000 ? 500_000 : damage.damage)} damage** to the <:Ender_Dragon:976294742381973524> **${dragonTypeResolver[dragonFight.dragonVariant]} Dragon**\n\nDragon Health: ${Functions.commafy(dragonFight?.dragonHealth)} <:Health:944105139944452157>\nYour Damage: ${Functions.commafy(dragonFight.dragonDamage.get(maid).damage)} <:Damage:978132398615183462>\nYour Health: ${Functions.commafy(Math.floor(dragonFight.dragonDamage.get(maid).health.current))} <:Health:944105139944452157>`);

				await interaction.reply({ embeds: [dragonFightEmbed], ephemeral: true });
			}

			if (allowSet) {
				interaction.client.dragonFights.set(
					interaction.guildId, 
					{ 
						dragonFight, 
						allowedUsers: (await Functions.collectAllGuildUserObjs(db, interaction.guild))
							.filter(userObj => userObj.mine === SkyblockTypes.SkyblockMines.DragonsNest)
							.map((_userObj, user) => user)
					}
				);
			}
		}
	}
};

function ordinalNumber(number) {
	switch (number) {
	case 1:
		return `${number}st`;
	case 2:
		return `${number}nd`;
	case 3:
		return `${number}rd`;
	default:
		return `${number}th`;
	}
}

/**
 * @param {Collection<string, import ('discord.js').AssetMapValues>} assetMap 
 * @param {string} emoji 
 * @returns {import ('discord.js').AssetMapValues}
 */
function resolveByEmoji(assetMap, emoji) {
	return assetMap.find(asset => asset.displayEmojiName() === emoji);
}

/**
 * @param {number} dragonWeight
 * @param {string} dragonType
 * @returns {Collection<string, number>}
 */
function resolveDragonWeight(dragonWeight, dragonType) {
	/** @type {Collection<string, number>} */
	const items = new Collection();

	items
		.set(`${dragonType.toLowerCase()}DragonHelmet`, 295)
		.set(`${dragonType.toLowerCase()}DragonChestplate`, 410)
		.set(`${dragonType.toLowerCase()}DragonLeggings`, 360)
		.set(`${dragonType.toLowerCase()}DragonBoots`, 290);

	const item = items
		.filter(reqWeight => reqWeight <= dragonWeight)
		.randomKey();

	dragonWeight -= items.get(item);

	const fragments = Math.floor(dragonWeight / 22);

	const gotItems = new Collection();

	gotItems
		.set(item, 1)
		.set(`${dragonType.toLowerCase()}DragonFragment`, fragments);

	return gotItems;
}

SkyblockMechanicUtil.registerStatusEffects(
	new SkybotStatusEffect()
		.setEmoji(`<:Fire:960709091167191040>`)
		.setEffectDuration(4)
		.setId(`Fire`)
		.setName(`Fire`)
		.setType(SkyblockTypes.StatusEffectTypes.PeriodicDamage)
		.setStatusEffectFunction((fightActions, statusEffect, baseDamage, addedDamage) => {
			const fireDamage = Math.floor((baseDamage + addedDamage) * 0.25);
			fightActions.push(`<:Fire:960709091167191040> Debuff \`Fire\` added **${commafy(fireDamage)}** damage!`);
		
			addedDamage += fireDamage;
		}),
	new SkybotStatusEffect()
		.setEmoji(`<:Electrocuted:1021235932717908059>`)
		.setEffectDuration(Infinity)
		.setId(`Electrocuted`)
		.setName(`Electrocuted`)
		.setType(SkyblockTypes.StatusEffectTypes.PeriodicDamage)
		.setStatusEffectFunction((fightActions, statusEffect, baseDamage, addedDamage) => {
			const electrocutedDamage = Math.floor((baseDamage + addedDamage) * 0.55);
			fightActions.push(`<:Electrocuted:1021235932717908059> Debuff \`Electrocuted\` added **${commafy(electrocutedDamage)}** damage!`);
		
			addedDamage += electrocutedDamage;
		}),
	new SkybotStatusEffect()
		.setEmoji(`<:Attack_Down:1002470257836953640>`)
		.setEffectDuration(3)
		.setId(`Attack_Down`)
		.setName(`Attack_Down`)
		.setType(SkyblockTypes.StatusEffectTypes.Debuff)
		.setStatusEffectFunction((fightActions, statusEffect, mobObject, mob) => {
			mobObject.damage *= 0.8;

			fightActions.push(`<:Attack_Down:1002470257836953640> Debuff \`Attack_Down\` has decreased the ${mob.emoji} ${mob.name}'s damage to ${mobObject.damage}!`);
		}),
	new SkybotStatusEffect()
		.setEmoji(`<:Stun:1002470359641096252>`)
		.setEffectDuration(3)
		.setId(`Stun`)
		.setName(`Stun`)
		.setType(SkyblockTypes.StatusEffectTypes.Stun)
		.setStatusEffectFunction((fightActions, statusEffect, mob) => {
			fightActions.push(`<:Stun:1002470359641096252> Debuff \`Stun\` has stunned the ${mob.emoji} ${mob.name}!`);
		})
);