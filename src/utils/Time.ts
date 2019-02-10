export class TimeUtils {
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

    // private static getNumberInWords(n: number): string {
    //     let result = '';

    //     const ones = {
    //         1: 'one',
    //         2: 'two',
    //         3: 'three',
    //         4: 'four',
    //         5: 'five',
    //         6: 'six',
    //         7: 'seven',
    //         8: 'eight',
    //         9: 'nine',
    //     };

    //     const tens: any = {
    //         1: {
    //             0: 'ten',
    //             1: 'eleven',
    //             2: 'twelve',
    //             3: 'thirteen',
    //             4: 'fourteen',
    //             5: 'fifteen',
    //             6: 'sixteen',
    //             7: 'seventeen',
    //             8: 'eighteen',
    //             9: 'nineteen',
    //         },
    //         2: 'twenty',
    //         3: 'thirty',
    //         4: 'fourty',
    //         5: 'fifty',
    //         6: 'sixty',
    //         7: 'seventy',
    //         8: 'eighty',
    //         9: 'ninety',
    //     };

    //     const placeValueMapByIndex: any = {
    //         0: ones,
    //         1: tens,
    //     };

    //     const numberAsString = `${n}`;
    //     let placeValueIndex = 0;

    //     if (n < 20) {
    //         return tens[ 1 ][ n % 10 ];
    //     }

    //     while (n > 0) {
    //         const placeValueMap = placeValueMapByIndex[placeValueIndex];
    //         const placeValue = n % 10;

    //         if (placeValue > 0) {
    //             if (placeValueIndex === 1) {
    //                 result = `${placeValueMap[placeValue]}-${result}`;
    //             } else {
    //                 result = `${placeValueMap[placeValue]}`;
    //             }
    //         }
    //         placeValueIndex++;
    //         n = Math.floor(n / 10);
    //     }
    //     return result;
    // }

    // // static formatSecondsToTimeInWords(numSeconds: number): string {
    // //     let result: string;
    // //     const { hours, minutes, seconds } = TimeUtils.getHoursMinutesSeconds(
    // //         numSeconds,
    // //     );
    // //     console.log('');
    // //     const hoursWords = TimeUtils.getNumberInWords(hours);
    // //     const minutesWords = TimeUtils.getNumberInWords(minutes);
    // //     const secondsWords = TimeUtils.getNumberInWords(seconds);

    // //     if (seconds > 0) {
    // //         return `${secondsWords} seconds`;
    // //     }
    // //     // return result;
    // // }
}
