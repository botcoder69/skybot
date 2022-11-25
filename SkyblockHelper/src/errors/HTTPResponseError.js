
class HTTPResponseError extends Error {
	constructor(response, requestData, url) {
		super(`${response.status} ${response.statusText}.`);
		
		this.name = `${this.constructor.name}`;

		Error.captureStackTrace(this, this.constructor);

		requestData.url = url;

		this.message += `\n\nRequest Data:\n${JSON.stringify(requestData, null, `\t`)}\n\nStack Trace:`;
	}
}

module.exports = HTTPResponseError;