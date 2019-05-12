import { createStyles, Theme } from '@material-ui/core/styles';

export default (theme: Theme) =>
    createStyles({
        container: {
            flexGrow: 1,
            textAlign: 'center',
            marginBottom: 50,
            marginTop: 57
        },
        tabRoot: {
            flexGrow: 1
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
        },
        formControl: {
            margin: theme.spacing.unit * 2,
            minWidth: 120,
        },
    });