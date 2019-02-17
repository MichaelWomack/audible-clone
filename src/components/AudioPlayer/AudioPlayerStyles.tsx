import {createStyles, Theme} from '@material-ui/core';

export default (theme: Theme) => 
    createStyles({
        audioPlayerBar: {
            top: 'auto',
            bottom: 0,
        },
        toolbar: {
            alignItems: 'center',
            justifyContent: 'space-evenly',
            // paddingLeft: 0 //for image
        },
        toolbarAudioImage: {
            height: 56,
            width: 35
        },
        toolbarControls: {
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'space-evenly',
        },
        audioTime: {
            // textAlign: 'center',
            // marginTop: 15
        }
    });