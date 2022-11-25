import Database from "@replit/database";

declare class SkybotDatabase {
	public constructor()
	private readonly authorization: string;
	private database: Database<any>;
	private readonly databaseURL: string;
	private debugMode: boolean;
	private friendlyName?: string;
	private keyCount: number;
	private keys: string[]
	private readonly REPLIT_DB_URL: string;
	private initDatabase(debug?: boolean, onFail: () => void): Promise<Map<string, any>>
	private getPing(): Promise<number>
	
	public setFriendlyName(name: string): this;
	public setDatabaseURL(dbURL: string): this;
	public setAuthorization(auth: string): this;
}

export = SkybotDatabase;