
import { Collection } from 'discord.js';
import SkybotDatabase from '../actions/SkybotDatabase';

declare class SkybotDatabaseHandler<Datatype = any> {
	public constructor();
	private retries: number;
	private localDb: Collection<string, Datatype>;
	private databases: SkybotDatabase[];
	private debug: boolean;
	private keyTreshold: number;
	private EMPTY_OBJECT_CONFIRMATION: boolean;
	private initFailFn: () => void;
	private formatKeyValueFn: (value: object, iteration: number, mapSize: number) => object | null;
	private normalizeDatabases(): void
	private setDebugMode(debug: boolean): this;
	private debug(message: string): void;

	/**
	 * Sets the function when database initialization fails.
	 * @param fn The function to run once database initialization fails.
	 */
	private setInitFailFn(fn: () => void): this;

	/**
	 * Sets the transformation that will apply to all values inside the database handler once the database starts initialization.
	 * @param fn The function to transform the values inside the database handler.
	 */
	private setFormatKeyValueFn(fn: (value: object, iteration: number, mapSize: number) => object): this;


	
	/**
	 * Sets the amount of retries before cancelling the request.
	 * @param retries The maximum amount of times the request will be resent if it fails.
	 */
	public setRequestRetries(retries: number): this;
	/**
	 * Sets the maximum keys for each Database.
	 * @param keyTreshold The maximum amount of keys a SkybotDatabase can have.
	 */
	public setKeyTreshold(keyTreshold: number): this;
	/**
	 * Sets `SkybotDatabase`s that this `SkybotDatabaseHandler` can use. 
	 * @param databases The `SkybotDatabase`s you want to set to this `SkybotDatabaseHandler`.
	 */
	public setDatabases(...databases: SkybotDatabase[] | SkybotDatabase[][]): this;
	/**
	 * Adds `SkybotDatabase`s that this `SkybotDatabaseHandler` can use. 
	 * @param databases The `SkybotDatabase`s you want to add to this `SkybotDatabaseHandler`.
	 */
    public addDatabases(...databases: SkybotDatabase[] | SkybotDatabase[][]): this;

	/**
	 * Gets a key from the Database.
	 * @param key The key you want to get.
	 * @param database If specified, it will get the key from the specified Database instead of finding the database where the key existse.
	 */
	public get(key: string, database?: SkybotDatabase): Promise<Datatype>;
	/**
	 * Sets a key with a value to a Database.
	 * @param key The key you want to assign this value to
	 * @param value The value of the key.
	 * @param database If specified, it will set the key to the desired Database instead of finding one for you.
	 */
	public set(key: string, value: Datatype, database?: SkybotDatabase): Promise<void>;
	/**
	 * Deletes a key from the Database
	 * @param key The key you want to delete from the Database.
	 */
	public delete(key: string): Promise<void>;
	/**
	 * Lists all the keys from each `SkybotDatabase` 
	 * @param database If specified, it will instead list the keys from that `SkybotDatabase` only.
	 */
	public list(database: SkybotDatabase): Promise<string[]>;
	/**
	 * Initiates the `SkybotDatabaseHandler` and each `SkybotDatabase`.
	 */
	public init(): Promise<void>;
	/**
	 * Gets the parent `SkybotDatabase` of a given key.
	 * @param key The key you want to get the parent `SkybotDatabase` of.
	 * @param force This means that you will search for the key in every single `SkybotDatabase` rather than use the cache. This is more accurate, but will take more time, depending on the amount of `SkybotDatabase` you have registered.
	 */
	public getParentDatabase(key: string, force?: boolean): Promise<SkybotDatabase>;
	/**
	 * Gets the status of each `SkybotDatabase` registered to this `SkybotDatabaseHandler`
	 */
	public getDatabaseStatuses(): Promise<SkybotDatabaseStatus[]>
}

interface SkybotDatabaseStatus {
	database: SkybotDatabase,
	ms: number,
	status: `ONLINE` | `OFFLINE` | `ERROR` | `EMPTY`;
}

export = SkybotDatabaseHandler;