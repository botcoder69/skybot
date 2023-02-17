
const { PowerUp } = require('../../SkyblockHelper/src/index.js');
// const { ModalBuilder, DiscordjsError } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = new PowerUp(
	{
		group: `Power-up`,    
		name: `Collectable Rick Astley`,
		keyName: `rickAstley`,
		description: `Never gonna give you up\n> Never gonna let you down\n> Never gonna run around and desert you\n> Never gonna make you cry\n> Never gonna say goodbye\n> Never gonna tell a lie and hurt you\n> \n> Obtainable by opening a <a:Diamond_Box:956735439480422430> **Diamond Box**`,
		rarity: `Epic`,
		emoji: {
			name: `<a:Rick_Astley:968350999465058345>`,
			url: `https://cdn.discordapp.com/emojis/968350999465058345.gif`,
		},
		NPC: {
			sell: {
				sellable: false,
				price: 0
			},
			buy: {
				buyable: false,
				price: 0
			}
		},
		sellall: {
			included: false
		},
		async onEquip(interaction, maidObj) {
			const user = interaction.options.getUser('target');
			/** @type {import ('discord.js').GuildMember} */
			const guildMember = interaction.guild.members.cache.get(user.id);

			if (!guildMember.voice.channelId) {
				maidObj.rickAstley += 1;
			
				return interaction.followUp({ content: `${guildMember} isn't connected to a voice channel! A ${this.emoji.name} ${this.name} can only be used on a user if they are connected to a voice channel.`, ephemeral: true });
			}

			if (user.id === interaction.user.id) {
				maidObj.rickAstley += 1;

				return interaction.followUp({ content: `You can't rickroll yourself lol`, ephemeral: true });
			}


			const voiceChannel = guildMember.voice.channel;

			const connection = joinVoiceChannel({
				channelId: voiceChannel.id,
				guildId: voiceChannel.guild.id,
				adapterCreator: voiceChannel.guild.voiceAdapterCreator
			});
			const stream = ytdl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&', { filter: 'audioonly' });
			const rickroll = createAudioResource(stream, { inputType: StreamType.Arbitrary });
			const player = createAudioPlayer();
		


			player.on('error', error => {
				console.error('Error:', error.message, 'with track', `the song`);
			});
		


			player.play(rickroll);
			connection.subscribe(player);
		
			connection.on('error', console.log);

			interaction.client.on('voiceStateUpdate', (oldState, newState) => {
				if (oldState.channelId === voiceChannel.id && oldState.member.id === guildMember.id) {
					if (oldState.channelId && !newState.channelId) {
						console.log(`removed`);
						player.stop();

						connection.destroy();
					}
				}
			});
		},
		requireTarget: true,
		includeInParsing: true
	}
);