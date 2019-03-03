import * as React from 'react';
import { Component } from 'react';
import {
    SortableContainer,
    SortableElement,
    SortableHandle,
    arrayMove, SortableContainerProps,
} from 'react-sortable-hoc';
import { storage } from "firebase";
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import IconButton from "@material-ui/core/IconButton/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Done';
import BackupIcon from '@material-ui/icons/BackupOutlined';
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Typography from "@material-ui/core/Typography/Typography";
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    listItem: {
        textAlign: 'center'
    },
    sortableContainer: {
        listStyle: 'none !important'
    }
});

const SortableDragHandle = SortableHandle(() =>
    <IconButton>
        <DragIndicatorIcon/>
    </IconButton>
);

const renderUploadStatus = (percentDone: number) => {
    return percentDone === 100 ? <CheckIcon /> : <BackupIcon />
};

const SortableListItem = SortableElement((props: any) => {
    const { file, removeFile, uploadTask } = props;
    const uploadStarted = Boolean(uploadTask);
    const percentDone = uploadStarted ? Math.floor((uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100) : 0;
    return (
        <ListItem style={{textAlign: 'center'}} dense>
            { uploadStarted ? renderUploadStatus(percentDone) : <SortableDragHandle /> }
            <ListItemText primary={`${file.name}`}/>
            <ListItemSecondaryAction>
                {uploadStarted ?
                    <Typography color="primary">
                        {`${percentDone}%`}
                    </Typography>
                :
                    <IconButton onClick={removeFile}>
                        <CloseIcon/>
                    </IconButton>
                }
            </ListItemSecondaryAction>
        </ListItem>
    );
});

const SortableList = SortableContainer((props: any) => {
    const { files, removeFile, uploadTasks } = props;
    return (
        <List>
            {
                files.map((file: File, index: number) => {
                    const remove = () => removeFile(file.name);
                    return <SortableListItem
                        key={file.name}
                        index={index}
                        file={file}
                        removeFile={remove}
                        uploadTask={uploadTasks[index]}
                    />
                })
            }
        </List>
    );
});

export interface UploadPreviewProps extends SortableContainerProps, WithStyles<typeof styles> {
    files: File[];
    setFiles: (file: File[]) => void;
    removeFile: (fileName: string) => void;
    uploadTasks?: storage.UploadTask[];
}

class UploadPreview extends Component<UploadPreviewProps, {}> {

    onSortEnd = (props: any) => {
        const { files, setFiles } = this.props;
        const newFiles = arrayMove(files, props.oldIndex, props.newIndex);
        setFiles(newFiles);
    };

    render() {
        const { files, removeFile, classes, uploadTasks } = this.props;
        return (
            <SortableList
                files={files}
                removeFile={removeFile}
                uploadTasks={uploadTasks}
                helperClass={classes.sortableContainer}
                lockAxis="y"
                onSortEnd={this.onSortEnd}
                useDragHandle={true}
                useWindowAsScrollContainer={true}
            />
        );
    }
}

export default withStyles(styles)(UploadPreview);