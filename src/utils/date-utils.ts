export function formatDateToYYYYMMDD(date: Date): string {
	return date.toISOString().substring(0, 10);
}

export function formatDate(date: Date): string {
	const month = (date.getMonth() + 1).toString();
	const day = date.getDate().toString();
	return `${month}.${day}`;
}

export function formatTime(date: Date): string {
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	return `${hours}:${minutes}`;
}
