import {createStyles, Theme} from '@material-ui/core/styles';

export default (theme: Theme) =>
    createStyles({
        container: {
            margin: 'auto',
        },
        textField: {
            margin: theme.spacing.unit
        },
        image: {
            display: 'flex',
            margin: 'auto'
        },
    });