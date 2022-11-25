
/**
 * If T2 (the type you want to unify with T1) is `undefined`, this returns just T1, otherwise, it returns T1 | T2
 */
type UnifyRealTypes<T1, T2> = T2 extends undefined
	? T1
	: T1 | T2

declare class Chancemaker<DataType = undefined> {
    /**
     * Making custom chances for items has never been easier!
     * @param {ChancemakerData} [data]
     */
	public constructor<DataType> (data?: ChancemakerData<DataType>);
	public entries: ChancemakerEntryData<DataType>[];
    public rolls: number;
    public minRolls: number;
    public maxRolls: number;
    public noRepeatingRes: boolean;

    /**
	 * Replaces the existing Chancemaker entries with new entries
     * @param  {...ChancemakerEntryData<T>} entries
     */
    public setEntries<T>(...entries: ChancemakerEntryData<T>[]): Chancemaker<T>

    /**
	 * Adds more entries to the existing Chancemaker entries
     * @param  {...ChancemakerEntryData} entries
     */
    public addEntries<T>(...entries: ChancemakerEntryData<T>[]): Chancemaker<UnifyRealTypes<T, DataType>>

    /**
     * Sets the amount of rolls the `Chancemaker` will do.
     * @param {number} amount
     */
	public setRolls(amount: number): this;

    /**
     * Sets the maximum amount of rolls the `Chancemaker` will do.
     * @param {number} amount
     */
	public setMaxRolls(amount: number): this;
	
    /**
     * Sets the minimum amount of rolls the `Chancemaker` will do.
     * @param {number} amount
     */
	public setMinRolls(amount: number): this;

    /**
     * Sets the `Chancemaker` to repeat, or not repeat results.
     * @param {number} amount
     */
	public setRepeatingResults(boolean: any): this;

    /**
     * Parses all entries and rolls into a Chancemaker result. 
     * @returns
     */
	public makeChance(): ChancemakerReturnData<DataType>[];

	/**
	 * Parses all entries into a `Possible Items` result.
	 */
	public getPossibleItems(): ChancemakerPossibleItems<Datatype>[]

	/**
	 * Parses all entries and rolls into a `Chances for Items` result.
	 */
	public getChances(): ChancemakerItemChances<Datatype>[]
}

type ChancemakerEntryData<T> = {
	item: T;
    minAmount?: number;
    maxAmount?: number;
    chance?: number;
};

type ChancemakerData<T> = {
    entries: ChancemakerEntryData<T>[];
    rolls?: number;
    minRolls?: number;
    maxRolls?: number;
    noRepeatingRes?: boolean;
};

type ChancemakerReturnData<Item> = {
	item: Item;
	amount: number;
}

type ChancemakerPossibleItems<Item> = {
	item: Item;
	maxAmount: number;
	minAmount: number;
}

type ChancemakerItemChances<Item> = {
	chance: number;
	item: Item;
	maxAmount: number;
	minAmount: number;
}

export = Chancemaker;