export function formatDuration(startTimestamp: string, endTimestamp: string): string {
    const totalMinutes = Math.round(
        (new Date(endTimestamp).getTime() - new Date(startTimestamp).getTime()) / 60000
    );
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours === 0) return `${minutes} min`;
    if (minutes === 0) return `${hours} h`;
    return `${hours} h ${minutes} min`;
}
