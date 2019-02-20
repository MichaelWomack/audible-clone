import { Audio, AudioFile } from "../model/audio";


export class AudioUtils {

    static getListeningProgress(audio: Audio): { totalProgress: number, totalDuration: number } {
        let initialValue = { totalProgress: 0, totalDuration: 0 };
        return audio.trackList.reduce( ({ totalProgress, totalDuration }, track: AudioFile, index: number) => {
            let value = { totalProgress, totalDuration };
            if (index === audio.currentTrack) {
                value.totalProgress += track.currentTime;
            } else if (index < audio.currentTrack) {
                value.totalProgress += track.duration;
            };
            value.totalDuration += track.duration;
            return value;

        }, initialValue);
        
    }
}