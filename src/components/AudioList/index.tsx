import * as React from 'react';
import { SFC } from 'react';
import { Audio, AudioLibraryFilter } from '../../model/audio';
import AudioCard from '../AudioCard';
import AudioListStyles from './AudioListStyles';
import Typography from '@material-ui/core/Typography';
import { withStyles, WithStyles } from '@material-ui/core/styles';

export interface AudioListProps extends WithStyles<typeof AudioListStyles> {
    audioList: Array<Audio>;
    selectedAudioId: string;
    isPlaying: boolean;
    filter: AudioLibraryFilter;
    playAudio: (audio: Audio) => void;
    pauseAudio: () => void;
    updateAudio: (audio: Audio) => void;
    deleteAudio: (audio: Audio) => void;
}

const AudioList: SFC<AudioListProps> = (props: AudioListProps) => {
    const { audioList, classes, updateAudio, deleteAudio, playAudio, pauseAudio, selectedAudioId, isPlaying } = props;
    const isCurrentlyPlaying = (audio: Audio): boolean => (audio.id === selectedAudioId) && isPlaying;
    return (
        <div className={classes.container}>
            <Typography component="h5" variant="h5" gutterBottom>
                Library
            </Typography>
            <div className={classes.audioList}>
                {
                    audioList.length ? audioList.map((audio: Audio) =>
                            <AudioCard 
                                key={audio.id} 
                                audio={audio}
                                isCurrentlyPlaying={isCurrentlyPlaying(audio)}
                                updateAudio={updateAudio}
                                deleteAudio={deleteAudio}
                                playAudio={playAudio}
                                pauseAudio={pauseAudio}
                            />
                    ) : <Typography>Looks like you need to upload some audiobooks!</Typography>
                }
            </div>
        </div>
    );
};

export default withStyles(AudioListStyles)(AudioList);