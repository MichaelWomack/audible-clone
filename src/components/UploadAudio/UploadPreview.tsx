import * as React from 'react';
import { Component } from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";

const styles = (theme: Theme) => createStyles({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    listItem: {
        textAlign: 'center'
    }
});

export interface UploadPreviewProps extends WithStyles<typeof styles> {
    files: File[];
    removeFile: (name: string) => void;
}

class UploadPreview extends Component<UploadPreviewProps, {}> {

    render() {
        const { classes, files } = this.props;
        return (
            <List className={classes.root}>
                {files.map((file: File) => (
                    <ListItem className={classes.listItem} key={file.name} role={undefined} dense>
                        <IconButton>
                            <DragIndicatorIcon/>
                        </IconButton>
                        <ListItemText primary={`${file.name}`}/>
                        <ListItemSecondaryAction>
                            <IconButton>
                                <CloseIcon onClick={() => this.props.removeFile(file.name)}/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        );
    }
}

export default withStyles(styles)(UploadPreview);