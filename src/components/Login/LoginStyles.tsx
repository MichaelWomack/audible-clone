import { createStyles, Theme } from '@material-ui/core';

export default (theme: Theme) =>
    createStyles({
        container: {
            textAlign: 'center',
            position: "relative",
            top: 140
        },
        header: {
            marginBottom: 30
        },
        toolbar: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        formContainer: {
            width: "40%",
            minWidth: 300,
            margin: "auto",
        },
        textField: {
            marginBottom: 30
        },
        buttonRow: {
            display: "flex",
            flexGrow: 1,
            marginTop: theme.spacing.unit * 2,
            marginBottom: 30,
            justifyContent: 'space-evenly',
        },
        githubContainer: {
            
        },
        alternateLogins: {
            display: "flex",
            flexGrow: 1
        },
        circleProgress: {
            position: 'absolute',
            width: '75',
            height: '75'
        }
    });
