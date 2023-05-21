/* eslint-disable no-unused-vars */

class MineGenerators {
	constructor() {
		throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
	}

	/**
	 * Generates cobblestone
	 * @param {string} uid
	 * @param {any} db
	 */
	static genCobblestone(maid, db) {
		const cobblestoneGenerator = Math.floor(Math.random() * 4) + 6;
		const cobbleXPGain = cobblestoneGenerator * 1;
		const cobblestone = db.get(`${maid}cobblestone`) || 0;
		db.set(`${maid}cobblestone`, cobblestoneGenerator + cobblestone);
		const gainedMineXp = db.get(`${maid}mineXp`) || 0;
		db.set(`${maid}mineXp`, gainedMineXp + cobbleXPGain);
	// message.channel.send(`${pickaxe.replace(/"/g, "")} ${message.author} You mined <:Cobblestone:816984558317600799> **${cobblestoneGenerator}x** cobblestone. **+${cobbleXPGain}x** <:Mining:885390554198868020> Mining XP <:ExperienceOrb:900572424381272064>`);
	}

	/**
	 * Generates coal
	 * @param {string} uid
	 * @param {any} db
	 */
	static genCoal(maid, db) {
		const coalGenerator = Math.floor(Math.random() * 3) + 1;
		const coalXPGain = coalGenerator * 5;
		const coal = db.get(`${maid}coal`) || 0;
		db.set(`${maid}coal`, coalGenerator + coal);
		const gainedMineXp = db.get(`${maid}mineXp`) || 0;
		db.set(`${maid}mineXp`, gainedMineXp + coalXPGain);
	// message.channel.send(`${pickaxe.replace(/"/g, "")} ${message.author} You mined <:Coal:816982880802439178> **${coalGenerator}x** coal. **+${coalXPGain}x** <:Mining:885390554198868020> Mining XP <:ExperienceOrb:900572424381272064>`);
	}

	/**
	 * Generates iron ore
	 * @param {string} uid
	 * @param {any} db
	 */
	static genIronOre(maid, db) {
		const ironOreGenerator = Math.floor(Math.random() * 3) + 1;
		const ironOreXPGain = ironOreGenerator * 5;
		const ironOre = db.get(`${maid}ironOre`) || 0;
		db.set(`${maid}ironOre`, ironOreGenerator + ironOre);
		const gainedMineXp = db.get(`${maid}mineXp`) || 0;
		db.set(`${maid}mineXp`, gainedMineXp + ironOreXPGain);
	// message.channel.send(`${pickaxe.replace(/"/g, "")} ${message.author} You mined <:Iron_Ore:816983943584022539> **${ironOreGenerator}x** iron ore. **+${ironOreXPGain}x** <:Mining:885390554198868020> Mining XP <:ExperienceOrb:900572424381272064>`);
	}

	/**
	 * Generates gold ore
	 * @param {string} uid
	 * @param {any} db
	 */
	static genGoldOre(maid, db) {
		const goldOreGenerator = Math.floor(Math.random() * 3) + 1;
		const goldOreXPGain = goldOreGenerator * 6;
		const goldOre = db.get(`${maid}goldOre`) || 0;
		db.set(`${maid}goldOre`, goldOreGenerator + goldOre);
		const gainedMineXp = db.get(`${maid}mineXp`) || 0;
		db.set(`${maid}mineXp`, gainedMineXp + goldOreXPGain);
	// message.channel.send(`${pickaxe.replace(/"/g, "")} ${message.author} You mined <:Gold_Ore:816983943794524221> **${goldOreGenerator}x** gold ore. **+${goldOreXPGain}x** <:Mining:885390554198868020> Mining XP <:ExperienceOrb:900572424381272064>`);
	}

	/**
	 * Generates redstone
	 * @param {string} uid
	 * @param {any} db
	 */
	static genRedstone(maid, db) {
		const redstoneGenerator = Math.floor(Math.random() * 4) + 1;
		const redstoneXPGain = redstoneGenerator * 1;
		const redstone = db.get(`${maid}redstone`) || 0;
		db.set(`${maid}redstone`, redstoneGenerator + redstone);
		const gainedMineXp = db.get(`${maid}mineXp`) || 0;
		db.set(`${maid}mineXp`, gainedMineXp + redstoneXPGain);
	}

