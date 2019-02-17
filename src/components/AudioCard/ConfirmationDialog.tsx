import * as React from 'react';
import { SFC } from 'react';
import { Audio } from '../../model/audio';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Typography } from '@material-ui/core';

export interface Props {
    open: boolean;
    audio: Audio;
    cancel: () => void;
    confirm: () => void;
}

const ConfirmationDialog: SFC<Props> = (props) => {
   return (
        <Dialog
            open={props.open}
            onClose={props.cancel}
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
        >
        <DialogTitle id="confirmation-dialog-title">
            Confirm
        </DialogTitle>
        <DialogContent>
            <Typography variant="subtitle2">
                Are you sure you want to delete <i>{props.audio.title}</i>?
            </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.cancel} color="secondary">
            cancel
          </Button>
          <Button onClick={props.confirm} color="primary">
            delete
          </Button>
        </DialogActions>
        </Dialog>
    );
}

export default ConfirmationDialog;