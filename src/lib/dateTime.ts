const pad = (n: number) => String(n).padStart(2, "0");

/** Current date/time as values for `<input type="date">` / `<input type="time">`, in the user's time zone. */
export function getLocalDateTimeDefaults(now = new Date()) {
    return {
        date: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
        time: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
    };
}

/** Converts the local date/time typed into the form to a UTC ISO instant for storage. */
export function toUtcIsoTimestamp(date: string, time: string): string {
    return new Date(`${date}T${time}`).toISOString();
}
