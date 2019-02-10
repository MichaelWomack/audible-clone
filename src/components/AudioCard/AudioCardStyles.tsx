import { createStyles, Theme } from '@material-ui/core/styles';

export default (theme: Theme) =>
    createStyles({
        card: {
            display: 'flex',
            width: 350,
            height: 200,
            margin: 15
        },
        details: {
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1
        },
        media: {
            minWidth: 128,
        },
        content: {
            flex: '1 0 auto',
        },
        cover: {
            width: 231,
        },
        chip: {
            margin: 'auto',
            width: 'min-content'
        },
        controls: {
            display: 'flex',
            alignItems: 'center',
            paddingLeft: theme.spacing.unit,
            paddingBottom: theme.spacing.unit,
            justifyContent: 'space-evenly'
        },
        playIcon: {
            height: 30,
            width: 30,
        },
        

    });
