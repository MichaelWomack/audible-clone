import * as React from 'react';
import { FunctionComponent, MouseEvent } from 'react';
import { Audio, AudioLibraryFilter } from '../../model/audio';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CheckIcon from '@material-ui/icons/Done';
import Typography from '@material-ui/core/Typography';
import ToggleButton from "@material-ui/lab/ToggleButton/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup/ToggleButtonGroup";
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import AudioCard from '../AudioCard';
import AudioListStyles from './AudioListStyles';

export interface AudioListProps extends WithStyles<typeof AudioListStyles> {
    audioList: Array<Audio>;
    selectedAudioId: string;
    isPlaying: boolean;
    filter: AudioLibraryFilter;
    playAudio: (audio: Audio) => void;
    pauseAudio: () => void;
    updateAudio: (audio: Audio) => void;
    deleteAudio: (audio: Audio) => void;
    setAudioFilter: (filter: AudioLibraryFilter) => void;
}

const AudioList: FunctionComponent<AudioListProps> = (props: AudioListProps) => {
    const { audioList, classes, updateAudio, deleteAudio, playAudio, pauseAudio, selectedAudioId, isPlaying, filter, setAudioFilter } = props;
    audioList.sort((a, b) => b.lastPlayed - a.lastPlayed);
    const isCurrentlyPlaying = (audio: Audio): boolean => (audio.id === selectedAudioId) && isPlaying;

    const predicate = (audio: Audio) => {
        switch (filter) {
            case AudioLibraryFilter.FAVORITE:
                return audio.favorite;
            case AudioLibraryFilter.COMPLETE:
                return Math.floor(audio.totalProgress) == Math.floor(audio.totalDuration);
            default:
                return true;
        }
    };

    const handleSelection = (event: MouseEvent<HTMLElement>, filter: any) => setAudioFilter(filter as AudioLibraryFilter);

    return (
        <div className={classes.container}>
            {
                audioList.length > 0 &&
                <div className={classes.headerContainer}>
                    <ToggleButtonGroup className={classes.toggleGroup} value={filter} exclusive onChange={handleSelection}>
                        <ToggleButton value={AudioLibraryFilter.FAVORITE}>
                            <Tooltip title="favorites">
                                <FavoriteIcon/>
                            </Tooltip>
                        </ToggleButton>
                        <ToggleButton value={AudioLibraryFilter.COMPLETE}>
                            <Tooltip title="completed" placement="top-start">
                                <CheckIcon/>
                            </Tooltip>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            }
            <div className={classes.audioList}>
                {
                    audioList.length ? audioList
                        .filter(predicate)
                        .map((audio: Audio) =>
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