import { createStyles, Theme } from '@material-ui/core/styles';

export default (theme: Theme) =>
    createStyles({
        container: {
            textAlign: 'center',
            marginBottom: 50,
            marginTop: 70
        },
        headerContainer: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        toggleGroup: {
            display: 'flex',
            width: 'min-content',
            marginRight: 10
        },
        audioList: {
            display: 'flex',
            flexFlow: 'wrap',
            justifyContent: 'space-evenly'
        }
    });