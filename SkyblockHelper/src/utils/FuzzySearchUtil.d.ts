import { Collection } from 'discord.js';

declare class FuzzySearchUtil {
    static similarityBetween(s1: string, s2: string): number;
    static editDistance(s1: string, s2: string): number;
    /**
     * @param {string} query
     * @param {Items[]} items
     * @returns {SearchValue}
     */
    static search(query: string, items: Items[]): SearchResults[] | null;
    /**
     * @param {T} assetMap
     * @returns {Items[]}
     */
    static toItemsArray<T>(assetMap: T): Items[];
    /**
     * @param {T} assetMap
     * @param {string} query
     */
    static searchAndReturn<K, V>(assetMap: Collection<K, V>, query: string): V | null;
}

type Items = {
    name: string;
    image: string;
    id: string;
};

type SearchResults = {
    item: Items;
    similarity: number;
};



export = FuzzySearchUtil;