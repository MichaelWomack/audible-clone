import { createStyles, Theme } from '@material-ui/core/styles';

export default (theme: Theme) =>
    createStyles({
        input: {
            display: 'none',
        },
        container: {
            margin: 'auto',
        },
        formContainer: {
            margin: 'auto',
            width: 300,
        },
        header: {
            textAlign: 'center',
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
        },
        uploadButton: {
            margin: theme.spacing.unit,
        },
        formRow: {
            marginTop: 15,
            display: 'flex',
        },
    });
