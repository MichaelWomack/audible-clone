import { createStyles, Theme } from "@material-ui/core/styles";


export default (theme: Theme) => 
    createStyles({
        container: {
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between'
        },
        // content: {
        //     display: 'flex',
        //     flexDirection: 'column',
        //     justifyContent: 'space-evenly'
        // },
        image: {
            margin: 'auto',
            marginTop: 60 

        },
        sliderLabel: {
            textAlign: 'center',
            margin: 40
        },
        slider: {
            width: 300,
            margin: '0 auto'
        },
        controls: {
            marginBottom: 80,
            display: 'flex',
            justifyContent: 'space-evenly'
        }
    });