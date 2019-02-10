import { createStyles, Theme } from '@material-ui/core/styles';

export default (theme: Theme) =>
    createStyles({
        card: {
            width: 345,
            margin: 10
        },
        media: {
            height: 200,
            width: 128,
            margin: '15px auto'
        },
    });
