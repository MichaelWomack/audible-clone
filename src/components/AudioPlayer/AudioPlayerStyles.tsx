import {createStyles, Theme} from '@material-ui/core';

export default (theme: Theme) => 
    createStyles({
        audioPlayerBar: {
            top: 'auto',
            bottom: 0,
        },
        toolbar: {
            alignItems: 'center',
            justifyContent: 'space-evenly'
        },
        audioTime: {
            // textAlign: 'center',
            // marginTop: 15
        }
    });