export type RetryOptions = {
	retries?: number;
	backoffMs?: number;
	timeoutMs?: number;
};

function delay(ms: number): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchWithTimeoutAndRetry(
	input: RequestInfo | URL,
	init: RequestInit = {},
	options: RetryOptions = {}
): Promise<Response> {
	const { retries = 0, backoffMs = 500, timeoutMs } = options;
	let attempt = 0;
	let lastError: unknown = undefined;

	while (attempt <= retries) {
		const controller = timeoutMs ? new AbortController() : undefined;
		const id = timeoutMs ? setTimeout(() => controller!.abort(), timeoutMs) : undefined;
		try {
			const response = await fetch(input, { ...init, signal: controller?.signal });
			if (!response.ok) {
				throw new Error(`HTTP ${response.status}`);
			}
			if (id) clearTimeout(id);
			return response;
		} catch (error) {
			lastError = error;
			if (id) clearTimeout(id);
			if (attempt === retries) break;
			await delay(backoffMs * Math.pow(2, attempt));
			attempt += 1;
		}
	}

	throw lastError instanceof Error ? lastError : new Error("Request failed");
}


