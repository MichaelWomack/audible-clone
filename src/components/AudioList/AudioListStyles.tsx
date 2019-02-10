import { createStyles, Theme } from '@material-ui/core/styles';

export default (theme: Theme) => 
    createStyles({
        container: {
            textAlign: 'center',
            marginBottom: 50,
            marginTop: 70
        },
        audioList: {
            display: 'flex',
            flexFlow: 'wrap',
            justifyContent: 'space-evenly'
        }
    });