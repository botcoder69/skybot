
class SkyblockHelperError extends Error {
	constructor(message, code) {
		super(message);

		this.name = `${this.constructor.name} [${code}]`;

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = SkyblockHelperError;