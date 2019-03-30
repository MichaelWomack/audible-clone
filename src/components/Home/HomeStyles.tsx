import { createStyles, Theme } from '@material-ui/core/styles';

export default (theme: Theme) => 
    createStyles({
        container: {
            top: 100
        },
        // progress: {
        //     top: 56
        // },
        addButton: {
            position: 'fixed',
            bottom: '11%',
            right: '8%',
            zIndex: 1
        },
        githubButtonContainer: {
            display: 'flex',
            justifyContent: 'center',
        }
    });