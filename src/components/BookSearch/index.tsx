import * as React from 'react';
import { Fragment, Component, ChangeEvent } from 'react';
import { AudioType } from '../../model/audio';
import withStyles,  { WithStyles } from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import BookSearchStyles from './BookSearchStyles';
import BookDetail from './BookDetail';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { VolumeInfo } from '../../model/volume';

export interface BookSearchProps extends WithStyles<typeof BookSearchStyles> {
    selectVolume?: Function;
    goToNextStep?: Function;
    volumes?: VolumeInfo[];
    searchBooks?: Function;
    setNextStepDisabled: (disabled: boolean) => void;
}

export interface BookSearchState {
    audioType?: AudioType;
    isLoading?: boolean;
    searchQuery?: string;
}

export class BookSearch extends Component<BookSearchProps, BookSearchState> {
    state: BookSearchState = {
        audioType: AudioType.AUDIOBOOK,
        isLoading: false,
        searchQuery: '',
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    searchBooks = () => {
        if (this.state.searchQuery) {
            this.props.searchBooks(this.state.searchQuery);
        }
    };

    selectVolume = (volume: VolumeInfo) => {
        this.props.selectVolume(volume);
        this.props.setNextStepDisabled(false);
        this.props.goToNextStep();
    };

    render() {
        const { classes, volumes } = this.props;
        return (
            <Fragment>
                <div className={classes.searchPrompt}>
                    <Typography
                        variant="h6"
                        className={classes.header}
                        color="textSecondary"
                        gutterBottom
                    >
                        Lets get some info about your audio.
                    </Typography>
                    <form className={classes.formContainer}>
                        <div className={classes.search}>
                            <TextField
                                id="query-text-field"
                                name="searchQuery"
                                label="enter book title or author"
                                className={classes.textField}
                                value={this.state.searchQuery}
                                onChange={this.handleChange}
                                fullWidth={true}
                            />
                            {
                                <IconButton onClick={this.searchBooks}>
                                    <SearchIcon />
                                </IconButton>}
                        </div>
                    </form>
                </div>
                <div className={classes.bookListing}>
                    {volumes &&
                        volumes.map((volume: VolumeInfo) => {
                            const select = () => this.selectVolume(volume);
                            return (
                                <BookDetail
                                    key={volume.id}
                                    volumeInfo={volume}
                                    selectVolume={select}
                                />
                            );
                        })}
                </div>
            </Fragment>
        );
    }
}

export default withStyles(BookSearchStyles)(BookSearch);
