
class EnchantmentUtil extends null {
	static firstStrike(enchantments, mob, initialDamage) {
		if (mob?.isFirstStriked) return 0;

		mob.isFirstStriked = true;
		if (enchantments.includes(`First Strike I`)) {
			return initialDamage * 0.25;
		} else if (enchantments.includes(`First Strike II`)) {
			return initialDamage * 0.50;
		} else if (enchantments.includes(`First Strike III`)) {
			return initialDamage * 0.75;
		} else if (enchantments.includes(`First Strike IV`)) {
			return initialDamage * 1;
		} else if (enchantments.includes(`First Strike V`)) {
			return initialDamage * 1.25;
		}
		return 0;
	}

	static sharpness(enchantments, initialDamage) {
		if (enchantments.includes(`Sharpness I`)) {
			return initialDamage * 0.05;
		} else if (enchantments.includes(`Sharpness II`)) {
			return initialDamage * 0.10;
		} else if (enchantments.includes(`Sharpness III`)) {
			return initialDamage * 0.15;
		} else if (enchantments.includes(`Sharpness IV`)) {
			return initialDamage * 0.20;
		} else if (enchantments.includes(`Sharpness V`)) {
			return initialDamage * 0.30;
		} else if (enchantments.includes(`Sharpness VI`)) {
			return initialDamage * 0.45;
		} else if (enchantments.includes(`Sharpness VII`)) {
			return initialDamage * 0.65;
		}
		return 0;
	}

	static critical(enchantments, initialDamage, crit) {
		if (!crit) return 0;

		if (enchantments.includes(`Critical I`)) {
			return initialDamage * 0.1;
		} else if (enchantments.includes(`Critical II`)) {
			return initialDamage * 0.2;
		} else if (enchantments.includes(`Critical III`)) {
			return initialDamage * 0.3;
		} else if (enchantments.includes(`Critical IV`)) {
			return initialDamage * 0.4;
		} else if (enchantments.includes(`Critical V`)) {
			return initialDamage * 0.5;
		} else if (enchantments.includes(`Critical VI`)) {
			return initialDamage * 0.7;
		} else if (enchantments.includes(`Critical VII`)) {
			return initialDamage;
		}
		return 0;
	}

	static lifeSteal(enchantments, health) {
		if (enchantments.includes(`Life Steal I`)) {
			return health * 0.005;
		} else if (enchantments.includes(`Life Steal II`)) {
			return health * 0.01;
		} else if (enchantments.includes(`Life Steal III`)) {
			return health * 0.015;
		} else if (enchantments.includes(`Life Steal IV`)) {
			return health * 0.02;
		} else if (enchantments.includes(`Life Steal V`)) {
			return health * 0.025;
		}
		return 0;
	}

	static execute(enchantments, mob, addedDamage) {
		const percentLost = 100 - Math.floor((mob.health.current / mob.health.initial) * 100);

		// console.log(`percentLost`, percentLost);

		if (enchantments.includes(`Execute I`)) {
			// console.log(`Execute I:`, addedDamage * (percentLost * 0.002));
			return addedDamage * (percentLost * 0.002);
		} else if (enchantments.includes(`Execute II`)) {
			// console.log(`Execute II:`, addedDamage * (percentLost * 0.004));
			return addedDamage * (percentLost * 0.004);
		} else if (enchantments.includes(`Execute III`)) {
			// console.log(`Execute III:`, addedDamage * (percentLost * 0.006));
			return addedDamage * (percentLost * 0.006);
		} else if (enchantments.includes(`Execute IV`)) {
			// console.log(`Execute IV:`, addedDamage * (percentLost * 0.008));
			return addedDamage * (percentLost * 0.008);
		} else if (enchantments.includes(`Execute V`)) {
			// console.log(`Execute V:`, addedDamage * (percentLost * 0.01));
			return addedDamage * (percentLost * 0.01);
		} else if (enchantments.includes(`Execute VI`)) {
			// console.log(`Execute VI:`, addedDamage * (percentLost * 0.0125));
			return addedDamage * (percentLost * 0.0125);
		}	
		// console.log(`No execute enchantment`, enchantments);
		return 0;
	}
}

module.exports = EnchantmentUtil;