import { createStyles, Theme } from '@material-ui/core/styles';

export default (theme: Theme) =>
    createStyles({
        root: {
            width: '90%',
            margin: '70px auto'
          },
          stepContent: {
            width: '90%',
            margin: '50px auto',
            minHeight: 150
          },
          completeCheckIcon: {},
          backButton: {
            // marginRight: theme.spacing.unit,
          },
          stepControl: {
              display: 'flex',
              justifyContent: 'space-between',
              margin: theme.spacing.unit
          },
          instructions: {
            marginTop: theme.spacing.unit,
            marginBottom: theme.spacing.unit,
          },
    });
