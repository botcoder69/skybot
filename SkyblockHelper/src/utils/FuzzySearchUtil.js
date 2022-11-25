/**
 * NOTE: The code for this was taken from Dank Memer, so please don't send any hate lol. 
 */

// eslint-disable-next-line no-unused-vars
const { Collection } = require('discord.js');

/**
 * @typedef {Object} Items 
 * @property {string} name
 * @property {string} image
 * @property {string} id
 */

/**
 * @typedef {Object} SearchResults
 * @property {Items} item
 * @property {number} similarity
 */

class FuzzySearchUtil {
	constructor() {
		throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
	}

	static similarityBetween(s1, s2) {
		let longer = s1;
		let shorter = s2;
		if (s1.length < s2.length) {
			longer = s2;
			shorter = s1;
		}
		const longerLength = longer.length;
		if (longerLength === 0) {
			return 1.0;
		}
		return (
			(longerLength - this.editDistance(longer, shorter)) /
				parseFloat(longerLength)
		);
	}

	static editDistance(s1, s2) {
		s1 = s1.toLowerCase();
		s2 = s2.toLowerCase();
	
		const costs = [];
		for (let i = 0; i <= s1.length; i++) {
			let lastValue = i;
			for (let j = 0; j <= s2.length; j++) {
				if (i === 0) {
					costs[j] = j;
				} else {
					if (j > 0) {
						let newValue = costs[j - 1];
						if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
							newValue =
									Math.min(
										Math.min(newValue, lastValue),
										costs[j]
									) + 1;
						}
						costs[j - 1] = lastValue;
						lastValue = newValue;
					}
				}
			}
			if (i > 0) {
				costs[s2.length] = lastValue;
			}
		}
		return costs[s2.length];
	}

	/**
	 * @param {string} query 
	 * @param {Items[]} items 
	 * @returns {SearchResults[]}
	 */
	static search(query, items) {
		query = query.toLowerCase();

		const target = items;
		const candidates = [];

		// eslint-disable-next-line guard-for-in
		for (const item of target) {				
			const candidate = {
				item: item,
				similarity: 0,
			};

			if (candidate.item.id.toLowerCase() === query) {
				candidate.similarity = 1;
			} else if (candidate.item.name.toLowerCase() === query) {
				candidate.similarity = 0.999;
			} else if (
				candidate.item.name.toLowerCase().includes(" " + query + " ") ||
					candidate.item.id.includes(" " + query + " ")
			) {
				candidate.similarity = 0.998;
			} else if (
				candidate.item.name.toLowerCase().includes(query + " ") ||
					candidate.item.id.includes(query + " ")
			) {
				candidate.similarity = 0.997;
			} else if (
				candidate.item.name.toLowerCase().includes(" " + query) ||
					candidate.item.id.includes(" " + query)
			) {
				candidate.similarity = 0.997;
			} else if (
				candidate.item.name.toLowerCase().includes(query) ||
					candidate.item.id.includes(query)
			) {
				candidate.similarity = 0.996;
			} else {
				const similarity = this.similarityBetween(
					query,
					candidate.item.name
				);
				candidate.similarity = similarity;
			}

			candidates.push(candidate);
		}
		return candidates.length
			? candidates.sort((a, b) => b.similarity - a.similarity)
			: null;
	}

	/**
	 * @param {Collection<string, import('discord.js').AssetMapValues>} assetMap
	 * @returns {Items[]}
	 */
	static toItemsArray(assetMap) {
		return assetMap
			.map(asset => (
				{
					name: asset.name, 
					image: asset.displayEmojiURL('placed'), 
					id: asset.keyName 
				}));
	}

	/**
	 * @param {Collection<string, any>} assetMap 
	 * @param {string} query 
	 */
	static searchAndReturn(assetMap, query) {
		const items = this.toItemsArray(assetMap);

		const searchResults = this.search(query, items);

		if (searchResults?.[0]?.similarity >= 0.65) {
			const asset = assetMap.find(asset => asset.keyName === searchResults[0].item.id);
			
			return asset;
		} else {
			return undefined;
		}
	}
}

module.exports = FuzzySearchUtil;