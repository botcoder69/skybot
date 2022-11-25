const DeveloperTypeError = require('../../errors/DeveloperTypeError');

async function requireToolAndAbove(toolName, messageAuthorID, db) {
	process.emitWarning('This function is deprecated. Use toolMap.get() instead', 'DeprecationWarning');
	if (toolName === "wooden_pickaxe") {
		const pickaxe = await db.get(`${messageAuthorID}pickaxe`);
		if (pickaxe === "<:Wooden_Pickaxe:817217441394196572>" || pickaxe === "<:Stone_Pickaxe:817216446899028011>" || pickaxe === "<:Iron_Pickaxe:817216520828092436>" || pickaxe === "<:Gold_Pickaxe:817216581859409971>" || pickaxe === "<:Diamond_Pickaxe:817216616084930602>") {
			return true;
		} else {
			return false;
		}
	} else if (toolName === "gold_pickaxe") {
		const pickaxe = await db.get(`${messageAuthorID}pickaxe`);
		if (pickaxe === "<:Wooden_Pickaxe:817217441394196572>" || pickaxe === "<:Stone_Pickaxe:817216446899028011>" || pickaxe === "<:Iron_Pickaxe:817216520828092436>" || pickaxe === "<:Gold_Pickaxe:817216581859409971>" || pickaxe === "<:Diamond_Pickaxe:817216616084930602>") {
			return true;
		} else {
			return false;
		}
	} else if (toolName === "stone_pickaxe") {
		const pickaxe = await db.get(`${messageAuthorID}pickaxe`);
		if (pickaxe === "<:Stone_Pickaxe:817216446899028011>" || pickaxe === "<:Iron_Pickaxe:817216520828092436>" || pickaxe === "<:Diamond_Pickaxe:817216616084930602>") {
			return true;
		} else {
			return false;
		}
	} else if (toolName === "iron_pickaxe") {
		const pickaxe = await db.get(`${messageAuthorID}pickaxe`);
		if (pickaxe === "<:Iron_Pickaxe:817216520828092436>" || pickaxe === "<:Diamond_Pickaxe:817216616084930602>") {
			return true;
		} else {
			return false;
		}
	} else if (toolName === "diamond_pickaxe") {
		const pickaxe = await db.get(`${messageAuthorID}pickaxe`);
		if (pickaxe === "<:Wooden_Pickaxe:817217441394196572>" || pickaxe === "<:Stone_Pickaxe:817216446899028011>" || pickaxe === "<:Iron_Pickaxe:817216520828092436>" || pickaxe === "<:Gold_Pickaxe:817216581859409971>" || pickaxe === "<:Diamond_Pickaxe:817216616084930602>") {
			return true;
		} else {
			return false;
		}
	} else if (toolName === "wooden_axe") {
		const axe = await db.get(`${messageAuthorID}axe`);
		if (axe === "<:Wooden_Axe:817217337261424650>" || axe === "<:Stone_Axe:817216694837706793>" || axe === "<:Iron_Axe:817216753062510633>" || axe === "<:Gold_Axe:817216806845677568>" || axe === "<:Diamond_Axe:817216864626802771>") {
			return true;
		} else {
			return false;
		}
	} else if (toolName === "gold_axe") {
		const axe = await db.get(`${messageAuthorID}axe`);
		if (axe === "<:Stone_Axe:817216694837706793>" || axe === "<:Iron_Axe:817216753062510633>" || axe === "<:Gold_Axe:817216806845677568>" || axe === "<:Diamond_Axe:817216864626802771>") {
			return true;
		} else {
			return false;
		}
	} else if (toolName === "stone_axe") {
		const axe = await db.get(`${messageAuthorID}axe`);
		if (axe === "<:Stone_Axe:817216694837706793>" || axe === "<:Iron_Axe:817216753062510633>" || axe === "<:Diamond_Axe:817216864626802771>") {
			return true;
		} else {
			return false;
		}
	} else if (toolName === "iron_axe") {
		const axe = await db.get(`${messageAuthorID}axe`);
		if (axe === "<:Iron_Axe:817216753062510633>" || axe === "<:Diamond_Axe:817216864626802771>") {
			return true;
		} else {
			return false;
		}
	} else if (toolName === "diamond_axe") {
		const axe = await db.get(`${messageAuthorID}axe`);
		if (axe === "<:Diamond_Axe:817216864626802771>") {
			return true;
		} else {
			return false;
		}
	} else {
		throw new DeveloperTypeError(`The asset you required doesn't exist!`);
	}
}

module.exports = requireToolAndAbove;