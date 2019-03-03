import * as React from 'react';
import { FunctionComponent } from "react";
import { Audio } from '../../model/audio';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogContentText from '@material-ui/core/DialogContentText';

export interface AudioInfoDialogProps {
    audio: Audio;
    showInfoDialog: boolean;
    closeDialog: () => void;
}

const AudioInfoDialog: FunctionComponent<AudioInfoDialogProps> = (props) => {
    const { audio, showInfoDialog, closeDialog } = props;
    return (
        <Dialog 
            open={showInfoDialog}
            onClose={closeDialog}
            scroll='paper'
        >
            <DialogTitle>
                {audio.title}
            </DialogTitle>
            <DialogContent>
                {/* <Typography variant="subtitle1">
                    Author
                </Typography>
                <DialogContentText>
                    {audio.author}
                </DialogContentText> */}
                <Typography variant="subtitle1">
                    Description
                </Typography>
                <DialogContentText>
                    {audio.description}
                </DialogContentText>
            </DialogContent>
        </Dialog>
          
    )
}

export default AudioInfoDialog;