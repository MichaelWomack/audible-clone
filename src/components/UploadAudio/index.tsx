import * as React from 'react';
import { Component, ChangeEvent, Fragment } from 'react';
import { storage } from 'firebase';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { VolumeInfo } from '../../model/volume';
import { Audio, AudioBook } from '../../model/audio';
import UploadAudioStyles from './UploadAudioStyles';

export interface UploadAudioProps extends WithStyles<typeof UploadAudioStyles> {
    volume?: VolumeInfo;
    isUploading?: boolean;
    uploadProgress?: number;
    uploadTasks?: storage.UploadTask[];
    uploadAudio?: (audio: Audio, files: File[]) => void;
    addAudio?: (audio:Audio) => void;
    setNextStepDisabled: (disabled: boolean) => void;
}

export interface UploadAudioState {
    audio?: Audio;
    open?: boolean;
    fileList?: File[];
    snackbarMessage?: string;
}

export class UploadAudio extends Component<UploadAudioProps, UploadAudioState> {

    state: UploadAudioState = {
        audio: {},
        open: false,
        fileList: null,
        snackbarMessage: "",
    }

    componentDidMount() {
        this.props.setNextStepDisabled(true);
    }

    handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        console.log(files);
        this.setState({ fileList: Array.from(files) });
    };
    
    cancelUpload = () => {
        const { uploadTasks } = this.props;
        uploadTasks.forEach((task: storage.UploadTask) => task.cancel());
    }

    addAudio = async () => {

        const { fileList, audio } = this.state;
        const { volume } = this.props;
        if (fileList && fileList.length) {
            audio.title = volume.title;
            audio.author = volume.authors.join(', ');
            audio.description = volume.description;
            audio.imageUrl = volume.imageLinks.thumbnail || volume.imageLinks.smallThumbnail;
            this.props.uploadAudio(audio, fileList); /** TODO pass whole array */
            this.props.setNextStepDisabled(false);
        } else {
            this.setState({ snackbarMessage: 'Please select a file to upload' });
        }
    };

    render() {
        const { classes, isUploading } = this.props;
        const { snackbarMessage } = this.state;
        return (
            <Fragment>
                {/* {Boolean(snackbarMessage) && <SnackbarContent message={snackbarMessage} action={SnackbarCloser}/>} */}
                <div className={classes.container}>
                    <Typography
                        variant="h6"
                        className={classes.header}
                        color="textSecondary"
                        gutterBottom
                    >
                        select your audio files in the order you want them to appear
                    </Typography>
                    <form className={classes.formContainer}>
                        <div className={classes.formRow}>
                            
                            {/* <TextField 
                                fullWidth
                                label="selected file"
                                value={this.state.selectedFile ? this.state.selectedFile.name : ''}
                            /> */}
                            {
                                this.state.fileList && this.state.fileList.map((file: File) => {
                                    return <div key={file.name}>{file.name} is {file.size} bytes</div>
                                })
                            }
                        </div>
                        <div className={classes.formRow}>
                            <input
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={this.handleSelectFile}
                            />
                            <div className={classes.uploadButton}>
                                <label htmlFor="contained-button-file">
                                    <Button variant="outlined" component="span">
                                        select file
                                    </Button>
                                </label>
                            </div>
                            <div className={classes.uploadButton}>
                                {
                                    isUploading ? 
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={this.cancelUpload}
                                    >
                                        cancel
                                    </Button>
                                    :
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={this.addAudio}
                                    >
                                        add audio
                                    </Button>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </Fragment>
        );
    }
}

export default withStyles(UploadAudioStyles)(UploadAudio);