const MS_PER_DAY = 24 * 60 * 60 * 1000;

// Whole calendar days between the birth date (YYYY-MM-DD) and `now`, both in local time.
export function formatAge(dateOfBirth: string, now: Date = new Date()): string {
    const [year, month, day] = dateOfBirth.split("-").map(Number);
    const birth = Date.UTC(year, month - 1, day);
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const days = Math.max(0, Math.round((today - birth) / MS_PER_DAY));

    return days === 1 ? "1 day old" : `${days} days old`;
}
