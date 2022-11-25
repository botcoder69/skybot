const SkyblockMines = {
	StarterMine: 1,
	IronMine: 2,
	GoldMine: 3,
	LapisQuarry: 4,
	RedstoneMine: 5,
	DiamondSanctuary: 6,
	TheEnd: 7,
	DragonsNest: 8,
	ForsakenTunnel: 9,
	CrystalHollows: 10,
	ThunderIslandTunnel: 11,
	ThunderIsland: 12
};

const SkyblockForests = {
	Forest: 1,
	RoofedForest: 2,
	Taiga: 3,
	Savannah: 4,
	Jungle: 5
};

const SkyblockAdventures = {
	HubExploration: 1,
	DeeperIntoTheDeepMines: 2,
	PerilousAdventure: 3,
	TheSeasCruelWaters: 4,
	TheIslandOfEndlessThunder: 5,
	MysteriousStoneTunnel: 6
};

const AdventureEventTypes = {
	Normal: `NORMAL`,
	Nothing: `NOTHING`
};

const AdventureOutcomeTypes = {
	Death: 'DEATH',
	FatalDeath: 'FATAL_DEATH',
	ItemLoss: 'ITEM_LOSS',
	Nothing: 'NOTHING',
	Reward: 'REWARD'
};

const StatusEffectTypes = {
	PeriodicDamage: 'PERIODIC_DAMAGE',
	Debuff: 'DEBUFF',
	Stun: 'STUN',
	Immunity: 'IMMUNITY'
};

module.exports = { SkyblockMines, SkyblockForests, SkyblockAdventures, AdventureEventTypes, AdventureOutcomeTypes, StatusEffectTypes };