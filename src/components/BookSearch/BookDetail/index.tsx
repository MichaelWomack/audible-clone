import * as React from 'react';
import { Component } from 'react';
import AudioBookDetailStyles from './BookDetailStyles';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { VolumeInfo } from '../../../model/volume';

export interface AudioBookDetailProps extends WithStyles<typeof AudioBookDetailStyles> {
    volumeInfo: VolumeInfo;
    selectVolume: (volume: VolumeInfo) => void;
}

export interface AudioBookDetailState {
    showingDescription: boolean;
}

export class AudioBookDetail extends Component<AudioBookDetailProps, AudioBookDetailState> {
    state: AudioBookDetailState = {
        showingDescription: false,
    };

    toggleDescription = () => {
        this.setState(prevState => ({
            showingDescription: !prevState.showingDescription,
        }));
    };

    selectVolumeInfo = () => {
        this.props.selectVolume(this.props.volumeInfo);
    };

    render() {
        const { classes, volumeInfo } = this.props;
        const { showingDescription } = this.state;
        return (
            <Card className={classes.card}>
                {volumeInfo.imageLinks && (
                    <CardMedia
                        className={classes.media}
                        image={
                            volumeInfo.imageLinks.thumbnail ||
                            volumeInfo.imageLinks.smallThumbnail
                        }
                        title={volumeInfo.title}
                    />
                )}
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h6">
                        {volumeInfo.title}
                    </Typography>
                    {volumeInfo.subtitle && (
                        <Typography gutterBottom variant="subtitle1">
                            {volumeInfo.subtitle}
                        </Typography>
                    )}
                    <Typography
                        gutterBottom
                        variant="subtitle2"
                        color="textSecondary"
                    >
                        {volumeInfo.authors
                            ? volumeInfo.authors.join(', ')
                            : 'No author information'}
                    </Typography>
                    { showingDescription && (
                        <Typography component="p">
                            {volumeInfo.description}
                        </Typography>
                    )}
                </CardContent>
                <CardActions>
                    <Button
                        onClick={this.selectVolumeInfo}
                        size="small"
                        color="primary"
                        data-test="select-volume-button"
                    >
                        select
                    </Button>
                    {volumeInfo.description && (
                        <Button
                            size="small"
                            color="primary"
                            onClick={this.toggleDescription}
                        >
                            {showingDescription
                                ? 'Hide Description'
                                : 'Show Description'}
                        </Button>
                    )}
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(AudioBookDetailStyles)(AudioBookDetail);