	/**
	 * Generates lapis
	 * @param {string} uid
	 * @param {any} db
	 */
	static genLapis(maid, db) {
		const lapisGenerator = Math.floor(Math.random() * 3) + 1;
		const lapisXPGain = lapisGenerator * 7;
		const lapis = db.get(`${maid}lapis`) || 0;
		db.set(`${maid}lapis`, lapisGenerator + lapis);
		const gainedMineXp = db.get(`${maid}mineXp`) || 0;
		db.set(`${maid}mineXp`, gainedMineXp + lapisXPGain);
	// message.channel.send(`${pickaxe.replace(/"/g, "")} ${message.author} You mined <:Lapis:816988928372375603> **${lapisGenerator}x** lapis. **+${lapisXPGain}x** <:Mining:885390554198868020> Mining XP <:ExperienceOrb:900572424381272064>`);
	}

	/**
	 * Generates diamond
	 * @param {string} uid
	 * @param {any} db
	 */
	static genDiamond(maid, db) {
		const diamondGenerator = Math.floor(Math.random() * 3) + 1;
		const diamondXPGain = diamondGenerator * 10;
		const diamond = db.get(`${maid}diamond`) || 0;
		db.set(`${maid}diamond`, diamond + diamondGenerator);
		const gainedMineXp = db.get(`${maid}mineXp`) || 0;
		db.set(`${maid}mineXp`, gainedMineXp + diamondXPGain);
	// message.channel.send(`${pickaxe.replace(/"/g, "")} ${message.author} You mined <:Diamond:902764556697341952> **${diamondGenerator}x** diamond. **+${diamondXPGain}x** <:Mining:885390554198868020> Mining XP <:ExperienceOrb:900572424381272064>`);
	}

	/**
	 * Generates diamond blocks (9 diamonds each)
	 * @param {string} uid
	 * @param {any} db
	 */
	static genDiamondBlock(maid, db) {
		const diamondBlockGenerator = Math.floor(Math.random() * 3) + 1;
		const diamondBlockXPGain = diamondBlockGenerator * 15;
		const diamond = db.get(`${maid}diamond`) || 0;
		db.set(`${maid}diamond`, diamond + (diamondBlockGenerator * 9));
		const gainedMineXp = db.get(`${maid}mineXp`) || 0;
		db.set(`${maid}mineXp`, gainedMineXp + diamondBlockXPGain);
	// message.channel.send(`${pickaxe.replace(/"/g, "")} ${message.author} You mined <:Diamond_Block:846993012277379072> **${diamondBlockGenerator}x** diamond block (9 diamonds). **+${diamondBlockXPGain}x** <:Mining:885390554198868020> Mining XP <:ExperienceOrb:900572424381272064>`);
	}

	/**
	 * Generates enchanted diamonds
	 * @param {string} uid
	 * @param {any} db
	 */
	static genEnchantedDiamond(maid, db) {
		const pureDiamondGenerator = Math.floor(Math.random() * 2) + 1;
		const pureDiamondXPGain = pureDiamondGenerator * 100;
		const pureDiamond = db.get(`${maid}pureDiamond`) || 0;
		db.set(`${maid}pureDiamond`, pureDiamond + pureDiamondGenerator);
		const gainedMineXp = db.get(`${maid}mineXp`) || 0;
		db.set(`${maid}mineXp`, gainedMineXp + pureDiamondXPGain);
	// message.channel.send(`${pickaxe.replace(/"/g, "")} ${message.author} You mined <:Enchanted_Diamond:902764556865142835> **${enchantedDiamondGenerator}x** enchanted diamond. **+${enchantedDiamondXPGain}x** <:Mining:885390554198868020> Mining XP <:ExperienceOrb:900572424381272064>`);
	}
}

module.exports = MineGenerators;