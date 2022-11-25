import { Collection } from "discord.js";
import Database from '@replit/database';

declare class CachedDatabase extends Collection {
	/**
	 * A class that caches Database keys in its own local database. This allows for a more faster retrival of database keys with additional utility methods for significantly improved performance and ease-of-use.
	 * @param {string} databaseURL 
	 */
    public constructor(databaseURL: string);

	private database: Database;

    public get(key: string, options?: GetOptions): Promise<any>;
    public set(key: string, value: any): Promise<void>;
	public list(): string[];

	/**
	 * Fetches entries from the given `databaseURL` and caches them. This allows for all existing values in the database to be fetched and cached in this local database.
	 * @param {string[]} specificKeys Filter out the list of keys according to this list. The method will then use the filtered list instead of the full list.
	 */
	public fetchDatabaseEntries(specificKeys: string[]): Promise<void>;
}

type GetOptions = {
    raw?: boolean;
};

export = CachedDatabase;