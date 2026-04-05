import { onCLS, onFCP, onFID, onLCP, onTTFB } from "web-vitals";

const vitalsUrl = "https://vitals.vercel-analytics.com/v1/vitals";

function getConnectionSpeed() {
	return "connection" in navigator &&
		navigator["connection"] &&
		"effectiveType" in navigator["connection"]
		? // @ts-ignore
			navigator["connection"]["effectiveType"]
		: "";
}

/**
 * @param {import("web-vitals").Metric} metric
 * @param {{ params: { [s: string]: any; } | ArrayLike<any>; path: string; analyticsId: string; }} options
 */
export function sendToAnalytics(metric, options) {
	const body = {
		dsn: options.analyticsId,
		id: metric.id,
		page: options.page,
		// 🛡️ Sanitize URL to prevent leaking sensitive data (PII, tokens) via query parameters/hash
		href: location.origin + location.pathname,
		event_name: metric.name,
		value: metric.value.toString(),
		speed: getConnectionSpeed(),
	};

	const blob = new Blob([new URLSearchParams(body).toString()], {
		// This content type is necessary for `sendBeacon`
		type: "application/x-www-form-urlencoded",
	});
	if (navigator.sendBeacon) {
		navigator.sendBeacon(vitalsUrl, blob);
	} else
		fetch(vitalsUrl, {
			body: blob,
			method: "POST",
			credentials: "omit",
			keepalive: true,
		});
}

/**
 * @param {any} options
 */
export function webVitals(options) {
	try {
		// Calculate anonymized page path once to reduce string processing overhead
		const page = Object.entries(options.params || {}).reduce(
			(acc, [key, value]) => acc.replace(value, `[${key}]`),
			options.path
		);
		const optimizedOptions = { ...options, page };

		onFID((metric) => sendToAnalytics(metric, optimizedOptions));
		onTTFB((metric) => sendToAnalytics(metric, optimizedOptions));
		onLCP((metric) => sendToAnalytics(metric, optimizedOptions));
		onCLS((metric) => sendToAnalytics(metric, optimizedOptions));
		onFCP((metric) => sendToAnalytics(metric, optimizedOptions));
	} catch (err) {
		console.error("[Web Vitals]", err);
	}
}
