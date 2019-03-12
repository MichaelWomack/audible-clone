export class TimeUtils {
    static readonly MINUTE_MILLIS = 60 * 1000;

    static secondsToHHMMSS(numSeconds: number) {
        const { hours, minutes, seconds } = TimeUtils.getHoursMinutesSeconds(
            numSeconds,
        );
        const leftPad = (num: number) => String(num).padStart(2, '0');
        const withoutHours = `${leftPad(minutes)}:${leftPad(seconds)}`;
        return hours > 0 ? `${leftPad(hours)}:${withoutHours}` : withoutHours;
    }

    public static getHoursMinutesSeconds(numSeconds: number): { hours: number; minutes: number; seconds: number } {
        const hours = Math.floor(numSeconds / (60 * 60));
        const minutes = Math.floor((numSeconds - hours * 3600) / 60);
        const seconds = Math.floor(numSeconds - hours * 3600 - minutes * 60);
        return { hours, minutes, seconds };
    }
}
