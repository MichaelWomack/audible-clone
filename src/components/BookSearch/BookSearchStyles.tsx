import {createStyles, Theme} from '@material-ui/core/styles';

export default (theme: Theme) =>
    createStyles({
        header: {

        },
        searchPrompt: {
            margin: '20px auto',
            maxWidth: 550,
            textAlign: 'center'
        },
        bookListing: {
            margin: 'auto',
            display: 'flex',
            justifyContent: 'spaced-evenly',
            flexWrap: 'wrap'
        },
        formContainer: {
            display: 'flex'
        },
        search: {
            display: 'flex',
            width: '-webkit-fill-available;'
        },
        textField: {
            marginLeft: theme.spacing.unit,
            marginRight: theme.spacing.unit,
        },
    });