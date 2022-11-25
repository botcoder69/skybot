/* eslint-disable no-unused-vars */
const { SlashCommandBuilder } = require('@discordjs/builders');
const { ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');
const { Functions, SelectMenuConfirmation, SkyblockTypes, Paginator } = require('../../SkyblockHelper/src/index');

const tutorialEmbed = new EmbedBuilder()
	.setColor(`#2f3136`)
	.setTitle('Deepmines')
	.setDescription('This allows you to interact with the Skybot Deepmines.')
	.addFields(
		{ name: `Help Argument`, value: `This gives you help on all of the mines inside the deepmines.` },
		{ name: `Switch Argument`, value: `This allows you to freely switch between mines, given that you have the proper Mining Level to enter.` }
	);

module.exports = {
	data: new SlashCommandBuilder()
		.setName(`deepmines`)
		.setDescription(`Interact with the Skybot Deepmines`)
		.addSubcommand(subcommand => subcommand
			.setName(`help`)
			.setDescription(`Gets information on all the mines inside the Deepmines`)
		)
		.addSubcommand(subcommand => subcommand
			.setName(`switch`)
			.setDescription(`Switches to another mine inside the Deepmines`)
		),
	group: `Islands`,
	tutorial: {
		embeds: [tutorialEmbed],
		key: `deepmines`
	},
	require: {
		start: true,
	},
	/**
	 * @param {ChatInputCommandInteraction} interaction 
	 * @param {any} db
	 * @param {string} maid
	 */
	async execute(interaction, db, maid) {
		const maidObj = await db.get(maid);

		maidObj.subareaUnlocks = [`forsaken_tunnel`, `crystal_hollows`];

		const { mine, mineLevel, combatLevel, subareaUnlocks } = maidObj;
		const update = interaction.client.updateMap.get(maidObj.update);

		const command = interaction.options.getSubcommand();

		if (command === "help") {
			const deepminesEmbeds = [
				new EmbedBuilder()
					.setColor(`#2f3136`)
					.setTitle('📍 Location - `Starter Mine`.')
					.setDescription('This place is where you start mining, The starter mine. Here, the ores are cobblestone and coal. You will gain access to higher level mines when you get Mining Level 4 ')
					.setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/2/28/Deep_Caverns.png/revision/latest?cb=20200515165145'),
				new EmbedBuilder()
					.setColor(`#2f3136`)
					.setTitle('📍 Location - `Iron Mine`.')
					.setDescription('This place is where you start to mine iron. Here, the ores range from cobblestone to iron (cobblestone, coal, iron). You will gain access to higher level mines when you get Mining Level 10')
					.setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/2/28/Deep_Caverns.png/revision/latest?cb=20200515165145'),
				new EmbedBuilder()
					.setColor(`#2f3136`)
					.setTitle('📍 Location - `Gold Mine`.')
					.setDescription('This place is where you start to mine gold. Here, the ores range from cobblestone to gold (cobblestone, coal, iron, gold). You will gain access to higher level mines when you get Mining Level 20')
					.setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/2/28/Deep_Caverns.png/revision/latest?cb=20200515165145'),
				new EmbedBuilder()
					.setColor(`#2f3136`)
					.setTitle('📍 Location - `Lapis Reserve`.')
					.setDescription('This place is where you start mining lapis. Here, the ores are only cobblestone and lapis. (cobblestone, lapis) You will gain access to higher level mines when you get Mining Level 25')
					.setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/2/28/Deep_Caverns.png/revision/latest?cb=20200515165145'),
				new EmbedBuilder()
					.setColor(`#2f3136`)
					.setTitle('📍 Location - `Diamond Sanctuary`.')
					.setDescription('This place is the last mine in the Deep Mines as of now. Here, the ores range from cobblestone and diamonds to enchanted diamonds (cobblestone, diamonds, enchanted diamonds).\n\nThis is the last mine of the Deep Mines as of now.')
					.setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/2/28/Deep_Caverns.png/revision/latest?cb=20200515165145'),
			];

			if (update >= interaction.client.updateMap.get('3.3.0')) {
				Functions.addArrayElement(
					deepminesEmbeds,
					new EmbedBuilder()
						.setColor(`#2f3136`)
						.setTitle('📍 Location - `Redstone Quarry`.')
						.setDescription('This place is where you start mining redstone. Here, the ores are only cobblestone and redstone. (cobblestone, redstone) You will gain access to higher level mines when you get Mining Level 35')
						.setThumbnail('https://static.wikia.nocookie.net/hypixel-skyblock/images/2/28/Deep_Caverns.png/revision/latest?cb=20200515165145'),
					4
				);
			}

			await Paginator(interaction, deepminesEmbeds);
		} else if (command === "switch") {
			let selectOptions = [
				{
					label: `Starter Mine`,
					description: `Requires: Mining Level 0`,
					emoji: `<:Mine:816908527670001686>`,
					value: `starter_mine`,
					default: true,
					disabled: mineLevel >= 0 ? false : true,
					message: {
						embeds: [
							new EmbedBuilder()
								.setColor(`#2f3136`)
								.setTitle(`Subarea: Starter Mine`)
								.setDescription(`The first cave of the deepmines, this is where you normally start.\n\nOres:\n> <:Cobblestone:816984558317600799>\n> <:Coal:929899617888370708>`)
						]
					}
				},
				{
					label: `Iron Mine`,
					description: `Requires: Mining Level 4`,
					emoji: `<:Mine:816908527670001686>`,
					value: `iron_mine`,
					default: false,
					disabled: !(mineLevel >= 4),
					message: {
						embeds: [
							new EmbedBuilder()
								.setColor(`#2f3136`)
								.setTitle(`Subarea: Iron Mine`)
								.setDescription(`The next cave of the deepmines, this is where you start to get iron.\n\nOres:\n> <:Cobblestone:816984558317600799>\n> <:Coal:929899617888370708>\n> <:Iron_Ore:816983943584022539>`)
						]
					}
				},
				{
					label: `Gold Mine`,
					description: `Requires: Mining Level 6`,
					emoji: `<:Mine:816908527670001686>`,
					value: `gold_mine`,
					default: false,
					disabled: !(mineLevel >= 6),
					message: {
						embeds: [
							new EmbedBuilder()
								.setColor(`#2f3136`)
								.setTitle(`Subarea: Gold Mine`)
								.setDescription(`The next cave of the deepmines, this is where you start to get gold.\n\nOres:\n> <:Cobblestone:816984558317600799>\n> <:Coal:929899617888370708>\n> <:Iron_Ore:816983943584022539>\n> <:Gold_Ore:816983943794524221>`)
						]
					}
				},
				{
					label: `Lapis Reserve`,
					description: `Requires: Mining Level 8`,
					emoji: `<:Mine:816908527670001686>`,
					value: `lapis_reserve`,
					default: false,
					disabled: !(mineLevel >= 8),
					message: {
						embeds: [
							new EmbedBuilder()
								.setColor(`#2f3136`)
								.setTitle(`Subarea: Lapis Reserve`)
								.setDescription(`The next cave of the deepmines, this is where you get lapis.\n\nOres:\n> <:Cobblestone:816984558317600799>\n> <:Lapis:816988928372375603>`)
						]
					}
				},
				{
					label: `Diamond Sanctuary`,
					description: `Requires: Mining Level 15`,
					emoji: `<:Mine:816908527670001686>`,
					value: `diamond_sanctuary`,
					default: false,
					disabled: !(mineLevel >= 15),
					message: {
						embeds: [
							new EmbedBuilder()
								.setColor(`#2f3136`)
								.setTitle(`Subarea: Diamond Sanctuary`)
								.setDescription(`The last cave of the deepmines, this is where you get diamonds and pure diamonds.\n\nOres:\n> <:Cobblestone:816984558317600799>\n> <:Diamond:902764556697341952>\n> <:Pure_Diamond:816833532184887346>`)
						]
					}
				}
			];

			// console.log(`Update Number: ${update}\nUpdate Map Number: ${updateMap.get('3.3.0')}\n${update >= updateMap.get('3.3.0')}`);

			// If the user's update value is greater than the 3.3.0 update value, add the Redstone Mine into the choices
			if (update >= interaction.client.updateMap.get('3.3.0')) Functions.addArrayElement(
				selectOptions,
				{
					label: `Redstone Mine`,
					description: `Requires: Mining Level 10`,
					emoji: `<:Mine:816908527670001686>`,
					value: `redstone_mine`,
					default: false,
					disabled: !(mineLevel >= 10),
					message: {
						embeds: [
							new EmbedBuilder()
								.setColor(`#2f3136`)
								.setTitle(`Subarea: Redstone Mine`)
								.setDescription(`The first cave of the deepmines, this is where you get redstone.\n\nOres:\n> <:Cobblestone:816984558317600799> Cobblestone\n> <:Redstone_Dust:907504986840252417> Redstone Dust`)
						]
					},
				},
				4
			);

			// If the user's update value is greater than the 11.0.0 update value, add The End stuff into the choices
			if (update >= interaction.client.updateMap.get('11.0.0')) {
				/**
				 * If the user's current mine is in "The End", give them the choice to:
				 *     • Go back to the Diamond Sanctuary, or
				 *     • Go to the Dragon's Nest
				 */
				if (mine === SkyblockTypes.SkyblockMines.TheEnd) {
					selectOptions = [
						{
							label: `Portal back to the Diamond Sanctuary`,
							description: `Requires: Mining Level 15`,
							emoji: `<:Mine:816908527670001686>`,
							value: `diamond_sanctuary`,
							default: true,
							disabled: !(mineLevel >= 15),
							message: {
								embeds: [
									new EmbedBuilder()
										.setColor(`#2f3136`)
										.setTitle(`Subarea: Diamond Sanctuary`)
										.setDescription(`The last cave of the deepmines, this is where you get diamonds and pure diamonds.\n\nOres:\n> <:Cobblestone:816984558317600799>\n> <:Diamond:902764556697341952>\n> <:Pure_Diamond:816833532184887346>`)
								]
							}
						},
						{
							label: `Dragon's Nest`,
							description: `Requires: Combat Level 12`,
							emoji: `<:End_Portal:976281835963310132>`,
							value: `dragons_nest`,
							default: false,
							disabled: !(combatLevel >= 12),
							message: {
								embeds: [
									new EmbedBuilder()
										.setColor(`#2f3136`)
										.setTitle(`The End: Dragon's Nest`)
										.setDescription(`A subisland of The End, entering this portal will teleport you to the Dragon's Nest. There are no ores here, but this is where you can fight the dragon.`)
								]
							},
						}
					];
				/**
				 * If the user's current mine is in the "Dragon's Nest", since it is a dead end, give them
				 *     • The End
				 */
				} else if (mine === SkyblockTypes.SkyblockMines.DragonsNest) {
					selectOptions = [
						{
							label: `The End`,
							description: `Requires: Combat Level 12`,
							emoji: `<:End_Portal:976281835963310132>`,
							value: `the_end`,
							default: true,
							disabled: !(combatLevel >= 12),
							message: {
								embeds: [
									new EmbedBuilder()
										.setColor(`#2f3136`)
										.setTitle(`Subarea Portal: The End`)
										.setDescription(`A shiny portal connecting the Deepmines to The End, entering this portal will teleport you to The End. This is where you get End Stone and Obsidian.\n\nOres:\n> <:End_Stone:976283013958754394> End Stone\n> <:Obsidian:976283024566132778> Obsidian`)
								]
							},
						}
					];
				// If the user's current mine is in the "Diamond Sanctuary", add "Portal to The End" in the choices
				} else if (mine === SkyblockTypes.SkyblockMines.DiamondSanctuary) {
					selectOptions.push(
						{
							label: `Portal to The End`,
							description: `Requires: Combat Level 12`,
							emoji: `<:End_Portal:976281835963310132>`,
							value: `the_end`,
							default: false,
							disabled: !(combatLevel >= 12),
							message: {
								embeds: [
									new EmbedBuilder()
										.setColor(`#2f3136`)
										.setTitle(`Subarea Portal: The End`)
										.setDescription(`A shiny portal connecting the Deepmines to The End, entering this portal will teleport you to The End. This is where you get End Stone and Obsidian.\n\nOres:\n> <:End_Stone:976283013958754394> End Stone\n> <:Obsidian:976283024566132778> Obsidian`)
								]
							},
						}
					);
				}
			}

			// If the user's update value is greater than the 11.0.0 update value, add the new stuff into the choices
			if (update >= interaction.client.updateMap.get(`12.0.0`)) {
				/**
				 * If the user's current mine is in the "Forsaken Tunnel", give them the choice to
				 *     • Go back to the Diamond Sanctuary
				 *     • <added choices>
				 */
				if (mine === SkyblockTypes.SkyblockMines.ForsakenTunnel) {
					selectOptions = [
						{
							label: `Diamond Sanctuary`,
							description: `Requires: Mining Level 15`,
							emoji: `<:Mine:816908527670001686>`,
							value: `diamond_sanctuary`,
							default: false,
							disabled: !(mineLevel >= 15),
							message: {
								embeds: [
									new EmbedBuilder()
										.setColor(`#2f3136`)
										.setTitle(`Subarea: Diamond Sanctuary`)
										.setDescription(`The last cave of the deepmines, this is where you get diamonds and pure diamonds.\n\nOres:\n> <:Cobblestone:816984558317600799>\n> <:Diamond:902764556697341952>\n> <:Pure_Diamond:816833532184887346>`)
								]
							}
						}
					];

					console.log(selectOptions);

					/**
					 * Since the "Crystal Hollows" has a prerequisite adventure tied to it, we check if "Perilous Adventure" is complete.
					 *     • If no, set it to "Sealed Mining Area" and disable the option.
					 *     • If yes, set it to "Crystal Hollows" and enable the option.
					 */
					if (subareaUnlocks.includes(`crystal_hollows`)) {
						selectOptions.push(
							{
								label: `Crystal Hollows`,
								description: `Requires: Mining Level 25, Prerequisite "Perilous Adventure"`,
								value: `crystal_hollows`,
								default: false,
								disabled: !(mineLevel >= 25),
								message: {
									embeds: [
										new EmbedBuilder()
											.setColor(`#2f3136`)
											.setTitle(`Subarea: Crystal Hollows`)
											.setDescription(`A once bustling mining area where miners would go in to try and make a fortune. Now that you've unsealed the area, maybe you can find out why was it sealed in the first place.`)
									]
								}
							}
						);
					} else {
						selectOptions.push(
							{
								label: `Sealed Mining Area`,
								description: `Requires: Mining Level 25, Prerequisite "Perilous Adventure"`,
								value: `crystal_hollows`,
								default: false,
								disabled: true,
								message: {
									embeds: [
										new EmbedBuilder()
											.setColor(`#2f3136`)
											.setTitle(`Subarea: Sealed Mining Area`)
											.setDescription(`At the end of the tunnel, this mysterious mining area that has been sealed greets you.`)
									]
								}
							}
						);
					}
				/**
				 * If the user's current mine is in the "Forsaken Tunnel", give them the choice to
				 *     • Go back to the Forsaken Tunnel
				 *     • <added choices>
				 */
				} else if (mine === SkyblockTypes.SkyblockMines.CrystalHollows) {
					selectOptions = [
						{
							label: `Forsaken Tunnel`,
							description: `Requires: Mining Level 15, Prerequisite "Deeper into the Deep Mines"`,
							value: `forsaken_tunnel`,
							default: false,
							disabled: !(mineLevel >= 15 && subareaUnlocks.includes('forsaken_tunnel')),
							message: {
								embeds: [
									new EmbedBuilder()
										.setColor(`#2f3136`)
										.setTitle(`Subarea: Forsaken Tunnel`)
										.setDescription(`A tunnel once used by many miners to get ores from a now sealed area. This sealed area had the power to reforge diamond tools into better variants, so the ore was highly valuable. After it was sealed, the ore began to skyrocket in value. Maybe you can unseal the mine and gain the power of crystals yourself!`)
								]
							}
						}
					];

					/**
					 * Since the "Thunder Island Tunnel" has a prerequisite adventure tied to it, we check if "Mysterious Stone Tunnel" is complete.
					 *     • If no, set it to "Another Mysterious Stone Wall" and disable the option.
					 *     • If yes, set it to "Thunder Island Tunnel" and enable the option.
					 */
					if (subareaUnlocks.includes(`thunder_island_tunnel`)) {
						selectOptions.push(
							{
								label: `Thunder Island Tunnel`,
								description: `Requires: Mining Level 30, Prerequisite Adventure "Mysterious Stone Tunnel"`,
								value: `thunder_island_tunnel`,
								default: false,
								disabled: !(mineLevel >= 30),
								message: {
									embeds: [
										new EmbedBuilder()
											.setColor(`#2f3136`)
											.setTitle(`Subarea: Thunder Island Tunnel`)
											.setDescription(`A tunnel going to Thunder Island. Someone actually took the time to mine all of this just so that they wouldn't have to cross "The Stormy Seas".`)
									]
								}
							}
						);
					} else {
						selectOptions.push(
							{
								label: `Another Mysterious Stone Wall`,
								description: `Requires: Mining Level 25, Prerequisite Adventure "Mysterious Stone Tunnel"`,
								value: `thunder_island_tunnel`,
								default: false,
								disabled: true,
								message: {
									embeds: [
										new EmbedBuilder()
											.setColor(`#2f3136`)
											.setTitle(`Subarea: Another Mysterious Stone Wall`)
											.setDescription(`While exploring the Crystal Hollows, another stone wall greets you. What could be on the other side of that wall, and is it another tunnel?`)
									]
								}
							}
						);
					}
				} else if (mine === SkyblockTypes.SkyblockMines.ThunderIslandTunnel) {
					// Since "The Island of Endless Thunder" is a prerequisite adventure for "Mysterious Stone Tunnel".
					selectOptions = [
						{
							label: `Thunder Island`,
							description: `Requires: Mining Level 30, Prerequisite Adventure "The Island of Endless Thunder"`,
							value: `thunder_island`,
							default: false,
							disabled: false,
							message: {
								embeds: [
									new EmbedBuilder()
										.setColor(`#2f3136`)
										.setTitle(`Subarea: Thunder Island`)
										.setDescription(`Eversince you find that tunnel, the journey to Thunder Island has been less arduous due to you travelling below "The Stormy Sea".`)
								]
							}
						}
					];
				} else if (mine === SkyblockTypes.SkyblockMines.DiamondSanctuary) {
					/**
					 * Since the "Forsaken Tunnel" has a prerequisite adventure tied to it, we check if "Deeper into the Deep Mines" is complete.
					 *     • If no, set it to "Mysterious Stone Wall" and disable the option.
					 *     • If yes, set it to "Forsaken Tunnel" and enable the option.
					 */
					if (subareaUnlocks.includes(`forsaken_tunnel`)) {
						selectOptions.push(
							{
								label: `Forsaken Tunnel`,
								description: `Requires: Mining Level 15, Prerequisite "Deeper into the Deep Mines"`,
								value: `forsaken_tunnel`,
								default: false,
								disabled: !(mineLevel >= 15),
								message: {
									embeds: [
										new EmbedBuilder()
											.setColor(`#2f3136`)
											.setTitle(`Subarea: Forsaken Tunnel`)
											.setDescription(`A tunnel once used by many miners to get ores from a now sealed area. This sealed area had the power to reforge diamond tools into better variants, so the ore was highly valuable. After it was sealed, the ore began to skyrocket in value. Maybe you can unseal the mine and gain the power of crystals yourself!`)
									]
								}
							}
						);
					} else {
						selectOptions.push(
							{
								label: `Mysterious Stone Wall`,
								description: `Requires: Mining Level 15, Prerequisite "Deeper into the Deep Mines"`,
								value: `forsaken_tunnel`,
								default: false,
								disabled: true,
								message: {
									embeds: [
										new EmbedBuilder()
											.setColor(`#2f3136`)
											.setTitle(`Subarea: Mysterious Stone Wall`)
											.setDescription(`A wall made out of hard rocks deep in the Diamond Sanctuary.`)
									]
								}
							}
						);
					}
				}

				console.log(selectOptions);
			}

			const selectConfirmation = new SelectMenuConfirmation()
				.setCollectorTimeout(10_000)
				.setInteractionInstance(interaction)
				.setMenuMessage(selectOptions[0].message)
				// @ts-ignore
				.setMenuOptions(selectOptions);

			let label = `starter_mine`;

			selectConfirmation.on(`confirmed`, async (sent, selected) => {
				label = selectOptions.find(option => option.value === selected[0]).value ?? `starter_mine`;

				const idResolver = {
					starter_mine: { display: `Starter Mines`, id: 1 },
					iron_mine: { display: `Iron Mine`, id: 2 },
					gold_mine: { display: `Gold Mine`, id: 3 },
					lapis_reserve: { display: `Lapis Reserve`, id: 4 },
					redstone_mine: { display: `Redstone Mine`, id: 5 },
					diamond_sanctuary: { display: `Diamond Sanctuary`, id: 6 },
					the_end: { display: `The End`, id: 7 },
					dragons_nest: { display: `Dragon's Nest`, id: 8 },
					forsaken_tunnel: { display: `Forsaken Tunnel`, id: 9 },
					crystal_hollows: { display: `Crystal Hollows`, id: 10 },
				};
				
				const confirmEmbed = new EmbedBuilder()
					.setColor(`Green`)
					.setTitle(`Successful Deepmines Switch: ${idResolver[label].display}`)
					.setDescription(`You have successfully switched to the \`${idResolver[label].display}\`!`);

				maidObj.mine = idResolver[label].id ?? 0;

				sent.edit({ embeds: [confirmEmbed], components: [] });

				await db.set(maid, maidObj);
			});

			selectConfirmation.on(`expired`, (sent, error) => {
				const expiredEmbed = new EmbedBuilder()
					.setColor(`Yellow`)
					.setTitle(`Expired Deepmines Switch: ${label}`)
					.setDescription(`You ran out of time!`);
				
				sent.edit({ embeds: [expiredEmbed], components: [] });
			});

			await selectConfirmation.runConfirmationMenu();
		}
	}
};