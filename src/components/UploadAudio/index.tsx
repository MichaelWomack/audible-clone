import * as React from 'react';
import { Component, ChangeEvent, Fragment, RefObject } from 'react';
import { storage } from 'firebase';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { VolumeInfo } from '../../model/volume';
import { Audio } from '../../model/audio';
import UploadAudioStyles from './UploadAudioStyles';
import UploadPreview from './UploadPreview';

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
    selectedFiles?: { [name: string]: File };
}

export class UploadAudio extends Component<UploadAudioProps, UploadAudioState> {

    fileInput: RefObject<HTMLInputElement>;

    state: UploadAudioState = {
        audio: {},
        open: false,
        selectedFiles: {},
    };

    constructor(props: UploadAudioProps) {
        super(props);
        this.fileInput = React.createRef();
    }

    componentDidMount() {
        this.props.setNextStepDisabled(true);
    }

    removeFile = (fileName: string) => {
        const { selectedFiles } = this.state;
        const updatedSelection = Object.assign({}, selectedFiles);
        delete updatedSelection[fileName];
        console.log('removeFile ', updatedSelection);
        this.setState({ selectedFiles: updatedSelection });
    };

    setFiles = (files: File[]) => {
        const filesByName = files.reduce((map: any, file) => {
            map[file.name] = file;
            return map;
        }, {});
        this.setState({ selectedFiles: filesByName }, () => this.fileInput.current.value = null);
    } ;

    handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target;
        const { selectedFiles } = this.state;
        const newFileList = [...Object.values(selectedFiles), ...Array.from(files)];
        this.setFiles(newFileList);
    };

    /** TODO: delete this */
    cancelUpload = () => {
        const { uploadTasks } = this.props;
        uploadTasks.forEach((task: storage.UploadTask) => task.cancel());
    };

    addAudio = () => {
        const { selectedFiles, audio } = this.state;
        const { volume } = this.props;
        if (Object.keys(selectedFiles).length > 0) {
            audio.title = volume.title;
            audio.author = volume.authors.join(', ');
            audio.description = volume.description;
            audio.imageUrl = volume.imageLinks.thumbnail || volume.imageLinks.smallThumbnail;
            this.props.uploadAudio(audio, Object.values(selectedFiles)); /** TODO pass whole array */
            this.props.setNextStepDisabled(false);
        } else {
            alert('upload some files!');
        }
    };

    render() {
        const { classes, isUploading } = this.props;
        return (
            <Fragment>
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
                            <input
                                accept="audio/*"
                                ref={this.fileInput}
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
                <UploadPreview
                    files={Object.values(this.state.selectedFiles)}
                    setFiles={this.setFiles}
                    removeFile={this.removeFile}
                    uploadTasks={this.props.uploadTasks || []}
                />
                </div>
            </Fragment>
        );
    }
}

export default withStyles(UploadAudioStyles)(UploadAudio);