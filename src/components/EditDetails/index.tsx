import * as React from 'react';
import { Component, Fragment, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import EditDetailsStyles from './EditDetailsStyles';
import { VolumeInfo } from '../../model/volume';

export interface EditDetailsProps extends WithStyles<typeof EditDetailsStyles> {
    volume: VolumeInfo;
    setSelectedVolume: Function;
    setNextStepDisabled: (disabled: boolean) => void;
}

export interface EditDetailsState {
    title?: string;
    subtitle?: string;
    author?: string;
    description?: string;
    imageUrl?: string;
}

export class EditDetails extends Component<EditDetailsProps, EditDetailsState> {
    state: EditDetailsState = {
        title: this.props.volume.title || '',
        subtitle: this.props.volume.subtitle || '',
        author: this.props.volume.authors.join(', '),
        description: this.props.volume.description || '',
        imageUrl: '',
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { volume, setSelectedVolume } = this.props;
        this.setState({
            [event.target.name]: event.target.value
        }, () => {
            const updatedVolume: VolumeInfo = {
                ...volume,
                title: this.state.title,
                authors: this.state.author.split(','),
                subtitle: this.state.subtitle,
                description: this.state.description,
            };
            setSelectedVolume(updatedVolume);
        });
    };

    render() {
        const { classes, volume } = this.props;
        return (
            <Fragment>
                <div className={classes.container}>
                    {volume.imageLinks && (
                        <img
                            className={classes.image}
                            src={
                                volume.imageLinks.thumbnail ||
                                volume.imageLinks.smallThumbnail
                            }
                        />
                    )}
                    <TextField
                        fullWidth
                        className={classes.textField}
                        value={this.state.title}
                        name="title"
                        label="title"
                        onChange={this.handleChange}
                    />
                    <TextField
                        fullWidth
                        className={classes.textField}
                        value={this.state.subtitle}
                        name="subtitle"
                        label="subtitle"
                        onChange={this.handleChange}
                    />
                    <TextField
                        fullWidth
                        className={classes.textField}
                        value={this.state.author}
                        name="author"
                        label="author(s)"
                        onChange={this.handleChange}
                    />
                    <TextField
                        fullWidth
                        className={classes.textField}
                        value={this.state.description}
                        name="description"
                        label="description"
                        multiline
                        onChange={this.handleChange}
                    />
                </div>
            </Fragment>
        );
    }
}

export default withStyles(EditDetailsStyles)(EditDetails);
