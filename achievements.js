
// eslint-disable-next-line no-unused-vars
const { Client } = require('discord.js');

/**
 * @type {[string, import('discord.js').SkybotAchievementData][]}
 */
const achievementArray = [
	[
		'use1kCmds',
		{
			id: 'use1kCmds',
			name: `Use 1,000 Commands`,
			rewards: [
				{ name: `Coins`, keyName: `coins`, emoji: `<:Coins:885677584749318154>`, amount: 10_000 }
			],
			validator(maidObj) {
				let totalCommands = 0;

				// eslint-disable-next-line guard-for-in
				for (const command in maidObj.commandUses) totalCommands += parseInt(maidObj.commandUses[command]) || 0;

				return totalCommands >= 1_000;
			},
			status(maidObj) {
				let totalCommands = 0;

				// eslint-disable-next-line guard-for-in
				for (const command in maidObj.commandUses) totalCommands += parseInt(maidObj.commandUses[command]) || 0;

				return 100 * (totalCommands / 1_000);
			}
		}
	],
	[
		'use10kCommands',
		{
			id: 'use10kCmds',
			name: `Use 10,000 Commands`,
			rewards: [
				{ name: `Coins`, keyName: `coins`, emoji: `<:Coins:885677584749318154>`, amount: 100_000 },
				{ name: `Golden Box`, keyName: `goldenBox`, emoji: `<a:Golden_Box:956735326800478258>`, amount: 1 }
			],
			validator(maidObj) {
				let totalCommands = 0;

				// eslint-disable-next-line guard-for-in
				for (const command in maidObj.commandUses) totalCommands += parseInt(maidObj.commandUses[command]) || 0;

				return totalCommands >= 10_000;
			},
			status(maidObj) {
				let totalCommands = 0;

				// eslint-disable-next-line guard-for-in
				for (const command in maidObj.commandUses) totalCommands += parseInt(maidObj.commandUses[command]) || 0;

				return 100 * (totalCommands / 10_000);
			}
		}
	],
	[
		'use50kCommands',
		{
			id: 'use50kCmds',
			name: `Use 50,000 Commands`,
			rewards: [
				{ name: `Coins`, keyName: `coins`, emoji: `<:Coins:885677584749318154>`, amount: 500_000 },
				{ name: `Diamond Box`, keyName: `diamondBox`, emoji: `<a:Diamond_Box:956735439480422430>`, amount: 1 }
			],
			validator(maidObj) {
				let totalCommands = 0;

				// eslint-disable-next-line guard-for-in
				for (const command in maidObj.commandUses) totalCommands += parseInt(maidObj.commandUses[command]) || 0;

				return totalCommands >= 50_000;
			},
			status(maidObj) {
				let totalCommands = 0;

				// eslint-disable-next-line guard-for-in
				for (const command in maidObj.commandUses) totalCommands += parseInt(maidObj.commandUses[command]) || 0;

				return 100 * (totalCommands / 50_000);
			}
		}
	],
	[
		'use100kCommands',
		{
			id: `use100kCmds`,
			name: `Use 100,000 Commands`,
			rewards: [
				{ name: `Coins`, keyName: `coins`, emoji: `<:Coins:885677584749318154>`, amount: 1_000_000 },
				{ name: `Emerald Box`, keyName: `emeraldBox`, emoji: `<a:Emerald_Box:956735451622940693>`, amount: 1 }
			],
			validator(maidObj) {
				let totalCommands = 0;

				// eslint-disable-next-line guard-for-in
				for (const command in maidObj.commandUses) totalCommands += parseInt(maidObj.commandUses[command]) || 0;

				return totalCommands >= 100_000;
			},
			status(maidObj) {
				let totalCommands = 0;

				// eslint-disable-next-line guard-for-in
				for (const command in maidObj.commandUses) totalCommands += parseInt(maidObj.commandUses[command]) || 0;

				return 100 * (totalCommands / 100_000);
			}
		}
	],
	[
		'aspectCollectorI',
		{
			id: `aspectCollectorI`,
			name: `Get the Aspect of the Seas`,
			rewards: [
				{ name: `Coins`, keyName: `coins`, emoji: `<:Coins:885677584749318154>`, amount: 1_000_000 },
				{ name: `Spirit Butterfly`, keyName: `spiritButterfly`, emoji: `<:Spirit_Butterfly:942633700485632071>`, amount: 1 }
			],
			validator(maidObj) {
				return !!maidObj.aspectOfTheSeas;
			},
			status(maidObj) {
				return maidObj.aspectOfTheSeas ? 100 : 0;
			}
		}
	],
	[
		'aspectCollectorII',
		{
			id: `aspectCollectorII`,
			name: `Get the Aspect of the Spirit Butterfly`,
			rewards: [
				{ name: `Coins`, keyName: `coins`, emoji: `<:Coins:885677584749318154>`, amount: 1_000_000 },
				{ name: `Emerald Box`, keyName: `emeraldBox`, emoji: `<a:Emerald_Box:956735451622940693>`, amount: 5 }
			],
			validator(maidObj) {
				return !!maidObj.aspectOfTheSeas;
			},
			status(maidObj) {
				return maidObj.aspectOfTheSeas ? 100 : 0;
			}
		}
	]
];

module.exports = achievementArray;