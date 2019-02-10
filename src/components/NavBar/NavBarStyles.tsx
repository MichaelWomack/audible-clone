import {createStyles, Theme} from '@material-ui/core';

export default (theme: Theme) =>
    createStyles({
        menuButton: {
            marginLeft: -12,
            marginRight: 20,
          },
          toolbar: {
              justifyContent: 'space-between'
          },
          signOutButton: {
            marginRight: -12,
          }
    });