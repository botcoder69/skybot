declare class MultiUtil {
	public constructor(data: MultiData);
	public getMultiTotal(): MultiTotalData;
	public multi: number;
	public number: number;
	public setMultiplier(multiplier: number): this;
	public setNumber(number: number): this;
}

type MultiData = {
    number: number;
    multi: number;
}

type MultiTotalData = {
    total: number;
    added: number;
    multi: number;
}

export = MultiUtil;