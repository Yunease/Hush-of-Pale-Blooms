export function formatDateToYYYYMMDD(date: Date): string {
	return date.toISOString().substring(0, 10);
}

export function formatDate(date: Date): string {
	const day = date.getDate().toString().padStart(2, "0");
	return `${day}日`;
}

export function formatTime(date: Date): string {
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	return `${hours}:${minutes}`;
}

export function formatYearMonth(date: Date): string {
	const year = date.getFullYear().toString();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	return `${year}.${month}`;
}
