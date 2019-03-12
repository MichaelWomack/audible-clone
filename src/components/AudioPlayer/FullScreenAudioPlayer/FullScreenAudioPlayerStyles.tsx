import { createStyles, Theme } from "@material-ui/core/styles";


export default (theme: Theme) => 
    createStyles({
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        timerText: {
            padding: 10
        },
        timerContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginRight: 15
        },
        dialogContent: {
            overflow: 'hidden',
            padding: 0,
            paddingTop: '0 !important' /* QUIRK: DialogContent adds padding to top */
        },
        image: {
            display: 'block',
            margin: '60px auto 40px auto' 

        },
        trackText: {
            marginBottom: 20,
            textAlign: 'center'
        },
        sliderLabel: {
            textAlign: 'center',
            paddingTop: 15
        },
        slider: {
            width: 300,
            margin: '0 auto',
            marginTop: 40
        },
        controls: {
            marginBottom: '35%',
            display: 'flex',
            justifyContent: 'space-evenly'
        }
    });