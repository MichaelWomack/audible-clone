import { TimeUtils } from './Time';

describe('TimeUtils', () => {

    describe('#formatToHHMMSS', () => {

        it('returns the correct mm:ss representation when less than a minute', () => {
            const seconds: number = 24;
            const expectedFormat = '00:24';
            expect(TimeUtils.secondsToHHMMSS(seconds)).toEqual(expectedFormat);
        });

        it('returns the correct mm:ss representation when less than an hour', () => {
            const seconds: number = 125;
            const expectedFormat = '02:05';
            expect(TimeUtils.secondsToHHMMSS(seconds)).toEqual(expectedFormat);
        });

        it('returns the correct hh:mm:ss representation when more than an hour', () => {
            const seconds: number = 3605;
            const expectedFormat = '01:00:05';
            expect(TimeUtils.secondsToHHMMSS(seconds)).toEqual(expectedFormat);
        });
    });

    describe("#getHoursMinutesSeconds", () => {

        it('returns the correct hours, minutes, seconds for less than 60 seconds', () => {
            const sec = 59;
            const { hours, minutes, seconds } = TimeUtils.getHoursMinutesSeconds(sec);
            expect(hours).toBe(0);
            expect(minutes).toBe(0);
            expect(seconds).toBe(59);

        });

        it('returns the correct hours, minutes, seconds for more than 1 minute', () => {
            const sec = 75;
            const { hours, minutes, seconds } = TimeUtils.getHoursMinutesSeconds(sec);
            expect(hours).toBe(0);
            expect(minutes).toBe(1);
            expect(seconds).toBe(15);

        });

        it('returns the correct hours, minutes, seconds for more than 1 hour', () => {
            const sec = 3605 // 1 hour five seconds;
            const { hours, minutes, seconds } = TimeUtils.getHoursMinutesSeconds(sec);
            expect(hours).toBe(1);
            expect(minutes).toBe(0);
            expect(seconds).toBe(5);
        });
    });

    // describe('#formatSecondsToTimeInWords', () => {
    //     it('returns the correct wording for less than 60 seconds', () => {
    //         const seconds = 59;
    //         const expectedFormat = 'fifty-nine seconds';
    //         expect(TimeUtils.formatSecondsToTimeInWords(seconds)).toEqual(expectedFormat);
    //     });

    //     it('returns the correct wording for greater than 60 seconds', () => {
    //         const seconds = 75;
    //         const expectedFormat = 'one minute and fifteen';
    //         expect(TimeUtils.formatSecondsToTimeInWords(seconds)).toEqual(expectedFormat);
    //     });
    // })
})