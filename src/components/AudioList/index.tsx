import * as React from 'react';
import { Component, MouseEvent } from 'react';
import { Audio, AudioLibraryFilter } from '../../model/audio';
import AppBar from "@material-ui/core/AppBar";
import CheckIcon from '@material-ui/icons/Done';
import FilterNone from '@material-ui/icons/FilterNone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import { withStyles, WithStyles } from '@material-ui/core/styles';
import AudioCard from '../AudioCard';
import AudioListStyles from './AudioListStyles';

export interface AudioListProps extends WithStyles<typeof AudioListStyles> {
    audioList: Array<Audio>;
    selectedAudioId: string;
    isPlaying: boolean;
    playAudio: (audio: Audio) => void;
    pauseAudio: () => void;
    updateAudio: (audio: Audio) => void;
    deleteAudio: (audio: Audio) => void;
}

export interface AudioListState {
    filter: AudioLibraryFilter;
}

export class AudioList extends Component<AudioListProps, AudioListState> {

    readonly state = {
      filter: AudioLibraryFilter.ALL
    };

     predicate = (audio: Audio) => {
        switch (this.state.filter) {
            case AudioLibraryFilter.FAVORITE:
                return audio.favorite;
            case AudioLibraryFilter.COMPLETE:
                return Math.floor(audio.totalProgress) == Math.floor(audio.totalDuration);
            default:
                return true;
        }
    };

    handleChange = (event: MouseEvent<HTMLDivElement>, value: number) => {
        this.setState({ filter: value });
    };

    render() {
        const { audioList, classes, updateAudio, deleteAudio, playAudio, pauseAudio, selectedAudioId, isPlaying } = this.props;
        audioList.sort((a, b) => b.lastPlayed - a.lastPlayed);
        const isCurrentlyPlaying = (audio: Audio): boolean => (audio.id === selectedAudioId) && isPlaying;
        return (
            <div className={classes.container}>
                <AppBar position="static">
                        <Tabs
                            value={this.state.filter}
                            onChange={this.handleChange}
                            indicatorColor="secondary"
                            textColor="secondary"
                            variant="fullWidth"
                        >
                            <Tab icon={<FilterNone />} data-test="all-tab" />
                            <Tab icon={<FavoriteIcon />} data-test="favorite-tab" />
                            <Tab icon={<CheckIcon />} data-test="complete-tab"/>
                        </Tabs>
                </AppBar>

                <div className={classes.audioList}>
                    {
                        audioList.length ? audioList
                            .filter(this.predicate)
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
                            ) : <Typography data-test="no-audio-title">Looks like you need to upload some audiobooks!</Typography>
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(AudioListStyles)(AudioList);