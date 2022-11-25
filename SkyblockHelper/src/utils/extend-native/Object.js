/* eslint-disable no-extend-native */

// Provides extended functionality to Javascript objects.
Object.prototype.toString = function toString(depth=1) {
	const res = [`{`];
	let tabs = ``;
	let endTabs = ``;

	for (let i = 0; i < depth; i++) tabs += `\t`;
	for (let i = 0; i < depth - 1; i++) endTabs += `\t`;

	// eslint-disable-next-line guard-for-in
	for (const property in this) {
		const value = this[property];
	
		let stringValue = ``;

		if (typeof value === "string") {
			stringValue = `'${value.toString().replace(/'/g, `\\'`)}'`;
		} else if (typeof value === "number" || typeof value === "boolean") {
			stringValue = value.toString();
		} else if (value === null) {
			stringValue = 'null';
		} else if (value === undefined) {
			stringValue = 'undefined';
		} else if (typeof value === "object") {
			if (Array.isArray(value)) {
				stringValue = `[ ${value.join(', ')} ]`;
			} else {
				stringValue = value.toString(depth + 1);
			}
		}


		res.push(`${tabs}${property}: ${stringValue}`);
	}

	res.push(`${endTabs}}`);

	return res.join('\n');
};